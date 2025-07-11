import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/ProductAPI";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import ErrorMessage from "../../components/ErrorMessage";
import type { Product } from "../../types";

function formatCategory(category: string) {
  const categoryMap: { [key: string]: string } = {
    hotDrinks: "Bebidas Calientes",
    coldDrinks: "Bebidas Frías",
    alcohol: "Alcohol",
    snacks: "Snacks",
    hamburguers: "Hamburguesas",
    baguettes: "Baguettes",
    sandwiches: "Sándwiches",
    desserts: "Postres",
  };
  return categoryMap[category] || category;
}

export default function ProductDetailsView() {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading, isError, error } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId!),
    enabled: !!productId,
    retry: false,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <p className="text-center text-lg p-10">Cargando producto...</p>;
  if (isError) return <div className="p-10"><ErrorMessage>{error.message}</ErrorMessage></div>;

  if (product) return (
    <div className="bg-[#F9FAFB] rounded-xl shadow-lg max-w-5xl mx-auto my-12">
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
        <h2 className="text-xl font-semibold tracking-wide">DETALLE DEL PRODUCTO</h2>
        <Link to={'/'}>
          <button className="text-white hover:text-gray-300 transition-colors p-1" title="Volver al Dashboard">
            <ArrowLeft size={22} />
          </button>
        </Link>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Nombre:</span>
            <span className="text-xl text-gray-800 font-medium">{product.productName}</span>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Categoría:</span>
            <span className="text-lg text-gray-800 font-medium">{formatCategory(product.category)}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Precio ($MX):</span>
              <span className="text-2xl text-green-600 font-bold">${product.price.toFixed(2)}</span>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Costo ($MX):</span>
              <span className="text-2xl text-red-500 font-bold">${product.cost.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Descripción</span>
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-2">Imagen del producto</span>
          <div className="w-full max-w-sm">
            <img
              src={product.photoUrl || "https://via.placeholder.com/400x300.png?text=Sin+Imagen"}
              alt={`Imagen de ${product.productName}`}
              className="w-full h-auto object-cover rounded-lg shadow-md border"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return <p className="text-center p-10">No se pudo cargar la información del producto.</p>;
}