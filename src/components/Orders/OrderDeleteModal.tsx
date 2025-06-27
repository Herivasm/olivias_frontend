// src/components/Orders/OrderDeleteModal.tsx (Corregido sin tocar types)

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod'; // <-- 1. Importar Zod
import { deleteOrder } from '../../api/OrderAPI';
import { dashboardOrderSchema } from '../../types'; // <-- 2. Importar el schema
import { toast } from 'react-toastify';

// 3. Inferir el tipo localmente
type DashboardOrder = z.infer<typeof dashboardOrderSchema>[number];

interface OrderDeleteModalProps {
  onClose: () => void;
  order: DashboardOrder; // <-- 4. Usar el tipo local
  onSuccess: () => void;
}

export default function OrderDeleteModal({ onClose, order, onSuccess }: OrderDeleteModalProps) {
  // ... el resto del componente no cambia ...
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const data = await deleteOrder(order._id);
      onSuccess();
      onClose();
      toast.success(data.message || 'Orden eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
      toast.error('Error al eliminar la orden');
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
            CONFIRMAR ELIMINACIÓN
          </h2>
          <button 
            className="text-white hover:text-gray-300 transition-colors" 
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
              ¿Estás seguro de eliminar esta orden?
            </h3>
            {/* Mostrar detalles de la orden */}
            <div className="text-sm text-gray-500 space-y-1">
              <p><strong># Orden:</strong> {order.orderNumber}</p>
              <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString('es-MX')}</p>
              <p><strong>Total:</strong> {order.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
            </div>
            <p className="text-red-600 text-sm mt-3 font-medium">
              Esta acción no se puede deshacer
            </p>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
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

