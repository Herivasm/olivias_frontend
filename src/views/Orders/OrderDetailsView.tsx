import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderDeailsView() {
    return (
        <div className="bg-[#D9D9D9] rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto mt-10">
            {/* HEADER*/}
            <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold uppercase">Detalle de la orden</h2>
                <Link to={'../orders'}>
                    <button
                        className="text-white hover:text-gray-300 transition-colors p-1"
                        title="Volver"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </Link>
            </div>

            
            <div className="p-6">
                <p className="text-sm font-semibold text-gray-800 uppercase mb-4">
                    Número de orden: <span className="normal-case font-normal ml-1">orden 1</span>
                </p>

                {/* ESTA ES LA TABLA*/}
                <div className="overflow-x-auto border rounded-lg bg-white shadow">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-[#f5f3e7] text-gray-800 uppercase">
                            <tr>
                                <th className="px-4 py-2">Producto</th>
                                <th className="px-4 py-2">Tipo de pago</th>
                                <th className="px-4 py-2">Cantidad</th>
                                <th className="px-4 py-2">Categoría</th>
                                <th className="px-4 py-2">Costo (MX)</th>
                                <th className="px-4 py-2">Fecha creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* AQUI VAN LOS DATOS DE LA TABLA */}
                            <tr>
                                <td className="text-center py-6">
                                    Producto
                                </td>
                                <td className="text-center py-6">
                                    Efectivo
                                </td>
                                <td className="text-center py-6">
                                    24
                                </td>
                                <td className="text-center py-6">
                                    bebidas calientes
                                </td>
                                <td className="text-center py-6">
                                    345
                                </td>
                                <td className="text-center py-6">
                                    una fecha
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ESTE ES EL COSTO TOTAL */}
                <div className="mt-6 text-right">
                    <span className="text-sm font-semibold text-gray-800 uppercase">
                        Costo total de la orden (MX):{' '}
                    </span>
                    <span className="text-sm font-bold text-gray-900">100</span>
                </div>
            </div>
        </div>
    );
}