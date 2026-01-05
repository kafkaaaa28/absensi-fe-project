import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaQrcode, FaSyncAlt, FaClock } from 'react-icons/fa';
import logo from '../../../../../components/img/univ.png';
const QrAbsensiAsdos = ({ data, tokenQr, fetchTokenQr, OpenQr, onClose, loading }) => {
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tokenQr]);

  useEffect(() => {
    if (!OpenQr) return;
    if (timer === 0 && data?.id_kelas && data?.id_jadwal) {
      fetchTokenQr(data.id_kelas, data.id_jadwal);
    }
  }, [timer, data, fetchTokenQr, OpenQr]);
  useEffect(() => {
    if (!OpenQr) {
      setTimer(30);
    }
  }, [OpenQr]);

  const handleManualRefresh = () => {
    if (data?.id_kelas && data?.id_jadwal) {
      fetchTokenQr(data.id_kelas, data.id_jadwal);
      setTimer(30);
    }
  };

  return (
    <Modal show={OpenQr} onClose={onClose} size="3xl">
      <ModalHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaQrcode className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">QR Code Absensi</h3>
              <p className="text-sm text-gray-600">
                {data?.nama_kelas} • {data?.nama_matkul}
              </p>
            </div>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="px-6 py-4">
        <div className="text-center">
          {loading ? (
            <>
              <div className="py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 text-sm">Membuat QR Code...</p>
              </div>
            </>
          ) : (
            <>
              <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg mb-4 relative">
                <QRCodeSVG value={tokenQr} size={400} bgColor="#ffffff" fgColor="#000000" level="H" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img src={logo} alt="Logo" className="w-16 h-16 bg-white p-2 " />
                </div>
              </div>
              <div className="mb-4 bg-blue-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Refresh otomatis dalam:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${timer > 10 ? 'bg-green-100 text-green-800' : timer > 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{timer}s</div>
                    <button onClick={handleManualRefresh} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <FaSyncAlt className="w-4 h-4" />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${(timer / 30) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default QrAbsensiAsdos;
