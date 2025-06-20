import { X, Upload, ChevronDown } from 'lucide-react';

interface EditProductModalProps {
    onClose: () => void;
}
export default function EditProductModal({ onClose }: EditProductModalProps) {


    return (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* ESTE ES EL HEADER */}
                <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Editar Producto</h2>
                    <button className="text-white hover:text-gray-300 transition-colors"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* ESTE ES EL CONTENIDO DEL MODAL */}
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
                                />
                            </div>

                            {/* Categoría */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoría
                                </label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F] appearance-none">
                                        <option value="">Seleccionar categoría</option>
                                        <option value="bebidas">Bebidas</option>
                                        <option value="comida">Comida</option>
                                        <option value="postres">Postres</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Precio($MX)
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Costo($MX)
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F] resize-none"
                                    placeholder="Describe el producto..."
                                />
                            </div>
                        </div>

                        {/* ESTA ES LA PARTE DONDE SE SUBE LA IMAGEN */}
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Imagen del producto
                            </label>
                            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 hover:border-gray-400 transition-colors min-h-[300px]">
                                <Upload className="text-gray-400 mb-2" size={32} />
                                <span className="text-gray-500 text-sm text-center">
                                    Añadir imagen
                                </span>
                                <span className="text-gray-400 text-xs text-center mt-1">
                                    Haz clic o arrastra una imagen aquí
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button className="px-4 py-2 bg-[#575B4F] text-white rounded-md hover:opacity-90 transition-colors">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}