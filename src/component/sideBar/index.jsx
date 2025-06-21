import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router";
import { FaRegUserCircle, FaPlus, FaHistory, FaChartBar, IoLogOut, IoHome } from '../../icons'

const Sidebar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("currentUser"))
        if (data) {
            setUser(data)
        } else {
            navigate("/login")
        }
    }, [])


    const handleLogOut = () => {
        Swal.fire({
            title: "Sign out of account?",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout",
            cancelButtonText: "Cancelled"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("isLogin")
                localStorage.removeItem("currentUser")
                navigate("/login")
                Swal.fire({
                    title: "Logout Successfully",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        })
    }


    return (
        <div className="flex flex-col justify-between bg-white/10 w-[260px] p-8 shadow-md border-r border-white/10 min-h-screen">
            <div className="flex flex-col items-center gap-2">
                <FaRegUserCircle size={64} className="text-white/80" />
                <h2 className="text-2xl text-white font-bold">{user?.name}</h2>
                <span className="text-sm text-blue-300">Daily Financial Records</span>
                <nav className="mt-10 w-full">
                    <ul className="flex flex-col gap-4 text-white font-medium">
                        <li>
                            <Link
                                to="/home"
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all cursor-pointer"
                            >
                                <IoHome size={20} />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/transaction"
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all cursor-pointer"
                            >
                                <FaPlus size={20} />
                                Add Transaction
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/history"
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all cursor-pointer"
                            >
                                <FaHistory size={20} />
                                History
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/report"
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all cursor-pointer"
                            >
                                <FaChartBar size={20} />
                                Report
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="w-full">
                <button
                    className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
                    onClick={handleLogOut}
                >
                    <IoLogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar
