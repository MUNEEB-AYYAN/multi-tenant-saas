import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance"
// import Navbar from "../components/Navbar"
import Layout from "../components/Layout"

const Projects = () => {
const [projects, setProjects] = useState([])
const [name, setName] = useState("")
const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

const fetchProjects = async () => {
try {
    const res = await axiosInstance.get("/projects")
    setProjects(res.data)
} catch (err) {
    setError("Failed to load projects",err)
}
}

useEffect(() => {
fetchProjects()
}, [])

const handleCreate = async (e) => {
e.preventDefault()

if (!name.trim()) return

try {
    setLoading(true)
    const res = await axiosInstance.post("/projects", {
    name
    })

    setProjects([...projects, res.data])
    setName("")
} catch (err) {
    setError(err.response?.data?.message || "Creation failed")
} finally {
    setLoading(false)
}
}

const handleDelete = async (id) => {
try {
    await axiosInstance.delete(`/projects/${id}`)
    setProjects(projects.filter((p) => p._id !== id))
} catch (err) {
    setError("Delete failed",err)
}
}

return (
<Layout>
    <h1 className="text-3xl font-bold mb-8">
    Projects
    </h1>

    {error && (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1 flex justify-between items-center"
>
        {error}
    </div>
    )}

    {/* Create Form */}
    <form
    onSubmit={handleCreate}
    className="flex gap-4 mb-10"
    >
    <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
    >
        {loading ? "Creating..." : "Create"}
    </button>
    </form>

    {/* Project List */}
    <div className="space-y-4">
    {projects.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-400">
            No projects yet. Create your first one.
        </div>
    ) : (
        projects.map((project) => (
        <div
            key={project._id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1 flex justify-between items-center"

        >
            <span className="font-medium text-lg">
            {project.name}
            </span>

            <button
            onClick={() => handleDelete(project._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
            Delete
            </button>
        </div>
        ))
    )}
    </div>
</Layout>
)

}

export default Projects
