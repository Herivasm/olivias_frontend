import { X } from 'lucide-react';


interface EditSuppliesModalProps {
  onClose: () => void;
  
}

export default function     EditSuppliesModal({ onClose }: EditSuppliesModalProps) {


  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">EDITAR INSUMO</h2>
          <button className="text-white hover:text-gray-300 transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Proveedor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proveedor</label>
              <select
                
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]">
                <option value="">Selecciona un proveedor</option>
               
               
              </select>
            </div>

            {/* Nombre del insumo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del insumo</label>
              <input
                type="text"
              
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
            </div>

            {/* Gramaje */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gramaje</label>
              <input
                type="text"
              
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
               
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
            </div>
          </div>

          {/* Medida */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Medida</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="medida"
                  value="litros"
                 
                  className="text-[#575B4F] focus:ring-[#575B4F]"
                />
                <span>Litros</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="medida"
                  value="kilos"
                 
                  className="text-[#575B4F] focus:ring-[#575B4F]"
                />
                <span>Kilos</span>
              </label>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-[#575B4F] text-white rounded-md hover:opacity-90 transition-colors"
              
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
