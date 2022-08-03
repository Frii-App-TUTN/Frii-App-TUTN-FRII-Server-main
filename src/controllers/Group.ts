require('dotenv').config()
import { Request, Response, NextFunction, Router } from "express";
import { Customer, Wallet, WalletSchema, customerSchema } from '../models/Wallet';
import { User, UserSchema } from '../models/User';
const https = require('https');
const { createCustomer, createAccount } = require('../helpers/wallet/account');

interface Wallet {
    error: boolean;
    message?: string;
    data?: any;
}
exports.createWallet = async (req: Request,
    res: Response<Wallet>
    , next: NextFunction) => {
    // send request to 
    const { emailAddress } = req.body;
    if (emailAddress) {
        try {
            const user = await User.findOne<UserSchema>({ email: emailAddress?.toLowerCase() });
            if (!!user) {
                const { firstName: first, lastName: last, phoneNumber: phone } = user;
                createCustomer(first, last, phone, async (err: boolean, data: any) => {
                    if (!err) {
                        const { id: Id } = data;
                        createAccount(Id, async (err: boolean, data: any) => {
                            if (!err) {
                                const {
                                    id: accountId,
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
                                    accountId,
                                    emailAddress,
                                    accountName,
                                    accountNumber,
                                    currency,
                                    createdAt,
                                    updatedAt,
                                    customer: customerSchema
                                });
                                wallet.save((err) => {
                                    if (err) return res.status(507).json({ error: true, message: "Error saving data" });
                                    else return res.status(201).json({ error: false, message: 'success', data: wallet });
                                });
                            } else {
                                res.status(502).json({
                                    error: true,
                                    message: "Unable to create account at this time"
                                })
                            }
                        });

                    } else {
                        res.status(406).json({
                            error: true,
                            message: "Invalid request"
                        })

                    }

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

exports.fetchWallet = async (req: Request,
    res: Response<Wallet>
    , next: NextFunction) => {
    // send request to 
    const { emailAddress } = req.body;
    if (emailAddress) {
        try {
            const user = await Wallet.findOne<WalletSchema>({ emailAddress: emailAddress?.toLowerCase() },);
            if (user) {
                res.status(200).json({
                    error: true,
                    message: 'success',
                    data: user,
                })
            } else {
                res.status(500).json({
                    error: true,
                    message: 'Account with email does not exist'
                })
            }
        } catch (err) {
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