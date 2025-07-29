import { Request, Response } from 'express'
import { UerService } from '../services/user.services';
require('dotenv').config();



export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // console.log('inside', email , password);
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }

            const { user, accessToken} = await UerService.login(email, password);

            return res.status(200).json({ message: "Login successful", user, accessToken });

        } catch (error) {
            console.error(error);

            if (error.message === 'User not found' || error.message === 'Invalid credentials') {
                return res.status(401).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}