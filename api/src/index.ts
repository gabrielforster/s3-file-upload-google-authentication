import { config } from "dotenv"
config()

import Express, { Request, Response, json, urlencoded } from "express"
import mongoose from "mongoose"
import cors from "cors"
import multer from "multer"
const upload = multer()
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth2" 

const getFilesController = require("./controllers/getFilesController");
const getFileController = require("./controllers/getFileController");
const uploadFileController = require("./controllers/uploadFileController");
const isAuthenticated = require("./middleware/isAuthenticated");

const app = Express()

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECRET as string],
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/error",
  })
);

app.post(
  "/files",
  isAuthenticated,
  upload.single("file"),
  uploadFileController
);
app.get("/files", isAuthenticated, getFilesController);
app.get("/files/:filename", isAuthenticated, getFileController);

mongoose.connect(MONGO_URL as string).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});