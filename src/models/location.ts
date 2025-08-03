import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne
} from "typeorm";
import { Hospital } from "./hospital";
import { Address } from "./Address";

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('double precision')
    latitude: number;

    @Column('double precision')
    longitude: number;

    //relations

    @OneToOne(() => Hospital, hospital => hospital.location)
    hospitals: Hospital;

    @OneToMany(() => Address, address => address.location, { cascade: true })
    addresses: Address;
}