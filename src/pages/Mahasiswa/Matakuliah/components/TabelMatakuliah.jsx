import { FaBook, FaHashtag, FaCalendar, FaWeight } from 'react-icons/fa';

const TabelMatakuliah = ({ matkul, loadingMatkul, searchTerm }) => {
  const filteredData = matkul.filter((item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.kode_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 py-2.5 text-left">
                <span className="text-gray-700 font-medium">No</span>
              </th>
              <th className="px-3 py-2.5 text-left">
                <div className="flex items-center gap-1.5">
                  <FaBook className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Mata Kuliah</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left">
                <div className="flex items-center gap-1.5">
                  <FaCalendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Semester</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left">
                <div className="flex items-center gap-1.5">
                  <FaWeight className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">SKS</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left">
                <div className="flex items-center gap-1.5">
                  <FaHashtag className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Kode</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loadingMatkul ? (
              <tr>
                <td colSpan="5" className="px-3 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                    <p className="text-gray-500 text-xs">Memuat data...</p>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-3 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaBook className="w-8 h-8 text-gray-300 mb-1.5" />
                    <p className="text-gray-500 text-xs font-medium">{matkul.length === 0 ? 'Tidak ada mata kuliah' : 'Data tidak ditemukan'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{searchTerm ? 'Coba kata kunci lain' : 'Semua mata kuliah akan muncul di sini'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5">
                    <span className="text-gray-600 text-xs">{index + 1}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <FaBook className="w-3 h-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-xs">{item.nama_matkul}</p>
                        <p className="text-gray-500 text-xs">ID: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">Sem {item.semester}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                        <span className="text-green-700 font-bold text-xs">{item.sks}</span>
                      </div>
                      <span className="text-gray-700 text-xs">SKS</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">{item.kode_matkul}</code>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > 0 && !loadingMatkul && (
        <div className="px-3 py-2.5 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600">
              Menampilkan <span className="font-medium">{filteredData.length}</span> dari <span className="font-medium">{matkul.length}</span> mata kuliah
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelMatakuliah;
