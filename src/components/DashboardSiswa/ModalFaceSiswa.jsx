import React, { useEffect, useState, useRef } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import * as faceapi from 'face-api.js';
import api from '../../utils/api';
import Swal from 'sweetalert2';

const ModalFaceSiswa = ({ ModalFace, setModalFace }) => {
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
    if (ModalFace) {
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [ModalFace]);
  const captureFace = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Mendeteksi wajah...');

    try {
      // Mendeteksi wajah tunggal dan membuat face descriptor
      const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

      if (!detection) {
        setMessage('Tidak ada wajah terdeteksi!');

        return;
      }
      // Ubah descriptor menjadi array dan simpan ke formData
      const descriptorArray = Array.from(detection.descriptor);
      const jsonString = JSON.stringify(descriptorArray);
      setFormData({ face_embedding: jsonString });

      // Kirim data wajah ke backend
      await api.post('/siswa/upload-face', {
        face_embedding: jsonString,
      });
      Swal.fire({
        title: 'Berhasil Scan Wajah!',
        icon: 'success',
      });
      // ketika berhasil Hentikan kamera dan hapus video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      // modal tutup otomatis ketika scan wajah berhasil
      setModalFace(false);
    } catch (error) {
      console.error('Error saat capture face:', error);
      alert('Terjadi kesalahan saat memproses wajah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={ModalFace} size="xl">
        <ModalBody className="bg-white  ">
          <form onSubmit={captureFace} className="flex flex-col items-center p-6 bg-gray-100 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-black text-center">Scan Wajah</h2>
            <video ref={videoRef} autoPlay muted playsInline width="400" height="300" />
            <p className="mt-2 text-gray-600">{message}</p>
            <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
              {loading ? 'Menangkap...' : 'tangkap wajah'}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalFaceSiswa;
