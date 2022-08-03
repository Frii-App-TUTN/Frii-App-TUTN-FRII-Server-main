require('dotenv').config();
import { Response, Request } from "express";
import {User, UserSchema} from '../models/User'
exports.createGroup = async (req: Request, res: Response) => {
    const { emailAddress } = req.body;
    const user = await User.findOne<UserSchema>({ emailAddress });
    console.log(user);
    if (!!user) {
        res.status(200).json({
            error: false,
            message: "user found"
        })
    } else {
        return res.status(404).json({
            error: true,
            message: "user with email not found"
        });
    }
} 