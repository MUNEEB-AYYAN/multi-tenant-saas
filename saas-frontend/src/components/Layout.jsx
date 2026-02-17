import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

const Layout = ({ children }) => {
const { logout } = useContext(AuthContext)
const navigate = useNavigate()
const [open, setOpen] = useState(false)

const handleLogout = () => {
    logout()
    navigate("/")
}

return (
    <div className="min-h-screen bg-gray-100 flex">
    {/* Sidebar */}
    <div
        className={`fixed md:static z-20 top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
        <div className="p-6 flex justify-between items-center md:hidden">
        <h2 className="text-xl font-bold text-blue-600">
            SaaS
        </h2>
        <button className="px-6 py-2 rounded-lg font-medium transition transform hover:scale-105"
        onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="p-8 flex flex-col justify-between h-full">
        <div>
            <h2 className="hidden md:block text-2xl font-bold mb-10 text-blue-600">
            SaaS Panel
            </h2>

            <nav className="flex flex-col gap-3">
            {["dashboard", "projects", "tasks"].map(
                (route) => (
                <NavLink
                    key={route}
                    to={`/${route}`}
                    className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition capitalize ${
                        isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "hover:bg-gray-100"
                    }`
                    }
                >
                    {route}
                </NavLink>
                )
            )}
            </nav>
        </div>

        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
            Logout
        </button>
        </div>
    </div>

    {/* Overlay for mobile */}
    {open && (
        <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-30 md:hidden"
        />
    )}

    {/* Main Content */}
    <div className="flex-1 md:ml-0 p-6 md:p-10 w-full">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
            onClick={() => setOpen(true)}
            className="text-2xl"
        >
            ☰
        </button>
        </div>

        {children}
    </div>
    </div>
)
}

export default Layout
