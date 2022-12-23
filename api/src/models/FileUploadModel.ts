import { Schema, model } from "mongoose";

const FileUploadSchema = new Schema({
  filename: String
})

export const FileUploadModel = model("FileUpload", FileUploadSchema) 