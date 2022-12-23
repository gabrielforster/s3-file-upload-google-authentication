import { Request, Response } from "express"
import { s3 } from "../lib/s3"

export async function getSingleFile(req: Request, res: Response) {
  const data = await s3
    .getObject({
      Key: req.params.filename,
      Bucket: process.env.BUCKET_NAME as string,
    })
    .promise();
  res.attachment(req.params.filename);
  res.type(data.ContentType as string);
  res.send(data.Body);
}
