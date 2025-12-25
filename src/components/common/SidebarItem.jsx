import { Link } from 'react-router-dom';

export default function SidebarItem({ icon: Icon, label, to, color }) {
  return (
    <div>
      <Link to={to} className="flex items-center p-2 text-white rounded-lg hover:bg-white/10">
        {Icon && <Icon className={`text-xl ${color}`} />}
        <span className="ml-3">{label}</span>
      </Link>
    </div>
  );
}
