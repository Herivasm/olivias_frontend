import { Pencil, Trash2, Filter, Plus } from 'lucide-react';
import Sidebar from '../../layouts/sidebar';
import { useState } from 'react';
import CreateSuppliesView from './CreateSupplies';
import { Link } from 'react-router-dom';

export default function SuppliesList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
        
        
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);
    

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#f4f5f5]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#505341]">Lista de insumos</h1>
          <button className="bg-[#575B4F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90"
          onClick={openModal}>
            Registrar insumo <Plus size={16} />
          </button>
        </div>

        <div className="bg-[#575B4F] p-4 rounded-lg">
          {/* Filtro y búsqueda */}
          <div className="flex flex-wrap justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="🔍 Buscar insumo..."
              className="flex-1 p-2 rounded-md w-full md:w-3/4 bg-white"
            />
            <button className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2">
              Filtrar <Filter size={16} />
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-[#f3f1dd] rounded-md overflow-hidden">
              <thead className="text-left font-semibold">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3">Proveedor</th>
                  <th className="p-3">Nombre del insumo</th>
                  <th className="p-3">Gramaje</th> {/* Agregado */}
                  <th className="p-3">Stock</th>
                  <th className="p-3">Medida</th>
                  <th className="p-3">Detalle</th>
                  <th className="p-3">Editar</th>
                  <th className="p-3">Eliminar</th>
                </tr>
              </thead>
              <tbody className="bg-white text-[#333]">
                <tr className="border-t">
                  <td className="p-3 rounded-lg">
                    <input
                      type="checkbox"
                      className="appearance-none w-5 h-5 border border-gray-400 rounded-md checked:bg-[#505341] checked:border-transparent focus:outline-none"
                    />
                  </td>
                  <td className="p-3">Proveedor ABC</td>
                  <td className="p-3">Azúcar refinada</td>
                  <td className="p-3">1</td> 
                  <td className="p-3">150</td>
                  <td className="p-3">Kg</td>
                  <td className="p-3">
                     <Link to={"/supplies/:suppliersId"}>
                      <button className="bg-[#505341] text-white px-3 py-1 rounded-md">Ver detalle</button>
                     </Link>
                   
                  </td>
                  <td className="p-3">
                    <button className="bg-yellow-400 text-black p-2 rounded-md">
                      <Pencil size={16} />
                    </button>
                  </td>
                  <td className="p-3">
                    <button className="bg-red-600 text-white p-2 rounded-md">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
       {isModalOpen && <CreateSuppliesView onClose={closeModal} />}
                              
    </div>
  );
}
