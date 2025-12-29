import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const QrScanAbsensi = ({ user, data, ApiUpdateAbsenQr, openScanQr, onClose }) => {
  const scannerRef = useRef(null);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [cooldown, setCooldown] = useState(0);

  const isCooldownRef = useRef(false);

  const applyZoom = async (zoomLevel) => {
    try {
      const video = document.querySelector('#qr-reader video');
      if (!video) return;

      const track = video.srcObject?.getVideoTracks?.()[0];
      if (!track) return;

      const capabilities = track.getCapabilities?.();

      if (!capabilities || !capabilities.zoom) {
        console.warn('Zoom not supported on this device');
        return;
      }

      await track.applyConstraints({
        advanced: [{ zoom: zoomLevel }],
      });
    } catch (err) {
      console.warn('Zoom failed:', err.message);
    }
  };
  const safeStopScanner = async () => {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
      }
    } catch (err) {
      console.warn('Scanner already stopped');
    }
  };

  useEffect(() => {
    if (!openScanQr) return;
    // setIsProcessing(false);
    // isCooldownRef.current = false;
    const startScanner = async () => {
      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;

      try {
        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            if (isProcessing || isCooldownRef.current) return;
            setIsProcessing(true);
            isCooldownRef.current = true;

            applyZoom(2.5);
            try {
              const res = await ApiUpdateAbsenQr({
                token: decodedText.trim(),
                id_kelas: String(data.id_kelas),
                id_jadwal: String(data.id_jadwal),
                nim: user.nim,
                id_siswa: user.id_siswa,
                namaSiswa: user.nama,
              });

              setMessage(res.message || 'Absensi berhasil');

              await safeStopScanner();
              setIsProcessing(false);
              isCooldownRef.current = false;
              onClose();
            } catch (err) {
              const status = err?.response?.status;
              const message = err?.response?.data?.message;

              setMessage(message || 'Gagal absen');

              if (status === 400) {
                // if (isCooldownRef.current) return;

                isCooldownRef.current = true;
                setCooldown(3);

                const timer = setInterval(() => {
                  setCooldown((prev) => {
                    if (prev <= 1) {
                      clearInterval(timer);
                      isCooldownRef.current = false;
                      return 0;
                    }
                    return prev - 1;
                  });
                }, 1000);

                setIsProcessing(false);
                return;
              }

              if (status === 404 || status === 409) {
                await safeStopScanner();
                setIsProcessing(false);
                isCooldownRef.current = false;
                onClose();
                return;
              }

              setTimeout(() => {
                setIsProcessing(false);
              }, 1500);
            }
          }
        );
      } catch (err) {
        console.error('Camera error:', err);
      }
    };

    const timer = setTimeout(startScanner, 300);

    return () => {
      clearTimeout(timer);
      safeStopScanner();
    };
  }, [openScanQr]);

  return (
    <Modal show={openScanQr} onClose={onClose}>
      <ModalHeader>Scan QR Absensi</ModalHeader>
      <ModalBody>
        <div id="qr-reader" style={{ width: '100%', minHeight: '300px' }} />
        {cooldown > 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">
              <p className="text-sm text-gray-500">Tunggu sebentar...</p>
              <p className="text-4xl font-bold text-blue-600">{cooldown}</p>
            </div>
          </div>
        )}
        <div className="flex justify-center gap-3 mt-3">
          <button onClick={() => applyZoom(Math.max(zoom - 0.5, 1))} className="px-3 py-1 bg-gray-200 rounded">
            ➖ Zoom Out
          </button>

          <span className="text-sm font-semibold">{zoom}x</span>

          <button onClick={() => applyZoom(Math.min(zoom + 0.5, 3))} className="px-3 py-1 bg-blue-500 text-white rounded">
            ➕ Zoom In
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default QrScanAbsensi;
