# S3 File Upload with Google Authentication
Simple fullstack app for upload files and list all the uploaded files

## Start Project
Inside each directory it has the needed commands for running the project api/app

## Setup .env files

#### API ENV
```bash
MONGO_URL="here your mongodb url" # maybe something like "mongodb://localhost:27017/db-name"
S3_ENDPOINT="http://localhost:4568"
AWS_ACCESS_KEY_ID="S3RVER"
AWS_SECRET_ACCESS_KEY="S3RVER"
BUCKET_NAME="my-files"
GOOGLE_CLIENT_ID="" # Create a google project inside the google dev console and get the client id from oauth credentials
GOOGLE_CLIENT_SECRET="" # Same as Client_id
SECRET=test # random string that will be used for the cookie generation
```

#### APP ENV

```bash
VITE_API_URL="" # The url for ur backend like "http://localhost:5000"
```

## Base idea for the project
[Video from web dev junkie](https://www.youtube.com/watch?v=LCxb0oTKTg4&t)

## TODOS
 - [ ] Refact so it uses own auth system and not google's one
