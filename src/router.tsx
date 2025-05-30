import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProductView from "./views/Products/CreateProductView";
import ProductDetailsView from "./views/Products/ProductDetailsView";
import EditProductView from "./views/Products/EditProductView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/products/create" element={<CreateProductView />} />
                    <Route path="/products/:productId" element={<ProductDetailsView />} />
                    <Route path="/products/:productId/edit" element={<EditProductView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
