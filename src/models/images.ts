import { UUID } from "crypto"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('images')
export class Images {
    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column()
    hospital_id: UUID;

    @Column()
    hospital_name: string;

    @Column()
    images_url: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}