import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import EditProductModal from "../../components/Products/EditProductModal";
import { getProductById, updateProduct } from "../../api/ProductAPI";
import type { Product, ProductFormData } from "../../types";

export default function EditProductView() {
  const { productId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  // Obtener producto actual
  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId!),
    enabled: !!id,
  });

  // Mutación para actualizar
  const mutation = useMutation({
    mutationFn: (formData: ProductFormData) =>
      updateProduct({ productId: productId!, formData }),
    onSuccess: () => {
      toast.success("Producto actualizado correctamente");
      setShowModal(false);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al actualizar producto");
    },
  });

  if (isLoading) return <p>Cargando producto...</p>;
  if (isError || !product) return <p>Error al cargar el producto</p>;

  return (
    <>
      {showModal && (
        <EditProductModal
          product={product}
          onClose={() => {
            setShowModal(false);
            navigate("/");
          }}
          onSubmit={(data: ProductFormData) => mutation.mutate(data)}
        />
      )}
    </>
  );
}
