import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import ProductDetailsView from "./views/Products/ProductDetailsView";
import OrdersListView from "./views/Orders/OrdersListView";
import OrderDetailsView from "./views/Orders/OrderDetailsView";


// IMPORTACIONES DE SUPPLIERS Y SUPPLIES
import SupplierstList from "./views/Suppliers/SuppliersListView";
import SupplierDetailsView from "./views/Suppliers/SuppliersDetailsView";
import SuppliesList from "./views/Supplies/SuppliesListView";
import SuppliesDetailsView from "./views/Supplies/SuppliesDetailsView";

// IMPORTACIONES DE CAJA
import CashClosingView from "./views/CashClosing/CashClosingView";
import LoginView from "./views/Auth/LoginView";
import RegisterView from "./views/Auth/RegisterView";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./layouts/ProtectedRoute";

// AVISO DE PRIVACIDAD
import PrivacyPolicyView from "./views/PrivacyPolicyView";


export default function Router() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/auth/login" element={<LoginView />} />
                <Route path="/auth/register" element={<RegisterView />} />

                <Route element={<ProtectedRoute />}>
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
                        <Route path="/suppliers/:id" />

                    // SUPPLIES
                        <Route path="/supplies" element={<SuppliesList />} />
                        <Route path="/supplies/:id" element={<SuppliesDetailsView />} />

                    //caja
                        <Route path="/cash-closing" element={<CashClosingView />} />

                         //aviso de privacidad
                        <Route path="/aviso-privacidad" element={<PrivacyPolicyView />} />
                    </Route>
                    </Route>
            </Routes>
        </AuthProvider>
    )
}
