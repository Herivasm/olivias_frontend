import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from 'zod';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';

import { getOrders, deleteOrder } from "../../api/OrderAPI";
import { dashboardOrderSchema } from "../../types";

import CreateOrderModal from "../../components/Orders/CreateOrderModal";
import EditOrderModal from "../../components/Orders/EditOrderModal";
import OrdersFilters from "../../components/Orders/OrdersFilters"; 
import PaginationControls from "../../components/PaginationControls";
import { useOrdersFilters } from "../../components/Orders/useOrdersFilters";
import { usePagination } from "../../components/usePagination";

type DashboardOrder = z.infer<typeof dashboardOrderSchema>[number];

const paymentMethodLabels: { [key: string]: string } = {
  cash: 'Efectivo',
  transaction: 'Transferencia'
};
const statusLabels: { [key: string]: string } = {
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
  const queryClient = useQueryClient();

  const { data: orders, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: (data) => {
      toast.success(data.message || "Orden eliminada");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const pagination = usePagination([], { itemsPerPage: 10 });
  const {
    filteredOrders,
    clearFilters,
    ...filterProps
  } = useOrdersFilters(orders || [], pagination.resetPagination);
  const {
    paginatedItems,
    ...paginationProps
  } = usePagination(filteredOrders, { itemsPerPage: 10 });

  if (isLoading) return <p className="text-center text-2xl font-bold mt-10">Cargando Órdenes...</p>;
  if (isError) return <p className="text-center text-red-600 text-2xl font-bold mt-10">Error: {error.message}</p>;

  return (
    <>
      <div className="flex-1 p-6 md:p-8 bg-[#f4f5f5]">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#505341]">Administrador de Órdenes</h1>
          <button
            className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Registrar Orden</span>
          </button>
        </header>

       
        <div className="bg-[#575B4F] shadow-md rounded-lg p-4">
          {/*filtros */}
          <div className="mb-4">
            <OrdersFilters 
              {...filterProps}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-md overflow-hidden">
              <thead className="text-left font-semibold bg-[#f3f1dd] text-[#505341]">
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
                    <td colSpan={6} className="text-center p-6 text-gray-500">
                      {orders?.length ? "No se encontraron resultados" : "No hay órdenes registradas todavía"}
                    </td>
                  </tr>
                ) : paginatedItems.map(order => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-mono text-blue-700">
                      <Link to={`/orders/${order._id}`} className="hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="p-3">{new Date(order.createdAt).toLocaleDateString('es-MX')}</td>
                    <td className="p-3 font-medium">{order.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                    <td className="p-3">{paymentMethodLabels[order.paymentMethod] || order.paymentMethod}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center items-center gap-2">
                        <Link to={`/orders/${order._id}`} title="Ver Detalles">
                          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <button onClick={() => setEditingOrderId(order._id)} title="Editar" className="bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500">
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Seguro que quieres eliminar la orden #${order.orderNumber}?`)) {
                              deleteMutation.mutate(order._id);
                            }
                          }}
                          title="Eliminar"
                          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
    </>
  );
}
