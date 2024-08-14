import express from 'express';
import mongoose from 'mongoose'
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to MONGODB');
}).catch((err) => {
    console.log(err);
});

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/user', userRouter);

app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`server listning on the port ${port}`);
});