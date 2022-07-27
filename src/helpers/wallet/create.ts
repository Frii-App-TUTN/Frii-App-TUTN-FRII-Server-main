require('dotenv').config()
import { Request, Response, NextFunction, Router } from "express";
import { MongooseError } from "mongoose";
import { User, UserSchema } from "../../models/User";
interface Wallet {
    error?: boolean;
    message?: string;
}
exports.createUser = async (req: Request,
    res: Response<Wallet>
    ,next: NextFunction) => {
    // send request to 
    console.log(process.env.PAYSTACK_SECRET_KEY);
    const { accountName, currency, accountOpeningDate, lastTransactionDate, userName, emailAddress } = req.body;
    try {
        const user = await User.findOne<UserSchema>({ email: emailAddress?.toLowerCase() });
        if (!!user) {
            const { firstName, lastName, phoneNumber } = user;
            const https = require('https');

            const params = JSON.stringify({
                "customer": 481193,
                "preferred_bank": "access-bank",
                "first_name": firstName,
                "last_name": lastName,
                "phone": phoneNumber
            })

            const options = {
                hostname: 'api.paystack.co',
                port: 443,
                path: '/dedicated_account',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }

            let data = ''
            const req = await https.request(options, (res: any) => {

                res.on('data', (chunk: any) => {
                    data += chunk
                });

                res.on('end', () => {
                    data = JSON.parse(data);
                })
            }).on('error', (error: any) => {
                console.error(error)
            })

            req.write(params)
            req.end()
            res.status(201).json({
                error: false,
                message: 'success'
            });
        }
        else {
            res.status(404).json({
                error: true,
                message: "User with email address does not exist"
            })
        }
        //         
        //       );
        //         console.log(response);
        //         res.status(200).json('success')
        //   let wallet = await Wallet.findOne({ emailAddress });
        //   if (wallet) {
        //       res.status(404).json({
        //           error: true,
        //           message: "Wallet Already exists",
        //       });
        //   } else {
        //       const customerID:string = randomChar(10);
        //       wallet = new Wallet(
        //           {
        //               customerID,
        //               accountName,
        //               currency,
        //               accountOpeningDate,
        //               lastTransactionDate,
        //               userName,
        //               purses: [],
        //               emailAddress
        //           }
            
        //     );
        //     await wallet.save();
        //       res.status(200).json({
        //           error: false,
        //           message: "Created wallet successfully"
        //       });
        //   }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: true,
            message: 'Server error'
        });
    }
}