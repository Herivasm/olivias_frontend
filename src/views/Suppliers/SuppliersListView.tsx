import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, Eye } from 'lucide-react'
import CreateProviderView from './CreateSuppliersView'
import EditSuppliersView from './EditSuppliersView'
import DeleteSupplierConfirmationModal from '../../components/Suppliers/DeleteSuppliersConfirmationModal'
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
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

    const openDeleteModal = (supplier: Supplier) => {
        setSelectedSupplier(supplier)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setSelectedSupplier(null)
    }

    const handleEditSuccess = () => {
        fetchSuppliers()
    }

    const handleDeleteSuccess = () => {
        fetchSuppliers()
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
                                    <th className="p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-[#333]">
                                {paginatedSuppliers.paginatedItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-gray-500">
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
                                                <div className="flex justify-center items-center gap-2">
                                                    <Link to={`/suppliers/${supplier._id}`} title="Ver detalle">
                                                        <button className="bg-blue-500  text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
                                                            <Eye size={16}  />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        className="bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500 transition-colors cursor-pointer"
                                                        onClick={() => openEditModal(supplier)}
                                                        title="Editar proveedor"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                                                        onClick={() => openDeleteModal(supplier)}
                                                        title="Eliminar proveedor"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
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

            {/* MODALES */}
            {isModalOpen && <CreateProviderView onClose={closeModal} />}

            {isEditModalOpen && selectedSupplier && (
                <EditSuppliersView
                    supplier={selectedSupplier}
                    onClose={closeEditModal}
                    onSuccess={handleEditSuccess}
                />
            )}

            {isDeleteModalOpen && selectedSupplier && (
                <DeleteSupplierConfirmationModal
                    supplier={selectedSupplier}
                    onClose={closeDeleteModal}
                    onSuccess={handleDeleteSuccess}
                />
            )}
        </div>
    )
}
