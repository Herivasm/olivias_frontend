import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { deleteSupplier, type Supplier } from '../../api/SuppliersAPI';
import { toast } from 'react-toastify';

interface DeleteSupplierConfirmationModalProps {
    onClose: () => void;
    supplier: Supplier;
    onSuccess: () => void;
}

export default function DeleteSupplierConfirmationModal({ onClose, supplier, onSuccess }: DeleteSupplierConfirmationModalProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteSupplier(supplier._id);
            onSuccess();
            onClose();
            toast.success('Proveedor eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el proveedor:', error);
            toast.error('Error al eliminar el proveedor');
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
                            ¿Estás seguro de eliminar este proveedor?
                        </h3>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p><strong>Nombre:</strong> {supplier.supplierName}</p>
                            <p><strong>Contacto:</strong> {supplier.contact}</p>

                            {/* esto lo tengo que arreglar */}
                            {supplier.supplies && supplier.supplies.length > 0 && (
                                <p><strong>Insumos asociados:</strong> {supplier.supplies.length}</p>
                            )}
                        </div>
                        <p className="text-red-600 text-sm mt-3 font-medium">
                            Esta acción no se puede deshacer
                        </p>

                        {/* esto lo tengo que arreglar */}
                        {supplier.supplies && supplier.supplies.length > 0 && (
                            <p className="text-orange-600 text-sm mt-2 font-medium">
                                ⚠️ Este proveedor tiene insumos asociados
                            </p>
                        )}
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