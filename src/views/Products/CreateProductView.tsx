import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import CreateProductModal from "../../components/Products/CreateProductModal";
import { createProduct } from "../../api/ProductAPI";
import type { ProductFormData } from "../../types";

export default function CreateProductView() {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: ProductFormData) => createProduct(formData),
    onSuccess: (data) => {
      toast.success("Producto creado correctamente");
      setShowModal(false);
      navigate("/"); // o a la ruta que quieras
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al crear producto");
    },
  });

  return (
    <>
      {showModal && (
        <CreateProductModal
          onClose={() => {
            setShowModal(false);
            navigate("/"); // salir al listado si cierra modal
          }}
          onSubmit={(data: ProductFormData) => mutation.mutate(data)}
        />
      )}
    </>
  );
}
