import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne
} from "typeorm";
import { Hospital } from "./hospital";
import { Address } from "./Address";

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    zip_code: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    //relations

    @OneToOne(() => Hospital, hospital => hospital.location, { cascade: true })
    hospitals: Hospital;

    @OneToMany(() => Address, address => address.location, { cascade: true })
    addresses: Address[];
}