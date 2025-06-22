import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSupplyById, type Supply } from '../../api/SuppliesAPI'
import { ArrowLeft } from 'lucide-react'

export default function SupplyDetailsView() {
  const { id } = useParams()
  const [supply, setSupply] = useState<Supply | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchSupply() {
      try {
        const data = await getSupplyById(id as string)
        setSupply(data)
      } catch (error) {
        console.error('Error al obtener el insumo:', error)
      }
    }

    fetchSupply()
  }, [id])

  if (!supply) {
    return <div className="p-6 text-gray-600">Cargando insumo...</div>
  }

  return (
    <div className="bg-[#F9FAFB] rounded-xl shadow-md max-w-5xl mx-auto mt-12">
      {/* Header */}
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
        <h2 className="text-xl font-semibold tracking-wide">Detalle del insumo</h2>
        <Link to={'/supplies'}>
          <button
            className="text-white hover:text-gray-300 transition-colors p-1"
            title="Volver"
          >
            <ArrowLeft size={22} />
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard label="Nombre del insumo" value={supply.supplyName} />
        <InfoCard label="Proveedor" value={supply.supplier?.supplierName ?? 'Sin proveedor'} />
        <InfoCard label="Gramaje" value={`${supply.stock} unidades`} />
        <InfoCard label="Stock" value={supply.stock.toString()} />
        <InfoCard label="Medida" value={supply.measure} />
      </div>
    </div>
  )
}

function InfoCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <span className="text-sm font-bold text-gray-500 uppercase block mb-1">{label}:</span>
      <span className="text-lg text-gray-800 font-medium">{value}</span>
    </div>
  )
}
