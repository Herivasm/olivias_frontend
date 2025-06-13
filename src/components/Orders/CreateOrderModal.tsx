import React, { useState } from 'react';
import { X, Plus, Trash2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreateOrderModalProps {
    onClose: () => void;
}

export default function CreateOrderModal({ onClose }: CreateOrderModalProps) {

    return (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
            <div className="bg-[#D9D9D9] w-[95%] max-w-2xl rounded-md shadow-lg overflow-hidden">
                {/* ESTE ES EL HEADER */}
                <div className="bg-[#575B4F] text-white px-6 py-4 text-lg font-semibold">
                    REGISTRAR ORDEN
                </div>

                <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h2 className="font-bold text-lg">
                            ORDEN NUMERO:<span className="font-normal">100</span>
                        </h2>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <select className="px-3 py-2 rounded-md bg-white border border-gray-300 shadow-sm text-sm">
                                <option>Tipo de pago</option>
                                <option>Efectivo</option>
                                <option>Tarjeta</option>
                            </select>
                            <Link to="/orders/category">
                            <button className="bg-[#8A8D81] text-white px-4 py-2 rounded-md text-sm hover:bg-[#777a6f] transition"
                            
                            >
                                Agregar productos
                                <Plus size={16}  />
                            </button>

                            </Link>
                        </div>
                    </div>

                    {/* ESTA ES LA TABLA */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-[#F2EEDC] text-gray-600">
                                <tr>
                                    <th className="px-4 py-2">PRODUCTO</th>
                                    <th className="px-4 py-2">CANTIDAD</th>
                                    <th className="px-4 py-2">PRECIO(MX)</th>
                                    <th className="px-4 py-2">ELIMINAR</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="border-t">
                                    <td className="px-4 py-2">Producto 1</td>
                                    <td className="px-4 py-2">20</td>
                                    <td className="px-4 py-2">Precio</td>
                                    <td className="px-4 py-2">
                                        <button className="bg-[#A44D4D] hover:bg-red-700 text-white px-3 py-1 pl-6 pr-6 rounded">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* AQUI SE MUESTRA EL TOTAL */}
                    <div className="mt-4 font-semibold text-lg">
                        El precio total a pagar es: <span className="font-bold">$100</span>
                    </div>

                    {/* ESTOS SON LOS BOTONES */}
                    <div className="mt-6 flex justify-end gap-4">
                        <button className="bg-[#A44D4D] hover:bg-red-700 text-white px-4 py-2 rounded"
                        
                            onClick={onClose}
                            >
                            CANCELAR
                        </button>
                        <button className="bg-[#575B4F] hover:bg-[#43463c] text-white px-4 py-2 rounded">
                            GUARDAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}