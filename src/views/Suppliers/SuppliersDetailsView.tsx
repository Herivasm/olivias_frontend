import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSupplierById, type Supplier } from '../../api/SuppliersAPI';

export default function SupplierDetailsView() {
  
  const {id} = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (!id) return
  
      async function fetchSupplier() {
        try {
          setLoading(true);
          const data = await getSupplierById(id as string);
          console.log('Datos recibidos del proveedor:', data);
          console.log('Insumos del proveedor:', data.supplies);
          setSupplier(data);
        } catch (error) {
          console.error('Error al obtener el proveedor:', error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchSupplier();
    }, [id])
  
    if (loading) {
      return <div className="p-6 text-gray-600">Cargando proveedor...</div>
    }

    if (!supplier) {
      return <div className="p-6 text-red-600">Error al cargar el proveedor</div>
    }

  return (
    <div className="bg-[#F9FAFB] rounded-xl shadow-md max-w-3xl mx-auto mt-12">
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
        <h2 className="text-xl font-semibold tracking-wide">Detalle del proveedor</h2>
        <Link to={'../suppliers'}>
          <button
            className="text-white hover:text-gray-300 transition-colors p-1"
            title="Volver"
          >
            <ArrowLeft size={22} />
          </button>
        </Link>
      </div>

      <div className="p-8 space-y-6">
        {/* Nombre */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
            Nombre:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            {supplier.supplierName}
          </span>
        </div>

        {/* Contacto */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
            Contacto:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            {supplier.contact || 'No disponible'}
          </span>
        </div>

        {/* Insumos que provee */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-2">
            Insumos que provee:
          </span>
          {supplier.supplies && supplier.supplies.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              {supplier.supplies.map((supply) => (
                <li key={supply._id}>{supply.supplyName}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Este proveedor no tiene insumos asignados
            </p>
          )}
        </div>
      </div>
    </div>
  );
}