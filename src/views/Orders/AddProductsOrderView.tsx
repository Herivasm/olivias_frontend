import { CheckSquare, Filter } from "lucide-react";

export default function AddProductsOrderView() {
    return (
        <div className="bg-[#5A5F4E] rounded-lg overflow-hidden shadow-lg max-w-5xl mx-auto mt-10 text-sm">
            {/* HEADER*/}
            <div className="flex items-center justify-between px-4 py-3 bg-[#5A5F4E] text-white">
                <h2 className="font-semibold text-base">Agregar productos a la orden</h2>
                <div className="space-x-2">
                    <button className="bg-[#5A5F4E] text-white border border-white px-4 py-1 rounded hover:bg-white hover:text-[#5A5F4E] transition">LISTO</button>
                    <button className="bg-white text-[#5A5F4E] border border-[#5A5F4E] px-4 py-1 rounded hover:bg-[#5A5F4E] hover:text-white transition">CANCELAR</button>
                </div>
            </div>

            {/* FFILTROS Y TODO ESO */}
            <div className="bg-[#5A5F4E] px-4 py-3">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        className="flex-1 px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                    />
                    <button className="bg-white text-gray-700 px-3 py-2 rounded hover:bg-gray-200">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            {/* ESTA ES LA TABLA */}
            <div className="bg-white rounded-b-lg overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead className="bg-[#F5F3E7] text-gray-800 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Producto</th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Categorías</th>
                            <th className="px-4 py-3">Precio($MX)</th>
                            <th className="px-4 py-3">Cantidad</th>
                            <th className="px-4 py-3">Agregar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
                                    alt="producto"
                                    className="w-10 h-10 rounded-lg object-cover"
                                />
                            </td>
                            <td className="px-4 py-3 text-gray-700">café chico</td>
                            <td className="px-4 py-3 text-gray-700">bebida</td>
                            <td className="px-4 py-3 text-gray-700">55</td>
                            <td className="px-4 py-3 text-gray-700">12</td>
                            <td className="px-4 py-3">
                                <CheckSquare className="text-[#5A5F4E]" size={18} />
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}