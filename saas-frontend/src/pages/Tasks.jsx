import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance"
import Navbar from "../components/Navbar"
import Layout from "../components/Layout"


const Tasks = () => {
const [projects, setProjects] = useState([])
const [selectedProject, setSelectedProject] = useState("")
const [tasks, setTasks] = useState([])
const [title, setTitle] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)

// Fetch projects
const fetchProjects = async () => {
try {
const res = await axiosInstance.get("/projects")
setProjects(res.data)

if (res.data.length > 0) {
setSelectedProject(res.data[0]._id)
}
} catch {
setError("Failed to load projects")
}
}

// Fetch tasks by project
const fetchTasks = async (projectId) => {
if (!projectId) return

try {
const res = await axiosInstance.get(
`/tasks?projectId=${projectId}`
)
setTasks(res.data)
} catch {
setError("Failed to load tasks")
}
}

useEffect(() => {
fetchProjects()
}, [])

useEffect(() => {
if (selectedProject) {
fetchTasks(selectedProject)
}
}, [selectedProject])

const handleCreate = async (e) => {
e.preventDefault()
if (!title.trim()) return

try {
setLoading(true)
const res = await axiosInstance.post("/tasks", {
title,
projectId: selectedProject
})

setTasks([...tasks, res.data])
setTitle("")
} catch (err) {
setError(err.response?.data?.message || "Creation failed")
} finally {
setLoading(false)
}
}

const handleStatusChange = async (taskId, status) => {
try {
const res = await axiosInstance.put(
`/tasks/${taskId}`,
{ status }
)

setTasks(
tasks.map((task) =>
    task._id === taskId ? res.data : task
)
)
} catch {
setError("Status update failed")
}
}

return (
<Layout>
<h1 className="text-3xl font-bold mb-8">
Tasks
</h1>

{error && (
<div className="bg-red-100 text-red-600 p-3 rounded mb-6">
    {error}
</div>
)}

{/* Project Selector */}
<div className="mb-8">
<label className="block mb-2 font-medium">
    Select Project
</label>

<select
    value={selectedProject}
    onChange={(e) => setSelectedProject(e.target.value)}
    className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
>
    {projects.map((project) => (
    <option key={project._id} value={project._id}>
        {project.name}
    </option>
    ))}
</select>
</div>

{/* Create Task */}
<form
onSubmit={handleCreate}
className="flex gap-4 mb-10"
>
<input
    type="text"
    placeholder="Task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<button
    type="submit"
    disabled={loading}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
>
    {loading ? "Creating..." : "Add Task"}
</button>
</form>

{/* Task List */}
<div className="space-y-4">
{tasks.length === 0 ? (
    <div className="bg-white p-6 rounded-xl shadow text-gray-500">
    No tasks yet.
    </div>
) : (
    tasks.map((task) => (
    <div
        key={task._id}
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
    >
        <div>
        <p className="font-medium text-lg">
            {task.title}
        </p>

        <span
            className={`mt-2 inline-block px-3 py-1 text-sm rounded-full ${
            task.status === "done"
                ? "bg-green-100 text-green-700"
                : task.status === "in-progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-200 text-gray-700"
            }`}
        >
            {task.status}
        </span>
        </div>

        <select
        value={task.status}
        onChange={(e) =>
            handleStatusChange(task._id, e.target.value)
        }
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
        </select>
    </div>
    ))
)}
</div>
</Layout>
)

}

export default Tasks
