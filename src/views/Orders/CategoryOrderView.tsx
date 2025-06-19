import React from "react";
import { Link } from "react-router-dom";

const categories = [
    "Bebidas calientes",
    "Bebidas frías",
    "Sin café",
    "Frappuchinos",
    "Bebidas de alcohol",
    "Sodapops",
    "Snacks",
    "Hamburguesas",
    "Sándwiches",
    "Bagels especiales",
    "Repostería",
];

export default function CategoryOrderView() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="bg-[#575B4F] w-full max-w-4xl rounded-md overflow-hidden shadow-lg">
                {/* HEADER */}
                <div className="bg-[#F4F2E1] px-4 py-3 flex justify-between items-center">
                    <h2 className="font-bold text-sm sm:text-base uppercase">
                        Seleccione una categoría de productos
                    </h2>
                    <Link to={"/orders"}>
                        <button className="text-xl font-bold hover:text-red-600 transition duration-200">
                            &times;
                        </button>

                    </Link>
                </div>

                {/* Categorías */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6">

                    {categories.map((category, index) => (
                        <Link to={'../orders/addProductOrder'}>
                            <div
                                key={index}
                                className="bg-[#F2EEDC] rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-md hover:bg-[#e9e4cc] cursor-pointer transition"
                            >
                                <h3 className="font-bold text-sm mb-2 text-center">
                                    {category.toUpperCase()}
                                </h3>
                                <div className="w-20 h-16 bg-gray-300 rounded-md" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
