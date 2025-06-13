import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProductView from "./views/Products/CreateProductView";
import ProductDetailsView from "./views/Products/ProductDetailsView";
import EditProductView from "./views/Products/EditProductView";
import ProductList from "./views/Products/ProductList";
import OrdersListView from "./views/Orders/OrdersListView";
import Sidebar from "./layouts/sidebar";
import CategoryOrderView from "./views/Orders/CategoryOrderView";
import OrderDeailsView from "./views/Orders/OrderDetailsView";
import AddProductsOrderView from "./views/Orders/AddProductsOrderView";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/products/create" element={<CreateProductView onClose={() => { }} />} />
                    <Route path="/products/:productId" element={<ProductDetailsView/>} />
                    <Route path="/products/:productId/edit" element={<EditProductView onClose={() => { }} />} />

                    // ORDENES
                    <Route path="/orders" element={<OrdersListView />} />
                    <Route path="/orders/category" element={<CategoryOrderView />} />
                    <Route path="/orders/details" element={<OrderDeailsView/>} />
                    <Route path="/orders/addProductOrder" element={<AddProductsOrderView/>} />


                </Route>
            </Routes>
        </BrowserRouter>
    )
}
