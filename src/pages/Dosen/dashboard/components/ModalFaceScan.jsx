import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'flowbite-react';
import * as faceapi from 'face-api.js';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import api from '../../../../utils/api';

const ModalFaceScan = ({ data, modalLihat, OnClose }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // untuk list yang sudah absen
  const [absenBerhasilList, setAbsenBerhasilList] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // MediaPipe detector
  const detectorRef = useRef(null);

  // Camera controller
  const cameraRef = useRef(null);

  // Data embedding wajah dari database
  const labeledDescriptors = useRef([]);

  const isProcessing = useRef(false);
  // UNTUK: MENCEGAH multiple face recognition berjalan bersamaan

  const processedNPMs = useRef(new Set());
  // UNTUK: Mencatat NPM mahasiswa yang SUDAH ABSEN

  const faceMatches = useRef(new Map());
  // UNTUK: Mencatat posisi wajah yang sudah dikenali
  // TUJUAN: Tracking wajah yang bergerak

  const lastDetectionTime = useRef(0);
  const detectionInterval = 3000;
  // UNTUK: MEMBATASI face recognition hanya setiap 3 detik
  // TUJUAN: Hemat CPU, prevent spam

  const isComponentMounted = useRef(true);
  // UNTUK: Cek apakah komponen masih aktif
  useEffect(() => {
    loadModels();

    // Set mounted flag
    isComponentMounted.current = true;

    return () => {
      // Cleanup saat unmount
      isComponentMounted.current = false;
      stopCamera();
    };
  }, []);

  const loadModels = async () => {
    await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/models'), faceapi.nets.faceLandmark68Net.loadFromUri('/models'), faceapi.nets.faceRecognitionNet.loadFromUri('/models')]);
  };
  // untuk ambil data embbeding wajah dari API
  const loadEmbeddings = async () => {
    try {
      const res = await api.get(`dosen/faceSiswa/${data.id_kelas}`);
      labeledDescriptors.current = res.data.map((item) => ({
        name: item.nama,
        nim: item.nim,
        descriptor: new Float32Array(JSON.parse(item.face_embedding)),
      }));
    } catch (err) {
      console.error('Gagal load embeddings:', err);
    }
  };

  useEffect(() => {
    if (modalLihat) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [modalLihat]);

  const startCamera = async () => {
    if (!isComponentMounted.current) return;

    await loadEmbeddings(); // Load data wajah dari API di atas
    setMessage('Mendeteksi wajah...');
    setLoading(true);

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    //Validasi apakah elements ada/ter-render dengan benar
    // Jika error: Stop proses dan matikan loading
    if (!videoElement || !canvasElement) {
      console.error('Video atau canvas element tidak ditemukan');
      setLoading(false);
      return;
    }

    // Digunakan untuk set ukuran kamera dan drawing
    const width = canvasElement.width;
    const height = canvasElement.height;

    detectorRef.current = new FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    // Hanya deteksi wajah dengan confidence > 50%
    detectorRef.current.setOptions({
      model: 'short',
      minDetectionConfidence: 0.5,
    });

    // Flow: Deteksi wajah lanjut Gambar kotak lanjut Proses recognition
    detectorRef.current.onResults((results) => {
      if (!isComponentMounted.current) return;
      drawFaceBoxes(results);
      processFaceRecognition();
    });

    cameraRef.current = new Camera(videoElement, {
      onFrame: async () => {
        if (!isComponentMounted.current || !detectorRef.current) return;
        await detectorRef.current.send({ image: videoElement });
      },
      width,
      height,
    });

    cameraRef.current.start();
    videoRef.current.style.filter = 'brightness(1.1) contrast(1.2)';

    setLoading(false);
  };

  const drawFaceBoxes = (results) => {
    if (!canvasRef.current) return;

    // 2D dari canvas untuk bisa menggambar
    const canvasCtx = canvasRef.current.getContext('2d');

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    canvasCtx.clearRect(0, 0, width, height);
    canvasCtx.drawImage(results.image, 0, 0, width, height);

    // Cek apakah tidak ada wajah yang terdeteksi
    if (!results.detections || results.detections.length === 0) {
      if (processedNPMs.current.size === 0) {
        setMessage('Tidak ada wajah terdeteksi...');
      }
      return;
    }

    //  berapa banyak wajah yang terdeteksi
    if (processedNPMs.current.size === 0) {
      setMessage(`${results.detections.length} wajah terdeteksi, mengenali...`);
    }

    for (let i = 0; i < results.detections.length; i++) {
      const detection = results.detections[i];
      const box = detection.boundingBox;
      const x = box.xCenter * width - (box.width * width) / 2;
      const y = box.yCenter * height - (box.height * height) / 2;
      const w = box.width * width;
      const h = box.height * height;

      const match = findMatchByPosition(x, y, w, h);
      // Cek apakah sudah absen
      const isAlreadyProcessed = match && processedNPMs.current.has(match.nim);

      let boxColor = 'red';
      let displayText = 'Mengenali...';

      if (match) {
        if (isAlreadyProcessed) {
          boxColor = '#00C853';
          displayText = `Absen Berhasil ${match.name} (${match.nim})`;
        } else {
          boxColor = '#FFA000';
          displayText = `${match.name} (${match.nim})`;
        }
      } else {
        // Cek apakah ada wajah yang sudah dikenali tapi tidak match posisi
        if (faceMatches.current.size > 0) {
          displayText = 'Wajah Tidak Dikenal';
        }
      }

      // Gambar box
      canvasCtx.beginPath();
      canvasCtx.rect(x, y, w, h);
      canvasCtx.lineWidth = 3;
      canvasCtx.strokeStyle = boxColor;
      canvasCtx.stroke();

      // Gambar label
      canvasCtx.fillStyle = 'rgba(0,0,0,0.6)';
      canvasCtx.fillRect(x, y - 25, w, 25);
      canvasCtx.fillStyle = 'white';
      canvasCtx.font = '14px Arial';

      // Hitung lebar text dalam pixel supaya text atau nama tidak terlalu panjang
      const maxWidth = w - 10;
      let text = displayText;
      let textWidth = canvasCtx.measureText(text).width;

      if (textWidth > maxWidth) {
        while (textWidth > maxWidth && text.length > 3) {
          text = text.slice(0, -1);
          textWidth = canvasCtx.measureText(text + '...').width;
        }
        text = text + '...';
      }

      canvasCtx.fillText(text, x + 5, y - 7);
    }
  };
  const findMatchByPosition = (x, y, w, h) => {
    // Cari di faceMatches yang sudah disimpan
    for (const [faceKey, match] of faceMatches.current) {
      // Parse posisi dari faceKey atau gunakan posisi yang disimpan
      const keyParts = faceKey.split('-');
      if (keyParts.length >= 4) {
        const keyX = parseInt(keyParts[2]);
        const keyY = parseInt(keyParts[3]);

        // Cek apakah posisi overlap (dengan toleransi)
        const overlap = Math.abs(keyX - x) < 50 && Math.abs(keyY - y) < 50;

        if (overlap) {
          return match;
        }
      }
    }

    return null;
  };
  const processFaceRecognition = async () => {
    const now = Date.now();

    if (!isComponentMounted.current || isProcessing.current || now - lastDetectionTime.current < detectionInterval) {
      return;
    }

    // Tandai sedang proses (lock)
    isProcessing.current = true;
    //  Catat waktu terakhir proses
    lastDetectionTime.current = now;

    try {
      // CEK VIDEO REF
      if (!videoRef.current) return;

      const faceDetections = await faceapi
        //  Deteksi semua wajah di frame video
        .detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 320,
            scoreThreshold: 0.5,
          })
        )
        .withFaceLandmarks()
        .withFaceDescriptors();
      // output berupa array

      //  Simpan sementara yang berhasil absen
      const newAbsenList = [];

      //  Reset tracking wajah yang dikenali
      faceMatches.current.clear();

      for (let i = 0; i < faceDetections.length; i++) {
        const faceDetection = faceDetections[i];

        // Cocokkan descriptor dengan database
        const match = findBestMatch(faceDetection.descriptor);

        if (match) {
          const box = faceDetection.detection.box;
          const faceId = `face-${i}-${box.x.toFixed(0)}-${box.y.toFixed(0)}`;
          // Simpan match untuk drawing
          faceMatches.current.set(faceId, match);

          //  jika belum absen maka
          if (!processedNPMs.current.has(match.nim)) {
            // Tandai sudah absen
            processedNPMs.current.add(match.nim);

            // Tambahkan ke list absen sementara
            newAbsenList.push(match);

            try {
              // maka simpan ke db
              await api.put('dosen/absensi/update-face', {
                descriptor: Array.from(faceDetection.descriptor),
                kelasId: data.id_kelas,
                jadwalId: data.id_jadwal,
                nim: match.nim,
              });
            } catch (err) {
              console.error('Gagal absen untuk:', match.name, err);
              processedNPMs.current.delete(match.nim);
            }
          }
        } else {
          console.log('No match found for face', i);
        }
      }

      if (newAbsenList.length > 0 && isComponentMounted.current) {
        // Update list di state React
        setAbsenBerhasilList((prev) => [...prev, ...newAbsenList]);

        setMessage(`✅ ${newAbsenList.length} orang berhasil absen! Total: ${processedNPMs.current.size}`);
      }
    } catch (err) {
      console.error('Error face recognition:', err);
    } finally {
      // matikan proses
      isProcessing.current = false;
    }
  };

  const stopCamera = () => {
    try {
      // HENTIKAN KAMERA DENGAN SAFE CHECK
      // Cek apakah kamera masih aktif
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }

      // RESET DETECTOR
      if (detectorRef.current) {
        detectorRef.current = null;
      }

      // HANYA UPDATE STATE JIKA MASIH MOUNTED
      if (isComponentMounted.current) {
        setAbsenBerhasilList([]);
        setMessage('');
      }

      // RESET REF (AMAN UNTUK DILAKUKAN)

      // Hapus semua NPM yang sudah absen
      processedNPMs.current.clear();
      //  Hapus tracking posisi wajah
      faceMatches.current.clear();

      // matikan proses
      isProcessing.current = false;
      // Reset timer detection interval
      lastDetectionTime.current = 0;
    } catch (error) {
      console.log('Safe stop camera:', error.message);
    }
  };
  // kan tadi diatas mengambil faceembeddoing dari db fungsi ini untuk mencocokkan agar drawbox tahu siapa yang sedang di scan
  const findBestMatch = (descriptor) => {
    let bestMatch = null;
    let smallestDistance = Infinity;

    labeledDescriptors.current.forEach((item) => {
      const distance = faceapi.euclideanDistance(descriptor, item.descriptor);
      if (distance < 0.5 && distance < smallestDistance) {
        smallestDistance = distance;

        // kasih tahu siapa yang terdeteksi
        bestMatch = item;
      }
    });

    return bestMatch;
  };

  const handleClose = () => {
    stopCamera();
    OnClose(false);
  };

  return (
    <Modal show={modalLihat} onClose={handleClose} size="5xl">
      <ModalBody className="bg-white relative">
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-2xl shadow-md relative">
          <h2 className="text-xl font-semibold mb-4">Absen Otomatis dengan Wajah</h2>

          <div className="relative">
            <video ref={videoRef} autoPlay muted width="640" height="480" className="rounded-lg border-2 border-gray-400" />
            <canvas ref={canvasRef} width="640" height="480" className="absolute top-0 left-0" />
          </div>

          <p className="mt-3 text-gray-700 text-center">
            {loading ? '⏳ Loading...' : message}
            {absenBerhasilList.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-green-600">Sudah absen: {absenBerhasilList.map((item) => item.name).join(', ')}</p>
              </div>
            )}
          </p>
        </div>
      </ModalBody>

      <ModalFooter className="bg-white">
        <Button color="gray" onClick={handleClose}>
          Tutup
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalFaceScan;
