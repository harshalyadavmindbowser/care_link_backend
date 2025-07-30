import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn
} from 'typeorm';
import { User } from './User';
import { Location } from './location';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ type: 'text' })
  street_address!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  //relations

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Location, location => location.addresses)
  @JoinColumn({ name: 'location_id' })
  location: Location;
} 