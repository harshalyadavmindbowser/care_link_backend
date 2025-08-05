import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization";
import { upload } from "../middleware/multer.middleware";

const Router = express.Router();

///auth/login
Router.post("/signup", upload.single('image') , AuthController.signup);

//auth/signup
Router.post("/login", AuthController.login);

//auth/change-password
Router.post("/change-password/:uid", authentification, authorization(["patient", "provider"]), UserController.changePassword);

export { Router as userRouter };
