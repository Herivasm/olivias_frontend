import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Logo from "../components/Logo";

export default function AppLayout() {
    return (
        <>
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-64">
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>
            </div>

            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
