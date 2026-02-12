import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Layout = ({ children }) => {
const { logout } = useContext(AuthContext)
const navigate = useNavigate()

const handleLogout = () => {
    logout()
    navigate("/")
}

return (
    <div className="min-h-screen flex bg-gray-100">
    {/* Sidebar */}
    <div className="w-64 bg-white shadow-xl p-8 flex flex-col justify-between">

        <div>
        <h2 className="text-2xl font-bold mb-10 text-blue-600">
            SaaS Panel
        </h2>

        <nav className="flex flex-col gap-4">
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${
                    isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "hover:bg-gray-100"
                    }`
                }
                >
                Dashboard
            </NavLink>

            <NavLink
            to="/projects"
            className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${
                    isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "hover:bg-gray-100"
                    }`
                }
            >
            Projects
            </NavLink>
            <NavLink
            to="/tasks"
            className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${
                    isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "hover:bg-gray-100"
                    }`
                }
            >
            Tasks
            </NavLink>
        </nav>
        </div>

        <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
        Logout
        </button>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8">
        {children}
    </div>
    </div>
)
}

export default Layout
