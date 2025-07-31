import { Request, Response } from "express";
import { PostgresDataSource } from "../config/database";
import { User } from "../models/User";
import { encrypt } from "../helpers/encrypt";

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
}
