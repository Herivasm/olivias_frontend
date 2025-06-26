import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import ProductDetailsView from "./views/Products/ProductDetailsView";
import OrdersListView from "./views/Orders/OrdersListView";
// import Sidebar from "./layouts/sidebar";
import OrderDetailsView from "./views/Orders/OrderDetailsView";


// IMPORTACIONES DE SUPPLIERS Y SUPPLIES
import SupplierstList from "./views/Suppliers/SuppliersListView";
import SupplierDetailsView from "./views/Suppliers/SuppliersDetailsView";
import SuppliesList from "./views/Supplies/SuppliesListView";
import EditSuppliers from "./views/Suppliers/EditSuppliersView";
import SuppliesDetailsView from "./views/Supplies/SuppliesDetailsView";

// IMPORTACIONES DE CAJA
import CashClosingView from "./views/CashClosing/CashClosingView";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>

                    // PRODUCTOS
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/products/:productId" element={<ProductDetailsView />} />

                    // ORDENES
                    <Route path="/orders" element={<OrdersListView />} />
                    <Route path="/orders/:orderId" element={<OrderDetailsView />} />

                    // SUPPLIERS
                    <Route path="/suppliers" element={<SupplierstList />} />
                    <Route path="/suppliers/:id" element={<SupplierDetailsView />} />
                    <Route path="/suppliers/:id" element={<EditSuppliers onClose={() => { }} />} />

                    // SUPPLIES
                    <Route path="/supplies" element={<SuppliesList />} />
                    <Route path="/supplies/:id" element={<SuppliesDetailsView />} />

                    //caja
                    <Route path="/cash-closing" element={<CashClosingView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
