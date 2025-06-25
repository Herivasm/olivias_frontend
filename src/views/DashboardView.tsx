import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../api/ProductAPI";
import { Link } from "react-router-dom";
import ProductModal from "../components/Products/ProductModal";
import { Pencil, Trash2, Filter, Plus, Search, Eye } from 'lucide-react';
import { useState, useMemo } from "react";
import type { Product } from "../types";
import { toast } from "react-toastify";

const categoryTranslations: { [key: string]: string } = {
    hotDrinks: "Bebidas Calientes",
    coldDrinks: "Bebidas Frías",
    alcohol: "Alcohol",
    snacks: "Snacks",
    hamburguers: "Hamburguesas",
    baguettes: "Baguettes",
    sandwiches: "Sándwiches",
    desserts: "Postres",
};

const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString('es-MX');

export default function DashboardView() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [modalState, setModalState] = useState<{ isOpen: boolean; productToEdit: Product | null }>({
        isOpen: false,
        productToEdit: null,
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => toast.error(error.message)
    });

    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.filter(product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const handleOpenModal = (product: Product | null = null) => {
        setModalState({ isOpen: true, productToEdit: product });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, productToEdit: null });
    };

    if (isLoading) return <p className="text-center text-lg p-10">Cargando...</p>;
    if (isError) return <p className="text-center text-lg text-red-600 p-10">Error: {error.message}</p>;

    return (
        <div className="flex-1 p-6 bg-[#f4f5f5]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-[#505341]">Lista de productos</h1>
                <button onClick={() => handleOpenModal()} className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90">
                    Registrar producto <Plus size={16} />
                </button>
            </div>

            <div className="bg-[#575B4F] p-4 rounded-lg">
                <div className="flex flex-wrap gap-2 items-center mb-4">
                    <div className="relative flex-1 min-w-[250px]">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-white"
                        />
                    </div>
                    <button className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90">
                        Filtrar <Filter size={16} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm bg-white rounded-md overflow-hidden">
                        <thead className="text-left font-semibold bg-[#f3f1dd]">
                            <tr>
                                <th className="p-3">Imagen</th>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Categoría</th>
                                <th className="p-3">Precio ($MXN)</th>
                                <th className="p-3">Fecha creación</th>
                                <th className="p-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#333]">
                            {filteredData.length > 0 ? filteredData.map(product => (
                                <tr key={product._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">
                                        <img src={product.photoUrl || 'https://via.placeholder.com/40'} alt={product.productName} className="w-10 h-10 rounded-md object-cover" />
                                    </td>
                                    <td className="p-3 font-medium">{product.productName}</td>
                                    <td className="p-3"> {categoryTranslations[product.category] || product.category}</td>
                                    <td className="p-3">${product.price.toFixed(2)}</td>
                                    <td className="p-3">{formatDate(product.createdAt)}</td>
                                    <td className="p-3">
                                        <div className="flex justify-center items-center gap-2">
                                            <Link to={`/products/${product._id}`} title="Ver Detalle">
                                                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"><Eye size={16} /></button>
                                            </Link>
                                            <button onClick={() => handleOpenModal(product)} className="bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500" title="Editar">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => { if (confirm(`¿Seguro que quieres eliminar "${product.productName}"?`)) deleteMutation.mutate(product._id) }} disabled={deleteMutation.isPending} className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700" title="Eliminar">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="text-center p-6">No se encontraron productos.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalState.isOpen && (
                <ProductModal
                    onClose={handleCloseModal}
                    productToEdit={modalState.productToEdit}
                />
            )}
        </div>
    );
}