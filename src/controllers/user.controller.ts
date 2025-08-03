import { Request, Response } from "express";
import { PostgresDataSource } from "../config/database";
import { User } from "../models/User";
import { encrypt } from "../helpers/encrypt";
import { UserService } from "../services/user.services";

export class UserController {
  static async changePassword(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: "Both current and new password are required" });
      }
      const userRepository = PostgresDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordCorrect = encrypt.comparepassword(
        user.hashed_password,
        currentPassword
      );
      console.log("corect", user.hashed_password);
      console.log("corect", currentPassword);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }
      const hashedNewPassword = await encrypt.encryptpass(newPassword);
      user.hashed_password = hashedNewPassword;
      await userRepository.save(user);
      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Change password error:", error);
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }



  static async getUser(req: Request, res: Response) {
      console.log("sdjkdkndks dsdhj")
      console.log("djkfkf fnfk");
        try {
          const { id } = req.params;
          const user = await UserService.getUserById(id);
    
          if (!user) {
            console.warn(`user not found with ID: ${id}`);
            return res.status(404).json({ message: "user not found" });
          }
    
          return res.status(200).json(user);
        } catch (error) {
          console.error("Error fetching user by ID:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
 
  }
static async getUsers(req: Request, res: Response) {
     
        try {
          const user = await UserService.getUsers();
          if (!user) {
            return res.status(404).json({ message: "user not found" });
          }
    
          return res.status(200).json(user);
        } catch (error) {
          console.error("Error fetching user by ID:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
 
  }


}
