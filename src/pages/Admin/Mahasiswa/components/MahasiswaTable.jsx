import { FaRegEdit, FaRegTrashAlt, FaUser, FaIdCard, FaUniversity, FaGraduationCap, FaCalendar } from 'react-icons/fa';
import { TbFaceId } from 'react-icons/tb';
import { FaRegFaceGrin } from 'react-icons/fa6';
const MahasiswaTable = ({ data, search, onEdit, onDelete, onDeleteFace }) => {
  const filtered = data.filter((item) => (item.nim || '').toLowerCase().includes(search.toLowerCase()) || (item.nama || '').toLowerCase().includes(search.toLowerCase()));
  console.log(data);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                <span className="text-gray-700 font-medium">No</span>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaUser className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Nama</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaIdCard className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">NIM</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaUniversity className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Fakultas</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Prodi</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Semester</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaRegFaceGrin className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Wajah</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <span className="text-gray-700 font-medium">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaUser className="w-10 h-10 text-gray-300 mb-2" />
                    <p className="text-gray-500 text-sm font-medium">{data.length === 0 ? 'Tidak ada mahasiswa' : 'Data tidak ditemukan'}</p>
                    <p className="text-gray-400 text-xs mt-1">{search ? 'Coba dengan kata kunci lain' : 'Semua mahasiswa akan muncul di sini'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-gray-600">{index + 1}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                        <FaUser className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-800 font-medium">{item.nama}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{item.nim}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-700">{item.fakultas}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-700">{item.prodi}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">Semester {item.semester}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${item.face_available ? `bg-green-100 text-green-700` : `bg-gray-100 text-gray-700`} text-xs font-medium`}>
                      {item.face_available ? 'Tersedia' : 'Tidak Tersedia'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors border border-blue-200 text-xs" onClick={() => onEdit(item)}>
                        <FaRegEdit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors border border-red-200 text-xs" onClick={() => onDelete(item)}>
                        <FaRegTrashAlt className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                      <button className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-md hover:bg-yellow-100 transition-colors border border-yellow-200 text-xs" onClick={() => onDeleteFace(item)}>
                        <TbFaceId className="w-3.5 h-3.5" />
                        <span>Face ID</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MahasiswaTable;
