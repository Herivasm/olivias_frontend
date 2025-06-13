import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductDetailsView() {
  return (
    <div className="bg-[#F9FAFB] rounded-xl shadow-md max-w-5xl mx-auto mt-12">
      {/* Header */}
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
        <h2 className="text-xl font-semibold tracking-wide">DETALLE DEL PRODUCTO</h2>
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
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Product Info */}
        <div className="space-y-6">
          {/* Product Name */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
              Nombre:
            </span>
            <span className="text-lg text-gray-800 font-medium">
              Café
            </span>
          </div>

          {/* Category */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
              Categoría:
            </span>
            <span className="text-lg text-gray-800 font-medium">
              Bebidas calientes
            </span>
          </div>

          {/* Price and Cost */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
                Precio ($MX):
              </span>
              <span className="text-lg text-gray-800 font-medium">
                5000
              </span>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
                Costo ($MX):
              </span>
              <span className="text-lg text-gray-800 font-medium">
                345
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
              Descripción
            </span>
            <p className="text-base text-gray-700 leading-relaxed">
              Este es un café bien café
            </p>
          </div>
        </div>

        {/* Right Column - Product Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
              alt="Producto"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
