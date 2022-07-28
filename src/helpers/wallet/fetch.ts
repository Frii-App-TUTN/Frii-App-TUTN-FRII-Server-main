require('dotenv').config()
import { Request, Response, NextFunction, Router } from "express";
import { MongooseError } from "mongoose";
import { User, UserSchema } from "../../models/User";
import { Customer, Wallet, WalletSchema, customerSchema } from '../../models/Wallet';
const https = require('https');

interface Wallet {
    error?: boolean;
    message?: string;
}
exports.fetchWallet = async (req: Request,
    res: Response<Wallet>
    ,next: NextFunction) => {
    // send request to 
    const { emailAddress } = req.body;
    if (emailAddress) {
        try {
            const user = await User.findOne<UserSchema>({ email: emailAddress?.toLowerCase() });
          
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: true,
                message: 'Server error'
            });
        }
    } else {
        res.status(400).json({
            error: true,
            message: 'Invalid request'
        })
    }
}