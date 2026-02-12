import Task from "../models/Task.js"
import Project from "../models/Project.js"
import User from "../models/User.js"

export const createTask = async (req, res) => {
const { title, projectId, assignedTo } = req.body

const project = await Project.findOne({
    _id: projectId,
    organizationId: req.user.organizationId
})

if (!project) {
    return res.status(404).json({ message: "Project not found" })
}

if (assignedTo) {
    const user = await User.findOne({
    _id: assignedTo,
    organizationId: req.user.organizationId
    })

    if (!user) {
    return res.status(400).json({ message: "Invalid assigned user" })
    }
}

const task = await Task.create({
    title,
    projectId,
    organizationId: req.user.organizationId,
    assignedTo
})

res.status(201).json(task)
}

export const getTasks = async (req, res) => {
const { projectId } = req.query

const filter = {
    organizationId: req.user.organizationId
}

if (projectId) {
    filter.projectId = projectId
}

const tasks = await Task.find(filter)

res.json(tasks)
}

export const updateTaskStatus = async (req, res) => {
const { status } = req.body

const task = await Task.findOne({
    _id: req.params.id,
    organizationId: req.user.organizationId
})

if (!task) {
    return res.status(404).json({ message: "Task not found" })
}

task.status = status
await task.save()

res.json(task)
}
