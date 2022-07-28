require('dotenv').config()
import { Request, Response, NextFunction, Router } from "express";
import { MongooseError } from "mongoose";
import { User, UserSchema } from "../../models/User";
import { Customer, Wallet, WalletSchema, customerSchema } from '../../models/Wallet';
const https = require('https');
const createCustomer = require('./customers').createCustomer;
interface Wallet {
    error?: boolean;
    message?: string;
}
exports.createWallet = async (req: Request,
    res: Response<Wallet>
    ,next: NextFunction) => {
    // send request to 
    const { emailAddress } = req.body;

    if (emailAddress) {
        try {
            const user = await User.findOne<UserSchema>({ email: emailAddress?.toLowerCase() });
            if (!!user) {
                const { firstName: first, lastName: last, phoneNumber: phone } = user;

                const params = JSON.stringify({
                    "preferred_bank": "access-bank",
                    "first_name": first,
                    "last_name": last,
                    "phone": phone
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

                let data: any = '';
                const req = await https.request(options, (res: any) => {

                    res.on('data', (chunk: any) => {
                        data += chunk
                    });

                    res.on('end', () => {
                        data = JSON.parse(data);
                    })
                }).on('error', (error: any) => {
                    res.status(502).json({
                        error: true,
                        message: error.message,
                    });
                   
                })

                req.write(params)
                req.end()
                res.status(201).json({
                    error: false,
                    message: 'success'
                });
                const {
                    id,
                    account_name: accountName,
                    account_number: accountNumber,
                    currency,
                    created_at: createdAt,
                    updated_at: updatedAt,
                    customer
                } = data?.data;
                type customerRes = {
                    id: number;
                    first_name: string;
                    last_name: string;
                    customer_code: string;
                    phone: string;
                    risk_action: string;
                }
                const {
                    id: customerId,
                    first_name: firstName,
                    last_name: lastName,
                    customer_code: customerCode,
                    phone: phoneNumber,
                    risk_action: riskAction
                }: customerRes = customer;
                const customerSchema = await new Customer<customerSchema>({ id: customerId, firstName, lastName, customerCode, phoneNumber, riskAction })
                const wallet = await new Wallet<WalletSchema>({
                    id,
                    emailAddress,
                    accountName,
                    accountNumber,
                    currency,
                    createdAt,
                    updatedAt,
                    customer: customerSchema
                });
                wallet.save((err) => {
                    if (err) return res.status(507).json({ error: true, message: "Error saving wallet" })
                });
            }
            else {
                res.status(404).json({
                    error: true,
                    message: "User with email address does not exist"
                })
            }
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