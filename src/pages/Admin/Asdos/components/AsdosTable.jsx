import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import LoadingPage from '../../../../components/common/LoadingPage';
const DosenTable = ({ data, loading, search, onEdit, onDelete }) => {
  const filtered = data.filter((m) => m.nama.toLowerCase().includes(search.toLowerCase()));
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <div className="relative overflow-x-auto p-4 rounded-lg">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Nim
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Tipe Asdos
              </th>

              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                  Tidak ada Mahasiswa
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                  <td className=" px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.fakultas}</td>
                  <td className="px-6 py-4">{item.prodi}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-600" onClick={() => onEdit(item)}>
                        <FaRegEdit /> Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-2" onClick={() => onDelete(item)}>
                        <FaRegTrashAlt /> Delete
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
