import { X } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { getAllSuppliers, updateSupply, type Supplier, type Supply, type UpdateSupplyData } from '../../api/SuppliesAPI';
import { toast } from "react-toastify"

interface EditSuppliesModalProps {
  onClose: () => void;
  supply: Supply;
  onSuccess: () => void;
}

export default function EditSuppliesModal({ onClose, supply, onSuccess }: EditSuppliesModalProps) {
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<UpdateSupplyData>({
    supplyName: supply.supplyName,
    measure: supply.measure,
    stock: supply.stock,
    suppliers: supply.suppliers.map(s => s._id)
  });

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const data = await getAllSuppliers();
        setAllSuppliers(data);
      } catch (error) {
        console.error('Error al cargar proveedores:', error);
      }
    }
    fetchSuppliers();
  }, []);

  const availableSuppliers = useMemo(() => {
    return allSuppliers.filter(s => !formData.suppliers.includes(s._id));
  }, [allSuppliers, formData.suppliers]);

  const handleAddSupplier = (supplierId: string) => {
    if (supplierId && !formData.suppliers.includes(supplierId)) {
      setFormData(prev => ({
        ...prev,
        suppliers: [...prev.suppliers, supplierId]
      }));
    }
  };

  const handleRemoveSupplier = (supplierId: string) => {
    setFormData(prev => ({
      ...prev,
      suppliers: prev.suppliers.filter(id => id !== supplierId)
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isRadio = e.target.type === 'radio';
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' ? Number(value) : value
    }));

    if (isRadio) {
      setFormData(prev => ({ ...prev, measure: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.suppliers.length === 0) {
      toast.error("Debe seleccionar al menos un proveedor.");
      setLoading(false);
      return;
    }

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
        <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">EDITAR INSUMO</h2>
          <button className="text-white hover:text-gray-300 transition-colors" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del insumo</label>
              <input type="text" name="supplyName" value={formData.supplyName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} min="0" required className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F]" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Proveedores</label>
            <div className="border border-gray-300 rounded-md p-2 min-h-[42px] bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {formData.suppliers.map(id => {
                  const supplier = allSuppliers.find(s => s._id === id);
                  return (
                    <div key={id} className="bg-[#575B4F] text-white flex items-center gap-2 pl-3 pr-2 py-1 rounded-full text-sm">
                      <span>{supplier?.supplierName ?? 'Cargando...'}</span>
                      <button type="button" onClick={() => handleRemoveSupplier(id)} className="bg-white/20 hover:bg-white/40 rounded-full p-0.5">
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
              {availableSuppliers.length > 0 && (
                <select 
                  onChange={(e) => handleAddSupplier(e.target.value)} 
                  value=""
                  className="w-full mt-2 px-3 py-2 border-t border-gray-200 text-gray-600 bg-transparent focus:outline-none"
                >
                  <option value="">+ Añadir proveedor...</option>
                  {availableSuppliers.map(s => <option key={s._id} value={s._id}>{s.supplierName}</option>)}
                </select>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medida</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center space-x-2"><input type="radio" name="measure" value="litros" checked={formData.measure === 'litros'} onChange={handleInputChange} className="text-[#575B4F] focus:ring-[#575B4F]" /><span>Litros</span></label>
              <label className="flex items-center space-x-2"><input type="radio" name="measure" value="kilos" checked={formData.measure === 'kilos'} onChange={handleInputChange} className="text-[#575B4F] focus:ring-[#575B4F]" /><span>Kilos</span></label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
            <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors" onClick={onClose} disabled={loading}>Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-[#575B4F] text-white rounded-md hover:opacity-90 transition-colors disabled:opacity-50" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}