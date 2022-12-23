import { Request, Response, NextFunction } from "express"

interface MiddlewareRequest extends Request {
  isAuthenticated: () => boolean
}

export function isAuthenticated(req: MiddlewareRequest, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      error: "unauthenticated",
    });
  }
}