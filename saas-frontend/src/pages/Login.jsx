import { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import { AuthContext } from "../context/AuthContext"
import Loader_n from "../components/Loader_n"

const Login = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)

const navigate = useNavigate()
const { token, login } = useContext(AuthContext)

// Auto redirect if already logged in
useEffect(() => {
if (token) {
    navigate("/dashboard")
}
}, [token, navigate])

const handleSubmit = async (e) => {
e.preventDefault()
setError("")
setLoading(true)

try {
    const res = await axiosInstance.post("/auth/login", {
    email,
    password
    })

    login(res.data.token)
    navigate("/dashboard")
} catch (err) {
    setError(
    err.response?.data?.message || "Login failed"
    )
} finally {
    setLoading(false)
}
}

return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Welcome Back
    </h2>

    {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-6 text-sm">
        {error}
        </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-5">
        <div>
        <label className="block text-sm mb-1 text-gray-600">
            Email
        </label>
        <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        </div>

        <div>
        <label className="block text-sm mb-1 text-gray-600">
            Password
        </label>
        <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>

        <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-green-300 text-white py-3 rounded-lg transition disabled:opacity-50"
        >
        {loading ? <Loader_n /> : "Login"}
        </button>
    </form>

    <p className="text-sm mt-6 text-center text-gray-600">
        Don’t have an account?{" "}
        <Link
        to="/register"
        className="text-blue-600 font-semibold hover:underline"
        >
        Register
        </Link>
    </p>
    </div>
</div>
)
}

export default Login
