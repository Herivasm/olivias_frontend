import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplierDetailsView() {
  return (
    <div className="bg-[#F9FAFB] rounded-xl shadow-md max-w-3xl mx-auto mt-12">
      {/* Header */}
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
        <h2 className="text-xl font-semibold tracking-wide">Detalle del proveedor</h2>
        <Link to={'../'}>
          <button
            className="text-white hover:text-gray-300 transition-colors p-1"
            title="Volver"
          >
            <ArrowLeft size={22} />
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Nombre */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
            Nombre:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            Juan Pérez Distribuciones S.A.
          </span>
        </div>

        {/* Contacto */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
            Contacto:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            +52 667 123 4567
          </span>
        </div>

        {/* Productos que provee */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-2">
            Insumos que provee:
          </span>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
            <li>Material de oficina</li>
            <li>Equipo de cómputo</li>
            <li>Artículos de limpieza</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
