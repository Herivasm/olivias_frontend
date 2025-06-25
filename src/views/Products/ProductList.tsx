import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../../api/ProductAPI";
import { Product } from "../../types";
import { Pencil, Trash2, Filter, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../layouts/sidebar";
import { toast } from "react-toastify";

export default function ProductList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Producto eliminado");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al eliminar");
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-[#f4f5f5]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#505341]">Lista de productos</h1>
          <Link to="/products/create">
            <button className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90">
              Registrar producto <Plus size={16} />
            </button>
          </Link>
        </div>

        <div className="bg-[#575B4F] p-4 rounded-lg">
          {/* Filtro y búsqueda */}
          <div className="flex flex-wrap justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="🔍 Buscar producto..."
              className="flex-1 p-2 rounded-md w-full md:w-3/4 bg-white"
              disabled
            />
            <button className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2">
              Filtrar <Filter size={16} />
            </button>
          </div>

          {/* Tabla */}
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
                {isLoading && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center">
                      Cargando productos...
                    </td>
                  </tr>
                )}

                {isError && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center text-red-600">
                      Error al cargar productos
                    </td>
                  </tr>
                )}

                {!isLoading && products?.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center text-gray-500">
                      No hay productos registrados
                    </td>
                  </tr>
                )}

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
                        src={product.photoUrl || "https://via.placeholder.com/40"}
                        className="w-10 h-10 rounded-md object-cover"
                        alt={product.productName}
                      />
                    </td>
                    <td className="p-3">{product.productName}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">${product.price.toFixed(2)}</td>
                    <td className="p-3">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="bg-[#505341] text-white px-3 py-1 rounded-md hover:opacity-90"
                      >
                        Ver detalle
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => navigate(`/products/${product._id}/edit`)}
                        className="bg-yellow-400 text-black p-2 rounded-md hover:opacity-90"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white p-2 rounded-md hover:opacity-90"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
