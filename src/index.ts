import express from 'express';
import cors from 'cors';
import { PostgresDataSource } from './config/database';
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
// import { movieRouter } from "./routes/movie.routes";
import "reflect-metadata";
import { request } from 'http';

const app = express()
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
// app.use("/api", movieRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

app.use((req: Request, res:Response)=>{
 res.status(505).json({ message: "Bad Request" });
})

console.log("process.env.PORT,",process.env.PORT);

PostgresDataSource.initialize().then(() => {
    console.log('Database connected successfully!');
    app.listen(process.env.PORT, () => {
        console.log('server start on port no 3000');
    });
}).catch((error) => console.error('Error connecting to database:', error));



