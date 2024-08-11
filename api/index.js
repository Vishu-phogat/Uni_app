import express from 'express';
import mongoose from 'mongoose'
import dotenv from "dotenv";
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