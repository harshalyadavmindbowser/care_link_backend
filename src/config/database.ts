import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Mindbowser@123',
    database: process.env.DB_NAME || 'care_link',
    synchronize: true,
    entities: [],

});

export default PostgresDataSource;
