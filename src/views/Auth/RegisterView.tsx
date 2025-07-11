import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema, type RegisterFormData } from "../../types";
import { registerUser } from "../../api/AuthAPI";

export default function RegisterView() {
    const navigate = useNavigate();
    const initialValues: RegisterFormData = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        defaultValues: initialValues,
        resolver: zodResolver(registerSchema)
    });

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(data);
            navigate('/auth/login');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleRegister = (formData: RegisterFormData) => mutation.mutate(formData);

    return (
        <div className="bg-[#414437] min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm p-8 space-y-6">
                <div className="flex justify-center">
                    <img src="/logo.png" alt="Logotipo" className="w-32" />
                </div>
                <h1 className="text-xl text-white font-semibold text-center">Crear una Cuenta</h1>
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="space-y-4"
                    noValidate
                >
                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none text-center"
                            {...register("name")}
                        />
                        {errors.name && <p className="text-red-400 text-xs text-center pt-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <input
                            type="email"
                            placeholder="Email de Registro"
                            className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none text-center"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-400 text-xs text-center pt-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none text-center"
                            {...register("password")}
                        />
                        {errors.password && <p className="text-red-400 text-xs text-center pt-1">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <input
                            type="password"
                            placeholder="Repetir Contraseña"
                            className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none text-center"
                            {...register("password_confirmation")}
                        />
                        {errors.password_confirmation && <p className="text-red-400 text-xs text-center pt-1">{errors.password_confirmation.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-[#505341] font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        Crear Cuenta
                    </button>
                </form>

                <nav className="text-center mt-6">
                    <p className="text-gray-300">¿Ya tienes cuenta? {''}</p>
                    <Link to={'/auth/login'} className="text-white hover:underline font-semibold">
                        Iniciar Sesión
                    </Link>
                </nav>
            </div>
        </div>
    );
}