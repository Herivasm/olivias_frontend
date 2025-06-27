

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { deleteProduct } from '../../api/ProductAPI';
import type { Product } from '../../types';
import { toast } from 'react-toastify';

interface ProductDeleteModalProps {
  onClose: () => void;
  product: Product;
  onSuccess: () => void;
}

export default function ProductDeleteModal({ onClose, product, onSuccess }: ProductDeleteModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const message = await deleteProduct(product._id);
      onSuccess();
      onClose();
      toast.success(message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* HEADER */}
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle size={20} />
            Confirmar Eliminación
          </h2>
          <button 
            className="text-white hover:text-gray-300" 
            onClick={onClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ¿Estás seguro de eliminar este producto?
            </h3>
            <div className="text-sm text-gray-500 space-y-2 bg-gray-50 p-4 rounded-md">
                <img 
                    src={product.photoUrl || 'https://via.placeholder.com/80'} 
                    alt={product.productName} 
                    className="w-20 h-20 rounded-md object-cover mx-auto" 
                />
                <p><strong>Nombre:</strong> {product.productName}</p>
            </div>
            <p className="text-red-600 text-sm mt-3 font-medium">
              Esta acción no se puede deshacer.
            </p>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}