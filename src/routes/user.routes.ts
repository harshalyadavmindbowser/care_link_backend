import * as express from "express";
import { UserController } from "../controllers/user.controller";

const Router = express.Router();


Router.post("/signup", UserController.signup);


export { Router as userRouter };