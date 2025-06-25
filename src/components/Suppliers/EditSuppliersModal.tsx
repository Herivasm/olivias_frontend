import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { updateSupplier, type Supplier } from '../../api/SuppliersAPI';
import { toast } from 'react-toastify';

interface EditSuppliersModalProps {
  onClose: () => void;
  supplier: Supplier;
  onSuccess: () => void;
}

export default function EditSuppliersModal({ onClose, supplier, onSuccess }: EditSuppliersModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: '',
    contact: ''
  });
  const [errors, setErrors] = useState({
    supplierName: '',
    contact: ''
  });

  // Cargar datos del proveedor al montar el componente
  useEffect(() => {
    if (supplier) {
      setFormData({
        supplierName: supplier.supplierName,
        contact: supplier.contact
      });
    }
  }, [supplier]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      supplierName: '',
      contact: ''
    };

    if (!formData.supplierName.trim()) {
      newErrors.supplierName = 'El nombre del proveedor es obligatorio';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'El contacto es obligatorio';
    }

    setErrors(newErrors);
    return !newErrors.supplierName && !newErrors.contact;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await updateSupplier(supplier._id, {
        supplierName: formData.supplierName.trim(),
        contact: formData.contact.trim()
      });
      
      onSuccess();
      onClose();
      toast.success('Proveedor actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      toast.error('Error al actualizar el proveedor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="bg-[#575B4F] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">EDITAR PROVEEDOR</h2>
          <button 
            className="text-white hover:text-gray-300 transition-colors" 
            onClick={onClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENIDO */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del proveedor *
              </label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F] ${
                  errors.supplierName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese el nombre del proveedor"
                disabled={loading}
              />
              {errors.supplierName && (
                <p className="text-red-500 text-sm mt-1">{errors.supplierName}</p>
              )}
            </div>

            {/* Contacto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contacto *
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#575B4F] focus:border-[#575B4F] ${
                  errors.contact ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese el contacto (teléfono, email, etc.)"
                disabled={loading}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
              )}
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
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}