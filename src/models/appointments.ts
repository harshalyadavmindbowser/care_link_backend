import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { Hospital } from "./hospital";


enum AppointmentStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Cancelled = 'cancelled',
}

@Entity('appointments')
export class Appointments {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    appointment_date: Date

    @Column('time')
    appointment_time: string

    @Column({ nullable: true })
    rejection_reason: string;

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.Pending,
    })
    status: AppointmentStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    //relations


    @ManyToOne(type => User, user => user.patientAppointments)
    @JoinColumn({ name: "patient_id" })
    patient: User;

    @ManyToOne(type => User, user => user.doctorAppointments)
    @JoinColumn({ name: "provider_id" })
    provider: User;

    @ManyToOne(() => Hospital, hospital => hospital.appointments)
    @JoinColumn({ name: 'hospital_id' })
    hospital: Hospital;
}