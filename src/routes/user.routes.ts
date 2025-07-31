import * as express from "express";
import { AuthController } from "../controllers/auth.controller";

const Router = express.Router();

///auth/login
Router.post("/signup", AuthController.signup);

//auth/signup
Router.post('/login', AuthController.login);

export { Router as userRouter };

