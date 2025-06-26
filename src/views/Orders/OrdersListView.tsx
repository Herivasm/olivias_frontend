import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Plus, Pencil, Trash2, Search, Filter, Eye } from 'lucide-react';

import { getOrders, deleteOrder } from "../../api/OrderAPI";
import CreateOrderModal from "../../components/Orders/CreateOrderModal";
import EditOrderModal from "../../components/Orders/EditOrderModal";

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
        onError: (error) => {
            toast.error(error.message);
        }
    });

    if (isLoading) return <p className="text-center text-2xl font-bold mt-10">Cargando Órdenes...</p>;
    if (isError) return <p className="text-center text-red-600 text-2xl font-bold mt-10">Error: {error.message}</p>;

    return (
        <>
            <div className="flex-1 p-6 md:p-8 bg-[#f4f5f5]">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#505341]">Administrador de Órdenes</h1>
                    <button
                        className="bg-[#575B4F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Registrar Orden</span>
                    </button>
                </header>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Buscar por número de órden..." className="w-full pl-10 pr-4 py-2 rounded-md border" />
                        </div>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-300">
                            Filtrar <Filter size={16} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-4 py-3"># Orden</th>
                                    <th scope="col" className="px-4 py-3">Fecha</th>
                                    <th scope="col" className="px-4 py-3">Total</th>
                                    <th scope="col" className="px-4 py-3">Método de Pago</th>
                                    <th scope="col" className="px-4 py-3">Estado</th>
                                    <th scope="col" className="px-4 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map(order => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 font-mono">
                                            <Link to={`/orders/${order._id}`} className="text-blue-600 hover:underline">
                                                {order.orderNumber}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString('es-MX')}</td>
                                        <td className="px-4 py-2 font-medium text-gray-900">{order.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                                        <td className="px-4 py-2">{paymentMethodLabels[order.paymentMethod] || order.paymentMethod}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                                                {statusLabels[order.status] || order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-center items-center gap-2">
                                                <Link to={`/orders/${order._id}`} className="p-2 text-blue-600 hover:text-blue-800 transition-colors" title="Ver Detalles">
                                                    <Eye size={18} />
                                                </Link>
                                                <button onClick={() => setEditingOrderId(order._id)} className="p-2 text-yellow-600 hover:text-yellow-800 transition-colors" title="Editar Orden">
                                                    <Pencil size={18} />
                                                </button>
                                                <button onClick={() => { if (confirm(`¿Seguro que quieres eliminar la orden #${order.orderNumber}?`)) { deleteMutation.mutate(order._id); } }} className="p-2 text-red-600 hover:text-red-800 transition-colors" title="Eliminar Orden">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isCreateModalOpen && <CreateOrderModal onClose={() => setIsCreateModalOpen(false)} />}

            {editingOrderId && (
                <EditOrderModal
                    orderId={editingOrderId}
                    onClose={() => setEditingOrderId(null)}
                />
            )}
        </>
    );
}