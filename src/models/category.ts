import {
    Entity, PrimaryGeneratedColumn, Column, ManyToMany
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
    hospitals: Hospital[];
}