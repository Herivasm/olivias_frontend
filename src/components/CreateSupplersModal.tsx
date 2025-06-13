import { X } from 'lucide-react';

interface CreateProviderModalProps {
  onClose: () => void;
}

export default function CreateProviderModal({ onClose }: CreateProviderModalProps) {
    
  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">REGISTRAR PROVEEDOR</h2>
          <button className="text-white hover:text-gray-300 transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del proveedor</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contacto</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
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
            <button className="px-4 py-2 bg-[#575B4F] text-white rounded-md hover:opacity-90 transition-colors">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
