import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connect from "./db/db.js";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./api/routes/userRoutes.js";
import quizRouter from "./api/routes/quizRoutes.js";
dotenv.config();
const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port=process.env.PORT||8080;
app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.get("/",(req,res)=>{
    res.send("Welcome to server");
})
app.use("/api/user",userRouter);
app.use("/api/quiz",quizRouter);
connect()
.then(()=>{
    try{
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(err){
        console.log("Cannot connect to Server");
    }
})
.catch((err)=>{
    console.log("Invalid database connection");
});
