import { AlertTriangle, X } from 'lucide-react';
import { z } from 'zod';
import { dashboardOrderSchema } from '../../types';

// Se infiere el tipo de la orden para el dashboard directamente aquí
type DashboardOrder = z.infer<typeof dashboardOrderSchema>[number];

interface OrderDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  order: DashboardOrder;
  isLoading: boolean;
}

export default function OrderDeleteModal({ onClose, onConfirm, order, isLoading }: OrderDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Encabezado del Modal */}
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle size={20} />
            Confirmar Eliminación
          </h2>
          <button 
            className="text-white hover:text-gray-300 transition-colors" 
            onClick={onClose}
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ¿Estás seguro de eliminar esta orden?
            </h3>
            <div className="text-sm text-gray-500 space-y-1 bg-gray-50 p-3 rounded-md">
              <p><strong># Orden:</strong> <span className="font-mono">{order.orderNumber}</span></p>
              <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString('es-MX')}</p>
              <p><strong>Total:</strong> {order.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
            </div>
            <p className="text-red-600 text-sm mt-4 font-medium">
              Esta acción no se puede deshacer.
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}