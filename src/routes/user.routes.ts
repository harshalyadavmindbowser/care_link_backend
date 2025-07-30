import * as express from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";

const Router = express.Router();

///auth/login
Router.post("/signup", UserController.signup);

//auth/signup
Router.post("/login", AuthController.login);

//auth/change-password
Router.post("/change-password/:uid", UserController.changePassword);

export { Router as userRouter };
