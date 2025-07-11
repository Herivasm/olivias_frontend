import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { DollarSign, Wallet, CreditCard, Calendar } from 'lucide-react';
import { getSalesByDate } from '../../api/OrderAPI'; 

const getTodayString = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); 
    return today.toISOString().split('T')[0];
};

export default function CashClosingView() {
    const [selectedDate, setSelectedDate] = useState(getTodayString());

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['dailyReport', selectedDate],
        queryFn: () => getSalesByDate(selectedDate),
        enabled: !!selectedDate, 
    });

    const formatCurrency = (amount: number) => amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    return (
        <div className="flex-1 p-6 bg-[#f4f5f5]">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-xl font-bold text-[#505341]">Corte de Caja Diario</h1>

                <div className="flex items-center gap-2">
                    <label htmlFor="date-picker" className="font-semibold text-sm text-gray-700">Seleccionar Fecha:</label>
                    <div className='relative'>
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            id="date-picker"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="pl-10 pr-3 py-2 border rounded-md bg-white text-sm"
                        />
                    </div>
                </div>
            </header>

            {isLoading && <p className="text-center text-lg">Cargando reporte del día...</p>}
            {isError && <p className="text-center text-red-500">Error: {error.message}</p>}

            {data && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#575B4F] text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-3">
                            <DollarSign size={20} /> TOTAL DEL DÍA: {formatCurrency(data.summary.totalSales)}
                        </div>
                        <div className="bg-[#575B4F] text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-3">
                            <Wallet size={20} /> EFECTIVO: {formatCurrency(data.summary.cashSales)}
                        </div>
                        <div className="bg-[#575B4F] text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-3">
                            <CreditCard size={20} /> TRANSFERENCIA: {formatCurrency(data.summary.transactionSales)}
                        </div>
                    </div>

                    <div className="bg-[#575B4F] p-4 rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm bg-[#f3f1dd] rounded-md overflow-hidden">
                                <thead className="text-left font-semibold">
                                    <tr>
                                        <th className="p-3">Orden</th>
                                        <th className="p-3">Hora</th>
                                        <th className="p-3">Tipo de pago</th>
                                        <th className="p-3">Total ($MXN)</th>
                                        <th className="p-3">Detalle de la orden</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-[#333]">
                                    {data.orders.map(order => (
                                        <tr key={order._id} className="border-t">
                                            <td className="p-3 font-mono text-blue-600">
                                                <Link to={`/orders/${order._id}`}>{order.orderNumber}</Link>
                                            </td>
                                            <td className="p-3">{new Date(order.createdAt).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td className="p-3">{order.paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}</td>
                                            <td className="p-3 font-medium">{formatCurrency(order.total)}</td>
                                            <td className="p-3">
                                                <Link to={`/orders/${order._id}`}>
                                                    <button className="bg-[#505341] text-white px-3 py-1 rounded-md text-xs hover:opacity-90">
                                                        Ver detalle
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.orders.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center p-4 text-gray-500">No hay órdenes para la fecha seleccionada.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}