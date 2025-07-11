// En: src/context/AuthContext.tsx

import { createContext, useContext, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "../api/AuthAPI";
import type { User } from "../types";

type AuthContextProps = {
    user: User | undefined; // Ahora puede ser undefined mientras carga
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // El estado del usuario ahora es manejado directamente por React Query
    const { data: user, isError, isLoading: isAuthLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getAuthenticatedUser,
        enabled: !!localStorage.getItem('AUTH_TOKEN'),
        retry: 1,
        // Evita que se re-intente la consulta constantemente en caso de error 401
        // y que se vuelva a pedir al cambiar de pestaña
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
    
    // isAuthenticated ahora se deriva directamente del resultado de la consulta
    const isAuthenticated = !!user;

    const logout = useCallback(() => {
        localStorage.removeItem('AUTH_TOKEN');
        queryClient.invalidateQueries({ queryKey: ['user']}); // Invalida en lugar de limpiar todo
        navigate('/auth/login');
    }, [navigate, queryClient]);
    
    // Si el token es inválido (isError), la data será undefined y isAuthenticated será false,
    // lo que provocará la redirección en ProtectedRoute.
    // Opcionalmente, puedes borrar el token aquí si hay un error
    if(isError) {
        localStorage.removeItem('AUTH_TOKEN');
    }

    const authContextValue: AuthContextProps = {
        user,
        isAuthenticated,
        isAuthLoading,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};