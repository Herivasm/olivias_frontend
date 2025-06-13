import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProductView from "./views/Products/CreateProductView";
import ProductDetailsView from "./views/Products/ProductDetailsView";
import EditProductView from "./views/Products/EditProductView";
import ProductList from "./views/Products/ProductList";
import Sidebar from "./layouts/sidebar";
import SupplierstList from "./views/Suppliers/SuppliersListView";
import SupplierDetailsView from "./views/Suppliers/SuppliersDetailsView";
import SuppliesList from "./views/Supplies/SuppliesListView";
import EditSuppliers from "./views/Suppliers/EditSuppliers";
import SuppliesDetailsView from "./views/Supplies/SuppliesDetailsView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/products/create" element={<CreateProductView onClose={() => { }} />} />
                    <Route path="/products/:productId" element={<ProductDetailsView/>} />
                    <Route path="/products/:productId/edit" element={<EditProductView />} />

                    <Route path="/suppliers" element={<SupplierstList />} />
                    <Route path="/suppliers/:suppliersId" element={<SupplierDetailsView/>} />
                    <Route path="/suppliers/:suppliersId/edit" element={<EditSuppliers />} />

                    <Route path="/supplies" element={<SuppliesList/>} />
                    <Route path="/supplies/:suppliersId" element={<SuppliesDetailsView/>} />

                    
                    


                    
                    

                </Route>
            </Routes>
        </BrowserRouter>
    )
}
