import { Router, Response, Request } from "express"
import multer from "multer"
const upload = multer()

import { isAuthenticated } from "../middlewares/isAuthenticated"

import { getFilesController } from "../controllers/get-files.controller"
import { getSingleFile } from "../controllers/get-single-file.controller"
import { uploadFileController } from "../controllers/upload-file.controller"

const router = Router()

router.get("/", isAuthenticated, getFilesController)

router.get("/:filename", isAuthenticated, getSingleFile)

router.post("/", isAuthenticated, upload.single("file"), uploadFileController)

export default router