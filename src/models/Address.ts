import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn,
  OneToOne
} from 'typeorm';
import { User } from './User';
import { Location } from './location';
import { Exclude } from 'class-transformer';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  address!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  //relations

  @OneToOne(() => User, user => user.address)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @ManyToOne(() => Location, location => location.addresses)
  @JoinColumn({ name: 'location_id' })
  location: Location;
} 