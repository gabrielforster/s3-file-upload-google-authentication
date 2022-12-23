import { Request, Response } from "express";
import { s3 } from "../lib/s3";
import { FileUploadModel } from "../models/FileUploadModel";

export async function uploadFileController(req: Request, res: Response) {
  const file = req.file!!;

  const upload = new FileUploadModel();
  upload.filename = file.originalname;
  const createdFile = await upload.save();

  await s3
    .putObject({
      Key: file.originalname,
      Bucket: process.env.BUCKET_NAME as string,
      Body: file.buffer,
    })
    .promise();

  res.json(createdFile);
}
