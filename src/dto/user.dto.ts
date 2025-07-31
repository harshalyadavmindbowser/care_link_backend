import { Type } from 'class-transformer';
import { UserRole, Gender } from '../models/User';
import { IsString, IsEmail, Matches, MinLength, MaxLength, IsNotEmpty, IsEnum, IsOptional, IsDate, IsArray, IsBoolean } from 'class-validator'
import { Address } from '../models/Address';
import { Appointments } from '../models/appointments';
export class UserDTO {
    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid Email address' })
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}


export class UserSignupDTO {

    @IsString()
    full_name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    password!: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dob?: Date;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @IsOptional()
    @IsString()
    policy_no?: string;

    @IsOptional()
    @IsString()
    insurance_provider?: string;

    @IsOptional()
    @IsString()
    medical_specialty?: string;

    @IsOptional()
    @IsString()
    license_no?: string;

    @IsBoolean()
    provider_status: boolean;

    @IsOptional()
    @IsString()
    phone_no?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsArray()
    @Type(() => Appointments)
    patientAppointments?: Appointments[];
}