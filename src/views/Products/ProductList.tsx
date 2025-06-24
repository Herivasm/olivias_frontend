import { useState } from "react";
import { Pencil, Trash2, Filter, Plus } from 'lucide-react';
import Sidebar from '../../layouts/sidebar';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../../api/ProductAPI";
import { toast } from "react-toastify";
import EditProductModal from "../../components/Products/EditProductModal";
import CreateProductModal from "../../components/Products/CreateProductModal";
import type { Product } from "../../types";

export default function ProductList() {
  const queryClient = useQueryClient();

  // Estado para modales
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Traer productos con react-query
  const { data: products, isLoading, isError } = useQuery<Product[]>(["products"], getProducts);

  // Mutación para eliminar producto
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success("Producto eliminado");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al eliminar producto");
    }
  });

  // Abrir modal editar
  function openEditModal(product: Product) {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  }

  // Cerrar modal editar
  function closeEditModal() {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  }

  // Abrir modal crear
  function openCreateModal() {
    setIsCreateModalOpen(true);
  }

  // Cerrar modal crear
  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  // Confirmar y eliminar producto
  function handleDelete(product: Product) {
    if (window.confirm(`¿Eliminar el producto "${product.productName}"? Esta acción no se puede deshacer.`)) {
      deleteMutation.mutate(product._id);
    }
  }

  if (isLoading) return <p className="p-6">Cargando productos...</p>;
  if (isError) return <p className="p-6 text-red-500">Error al cargar productos.</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-[#f4f5f5]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#505341]">Lista de productos</h1>
          <button
            onClick={openCreateModal}
            className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90"
          >
            Registrar producto <Plus size={16} />
          </button>
        </div>

        <div className="bg-[#575B4F] p-4 rounded-lg">
          <div className="flex flex-wrap justify-between gap-2 mb-4 ">
            <input
              type="text"
              placeholder="🔍 Buscar producto..."
              className="flex-1 p-2 rounded-md w-full md:w-3/4 bg-white"
              // Puedes agregar búsqueda aquí luego
            />
            <button className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2">
              Filtrar <Filter size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-[#f3f1dd] rounded-md overflow-hidden">
              <thead className="text-left font-semibold">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3">Imagen</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Precio ($MXN)</th>
                  <th className="p-3">Fecha creación</th>
                  <th className="p-3">Detalle</th>
                  <th className="p-3">Editar</th>
                  <th className="p-3">Eliminar</th>
                </tr>
              </thead>
              <tbody className="bg-white text-[#333]">
                {products?.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="p-3 rounded-lg">
                      <input
                        type="checkbox"
                        className="appearance-none w-5 h-5 border border-gray-400 rounded-md checked:bg-[#505341] checked:border-transparent focus:outline-none"
                      />
                    </td>
                    <td className="p-3">
                      <img
                        src={product.photoUrl || 'https://via.placeholder.com/40'}
                        alt={product.productName}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    </td>
                    <td className="p-3">{product.productName}</td>
                    <td className="p-3 capitalize">{product.category}</td>
                    <td className="p-3">{product.price.toFixed(2)}</td>
                    <td className="p-3">{new Date(product.createdAt || '').toLocaleDateString()}</td>
                    <td className="p-3">
                      <button className="bg-[#505341] text-white px-3 py-1 rounded-md">
                        Ver detalle
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => openEditModal(product)}
                        className="bg-yellow-400 text-black p-2 rounded-md"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(product)}
                        className="bg-red-600 text-white p-2 rounded-md"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {products?.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center text-gray-500">
                      No hay productos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isEditModalOpen && selectedProduct && (
        <EditProductModal product={selectedProduct} onClose={closeEditModal} />
      )}

      {isCreateModalOpen && <CreateProductModal onClose={closeCreateModal} />}
    </div>
  );
}
