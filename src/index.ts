import express, { Application } from 'express';
import cors from 'cors';

const app = express()


app.listen(3000, () => {
    console.log('server start on port no 3000');
});
