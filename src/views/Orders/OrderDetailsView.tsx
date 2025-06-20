import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderDeailsView() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-6xl mx-auto mt-10 border border-gray-300">
            {/* HEADER */}
            <div className="bg-[#575B4F] text-white px-8 py-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold uppercase tracking-wide">Detalle de la orden</h2>
                <Link to={'../orders'}>
                    <button
                        className="text-white hover:text-gray-300 transition-colors p-1"
                        title="Volver"
                    >
                        <ArrowLeft size={22} />
                    </button>
                </Link>
            </div>

            <div className="p-8 space-y-6">
                {/* INFO ORDEN */}
                <p className="text-base font-semibold text-gray-800 uppercase">
                    Número de orden:
                    <span className="font-normal normal-case ml-2 text-gray-700">orden 1</span>
                </p>

                {/* TABLA */}
                <div className="overflow-x-auto border-[2px] border-black rounded-lg bg-white shadow">
                    <table className="w-full text-sm text-left text-gray-800">
                        
                        <thead className="bg-[#f3f2ea] text-gray-800 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Producto</th>
                                <th className="px-6 py-3">Tipo de pago</th>
                                <th className="px-6 py-3">Cantidad</th>
                                <th className="px-6 py-3">Categoría</th>
                                <th className="px-6 py-3">Costo (MX)</th>
                                <th className="px-6 py-3">Fecha creación</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* DATOS */}
                            <tr>
                                <td className="px-6 py-4 text-center">Producto</td>
                                <td className="px-6 py-4 text-center">Efectivo</td>
                                <td className="px-6 py-4 text-center">24</td>
                                <td className="px-6 py-4 text-center">Bebidas calientes</td>
                                <td className="px-6 py-4 text-center">$345</td>
                                <td className="px-6 py-4 text-center">Una fecha</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* TOTAL */}
                <div className="text-right pt-4">
                    <span className="text-base font-semibold text-gray-800 uppercase">
                        Costo total de la orden (MX):{' '}
                    </span>
                    <span className="text-base font-bold text-green-700">$100</span>
                </div>
            </div>
        </div>
    );
}
