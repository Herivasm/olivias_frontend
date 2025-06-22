import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreateOrderModalProps {
    onClose: () => void;
}

export default function CreateOrderModal({ onClose }: CreateOrderModalProps) {
    return (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
            <div className="bg-[#F9F9F9] w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden border border-gray-300">
                {/* Header */}
                <div className="bg-[#575B4F] text-white px-8 py-5 text-xl font-semibold">
                    Registrar órden
                </div>

                <div className="p-6 space-y-6">
                    {/* Orden y Tipo de pago */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="font-bold text-lg">
                            Órden número: <span className="font-normal">100</span>
                        </h2>
                        <div className="flex gap-3 mt-4 sm:mt-0 flex-wrap">
                            <select className="px-4 py-2 rounded-md bg-white border border-gray-300 shadow-sm text-sm w-40">
                                <option>Tipo de pago</option>
                                <option>Efectivo</option>
                                <option>Transferencia</option>
                            </select>
                            <Link to="/orders/category">
                                <button className="flex items-center gap-1 bg-[#8A8D81] text-white px-4 py-2 rounded-md text-sm hover:bg-[#777a6f] transition">
                                    Agregar productos
                                    <Plus size={16} />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Tabla de productos */}
                    <div className="overflow-x-auto rounded-lg border border-gray-300">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#F2EEDC] text-gray-700 uppercase">
                                <tr>
                                    <th className="px-6 py-3">Producto</th>
                                    <th className="px-6 py-3">Cantidad</th>
                                    <th className="px-6 py-3">Precio (MX)</th>
                                    <th className="px-6 py-3 text-center">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4">Producto 1</td>
                                    <td className="px-6 py-4">20</td>
                                    <td className="px-6 py-4">$100</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="bg-[#A44D4D] hover:bg-red-700 text-white px-3 py-2 rounded-md">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Total a pagar */}
                    <div className="text-lg font-semibold text-right">
                        Total a pagar: <span className="text-green-700 font-bold">$100</span>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            className="bg-[#A44D4D] hover:bg-red-700 text-white px-5 py-2 rounded-md"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button className="bg-[#575B4F] hover:bg-[#43463c] text-white px-5 py-2 rounded-md">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
