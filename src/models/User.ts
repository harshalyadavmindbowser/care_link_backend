import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne
} from "typeorm";
import { Hospital } from "./hospital";
import { Appointments } from "./appointments";
import { Address } from "./Address";
// import { IUser } from "../interfaces/user.interface";
import { Expose, Type, Exclude } from "class-transformer";

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
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  full_name!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text", nullable: true })
  phone_no?: string;

  @Column({ nullable: false })
  @Exclude()
  hashed_password!: string;

  @Column({ type: "boolean", default: false, nullable: true })
  provider_status?: boolean;

  @Column({ nullable: true })
  dob?: Date;

  @Column({ type: "enum", enum: Gender, default: Gender.MALE })
  gender?: Gender;

  @Column({ type: "varchar", length: 255, nullable: true })
  img_url?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  insurance_provider?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  policy_no?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.PROVIDER })
  role!: UserRole;

  @Column({ type: "varchar", length: 255, nullable: true })
  medical_specialty?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  license_no?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;



  //relations 

  @OneToOne(type => Hospital, hospital => hospital.provider)
  hospitals?: Hospital;

  @OneToMany(type => Appointments, appointment => appointment.patient, { cascade: true })
  patientAppointments?: Appointments[];

  @OneToMany(type => Appointments, appointment => appointment.provider, { cascade: true })
  doctorAppointments?: Appointments[];

  @OneToOne(type => Address, address => address.user)
  @Expose()
  address?: Address;
}






