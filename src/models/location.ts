import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    hospital_id: string;

    @Column()
    hospital_name: string;

    @Column()
    images_url: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}