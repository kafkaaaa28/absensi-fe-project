import { FaRegEdit, FaRegTrashAlt, FaUser, FaIdCard, FaCheckCircle, FaUserTag, FaUserGraduate, FaUserTie } from 'react-icons/fa';

const DosenTable = ({ data, loading, search, onEdit, onDelete }) => {
  const filtered = data.filter((m) => m.nama.toLowerCase().includes(search.toLowerCase()));
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'aktif':
        return 'bg-green-100 text-green-800';
      case 'nonaktif':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipeColor = (tipe) => {
    switch (tipe?.toLowerCase()) {
      case 'mahasiswa':
        return 'bg-blue-100 text-blue-800';
      case 'nonmahasiswa':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipeIcon = (tipe) => {
    switch (tipe?.toLowerCase()) {
      case 'mahasiswa':
        return <FaUserGraduate className="w-3 h-3" />;
      case 'nonmahasiswa':
        return <FaUserTie className="w-3 h-3" />;
      default:
        return <FaUserTag className="w-3 h-3" />;
    }
  };

  const formatTipeAsdos = (tipe) => {
    switch (tipe?.toLowerCase()) {
      case 'mahasiswa':
        return 'Mahasiswa';
      case 'nonmahasiswa':
        return 'Non-Mahasiswa';
      default:
        return tipe || '-';
    }
  };

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
                  <FaCheckCircle className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Status</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaUserTag className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Tipe Asdos</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <span className="text-gray-700 font-medium">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                    <p className="text-gray-500 text-xs">Memuat data...</p>
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaUser className="w-8 h-8 text-gray-300 mb-1" />
                    <p className="text-gray-500 text-xs font-medium">{data.length === 0 ? 'Tidak ada data asisten dosen' : 'Data tidak ditemukan'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{search ? 'Coba kata kunci lain' : 'Semua data akan muncul di sini'}</p>
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
                    <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{item.nim || 'Bukan Mahasiswa'}</code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'aktif' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-xs font-medium ${getStatusColor(item.status)} px-2 py-0.5 rounded-full`}>{item.status === 'aktif' ? 'Aktif' : 'Nonaktif'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${getTipeColor(item.tipe_asdos)}`}>{getTipeIcon(item.tipe_asdos)}</div>
                      <span className="text-gray-700 text-xs">{formatTipeAsdos(item.tipe_asdos)}</span>
                    </div>
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

      {filtered.length > 0 && !loading && (
        <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-600">
            Menampilkan <span className="font-medium">{filtered.length}</span> dari <span className="font-medium">{data.length}</span> asisten dosen
          </p>
        </div>
      )}
    </div>
  );
};

export default DosenTable;
