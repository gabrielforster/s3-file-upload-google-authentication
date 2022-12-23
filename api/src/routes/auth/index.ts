import { Router, Request, Response } from "express"

import googleRouter from "./google"

const router = Router()

router.use("/google", googleRouter)

export default router