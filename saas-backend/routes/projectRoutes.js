import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { authorize } from "../middleware/roleMiddleware.js"
import {createProject,getProjects,deleteProject} from "../controllers/projectController.js"

const router = express.Router()

router.post(
    "/",
    protect,
    authorize("owner", "admin"),
    createProject
)

router.get(
    "/",
    protect,
    getProjects
)

router.delete(
    "/:id",
    protect,
    authorize("owner", "admin"),
    deleteProject
)

export default router
