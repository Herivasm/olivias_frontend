import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplierDetailsView() {
  return (
    <div className="bg-[#D9D9D9] rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto mt-10">
      {/* Header */}
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">DETALLE DEL PROVEEDOR</h2>
        <Link to={'../'}>
          <button
            className="text-white hover:text-gray-300 transition-colors p-1"
            title="Volver"
          >
            <ArrowLeft size={20} />
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Nombre */}
        <div>
          <span className="text-sm font-semibold text-gray-800 uppercase">
            NOMBRE:
          </span>
          <span className="text-sm text-gray-800 ml-1">
            Juan Pérez Distribuciones S.A.
          </span>
        </div>

        {/* Contacto */}
        <div>
          <span className="text-sm font-semibold text-gray-800 uppercase">
            CONTACTO:
          </span>
          <span className="text-sm text-gray-800 ml-1">
            +52 667 123 4567
          </span>
        </div>

        {/* Productos que provee */}
        <div>
          <span className="text-sm font-semibold text-gray-800 uppercase">
            INSUMOS QUE PROVEE:
          </span>
          <ul className="list-disc list-inside ml-4 text-sm text-gray-800">
            <li>Material de oficina</li>
            <li>Equipo de cómputo</li>
            <li>Artículos de limpieza</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
