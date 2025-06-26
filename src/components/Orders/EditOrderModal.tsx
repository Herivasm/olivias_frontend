import { useState, useMemo, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { X, Plus, Trash2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { getProducts } from '../../api/ProductAPI';
import { getOrderById, updateOrder } from '../../api/OrderAPI';
import { orderFormSchema, type EditOrderFormData, type OrderStatus, type OrderPaymentMethod } from '../../types';

interface EditOrderModalProps {
    orderId: string;
    onClose: () => void;
}

const statusOptions: { value: OrderStatus, label: string }[] = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'paid', label: 'Pagada' },
];

const paymentMethodOptions: { value: OrderPaymentMethod, label: string }[] = [
    { value: 'cash', label: 'Efectivo' },
    { value: 'transaction', label: 'Transferencia' },
];


export default function EditOrderModal({ orderId, onClose }: EditOrderModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    const { data: orderData, isLoading: isLoadingOrder } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderById(orderId),
        enabled: !!orderId,
    });

    const { data: availableProducts, isLoading: isLoadingProducts } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });

    const { register, handleSubmit, control, watch, reset, formState: { errors, isSubmitting } } = useForm<EditOrderFormData>({
        resolver: zodResolver(orderFormSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
    });

    useEffect(() => {
        if (orderData) {
            const formProducts = orderData.products.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            }));
            reset({ ...orderData, products: formProducts });
        }
    }, [orderData, reset]);

    const productsInOrder = watch('products');

    const total = productsInOrder?.reduce((sum, item) => {
        const quantity = Number(item.quantity) || 0;
        const price = item.unitPrice || 0;
        return sum + (quantity * price);
    }, 0) ?? 0;

    const mutation = useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['order', orderId] });
            toast.success("Orden actualizada");
            onClose();
        },
        onError: (error) => toast.error(error.message)
    });

    const handleFormSubmit = (formData: EditOrderFormData) => {
        mutation.mutate({ formData, orderId });
    };

    const handleAddProduct = (productId: string) => {
        const product = availableProducts?.find(p => p._id === productId);
        if (!product || fields.some(field => field.product === productId)) {
            toast.info("Este producto ya está en la orden o no está disponible.");
            return;
        }
        append({ product: product._id, quantity: 1, unitPrice: product.price });
    };

    const filteredProducts = useMemo(() =>
        availableProducts?.filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase())) || [],
        [availableProducts, searchTerm]);

    if (isLoadingOrder) return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><p className="text-white">Cargando orden...</p></div>;

    if (orderData) return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="bg-[#F9F9F9] w-full max-w-6xl rounded-xl shadow-2xl flex flex-col max-h-[95vh]">
                <div className="bg-[#575B4F] text-white px-8 py-5 text-xl font-semibold flex justify-between items-center">
                    Editar Orden #{orderData.orderNumber}
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-white/20"><X size={24} /></button>
                </div>

                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg">Agregar Más Productos</h3>
                        <input type="text" placeholder="Buscar producto..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-3 py-2 rounded-md border" />
                        <div className="overflow-y-auto max-h-96 border rounded-lg bg-white">
                            {isLoadingProducts ? <p className='p-4 text-center text-gray-500'>Cargando productos...</p> : filteredProducts.map(product => (
                                <div key={product._id} className="flex items-center justify-between p-2 border-b hover:bg-gray-50">
                                    <span>{product.productName} ({product.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })})</span>
                                    <button type="button" onClick={() => handleAddProduct(product._id)} className="bg-[#8A8D81] text-white p-1 rounded-md text-sm hover:bg-[#777a6f]">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg">Orden Actual</h3>
                        <div className="overflow-x-auto rounded-lg border border-gray-300">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#F2EEDC] text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-2">Producto</th>
                                        <th className="px-4 py-2">Cantidad</th>
                                        <th className="px-4 py-2 text-right">Precio</th>
                                        <th className="px-4 py-2 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y">
                                    {fields.map((field, index) => {
                                        const product = availableProducts?.find(p => p._id === field.product);
                                        return (
                                            <tr key={field.id}>
                                                <td className="px-4 py-2">{product?.productName ?? '...'}</td>
                                                <td className="px-4 py-2 w-24">
                                                    <input type="number" {...register(`products.${index}.quantity`, { valueAsNumber: true })} className="w-full p-1 border rounded-md" />
                                                </td>
                                                <td className="px-4 py-2 text-right">{watch(`products.${index}.unitPrice`).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                                                <td className="px-4 py-2 text-center">
                                                    <button type="button" onClick={() => remove(index)} className="text-red-600 hover:text-red-800 p-1 rounded-md">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Estado</label>
                                <select {...register("status")} className='w-full p-2 mt-1 border rounded-md'>
                                    {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Método de Pago</label>
                                <select {...register("paymentMethod")} className="w-full p-2 mt-1 border rounded-md">
                                    {paymentMethodOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-auto pt-4">
                            <div className="text-lg font-semibold text-right w-full">
                                Total: <span className="text-green-700 font-bold">{total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
                            </div>
                        </div>
                        {errors.products && <p className="text-red-500 text-sm font-bold text-center mt-2">{errors.products.message ?? errors.products.root?.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-4 p-4 border-t bg-gray-50">
                    <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md">Cancelar</button>
                    <button type="submit" disabled={isSubmitting || mutation.isPending} className="bg-[#575B4F] hover:bg-[#43463c] text-white px-5 py-2 rounded-md disabled:opacity-50">
                        {isSubmitting || mutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}