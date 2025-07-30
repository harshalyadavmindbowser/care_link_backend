import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
    OneToOne, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable
} from "typeorm";
import { User } from "./User";
import { Location } from "./location";
import { Images } from "./images";
import { Appointments } from "./appointments";
import { Category } from "./category";
@Entity('hospitals')
export class Hospital {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    hospital_name: string

    @Column('text')
    hospital_address: string

    @Column()
    contact_info: string

    @Column({ nullable: true })
    hospital_website: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;


    //relation 

    @OneToOne(type => User, user => user.hospitals, { cascade: true })
    @JoinColumn({ name: 'provider_id' })
    provider: User

    @OneToOne(() => Location, location => location.hospitals)
    @JoinColumn({ name: 'location_id' })
    location: Location;

    @OneToMany(() => Images, image => image.hospital, { cascade: true })
    images: Images[];

    @OneToMany(() => Appointments, appointment => appointment.hospital, { cascade: true })
    appointments: Appointments[];

    @ManyToMany(() => Category, category => category.hospitals, { cascade: true })
    @JoinTable({ name: 'hospital_categories' })
    categories: Category[];

}



