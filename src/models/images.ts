import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Hospital } from "./hospital";
@Entity('images')
export class Images {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    images_url: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    //relations

    @ManyToOne(() => Hospital, hospital => hospital.images)
    @JoinColumn()
    hospital: Hospital;
}