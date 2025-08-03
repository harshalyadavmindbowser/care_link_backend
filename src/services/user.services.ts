// src/services/AuthService.ts
import { PostgresDataSource } from '../config/database';
import { User } from '../models/User';
import { encrypt } from '../helpers/encrypt';
import { UserSignupDTO } from "../dto/user.dto";
import { Address } from '../models/Address';
import { AddressDTO } from '../dto/address.dto';
import { plainToClass } from 'class-transformer';

const userRepository = PostgresDataSource.getRepository(User);
const addressRepository = PostgresDataSource.getRepository(Address);

export class UserService {
    static async login(email: string, password_input: string) {

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

        const payload = { userId: user.id };

        const accessToken = encrypt.generateToken(payload);
        const userId = user.id
        return { userId, accessToken };
    }

    static async signup(userDto: UserSignupDTO) {

        const existingUser = await userRepository.findOne({
            where: { email: userDto.email }
        });

        if (existingUser) {
            return false;
        }

        const user = new User();
        const hashedPassword = await encrypt.encryptpass(userDto.password);
        user.full_name = userDto.full_name;
        user.email = userDto.email;
        user.hashed_password = hashedPassword;
        user.role = userDto.role;
        user.description = userDto.description;
        user.dob = userDto.dob;
        user.gender = userDto.gender;
        user.policy_no = userDto.policy_no;
        user.medical_specialty = userDto.medical_specialty;
        user.insurance_provider = userDto.insurance_provider;
        user.license_no = userDto.license_no;
        user.phone_no = userDto.phone_no;
        user.provider_status = userDto.provider_status;


        const savedUser = await userRepository.save(user);

        if (userDto.address) {
            const addressDto = plainToClass(AddressDTO, userDto.address);
            if (addressDto) {
                const addAddress = addressRepository.create({
                    address: userDto.address,
                    user: user
                })
                await addressRepository.save(addAddress);
                savedUser.address = addAddress
            }
        }
        return savedUser;
    }
}
