import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/ProductAPI";
import { Link } from "react-router-dom";

export default function DashboardView() {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isLoading) return <p className="text-center text-lg">Cargando...</p>;

    return (
        <>
            <section className="p-6 bg-[#f2f4f1] min-h-screen">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-black text-gray-800">Lista de productos</h1>
                    <Link
                        to="/products/create"
                        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg flex items-center gap-2"
                    >
                        Registrar producto <span className="text-xl">＋</span>
                    </Link>
                </div>

                <div className="bg-[#3e443c] p-5 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="🔍 Buscar producto..."
                            className="w-1/2 p-2 rounded-md"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-separate border-spacing-y-2">
                        <thead className="text-left bg-[#eae9dc] text-gray-800">
                            <tr>
                                <th className="p-3"><input type="checkbox" /></th>
                                <th className="p-3">Imagen</th>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Categoría</th>
                                <th className="p-3">Precio ($MXN)</th>
                                <th className="p-3">Detalle</th>
                                <th className="p-3">Editar</th>
                                <th className="p-3">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">

                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
