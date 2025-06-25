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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
                <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-lg font-semibold">{modalTitle}</h2>
                    <button onClick={onClose} className="hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
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