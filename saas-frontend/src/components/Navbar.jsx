import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
const { logout } = useContext(AuthContext)
const navigate = useNavigate()

const handleLogout = () => {
    logout()
    navigate("/")
}

return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
    <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
    </div>

    <button
        onClick={handleLogout}
        className="bg-red-600 px-3 py-1 rounded"
    >
        Logout
    </button>
    </div>
)
}

export default Navbar
