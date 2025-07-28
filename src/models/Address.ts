import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { IProduct } from '../interfaces/product.interface';

@Entity('addresses')
export class Address  {

//       uuid uuid [primary key]
//   u_id uuid
//   location_id uuid
//   street_address text

  @PrimaryGeneratedColumn()
  uuid!: number;

  @Column({ type: 'text'})
  street_address!: string;

  @CreateDateColumn() 
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 