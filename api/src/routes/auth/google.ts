import { Router, Request, Response } from "express"
import passport from "passport"


const router = Router()

router.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
)

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/error",
  })
)

export default router