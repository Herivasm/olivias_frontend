import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "../../types";
import { loginUser } from "../../api/AuthAPI";

export default function LoginView() {
    const navigate = useNavigate();
    const initialValues: LoginFormData = { email: '', password: '' };

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(loginSchema)
    });

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleLogin = (formData: LoginFormData) => mutation.mutate(formData);

    return (
        <div className="bg-[#414437] min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm p-8 space-y-6">
                <div className="flex justify-center">
                    <img src="/logo.png" alt="Logotipo" className="w-32" />
                </div>
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="space-y-6"
                    noValidate
                >
                    <div className="space-y-2">
                        <input
                            type="email"
                            placeholder="Correo"
                            className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none text-center"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-400 text-xs text-center">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none text-center"
                            {...register("password")}
                        />
                        {errors.password && <p className="text-red-400 text-xs text-center">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-[#505341] font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <nav className="text-center mt-6">
                    <p className="text-gray-300">¿No tienes cuenta? {''}</p>
                    <Link to={'/auth/register'} className="text-white hover:underline font-semibold">
                        Registrarse
                    </Link>
                </nav>
            </div>
        </div>
    );
}