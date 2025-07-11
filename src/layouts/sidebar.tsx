import { Home, Tag, Utensils, Truck, Package, Receipt, LogOut, User } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  }

  return (
    <aside className="bg-[#575B4F] text-white w-64 h-screen flex flex-col justify-between">
      {/* Parte superior */}
      <div>
        {/* AQUI VA EL LOGO */}
        <div className="p-6">
          <Logo />

        </div>

        {/* ESTE ES EL MENUU*/}
        <nav className="flex flex-col gap-2 px-4">
          <NavItem icon={<Home size={18} />} label="Inicio" />
          <NavItem icon={<Tag size={18} />} label="Productos" active />
          <NavItem icon={<Utensils size={18} />} label="Órdenes" />
          <NavItem icon={<Truck size={18} />} label="Proveedores" />
          <NavItem icon={<Package size={18} />} label="Insumos" />
          <NavItem icon={<Receipt size={18} />} label="Corte de caja" />
        </nav>
      </div>

      {/* ESTAS SON LAS OPCIONES DE ABAJITO */}
      <div className="bg-[#F1EFDD] text-[#505341] px-4 py-6 text-sm space-y-2">
        <button className="flex items-center gap-2 hover:underline" onClick={handleLogout}>
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${active ? 'bg-[#929471] text-[#222]' : 'hover:bg-[#6A6D55]'
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
