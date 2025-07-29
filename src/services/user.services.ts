// src/services/AuthService.ts
import { PostgresDataSource } from '../config/database';
import { User } from '../models/User';
import { encrypt } from '../helpers/encrypt';

export class UerService {
    static async login(email: string, password_input: string) {
        const userRepository = PostgresDataSource.getRepository(User);

        //find user
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        //compair password
        const isPasswordValid = encrypt.comparepassword(user.hashed_password, password_input);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const payload = { userId: user.uid };

        const accessToken = encrypt.generateToken(payload);

        return { user, accessToken };
    }
}