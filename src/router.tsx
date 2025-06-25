import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProductView from "./views/Products/CreateProductView";
import ProductDetailsView from "./views/Products/ProductDetailsView";
import EditProductView from "./views/Products/EditProductView";
import ProductList from "./views/Products/ProductList";
import OrdersListView from "./views/Orders/OrdersListView";
// import Sidebar from "./layouts/sidebar";

import CategoryOrderView from "./views/Orders/CategoryOrderView";
import OrderDeailsView from "./views/Orders/OrderDetailsView";
import AddProductsOrderView from "./views/Orders/AddProductsOrderView";


// IMPORTACIONES DE SUPPLIERS Y SUPPLIES
import SupplierstList from "./views/Suppliers/SuppliersListView";
import SupplierDetailsView from "./views/Suppliers/SuppliersDetailsView";
import SuppliesList from "./views/Supplies/SuppliesListView";
import EditSuppliers from "./views/Suppliers/EditSuppliersView";
import SuppliesDetailsView from "./views/Supplies/SuppliesDetailsView";

// IMPORTACIONES DE CAJA
import CajaView from "./views/caja/CajaListView";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>

                    // PRODUCTOS
                    <Route path="/products" element={<DashboardView />} index />
                    <Route path="/products/create" element={<CreateProductView onClose={() => { }} />} />
                    <Route path="/products/:productId" element={<ProductDetailsView/>} />
                    <Route path="/products/:productId/edit" element={<EditProductView onClose={() => { }} />} />

                    // ORDENES
                    <Route path="/orders" element={<OrdersListView />} />
                    <Route path="/orders/category" element={<CategoryOrderView />} />
                    <Route path="/orders/details" element={<OrderDeailsView/>} />
                    <Route path="/orders/addProductOrder" element={<AddProductsOrderView/>} />



                    // SUPPLIERS
                    <Route path="/suppliers" element={<SupplierstList />} />
                    <Route path="/suppliers/:id" element={<SupplierDetailsView/>} />
                    <Route path="/suppliers/:id" element={<EditSuppliers onClose={() => { }} />} />

                    // SUPPLIES
                    <Route path="/supplies" element={<SuppliesList/>} />
                    <Route path="/supplies/:id" element={<SuppliesDetailsView/>} />

                    //caja
                    <Route path="/caja" element={<CajaView/>} />

                    
                    


                    
                    

                </Route>
            </Routes>
        </BrowserRouter>
    )
}
