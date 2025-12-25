import { FaRegEdit, FaRegTrashAlt, FaUser, FaUniversity, FaGraduationCap } from 'react-icons/fa';

const DosenTable = ({ data, search, onEdit, onDelete }) => {
  const filtered = data.filter((m) => m.nama.toLowerCase().includes(search.toLowerCase()));

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
                <span className="text-gray-700 font-medium">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaUser className="w-8 h-8 text-gray-300 mb-1" />
                    <p className="text-gray-500 text-xs font-medium">{data.length === 0 ? 'Tidak ada dosen' : 'Data tidak ditemukan'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{search ? 'Coba kata kunci lain' : 'Semua dosen akan muncul di sini'}</p>
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
                      <div className="w-7 h-7 bg-blue-100 rounded flex items-center justify-center">
                        <FaUser className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{item.nama}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-700 text-sm">{item.fakultas}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-700 text-sm">{item.prodi}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded hover:bg-blue-100 transition-colors border border-blue-200 text-xs" onClick={() => onEdit(item)}>
                        <FaRegEdit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1.5 rounded hover:bg-red-100 transition-colors border border-red-200 text-xs" onClick={() => onDelete(item)}>
                        <FaRegTrashAlt className="w-3 h-3" />
                        <span>Hapus</span>
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

export default DosenTable;
