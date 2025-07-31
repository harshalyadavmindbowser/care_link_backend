import {
    Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable
} from 'typeorm';
import { Hospital } from './hospital';
@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;


    //relations

    @ManyToMany(() => Hospital, hospital => hospital.categories)
    @JoinTable({ name: 'hospital_categories' })
    hospitals: Hospital[];
}