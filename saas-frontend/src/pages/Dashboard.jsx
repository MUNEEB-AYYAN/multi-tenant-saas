import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import axiosInstance from "../utils/axiosInstance"

const Dashboard = () => {
const [projectsCount, setProjectsCount] = useState(0)
const [tasksCount, setTasksCount] = useState(0)
const [organizationId, setOrganizationId] = useState("")
const [loading, setLoading] = useState(true)

useEffect(() => {
    const fetchData = async () => {
    try {
        const projectsRes = await axiosInstance.get("/projects")
        setProjectsCount(projectsRes.data.length)

        const tasksRes = await axiosInstance.get("/tasks")
        setTasksCount(tasksRes.data.length)

        const token = localStorage.getItem("token")
        if (token) {
        const payload = JSON.parse(
            atob(token.split(".")[1])
        )
        setOrganizationId(payload.organizationId)
        }
    } catch (error) {
        console.error("Dashboard load failed",error)
    } finally {
        setLoading(false)
    }
    }

    fetchData()
}, [])

return (
    <Layout>
    <h1 className="text-3xl font-bold mb-8">
        Dashboard
    </h1>

    {loading ? (
        <p>Loading...</p>
    ) : (
        <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">
            Total Projects
            </h2>
            <p className="text-3xl font-bold mt-2">
            {projectsCount}
            </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">
            Total Tasks
            </h2>
            <p className="text-3xl font-bold mt-2">
            {tasksCount}
            </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">
            Organization ID
            </h2>
            <p className="text-sm mt-2 break-all">
            {organizationId}
            </p>
        </div>
        </div>
    )}
    </Layout>
)
}

export default Dashboard
