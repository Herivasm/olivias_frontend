import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/ProductAPI";
import { toast } from "react-toastify";

export default function ProductDetailsView() {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading, isError } = useQuery(
    ["product", productId],
    () => getProductById(productId!),
    {
      enabled: !!productId,
      onError: (error: any) => toast.error(error.message),
    }
  );

  if (isLoading) return <p className="p-6">Cargando producto...</p>;
  if (isError) return <p className="p-6 text-red-600">Error al cargar el producto</p>;
  if (!product) return <p className="p-6">Producto no encontrado</p>;

  // Aquí renderizas el producto como en tu código pero con datos reales
  return (
    <div className="bg-[#F9FAFB] rounded-xl shadow-md max-w-5xl mx-auto mt-12">
      {/* Header */}
      <div className="bg-[#575B4F] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
        <h2 className="text-xl font-semibold tracking-wide">DETALLE DEL PRODUCTO</h2>
        <Link to={'/products'}>
          <button
            className="text-white hover:text-gray-300 transition-colors p-1"
            title="Volver"
          >
            {/* Ícono */}
            <ArrowLeft size={22} />
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Product Info */}
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Nombre:</span>
            <span className="text-lg text-gray-800 font-medium">{product.productName}</span>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Categoría:</span>
            <span className="text-lg text-gray-800 font-medium">{formatCategory(product.category)}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Precio ($MX):</span>
              <span className="text-lg text-gray-800 font-medium">{product.price.toFixed(2)}</span>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
              <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Costo ($MX):</span>
              <span className="text-lg text-gray-800 font-medium">{product.cost.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase block mb-1">Descripción</span>
            <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <img
              src={product.photoUrl || "https://via.placeholder.com/400x300?text=Sin+imagen"}
              alt={product.productName}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Mismo formateador de categoría que antes
function formatCategory(category: string) {
  switch (category) {
    case "hotDrinks": return "Bebidas calientes";
    case "coldDrinks": return "Bebidas frías";
    case "alcohol": return "Alcohol";
    case "snacks": return "Snacks";
    case "hamburguers": return "Hamburguesas";
    case "baguettes": return "Baguettes";
    case "sandwiches": return "Sándwiches";
    case "desserts": return "Postres";
    default: return category;
  }
}
