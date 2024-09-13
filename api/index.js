import express from 'express';
import mongoose from 'mongoose'
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to MONGODB');
}).catch((err) => {
    console.log(err);
});

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`server listning on the port ${port}`);
});

app.use(express.json());

app.use(cookieParser());

app.use('/api/user', userRouter);

app.use('/api/auth', authRouter);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({ 
        success: false,
        message,
        statusCode,
     });
})