import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('hospitals')
export class Hospital {
    @PrimaryGeneratedColumn('uuid')
    hid: string

    @Column()
    provider_id: string

    @Column()
    hospital_name: string

    @Column()
    description: string

    @Column()
    contact_info: number

    @Column()
    hospital_website: string

    @Column()
    location_id: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}