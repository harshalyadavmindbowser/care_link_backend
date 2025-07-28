import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IUser } from "../interfaces/user.interface";

export enum UserRole {
  ADMIN = "admin",
  PROVIDER = "provider",
  PATIENT = "patient", //patient
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  BABY = "baby",
}

@Entity("users")
export class Product implements IUser {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  full_name!: string;

  @Column({ type: "text", nullable: false })
  description!: string;

  @Column({ nullable: false })
  hashed_password!: string;

  @Column()
  dob!: Date;

  @Column({ type: "enum", enum: Gender, default: Gender.MALE })
  gender!: Gender;

  @Column({ type: "varchar", length: 255 })
  insurance_provider!: string;

  @Column({ type: "varchar", length: 255 })
  policy_no!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.PROVIDER })
  role!: UserRole;

  @Column({ type: "varchar", length: 255 })
  medical_specialty!: string;

  @Column({ type: "varchar", length: 255 })
  license_no!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
