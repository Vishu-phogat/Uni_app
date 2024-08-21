import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) => {
    const { username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password:hashedpassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "user registered successfully"});    
    } catch (error) {
        next(error);
    }
}

export const signin = async (req,res,next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({email: email})
        if(!validUser) return next(errorHandler(404, 'User not found')); 
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(401, 'wrong credentials.')); 
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedpassword, ...restdata } = validUser._doc;
        const expirytime = new Date(date.now() + 43200000);         // 12 hour
        res.cookie('access_token',token ,{httpOnly: true ,expires: expirytime}).status(200).json(restdata);
    } catch (error) {
        next(error);
    }
}