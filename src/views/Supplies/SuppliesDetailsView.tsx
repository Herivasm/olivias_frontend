import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplyDetailsView() {
  return (
    <div className="bg-[#F9FAFB] rounded-xl shadow-md max-w-5xl mx-auto mt-12">
      {/* Header */}
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
        <h2 className="text-xl font-semibold tracking-wide">Detalle del insumo</h2>
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
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase uppercase block mb-1">
            Nombre del insumo:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            Harina de trigo
          </span>
        </div>

        {/* Proveedor */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase uppercase block mb-1">
            Proveedor:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            Molinos del Norte S.A.
          </span>
        </div>

        {/* Gramaje */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase uppercase block mb-1">
            Gramaje:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            500g
          </span>
        </div>

        {/* Stock */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <span className="text-sm font-bold text-gray-500 uppercase uppercase block mb-1">
            Stock:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            120 unidades
          </span>
        </div>

        {/* Medida */}
        <div className="bg-white border rounded-lg p-4 shadow-sm md:col-span-2">
          <span className="text-sm font-bold text-gray-500 uppercase uppercase block mb-1">
            Medida:
          </span>
          <span className="text-lg text-gray-800 font-medium">
            Kilos
          </span>
        </div>
      </div>
    </div>
  );
}
