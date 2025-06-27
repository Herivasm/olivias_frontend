// OrdersListView.tsx (Código completo y final)

import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from 'zod';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';

import { getOrders } from "../../api/OrderAPI"; 
import { dashboardOrderSchema } from "../../types";
import CreateOrderModal from "../../components/Orders/CreateOrderModal";
import EditOrderModal from "../../components/Orders/EditOrderModal";
import OrdersFilters from "../../components/Orders/OrdersFilters";
import PaginationControls from "../../components/PaginationControls";
import { useOrdersFilters } from "../../components/Orders/useOrdersFilters";
import { usePagination } from "../../components/usePagination";
import OrderDeleteModal from "../../components/Orders/OrderDeleteModal";

// Inferir el tipo localmente a partir del schema importado
type DashboardOrder = z.infer<typeof dashboardOrderSchema>[number];

// Etiquetas para mostrar en la UI
const paymentMethodLabels: { [key: string]: string } = {
    cash: 'Efectivo',
    transaction: 'Transferencia'
};
const statusLabels: { [key:string]: string } = {
    pending: 'Pendiente',
    paid: 'Pagada'
};
const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800'
};

export default function OrdersListView() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
    const [orderToDelete, setOrderToDelete] = useState<DashboardOrder | null>(null);

    const queryClient = useQueryClient();

    // Obtención de datos con React Query
    const { data: orders, isLoading, isError, error } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });
    
    // Hook de paginación
    const pagination = usePagination( [], { itemsPerPage: 10 });
    
    // Hook de filtros, conectado a la paginación para reiniciarla
    const { 
      filteredOrders, 
      clearFilters,
      ...filterProps 
    } = useOrdersFilters(orders || [], pagination.resetPagination);
    
    // Paginación aplicada a los resultados ya filtrados
    const { paginatedItems, ...paginationProps } = usePagination(filteredOrders, { itemsPerPage: 10 });

    if (isLoading) return <p className="text-center text-2xl font-bold mt-10">Cargando Órdenes...</p>;
    if (isError) return <p className="text-center text-red-600 text-2xl font-bold mt-10">Error: {error.message}</p>;

   return (
    <>
      <div className="flex-1 p-6 bg-[#f4f5f5]">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#505341]">Administrador de Órdenes</h1>
          <button
            className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Registrar Orden</span>
          </button>
        </header>

        <div className="bg-[#575B4F] rounded-md shadow-md p-4">
          <OrdersFilters 
            {...filterProps} 
            onClearFilters={clearFilters}
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-md overflow-hidden border border-gray-200">
              <thead className="text-left font-semibold bg-[#f3f1dd] text-gray-700">
                <tr>
                  <th className="p-3"># Orden</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Método de Pago</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-[#333]">
                {paginatedItems.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500">
                            {orders && orders.length > 0
                                ? "No se encontraron órdenes que coincidan con la búsqueda"
                                : "No hay órdenes registradas todavía"
                            }
                        </td>
                    </tr>
                ) : (
                    paginatedItems.map(order => (
                      <tr key={order._id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-mono text-blue-600 hover:underline">
                          <Link to={`/orders/${order._id}`}>
                            {order.orderNumber}
                          </Link>
                        </td>
                        <td className="p-3">{new Date(order.createdAt).toLocaleDateString('es-MX')}</td>
                        <td className="p-3 font-medium text-gray-900">{order.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                        <td className="p-3">{paymentMethodLabels[order.paymentMethod] || order.paymentMethod}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                            {statusLabels[order.status] || order.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center items-center gap-2">
                            <Link to={`/orders/${order._id}`} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md" title="Ver Detalles">
                              <Eye size={16} />
                            </Link>
                            <button onClick={() => setEditingOrderId(order._id)} className="bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded-md" title="Editar Orden">
                              <Pencil size={16} />
                            </button>
                            <button 
                              onClick={() => setOrderToDelete(order)} 
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md" title="Eliminar Orden"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
          
          <PaginationControls
            currentPage={paginationProps.currentPage}
            totalPages={paginationProps.totalPages}
            totalItems={paginationProps.totalItems}
            startItem={paginationProps.startItem}
            endItem={paginationProps.endItem}
            canGoPrev={paginationProps.canGoPrev}
            canGoNext={paginationProps.canGoNext}
            onGoToPage={paginationProps.goToPage}
            onPrevPage={paginationProps.prevPage}
            onNextPage={paginationProps.nextPage}
            onGoToFirstPage={paginationProps.goToFirstPage}
            onGoToLastPage={paginationProps.goToLastPage}
          />
        </div>
      </div>

      {isCreateModalOpen && <CreateOrderModal onClose={() => setIsCreateModalOpen(false)} />}
      {editingOrderId && <EditOrderModal orderId={editingOrderId} onClose={() => setEditingOrderId(null)} />}

      {orderToDelete && (
        <OrderDeleteModal 
          order={orderToDelete}
          onClose={() => setOrderToDelete(null)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
          }}
        />
      )}
    </>
  );
}