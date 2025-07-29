// src/services/AuthService.ts
import { PostgresDataSource } from '../config/database';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UerService {
    // static async login(email: string, password_input: string) {
        const userRepository = PostgresDataSource.getRepository(User);

        //find user
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        //compair password
        const isPasswordValid = bcrypt.compareSync(user.hashed_password, password_input);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const payload = { userId: user.uid };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "da508688a1cd7f1dc50b26e711c9c4b38477963a7f57967afa102c9206b86520", { expiresIn: '20m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET || "da508688a1cd7f1dc50b26e711c9c4b38477963a7f57967afa102c9206b86520", { expiresIn: '2d' });


        return { user, accessToken, refreshToken };
    }
}