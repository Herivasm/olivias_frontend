import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { X } from "lucide-react"
import { createSupplier } from "../../api/SuppliersAPI"

// --- MODIFICACIÓN 1: Renombrar 'onCreated' a 'onSuccess' por consistencia ---
interface CreateSuppliersModalProps {
  onClose: () => void
  onSuccess?: () => void
}

const supplierSchema = z.object({
  supplierName: z.string().min(1, "El nombre del proveedor es requerido"),
  contact: z.string().regex(/^\d{10}$/, "El número de teléfono debe tener 10 dígitos"),
})

type SupplierFormData = z.infer<typeof supplierSchema>

export default function CreateSuppliersModal({ onClose, onSuccess }: CreateSuppliersModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
  })

  const onSubmit = async (data: SupplierFormData) => {
    try {
      await createSupplier(data)
      
      // --- MODIFICACIÓN 2: Llamar a onSuccess y cerrar el modal ---
      if (onSuccess) onSuccess()
      onClose()
      
      // --- MODIFICACIÓN 3: Eliminar la recarga de la página ---
      toast.success("Proveedor registrado exitosamente")

    } catch (err) {
      console.error(err)
      toast.error("Error al registrar el proveedor")
    }
  }

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">REGISTRAR PROVEEDOR</h2>
          <button className="text-white hover:text-gray-300 transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del proveedor
              </label>
              <input
                type="text"
                {...register("supplierName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
              {errors.supplierName && (
                <p className="text-red-500 text-sm">{errors.supplierName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contacto (Teléfono)</label>
              <input
                type="tel"
                maxLength={10}
                placeholder="Ej: 1234567890"
                {...register("contact")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>
          </div>

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
    </div>
  )
}
