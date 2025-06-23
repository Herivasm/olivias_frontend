import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, Filter, Search } from 'lucide-react'
import CreateProviderView from './CreateSuppliersView'
import EditSuppliersView from './EditSuppliersView'
import { Link } from 'react-router-dom'
import { getAllSuppliers, type Supplier } from '../../api/SuppliersAPI'

export default function SuppliersListView() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

    const fetchSuppliers = async () => {
        try {
            const data = await getAllSuppliers()
            setSuppliers(data)
        } catch (error) {
            console.error('Error al obtener proveedores:', error)
        }
    }

    useEffect(() => {
        fetchSuppliers()
    }, [])

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const openEditModal = (supplier: Supplier) => {
        setSelectedSupplier(supplier)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
        setSelectedSupplier(null)
    }

    return (
        <div className="flex min-h-screen">
            {/* SIDEBAR si lo tienes lo agregas aquí */}

            <div className="flex-1 p-6 bg-[#f4f5f5]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-[#505341]">Lista de Proveedores</h1>
                    <button
                        className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90"
                        onClick={openModal}
                    >
                        Registrar Proveedor <Plus size={16} />
                    </button>
                </div>

                <div className="bg-[#575B4F] p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                        <div className="relative flex-1 w-full md:w-3/4">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Buscar proveedor..."
                                className="w-full pl-10 pr-4 py-2 rounded-md bg-white"
                            />
                        </div>
                        <button className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 w-full md:w-auto">
                            Filtrar <Filter size={16} />
                        </button>
                    </div>

                    {/* TABLA DE PROVEEDORES */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm bg-[#f3f1dd] rounded-md overflow-hidden">
                            <thead className="text-left font-semibold">
                                <tr>
                                    <th className="p-3">Nombre</th>
                                    <th className="p-3">Contacto</th>
                                    <th className="p-3">Detalle</th>
                                    <th className="p-3">Editar</th>
                                    <th className="p-3">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-[#333]">
                                {suppliers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            No hay proveedores registrados
                                        </td>
                                    </tr>
                                ) : (
                                    suppliers.map((supplier) => (
                                        <tr key={supplier._id} className="border-t hover:bg-gray-50 transition-colors">
                                            <td className="p-3">{supplier.supplierName}</td>
                                            <td className="p-3">{supplier.contact}</td>
                                            <td className="p-3">
                                                <Link to={`/suppliers/${supplier._id}`}>
                                                    <button className="bg-[#505341] text-white px-3 py-1 rounded-md hover:bg-[#404030] transition-colors">
                                                        Ver detalle
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    className="bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500 transition-colors"
                                                    onClick={() => openEditModal(supplier)}
                                                    title="Editar proveedor"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                                                    title="Eliminar proveedor"
                                                // onClick={() => delete logic aquí}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && <CreateProviderView onClose={closeModal} />}
            {isEditModalOpen && selectedSupplier && (
                <EditSuppliersView
                    //   supplier={selectedSupplier}
                    onClose={closeEditModal}
                //   onSuccess={fetchSuppliers} // recargar datos al editar
                />
            )}
        </div>
    )
}
