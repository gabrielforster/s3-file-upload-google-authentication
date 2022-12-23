import S3 from "aws-sdk/clients/s3"

export const s3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: "sa-east-1",
  s3ForcePathStyle: true
})