import { useQuery } from "@tanstack/react-query";
// import { getProducts } from "../api/ProductAPI";
import { Link } from "react-router-dom";
// import CreateProductView from "./Products/CreateProductView";
// import EditProductView from "./Products/EditProductView";
import EditOrderView from "./EditOrderView";
import CreateOrderView from "./CreateOrderView";


import { Pencil, Trash2, Filter, Plus } from 'lucide-react';
import { useState } from "react";


export default function OrdersListView() {
    {/* const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isLoading) return <p className="text-center text-lg">Cargando...</p>; */}

    {/* FUNCIONES PARA QUE FUNCIONE EL MODAL */ }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    return (
        <div className="flex min-h-screen">
            {/* ESTE ES EL SIDEBAR */}



            {/* ESTA ES LA PARTE DONDE SE ENCUENTRA LA ESTRUCTURA DE LA TABLA*/}
            <div className="flex-1 p-6 bg-[#f4f5f5]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-[#505341]">Lista de ordenes</h1>
                    <button className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90"
                        onClick={openModal}
                    >
                        Registrar orden <Plus size={16} />
                    </button>
                </div>

                <div className="bg-[#575B4F] p-4 rounded-lg">
                    {/* ESTO ES DEL FILTRO Y LO DE LA BUSQUEDA */}
                    <div className="flex flex-wrap justify-between gap-2 mb-4 ">
                        <input
                            type="text"
                            placeholder="🔍 Buscar producto..."
                            className="flex-1 p-2 rounded-md w-full md:w-3/4 bg-white"
                        />
                        <button className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90">
                            Filtrar <Filter size={16} />
                        </button>
                    </div>

                    {/* ESTA ES LA TABÑA */}
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

                                <tr className="border-t">
                                    <td className="p-3 rounded-lg"><input type="checkbox" className="appearance-none w-5 h-5 border border-gray-400 rounded-md checked:bg-[#505341] checked:border-transparent focus:outline-none" /></td>
                                    <td className="p-3">
                                        <img src="" className="w-10 h-10 rounded-md object-cover" />
                                    </td>
                                    <td className="p-3">nombree</td>
                                    <td className="p-3">una categoria</td>
                                    <td className="p-3">preciooo</td>
                                    <td className="p-3">esta es una fecha</td>
                                    <td className="p-3">
                                        <Link
                                            to={'../orders/details'}
                                        >

                                            <button className="bg-[#505341] text-white px-3 py-1 rounded-md hover:opacity-90">Ver detalle</button>
                                        </Link>
                                    </td>
                                    <td className="p-3">
                                        <button className="bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500"

                                            onClick={openEditModal}>
                                            <Pencil size={16} />
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && <CreateOrderView onClose={closeModal} />}
            {isEditModalOpen && <EditOrderView onClose={closeEditModal} />}
        </div>
    );
}
