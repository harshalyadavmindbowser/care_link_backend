import { DataSource } from 'typeorm';
import { Hospital } from '../models/hospital';
import { Images } from '../models/images';
import { Location } from '../models/location'
import { Appointments } from '../models/appointments'
import { User } from '../models/User';
import { Address } from '../models/Address';
import { Category } from '../models/category';
require('dotenv').config();

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Mindbowser@123',
    database: process.env.DB_NAME || 'care_link',
    synchronize: true,
    entities: [Hospital, Images, Location, Appointments, User, Address , Category],
    subscribers: [],
    //   synchronize: NODE_ENV === "dev" ? true : false,

});

export default PostgresDataSource;
