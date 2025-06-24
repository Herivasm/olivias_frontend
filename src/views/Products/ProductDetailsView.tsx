import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "../../api/ProductAPI";
import type { Product } from "../../types";

export default function ProductDetailsView() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    getProductById(productId)
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Error al obtener el producto");
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-600">
        <p>{error}</p>
        <Link to="../" className="mt-4 text-blue-600 underline">
          Volver a la lista de productos
        </Link>
      </div>
    );
  }

  if (!product) {
    return null; // O algún fallback si es necesario
  }

  return (
    <div className="bg-[#F9FAFB] rounded-xl shadow-md max-w-5xl mx-auto mt-12">
      {/* Header */}
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
        <h2 className="text-xl font-semibold tracking-wide">DETALLE DEL PRODUCTO</h2>
        <Link to="../">
          <button
            className="text-white hover:text-gray-300 transition-colors p-1"
            title="Volver"
          >
            <ArrowLeft size={22} />
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Product Info */}
        <div className="space-y-6">
          {/* Product Name */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
              Nombre:
            </span>
            <span className="text-lg text-gray-800 font-medium">{product.productName}</span>
          </div>

          {/* Category */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
              Categoría:
            </span>
            <span className="text-lg text-gray-800 font-medium">{product.category}</span>
          </div>

         {/* Price and Cost */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
                Precio ($MX):
              </span>
              <span className="text-lg text-gray-800 font-medium">{product.price}</span>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
                Costo ($MX):
              </span>
              <span className="text-lg text-gray-800 font-medium">{product.cost}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">
              Descripción
            </span>
            <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Right Column - Product Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <img
              src={product.imageUrl || product.photoUrl || "https://via.placeholder.com/400x300?text=Sin+imagen"}
              alt={product.productName}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
