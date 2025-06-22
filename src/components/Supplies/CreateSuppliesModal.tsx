import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { X } from "lucide-react"
import { createSupply, getAllSuppliers, type Supplier } from "../../api/SuppliesAPI"

interface CreateSuppliesModalProps {
  onClose: () => void
  onCreated?: () => void
}

// 🎯 Zod schema para validar
const supplySchema = z.object({
  supplier: z.string().min(1, "El proveedor es requerido"),
  supplyName: z.string().min(1, "El nombre del insumo es requerido"),
  measure: z.string().min(1, "Selecciona una unidad de medida"),
  stock: z.number({ invalid_type_error: "Debe ser un número" }).min(1, "El stock debe ser mayor a 0"),
})

// 🧠 Inferimos el tipo
type SupplyFormData = z.infer<typeof supplySchema>

export default function CreateSuppliesModal({ onClose, onCreated }: CreateSuppliesModalProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SupplyFormData>({
    resolver: zodResolver(supplySchema),
  })

  useEffect(() => {
    async function fetchSuppliers() {
      const data = await getAllSuppliers()
      setSuppliers(data)
    }
    fetchSuppliers()
  }, [])

  const onSubmit = async (data: SupplyFormData) => {
    try {
      await createSupply(data)
      reset()
      if (onCreated) onCreated()
      onClose()
      toast.success("Insumo registrado exitosamente", {
      onClose: () => window.location.reload(),
      autoClose: 3000
    })
    } catch (err) {
      console.error(err)
      toast.error("Error al registrar el insumo")
    }
  }

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">REGISTRAR INSUMO</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Proveedor */}
            <div>
              <label className="block text-sm font-medium mb-1">Proveedor</label>
              <select
                {...register("supplier")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              >
                <option value="">Selecciona un proveedor</option>
                {suppliers.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.supplierName}
                  </option>
                ))}
              </select>
              {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier.message}</p>}
            </div>

            {/* Nombre del insumo */}
            <div>
              <label className="block text-sm font-medium mb-1">Nombre del insumo</label>
              <input
                type="text"
                {...register("supplyName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              {errors.supplyName && <p className="text-red-500 text-sm">{errors.supplyName.message}</p>}
            </div>

            {/* Gramaje */}
            <div>
              <label className="block text-sm font-medium mb-1">Stock (gramaje)</label>
              <input
                type="number"
                {...register("stock", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>
          </div>

          {/* Medida */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">Medida</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="litros"
                  {...register("measure")}
                  onClick={() => setValue("measure", "litros")}
                />
                <span>Litros</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="kilos"
                  {...register("measure")}
                  onClick={() => setValue("measure", "kilos")}
                />
                <span>Kilos</span>
              </label>
            </div>
            {errors.measure && <p className="text-red-500 text-sm mt-1">{errors.measure.message}</p>}
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-[#575B4F] text-white rounded-md hover:opacity-90">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
