import { UUID } from "crypto"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('hospitals')
export class Hospital {
    @PrimaryGeneratedColumn('uuid')
    hid: UUID

    @Column()
    provider_id: UUID

    @Column()
    hospital_name: string

    @Column()
    description: string

    @Column()
    contact_info: number

    @Column()
    hospital_website: string

    @Column()
    location_id: UUID

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}