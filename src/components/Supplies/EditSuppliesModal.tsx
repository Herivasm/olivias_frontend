import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllSuppliers, updateSupply, type Supplier, type Supply } from '../../api/SuppliesAPI';
import { toast } from "react-toastify"


interface EditSuppliesModalProps {
  onClose: () => void;
  supply: Supply;
  onSuccess: () => void;
}

export default function EditSuppliesModal({ onClose, supply, onSuccess }: EditSuppliesModalProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplyName: supply.supplyName,
    measure: supply.measure,
    stock: supply.stock,
    supplier: supply.supplier._id
  });

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error('Error al cargar proveedores:', error);
      }
    }

    fetchSuppliers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateSupply(supply._id, formData);
      onSuccess();
      onClose();
      toast.success("Insumo actualizado exitosamente");
    } catch (error) {
      console.error('Error al actualizar el insumo:', error);
      toast.error("Error al actualizar el insumo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">EDITAR INSUMO</h2>
          <button className="text-white hover:text-gray-300 transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* CONTENIDO */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Proveedor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proveedor</label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              >
                <option value="">Selecciona un proveedor</option>
                {suppliers.map((supplier) => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </div>

            {/* Nombre del insumo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del insumo</label>
              <input
                type="text"
                name="supplyName"
                value={formData.supplyName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F]"
              />
            </div>
          </div>

          {/* Medida */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Medida</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="measure"
                  value="litros"
                  checked={formData.measure === 'litros'}
                  onChange={handleInputChange}
                  className="text-[#575B4F] focus:ring-[#575B4F]"
                />
                <span>Litros</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="measure"
                  value="kilos"
                  checked={formData.measure === 'kilos'}
                  onChange={handleInputChange}
                  className="text-[#575B4F] focus:ring-[#575B4F]"
                />
                <span>Kilos</span>
              </label>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#575B4F] text-white rounded-md hover:opacity-90 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}