import { FaDoorOpen, FaUserTie } from 'react-icons/fa';
import { MdSchedule } from 'react-icons/md';
import { useAuth } from '../../../../context/AuthContext';
import bgasdos from '../../../../components/img/asdos.jpg';
import { useNavigate } from 'react-router-dom';
const DataboardNavigate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const quickActions = [
    {
      icon: <MdSchedule className="w-6 h-6" />,
      title: 'Jadwal',
      description: 'Lihat jadwal mengajar Asisten',
      color: 'bg-green-50 text-green-600',
      link: 'jadwal',
    },
    {
      icon: <FaDoorOpen className="w-6 h-6" />,
      title: 'Kelas',
      description: 'Lihat Kelas',
      color: 'bg-purple-50 text-purple-600',
      link: 'kelas',
    },
    {
      icon: <FaUserTie className="w-6 h-6" />,
      title: 'Profile',
      description: 'Edit profile Asisten',
      color: 'bg-orange-50 text-orange-600',
      link: 'profile',
    },
  ];

  return (
    <div className="relative bg-gradient-to-r from-[#162542] to-[#2D4A8A] text-white pb-8 rounded-lg">
      <div className="absolute inset-0 overflow-hidden">
        <img src={bgasdos} alt="dashboard background" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pt-8 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Selamat Datang, {user?.nama} 👋</h1>
            <p className="text-blue-100 mt-2">Dashboard terbaru Anda ada di sini</p>
          </div>
          <div className="hidden md:block">
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-4 rounded-xl border border-white/30">Asisten Panel</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <button onClick={() => navigate(action.link)} key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/20 transition-all border border-white/20">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>{action.icon}</div>
              <h3 className="font-semibold text-white mb-1">{action.title}</h3>
              <p className="text-blue-100 text-sm">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataboardNavigate;
