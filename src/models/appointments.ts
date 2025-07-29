import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


enum AppointmentStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Cancelled = 'cancelled',
}

@Entity('appointments')
export class Appointments {
    @PrimaryGeneratedColumn('uuid')
    hid: string

    @Column('uuid')
    patient_id: string

    @Column('uuid')
    provider_id: string

    @Column('uuid')
    hospital_id: string

    @Column()
    appointment_date: Date

    @Column('time')
    appointment_time: string

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
}