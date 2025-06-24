import { X, Upload, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ProductCategory, ProductFormData } from "../../types";

interface CreateProductModalProps {
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

export default function CreateProductModal({ onClose, onSubmit }: CreateProductModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* HEADER */}
        <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">REGISTRAR PRODUCTO</h2>
          <button
            type="button"
            className="text-white hover:text-gray-300 transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                {...register("productName", { required: "El nombre es obligatorio" })}
                className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none ${
                  errors.productName ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]`}
              />
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
              )}
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <div className="relative">
                <select
                  {...register("category", { required: "La categoría es obligatoria" })}
                  className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none appearance-none ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]`}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="hotDrinks">Bebidas calientes</option>
                  <option value="coldDrinks">Bebidas frías</option>
                  <option value="alcohol">Alcohol</option>
                  <option value="snacks">Snacks</option>
                  <option value="hamburguers">Hamburguesas</option>
                  <option value="baguettes">Baguettes</option>
                  <option value="sandwiches">Sándwiches</option>
                  <option value="desserts">Postres</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($MX)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "El precio es obligatorio",
                  valueAsNumber: true,
                  min: { value: 0.01, message: "El precio debe ser mayor a 0" },
                })}
                className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Costo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Costo ($MX)</label>
              <input
                type="number"
                step="0.01"
                {...register("cost", {
                  required: "El costo es obligatorio",
                  valueAsNumber: true,
                  min: { value: 0.01, message: "El costo debe ser mayor a 0" },
                })}
                className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none ${
                  errors.cost ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]`}
              />
              {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost.message}</p>}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                rows={4}
                {...register("description", { required: "La descripción es obligatoria" })}
                className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]`}
                placeholder="Describe el producto..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Right Column - Imagen */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del producto (URL)</label>
            <input
              type="url"
              {...register("photoUrl", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-\.\?\=\&\#]*)*\/?$/,
                  message: "Debe ser una URL válida",
                },
              })}
              placeholder="https://ejemplo.com/imagen.jpg"
              className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none ${
                errors.photoUrl ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]`}
            />
            {errors.photoUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.photoUrl.message}</p>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#575B4F] text-white rounded-md hover:opacity-90 transition-colors"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
