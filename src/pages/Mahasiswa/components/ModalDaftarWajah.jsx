import React, { useEffect, useState, useRef } from 'react';
import { Modal, ModalBody } from 'flowbite-react';
import * as faceapi from 'face-api.js';
import { showAlert } from '../../../utils/alerts';
import { DaftarWajah } from '../../../api/siswa/AbsensiSiswaApi';
const ModalDaftarWajah = ({ showModal, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    face_embedding: '',
  });
  const videoRef = useRef();
  const startCamera = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        console.log('navigator.mediaDevices:', navigator.mediaDevices);
        throw new Error('getUserMedia tidak didukung di browser ini');
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Gagal mengakses kamera. Pastikan izin sudah diberikan dan browser mendukung getUserMedia.');
    }
  };
  useEffect(() => {
    if (showModal) {
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [showModal]);
  function isFaceFrontalStrict(landmarks) {
    const nose = landmarks.getNose();
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const jaw = landmarks.getJawOutline();

    // ==============================
    // 1️⃣ CEK MIRING (ROLL)
    // ==============================
    const leftEyeY = leftEye[0].y;
    const rightEyeY = rightEye[0].y;
    const eyeDiff = Math.abs(leftEyeY - rightEyeY);

    if (eyeDiff > 7) {
      return { ok: false, reason: 'Wajah miring coba sejajar dengan kamera' };
    }

    // ==============================
    // 2️⃣ CEK NUNDUK / NENGADAH (PITCH)
    // ==============================
    const eyeCenterY = (leftEye[0].y + rightEye[0].y) / 2;
    const noseY = nose[3].y;
    const chinY = jaw[8].y;

    const eyeToNose = noseY - eyeCenterY;
    const noseToChin = chinY - noseY;
    const ratio = eyeToNose / noseToChin;

    // 🔥 SUPER STRICT RANGE
    if (ratio < 0.6) {
      return { ok: false, reason: 'Wajah terlalu keatas coba sejajar dengan kamera' };
    }

    if (ratio > 0.85) {
      return { ok: false, reason: 'Wajah terlalu kebawah coba sejajar dengan kamera' };
    }

    // ==============================
    // 3️⃣ CEK JARAK WAJAH
    // ==============================
    const faceHeight = chinY - eyeCenterY;

    if (faceHeight < 90) {
      return { ok: false, reason: 'Wajah terlalu jauh dari kamera' };
    }

    return { ok: true };
  }

  const captureFace = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Mendeteksi wajah...');

    try {
      // Mendeteksi wajah tunggal dan membuat face descriptor
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();

      if (detections.length === 0) {
        setMessage('Wajah tidak terdeteksi');
        return;
      }

      if (detections.length > 1) {
        setMessage('Harap hanya 1 wajah di kamera');
        return;
      }

      const detection = detections[0];
      const expression = detection.expressions;
      if (!expression) {
        setMessage('Ekspresi wajah tidak terdeteksi');
        return;
      }
      // kalau senyum > 0.5 → tolak
      if (expression.happy > 0.5) {
        setMessage('Mohon wajah netral, jangan tersenyum');
        return;
      }

      if (!detection) {
        setMessage('Wajah tidak terdeteksi, hadap ke kamera');
        return;
      }
      const check = isFaceFrontalStrict(detection.landmarks);

      if (!check.ok) {
        setMessage(check.reason);
        return;
      }

      // Ubah descriptor menjadi array dan simpan ke formData
      const descriptorArray = Array.from(detection.descriptor);
      const jsonString = JSON.stringify(descriptorArray);
      setFormData({ face_embedding: jsonString });

      // Kirim data wajah ke backend
      await DaftarWajah({ face_embedding: jsonString });

      showAlert('Berhasil Scan Wajah');
      // ketika berhasil Hentikan kamera dan hapus video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      // modal tutup otomatis ketika scan wajah berhasil
      setShowModal(false);
    } catch (error) {
      console.error('Error saat capture face:', error);
      alert('Terjadi kesalahan saat memproses wajah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={showModal} size="xl">
        <ModalBody className="bg-white  ">
          <form onSubmit={captureFace} className="flex flex-col items-center p-6 bg-gray-100 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-black text-center">Scan Wajah</h2>
            <video ref={videoRef} autoPlay muted playsInline width="400" height="300" />

            <p className="mt-3 mb-3 text-gray-600">{message}</p>
            <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
              {loading ? 'Menangkap...' : 'tangkap wajah'}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalDaftarWajah;
