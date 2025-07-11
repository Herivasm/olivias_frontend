import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
    const { isAuthenticated, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return <p className="text-center text-2xl mt-10">Cargando...</p>;
    }

    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/auth/login" replace />;
}