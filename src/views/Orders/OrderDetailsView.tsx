import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { getOrderById } from "../../api/OrderAPI";

const paymentMethodLabels: { [key: string]: string } = {
    cash: 'Efectivo',
    transaction: 'Transferencia'
};

export default function OrderDetailsView() {
    const { orderId } = useParams();

    const { data: order, isLoading, isError, error } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderById(orderId!), 
        enabled: !!orderId, 
        retry: false, 
    });

    if (isLoading) return <p className="text-center text-2xl font-bold mt-10">Cargando Orden...</p>;
    if (isError) return <p className="text-center text-red-600 text-2xl font-bold mt-10">Error: {error.message}</p>;

    if (order) return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-6xl mx-auto my-10 border border-gray-200">
            <div className="bg-[#575B4F] text-white px-8 py-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold uppercase tracking-wide">Detalle de la Orden</h2>
                <Link to={'/orders'}>
                    <button className="text-white hover:text-gray-300 transition-colors p-1" title="Volver">
                        <ArrowLeft size={22} />
                    </button>
                </Link>
            </div>

            <div className="p-8 space-y-8">
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <p className="text-base font-semibold text-gray-800 uppercase">
                        Número de orden:
                        <span className="font-mono normal-case ml-2 text-blue-600">{order.orderNumber}</span>
                    </p>
                    <p className="text-base font-semibold text-gray-800 uppercase">
                        Fecha:
                        <span className="font-normal normal-case ml-2 text-gray-700">{new Date(order.createdAt).toLocaleString('es-MX')}</span>
                    </p>
                </div>

                <div className="overflow-x-auto border border-gray-300 rounded-lg bg-white shadow-sm">
                    <table className="w-full text-sm text-left text-gray-800">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Producto</th>
                                <th className="px-6 py-3 text-center">Cantidad</th>
                                <th className="px-6 py-3 text-right">Precio Unitario</th>
                                <th className="px-6 py-3 text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {order.products.map(item => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4">{item.product.productName}</td>
                                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                                    <td className="px-6 py-4 text-right">{item.unitPrice.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                                    <td className="px-6 py-4 text-right font-medium">{(item.quantity * item.unitPrice).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-800 uppercase mb-2">Notas de la Orden</h3>
                        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg min-h-[100px]">
                            {order.notes || 'No se añadieron notas.'}
                        </p>
                    </div>
                    <div className="text-right space-y-4">
                        <p className="text-base font-semibold text-gray-800">
                            Método de Pago:{' '}
                            <span className="font-bold text-gray-900">{paymentMethodLabels[order.paymentMethod] || order.paymentMethod}</span>
                        </p>
                        <p className="text-lg font-semibold text-gray-800 uppercase">
                            Total de la Orden:{' '}
                            <span className="text-2xl font-bold text-green-700">
                                {order.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}