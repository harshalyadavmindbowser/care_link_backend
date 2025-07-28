import express from 'express';
import cors from 'cors';
import { PostgresDataSource } from './config/database';

const app = express()
app.use(express.json());
app.use(cors());


PostgresDataSource.initialize().then(() => {
    console.log('Database connected successfully!');
    app.listen(process.env.PORT, () => {
        console.log('server start on port no 3000');
    });
}).catch((error) => console.error('Error connecting to database:', error));



