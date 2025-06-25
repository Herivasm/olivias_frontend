
import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import CreateSuppliesView from './CreateSuppliesView'
import EditSuppliesView from './EditSuppliesView'
import DeleteConfirmationModal from '../../components/Supplies/DeleteConfirmationModal'
import SuppliesFilters from '../../components/Supplies/SuppliesFilters'
import PaginationControls from '../../components/PaginationControls'
import { Link } from 'react-router-dom'
import { getAllSupplies, type Supply } from '../../api/SuppliesAPI'
import { useSuppliesFilters } from '../../components/Supplies/useSuppliesFilters'
import { usePagination } from '../../components/usePagination'

export default function SuppliesList() {
  const [supplies, setSupplies] = useState<Supply[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null)


  const pagination = usePagination([], { itemsPerPage: 10 })


  const {
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    filteredSupplies,
    uniqueSuppliers,
    clearFilters,
    hasActiveFilters
  } = useSuppliesFilters(supplies, pagination.resetPagination)

  const paginatedSupplies = usePagination(filteredSupplies, { itemsPerPage: 10 })

  const fetchSupplies = async () => {
    try {
      const data = await getAllSupplies()
      setSupplies(data)
    } catch (error) {
      console.error('Error al cargar insumos:', error)
    }
  }

  useEffect(() => {
    fetchSupplies()
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  
  const openEditModal = (supply: Supply) => {
    setSelectedSupply(supply)
    setIsEditModalOpen(true)
  }
  
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedSupply(null)
  }

  const openDeleteModal = (supply: Supply) => {
    setSelectedSupply(supply)
    setIsDeleteModalOpen(true)
  }
  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedSupply(null)
  }

  const handleEditSuccess = () => {
    fetchSupplies() 
  }

  const handleDeleteSuccess = () => {
    fetchSupplies() 
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <div className="flex-1 p-6 bg-[#f4f5f5]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#505341]">Lista de insumos</h1>
          <button
            className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 cursor-pointer"
            onClick={openModal}
          >
            Registrar insumo <Plus size={16} />
          </button>
        </div>

        <div className="bg-[#575B4F] p-4 rounded-lg">
          {/* Componente de filtros */}
          <SuppliesFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
            uniqueSuppliers={uniqueSuppliers}
            hasActiveFilters={!!hasActiveFilters}
            onClearFilters={clearFilters}
          />

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-[#f3f1dd] rounded-md overflow-hidden">
              <thead className="text-left font-semibold">
                <tr>
                  <th className="p-3">Proveedor</th>
                  <th className="p-3">Nombre del insumo</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Medida</th>
                  <th className="p-3">Detalle</th>
                  <th className="p-3">Editar</th>
                  <th className="p-3">Eliminar</th>
                </tr>
              </thead>
              <tbody className="bg-white text-[#333]">
                {paginatedSupplies.paginatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      {filteredSupplies.length === 0 
                        ? (supplies.length === 0 
                          ? 'No hay insumos registrados' 
                          : 'No se encontraron insumos que coincidan con los criterios de búsqueda')
                        : 'No hay elementos en esta página'
                      }
                    </td>
                  </tr>
                ) : (
                  paginatedSupplies.paginatedItems.map((supply) => (
                    <tr key={supply._id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="p-3">{supply.supplier?.supplierName ?? 'Sin proveedor'}</td>
                      <td className="p-3">
                        <span className="font-medium">{supply.supplyName}</span>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          supply.stock < 10 
                            ? 'bg-red-100 text-red-800' 
                            : supply.stock < 50 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {supply.stock}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="capitalize">{supply.measure}</span>
                      </td>
                      <td className="p-3">
                        <Link to={`/supplies/${supply._id}`}>
                          <button className="bg-[#505341] text-white px-3 py-1 rounded-md hover:bg-[#404030] transition-colors cursor-pointer">
                            Ver detalle
                          </button>
                        </Link>
                      </td>
                      <td className="p-3">
                        <button
                          className="bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500 transition-colors cursor-pointer"
                          onClick={() => openEditModal(supply)}
                          title="Editar insumo"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                      <td className="p-3">
                        <button 
                          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                          onClick={() => openDeleteModal(supply)}
                          title="Eliminar insumo"
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
            currentPage={paginatedSupplies.currentPage}
            totalPages={paginatedSupplies.totalPages}
            totalItems={paginatedSupplies.totalItems}
            startItem={paginatedSupplies.startItem}
            endItem={paginatedSupplies.endItem}
            canGoPrev={paginatedSupplies.canGoPrev}
            canGoNext={paginatedSupplies.canGoNext}
            onGoToPage={paginatedSupplies.goToPage}
            onPrevPage={paginatedSupplies.prevPage}
            onNextPage={paginatedSupplies.nextPage}
            onGoToFirstPage={paginatedSupplies.goToFirstPage}
            onGoToLastPage={paginatedSupplies.goToLastPage}
          />
        </div>
      </div>

      {isModalOpen && <CreateSuppliesView onClose={closeModal} />}
      {isEditModalOpen && selectedSupply && (
        <EditSuppliesView 
          supply={selectedSupply}
          onClose={closeEditModal}
          onSuccess={handleEditSuccess}
        />
      )}
      {isDeleteModalOpen && selectedSupply && (
        <DeleteConfirmationModal 
          supply={selectedSupply}
          onClose={closeDeleteModal}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  )
}