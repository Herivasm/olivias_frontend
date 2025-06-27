import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productCategorySchema,
  type Product,
  type ProductFormData,
  productFormDataSchema,
} from "../../types";
import { ChevronDown, Upload } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

const categoryTranslations: {
  [key in typeof productCategorySchema.options[number]]: string;
} = {
  hotDrinks: "Bebidas Calientes",
  coldDrinks: "Bebidas Frías",
  alcohol: "Alcohol",
  snacks: "Snacks",
  hamburguers: "Hamburguesas",
  baguettes: "Baguettes",
  sandwiches: "Sándwiches",
  desserts: "Postres",
};

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: Product;
  isSubmitting: boolean;
}

export default function ProductForm({
  onSubmit,
  initialData,
  isSubmitting,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormDataSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          photoUrl: initialData.photoUrl || "",
        }
      : {},
  });

  const inputClass =
    "w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#575B4F]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input type="text" {...register("productName")} className={inputClass} />
            {errors.productName && (
              <ErrorMessage>{errors.productName.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <div className="relative">
              <select {...register("category")} className={`${inputClass} appearance-none`}>
                <option value="">-- Seleccione una Categoría --</option>
                {productCategorySchema.options.map((categoryValue) => (
                  <option key={categoryValue} value={categoryValue}>
                    {categoryTranslations[categoryValue]}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
            {errors.category && (
              <ErrorMessage>{errors.category.message}</ErrorMessage>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio ($MX)
              </label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className={inputClass}
              />
              {errors.price && (
                <ErrorMessage>{errors.price.message}</ErrorMessage>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Costo ($MX)
              </label>
              <input
                type="number"
                {...register("cost", { valueAsNumber: true })}
                className={inputClass}
              />
              {errors.cost && (
                <ErrorMessage>{errors.cost.message}</ErrorMessage>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              rows={4}
              {...register("description")}
              className={`${inputClass} resize-none`}
            />
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </div>
        </div>

        {/* Columna de Imagen */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen del producto (URL)
          </label>
          <input
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            {...register("photoUrl")}
            className={`${inputClass} mb-4`}
          />
          {errors.photoUrl && (
            <ErrorMessage>{errors.photoUrl.message}</ErrorMessage>
          )}

          <div className="flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center">
            <Upload className="text-gray-400 mb-2" size={32} />
            <span className="text-gray-500 text-sm">
              Previsualización de la imagen
            </span>
            <span className="text-gray-400 text-xs mt-1">
              Aparecerá aquí al pegar una URL válida.
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? "Guardando..." : "Guardar Producto"}
        </button>
      </div>
    </form>
  );
}
