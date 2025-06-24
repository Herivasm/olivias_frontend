import { X, Upload, ChevronDown } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Product, ProductCategory, ProductFormData } from "../../types";
import { updateProduct } from "../../api/ProductAPI";

interface EditProductModalProps {
    onClose: () => void;
    product: Product;
}

const categories: { value: ProductCategory; label: string }[] = [
    { value: "hotDrinks", label: "Bebidas calientes" },
    { value: "coldDrinks", label: "Bebidas frías" },
    { value: "alcohol", label: "Alcohol" },
    { value: "snacks", label: "Snacks" },
    { value: "hamburguers", label: "Hamburguesas" },
    { value: "baguettes", label: "Baguettes" },
    { value: "sandwiches", label: "Sándwiches" },
    { value: "desserts", label: "Postres" },
];

export default function EditProductModal({ onClose, product }: EditProductModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
        defaultValues: {
            productName: product.productName,
            price: product.price,
            cost: product.cost,
            description: product.description,
            category: product.category,
            photoUrl: product.photoUrl ?? ""
        }
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData: ProductFormData) => updateProduct({ formData, productId: product._id }),
        onSuccess: () => {
            toast.success("Producto actualizado");
            onClose();
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const onSubmit = handleSubmit((formData) => {
        mutate(formData);
    });

    return (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Editar Producto</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nombre</label>
                                <input
                                    {...register("productName", { required: true })}
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#575B4F]"
                                />
                                {errors.productName && <span className="text-red-500 text-sm">Requerido</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Categoría</label>
                                <div className="relative">
                                    <select
                                        {...register("category", { required: true })}
                                        className="w-full px-3 py-2 border rounded-md bg-gray-50 appearance-none focus:ring-2 focus:ring-[#575B4F]"
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Precio ($MX)</label>
                                <input
                                    {...register("price", { required: true, valueAsNumber: true })}
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#575B4F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Costo ($MX)</label>
                                <input
                                    {...register("cost", { required: true, valueAsNumber: true })}
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#575B4F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Descripción</label>
                                <textarea
                                    {...register("description", { required: true })}
                                    rows={4}
                                    className="w-full px-3 py-2 border rounded-md bg-gray-50 resize-none focus:ring-2 focus:ring-[#575B4F]"
                                    placeholder="Describe el producto..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">URL de imagen</label>
                                <input
                                    {...register("photoUrl")}
                                    type="url"
                                    placeholder="https://example.com/imagen.jpg"
                                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#575B4F]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vista previa</label>
                            <div className="w-full border border-gray-300 rounded-md p-4 h-[300px] flex justify-center items-center bg-gray-100">
                                {product.photoUrl ? (
                                    <img src={product.photoUrl} alt="Producto" className="max-h-full object-contain" />
                                ) : (
                                    <div className="text-gray-400 text-center text-sm">
                                        <Upload size={48} className="mx-auto mb-2" />
                                        No hay imagen disponible
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-full flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-[#575B4F] text-white rounded-md hover:opacity-90"
                            >
                                {isLoading ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
