import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../../api/ProductAPI";
import type { Product, ProductFormData } from "../../types";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";
import { X } from "lucide-react";

interface ProductModalProps {
    onClose: () => void;
    productToEdit?: Product | null;
}

export default function ProductModal({ onClose, productToEdit }: ProductModalProps) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            toast.success(`Producto "${data.productName}" creado exitosamente.`);
            queryClient.invalidateQueries({ queryKey: ["products"] });
            onClose();
        },
        onError: (error) => toast.error(error.message)
    });

    const updateMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: (data) => {
            toast.success(`Producto "${data.productName}" actualizado.`);
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", data._id] });
            onClose();
        },
        onError: (error) => toast.error(error.message)
    });

    const handleSubmit = (formData: ProductFormData) => {
        if (productToEdit) {
            updateMutation.mutate({ productId: productToEdit._id, formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const modalTitle = productToEdit ? "EDITAR PRODUCTO" : "REGISTRAR PRODUCTO";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/40 backdrop-blur-sm p-4">
            {/* Contenedor principal del modal */}
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[92vh] shadow-xl flex flex-col">
                
                {/* Encabezado fijo */}
                <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center sticky top-0 z-10 flex-shrink-0">
                    <h2 className="text-lg font-semibold">{modalTitle}</h2>
                    <button
                        onClick={onClose}
                        title="Cerrar"
                        aria-label="Cerrar"
                        className="hover:text-gray-300 p-2 rounded-md transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Contenido con scroll */}
                <div className="overflow-y-auto p-6"> 
                    <ProductForm
                        onSubmit={handleSubmit}
                        initialData={productToEdit ?? undefined}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
}