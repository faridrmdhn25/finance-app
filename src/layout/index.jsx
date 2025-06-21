import { Outlet } from "react-router"
import Sidebar from "../component/sideBar"

const Layout = () => {
     return (
        <div className="flex bg-[#081b29] min-h-screen text-white">
            <Sidebar />
            <div className="flex-1 p-10 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout