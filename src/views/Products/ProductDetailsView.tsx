import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';



export default function ProductDetailsView() {
  return (
    <div className="bg-[#D9D9D9] rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto mt-10">
      {/* Header */}
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">DETALLE DEL PRODUCTO</h2>
        <Link
          to={'../'}>
        
        <button
          
          className="text-white hover:text-gray-300 transition-colors p-1"
          title="Volver"
        >
          <ArrowLeft size={20} />
        </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <span className="text-sm font-semibold text-gray-800 uppercase">
                NOMBRE: 
              </span>
              <span className="text-sm text-gray-800 ml-1">
                cafe
              </span>
            </div>

            {/* Category */}
            <div>
              <span className="text-sm font-semibold text-gray-800 uppercase">
                CATEGORÍA: 
              </span>
              <span className="text-sm text-gray-800 ml-1">
                Bebidas calientes
              </span>
            </div>

            {/* Price and Cost */}
            <div className="flex flex-wrap gap-8">
              <div>
                <span className="text-sm font-semibold text-gray-800 uppercase">
                  PRECIO($MX): 
                </span>
                <span className="text-sm text-gray-800 ml-1">
                  5000
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-800 uppercase">
                  COSTO($MX): 
                </span>
                <span className="text-sm text-gray-800 ml-1">
                  345
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase mb-3">
                DESCRIPCIÓN
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                este es un cafe bien cafe
              </p>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm">
              
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
                  alt=""
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


