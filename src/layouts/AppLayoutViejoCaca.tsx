import { Link, Outlet, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Logo from "../components/Logo";
import { Home, Tag, Utensils, Truck, Package, Receipt, LogOut, User } from 'lucide-react';
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
    const { user, logout } = useAuth();

    return (
        <>
            <div className="flex h-screen">
                <aside className="bg-[#575B4F] text-white w-64 h-full flex flex-col justify-between">
                    <div>
                        <div className="p-6">
                            <Link to={'/'}>
                                <Logo />
                            </Link>
                        </div>

                        <nav className="flex flex-col gap-2 px-4">

                            <NavItem icon={<Tag size={18} />} label="Productos" to="/" />
                            <NavItem icon={<Utensils size={18} />} label="Órdenes" to="/orders" />
                            <NavItem icon={<Truck size={18} />} label="Proveedores" to="/suppliers" />
                            <NavItem icon={<Package size={18} />} label="Insumos" to="/supplies" />
                            <NavItem icon={<Receipt size={18} />} label="Corte de caja" to="/cash-closing" />
                        </nav>
                    </div>

                    <div className="bg-[#F1EFDD] text-[#505341] px-4 py-6 text-sm space-y-2">
                        <button type="button"
                            className="flex items-center gap-2 hover:underline cursor-pointer"
                            onClick={logout}
                        >
                            <LogOut size={16} />
                            Cerrar sesión
                        </button>
                    </div>
                </aside>

                {/* Área principal con header y contenido */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-[#575B4F] text-white px-6 py-4 flex justify-between items-center shadow-sm h-16">
                        <div className="flex items-center">

                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {/* <div className="w-8 h-8 bg-[#8B9475] rounded-full flex items-center justify-center">
                                <User size={16} />
                            </div>
                            <span className="text-sm">Fulanito de tal</span> */}
                            </div>
                        </div>
                    </header>

                    {/* Contenido principal */}
                    <main className="flex-1 overflow-y-auto bg-gray-50">
                        <Outlet />
                    </main>
                </div>

                <ToastContainer />
            </div>
        </>
    )
}
function NavItem({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition 
                ${isActive ? 'bg-[#929471] text-[#222]' : 'hover:bg-[#6A6D55] text-white'}`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
}
