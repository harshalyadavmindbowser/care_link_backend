import { Request, Response } from "express";
import { PostgresDataSource } from "../config/database";
import { User } from "../models/User";
import { encrypt } from "../helpers/encrypt";
import * as cache from "memory-cache";
// import { DataSource } from 'typeorm';

export class UserController {

  static async signup(req: Request, res: Response) {
    // console.log("user", req.body);
    const { name, email, password, role, description, dob , gender, policy_no, insurance_provider, medical_specialty, license_no} = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.full_name = name;
    user.email = email;
    user.role = role; 
    user.hashed_password = encryptedPassword;
    user.description = description;
    user.dob = dob;
    user.gender = gender;
    user.insurance_provider = insurance_provider;
    user.policy_no = policy_no;
    user.medical_specialty = medical_specialty;  
    user.license_no = license_no;  

    const userRepository = PostgresDataSource.getRepository(User)
    await userRepository.save(user)
    console.log("User1223",userRepository);
    const token = encrypt.generateToken({ id: user.uid });

    return res
      .status(200)
      .json({ message: "User created successfully", token, user });
  }

}