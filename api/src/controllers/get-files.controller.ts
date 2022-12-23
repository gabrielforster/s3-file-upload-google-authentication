import { Request, Response } from "express"
import { FileUploadModel } from "../models/FileUploadModel";

export async function getFilesController(req: Request, res: Response) {
  const files = await FileUploadModel.find();
  res.json(files);
}
