import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Logo from "../components/Logo";
import { Home, Tag, Utensils, Truck, Package, Receipt, LogOut, User } from 'lucide-react';

export default function AppLayout() {
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
                        <NavItem icon={<Home size={18} />} label="Inicio" />
                        <NavItem icon={<Tag size={18} />} label="Productos" active />
                        <NavItem icon={<Utensils size={18} />} label="Órdenes" />
                        <NavItem icon={<Truck size={18} />} label="Proveedores" />
                        <NavItem icon={<Package size={18} />} label="Insumos" />
                        <NavItem icon={<Receipt size={18} />} label="Corte de caja" />
                    </nav>
                </div>

                <div className="bg-[#F1EFDD] text-[#505341] px-4 py-6 text-sm space-y-2">
                    <button className="flex items-center gap-2 hover:underline">
                        <LogOut size={16} />
                        Cerrar sesión
                    </button>
                    <button className="flex items-center gap-2 hover:underline">
                        <User size={16} />
                        Mi cuenta
                    </button>
                </div>
            </aside>

            {/* Área principal con header y contenido */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-[#575B4F] text-white px-6 py-4 flex justify-between items-center shadow-sm">
                    <div className="flex items-center">

                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#8B9475] rounded-full flex items-center justify-center">
                                <User size={16} />
                            </div>
                            <span className="text-sm">Fulanito de tal</span>
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
