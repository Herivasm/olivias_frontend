import { DollarSign, Wallet, CreditCard } from 'lucide-react';

export default function CajaView() {
    return (
        <div className="flex min-h-screen">
            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-1 p-6 bg-[#f4f5f5]">
                <div className="text-xl font-bold text-[#505341] mb-6">Corte de caja</div>

                {/* ENCABEZADO DE TOTALES */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="bg-[#575B4F] text-white px-6 py-3 rounded-md shadow-md flex items-center gap-2">
                        <DollarSign size={18} /> TOTAL DEL DÍA: $5,730.00
                    </div>
                    <div className="bg-[#575B4F] text-white px-6 py-3 rounded-md shadow-md flex items-center gap-2">
                        <Wallet size={18} /> EFECTIVO: $3,200.00
                    </div>
                    <div className="bg-[#575B4F] text-white px-6 py-3 rounded-md shadow-md flex items-center gap-2">
                        <CreditCard size={18} /> TRANSFERENCIA: $2,200.00
                    </div>
                </div>

                {/* TABLA DE HISTORIAL */}
                <div className="bg-[#575B4F] p-4 rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm bg-[#f3f1dd] rounded-md overflow-hidden">
                            <thead className="text-left font-semibold">
                                <tr>
                                    <th className="p-3">Orden</th>
                                    <th className="p-3">Fecha</th>
                                    <th className="p-3">Tipo de pago</th>
                                    <th className="p-3">Total ($MXN)</th>
                                    <th className="p-3">Detalle de la orden</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-[#333]">
                                {/* FILA DE EJEMPLO */}
                                <tr className="border-t">
                                    <td className="p-3">00123</td>
                                    <td className="p-3">2025-06-18</td>
                                    <td className="p-3">Efectivo</td>
                                    <td className="p-3">$250.00</td>
                                    <td className="p-3">
                                        <button className="bg-[#505341] text-white px-3 py-1 rounded-md">
                                            Ver detalle
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
