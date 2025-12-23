import express from "express";
import cors from "cors";
//cookieParser to perforn curd operaions on cookies (ex: secure cookies user cant read)
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//we get data from diff places --> handeling that data
//1.json ->
app.use(express.json({ limit: "16kb" }))
//2.URL --> (different browsers different url system, hence problem in handeling)
//we use -> express.urlencoded(), extended for nested
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
//for any public assets (img, files, etc) we use static,("public can be any name but we are storing in public folder so we write public")
app.use(express.static("public"))

app.use(cookieParser());


// routes import
import userRouter from './routes/user.routes.js';

// route declaration
app.use("/api/v1/users", userRouter);

export { app };
