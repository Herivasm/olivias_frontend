import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import CreateProviderView from './CreateSuppliersView'
import EditSuppliersView from './EditSuppliersView'
import SuppliersFilters from '../../components/Suppliers/SuppliersFilters'
import PaginationControls from '../../components/PaginationControls'
import { Link } from 'react-router-dom'
import { getAllSuppliers, type Supplier } from '../../api/SuppliersAPI'
import { getAllSupplies, type Supply } from '../../api/SuppliesAPI'
import { useSuppliersFilters } from '../../components/Suppliers/useSuppliersFilters'
import { usePagination } from '../../components/usePagination'

export default function SuppliersListView() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [supplies, setSupplies] = useState<Supply[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

  
    const pagination = usePagination([], { itemsPerPage: 10 })

  
    const {
        searchTerm,
        setSearchTerm,
        showFilters,
        setShowFilters,
        filters,
        setFilters,
        filteredSuppliers,
        uniqueSupplies,
        clearFilters,
        hasActiveFilters
    } = useSuppliersFilters(suppliers, supplies, pagination.resetPagination)

   
    const paginatedSuppliers = usePagination(filteredSuppliers, { itemsPerPage: 10 })

    const fetchSuppliers = async () => {
        try {
            const data = await getAllSuppliers()
            setSuppliers(data)
        } catch (error) {
            console.error('Error al obtener proveedores:', error)
        }
    }

    const fetchSupplies = async () => {
        try {
            const data = await getAllSupplies()
            setSupplies(data)
        } catch (error) {
            console.error('Error al obtener insumos:', error)
        }
    }

    useEffect(() => {
        fetchSuppliers()
        fetchSupplies()
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

    const handleEditSuccess = () => {
        fetchSuppliers() 
    }

    const handleDeleteSupplier = async (supplierId: string) => {
        // Aquí implementarías la lógica para eliminar el proveedor
        console.log('Eliminar proveedor:', supplierId)
        
        // try {
        //   await deleteSupplier(supplierId)
        //   fetchSuppliers() // Refrescar la lista
        // } catch (error) {
        //   console.error('Error al eliminar proveedor:', error)
        // }
    }

    return (
        <div className="flex min-h-screen">
            

            <div className="flex-1 p-6 bg-[#f4f5f5]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-[#505341]">Lista de Proveedores</h1>
                    <button
                        className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 cursor-pointer transition-colors"
                        onClick={openModal}
                    >
                        Registrar Proveedor <Plus size={16} />
                    </button>
                </div>

                <div className="bg-[#575B4F] p-4 rounded-lg">
                    {/* Componente de filtros */}
                    <SuppliersFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        filters={filters}
                        setFilters={setFilters}
                        uniqueSupplies={uniqueSupplies}
                        hasActiveFilters={!!hasActiveFilters}
                        onClearFilters={clearFilters}
                    />

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
                                {paginatedSuppliers.paginatedItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            {filteredSuppliers.length === 0 
                                                ? (suppliers.length === 0 
                                                    ? 'No hay proveedores registrados' 
                                                    : 'No se encontraron proveedores que coincidan con los criterios de búsqueda')
                                                : 'No hay elementos en esta página'
                                            }
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedSuppliers.paginatedItems.map((supplier) => (
                                        <tr key={supplier._id} className="border-t hover:bg-gray-50 transition-colors">
                                            <td className="p-3">
                                                <span className="font-medium">{supplier.supplierName}</span>
                                            </td>
                                            <td className="p-3">{supplier.contact}</td>
                                            <td className="p-3">
                                                <Link to={`/suppliers/${supplier._id}`}>
                                                    <button className="cursor-pointer bg-[#505341] text-white px-3 py-1 rounded-md hover:bg-[#404030] transition-colors">
                                                        Ver detalle
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    className="cursor-pointer bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500 transition-colors"
                                                    onClick={() => openEditModal(supplier)}
                                                    title="Editar proveedor"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    className="cursor-pointer bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                                                    onClick={() => handleDeleteSupplier(supplier._id)}
                                                    title="Eliminar proveedor"
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

                    {/* Controles de paginación */}
                    <PaginationControls
                        currentPage={paginatedSuppliers.currentPage}
                        totalPages={paginatedSuppliers.totalPages}
                        totalItems={paginatedSuppliers.totalItems}
                        startItem={paginatedSuppliers.startItem}
                        endItem={paginatedSuppliers.endItem}
                        canGoPrev={paginatedSuppliers.canGoPrev}
                        canGoNext={paginatedSuppliers.canGoNext}
                        onGoToPage={paginatedSuppliers.goToPage}
                        onPrevPage={paginatedSuppliers.prevPage}
                        onNextPage={paginatedSuppliers.nextPage}
                        onGoToFirstPage={paginatedSuppliers.goToFirstPage}
                        onGoToLastPage={paginatedSuppliers.goToLastPage}
                    />
                </div>
            </div>

            {isModalOpen && <CreateProviderView onClose={closeModal} />}
            {isEditModalOpen && selectedSupplier && (
                <EditSuppliersView
                    // supplier={selectedSupplier}
                    onClose={closeEditModal}
                    // onSuccess={handleEditSuccess}
                />
            )}
        </div>
    )
}