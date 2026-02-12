import Project from "../models/Project.js"

export const createProject = async (req, res) => {
    const { name } = req.body

    const project = await Project.create({
        name,
        organizationId: req.user.organizationId,
        createdBy: req.user._id,
        members: [req.user._id]
    })

    res.status(201).json(project)
}

export const getProjects = async (req, res) => {
    const projects = await Project.find({
        organizationId: req.user.organizationId
    })

    res.json(projects)
}

export const deleteProject = async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id,
        organizationId: req.user.organizationId
    })

    if (!project) {
        return res.status(404).json({ message: "Project not found" })
    }

    await project.deleteOne()

    res.json({ message: "Project deleted" })
    
}
