import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const categories = [
  { name: "Bebidas calientes", color: "#E3F2E1" },
  { name: "Bebidas frías", color: "#E6ECE3" },
  { name: "Sin café", color: "#FFF7CC" },
  { name: "Frappuchinos", color: "#F3F0FF" },
  { name: "Bebidas de alcohol", color: "#FDE2E4" },
  { name: "Sodapops", color: "#E0F7FA" },
  { name: "Snacks", color: "#FAF3E0" },
  { name: "Hamburguesas", color: "#F0E5D8" },
  { name: "Sándwiches", color: "#F5F5DC" },
  { name: "Bagels especiales", color: "#FFE4C4" },
  { name: "Repostería", color: "#FCE4EC" },
];

export default function CategoryOrderView() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 uppercase">
            Seleccione una categoría de productos
          </h2>
          <Link to={"/orders"}>
            <button className="text-3xl font-bold text-gray-500 hover:text-red-600 transition duration-200">
              &times;
            </button>
          </Link>
        </div>

        {/* CATEGORÍAS COMO TARJETAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <Link to="/orders/addProductOrder" key={index}>
              <div
                className="rounded-xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-lg cursor-pointer border transition-all duration-200"
                style={{ backgroundColor: category.color }}
              >
                <Package className="text-[#575B4F] mb-3" size={32} />
                <h3 className="text-sm sm:text-base font-semibold text-[#505341] leading-tight">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
