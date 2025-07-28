import { UUID } from "crypto"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


enum AppointmentStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Cancelled = 'cancelled',
}

@Entity('appointments')
export class Appointments {
    @PrimaryGeneratedColumn('uuid')
    hid: UUID

    @Column()
    patient_id: UUID

    @Column()
    provider_id: UUID

    @Column()
    hospital_id: UUID

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