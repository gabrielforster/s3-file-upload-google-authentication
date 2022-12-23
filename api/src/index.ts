import { config } from "dotenv"
config()

import Express, { Request, Response, json, urlencoded } from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth2" 

import authRouter from "./routes/auth"
import filesRouter from "./routes/files"

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
    function (request: any, accessToken: string, refreshToken: string, profile: string, done: any) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as any);
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
    maxAge: 60 * 60 * 1000, // 1 hour
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", authRouter)
app.use("/files", filesRouter)

mongoose.connect(MONGO_URL as string).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});