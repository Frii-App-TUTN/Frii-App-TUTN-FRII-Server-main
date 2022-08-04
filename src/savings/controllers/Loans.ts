require("dotenv").config();
import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator';
import { User, UserSchema } from '../../models/User';
const jwt = require("jsonwebtoken");
import { Wallet, WalletSchema } from '../../models/Wallet';
import { Guarantor } from "../models/Guarantors";
const Loan = require('../models/Loan');
const { validateGuarantors, loanRequestMail }  = require('../../helpers/savings/Loan')

interface loanReq{
    amount: number,
    due_date: Date,
    reason: string,
    desc?: string,
    guarantors: string[],
    borrower: string,
    userId?: string
}
const requestLoan = async (req:Request, res:Response) => {
    const {
        amount,
        due_date,
        reason,
        desc,
        guarantors,
        borrower }:loanReq = req.body;

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).json({ error: true, message: errors.array() });
        }
        try {
            if (req.headers["authorization"] === undefined) {
                return res
                  .status(400)
                  .send({ error: true, message: "Token is required" });
            }
            const token = req.headers["authorization"].split(' ')[1];
            if (!token)
            {
                return res.status(500).send("User not authorized");
            }
            let decodedToken = jwt.verify(token, process.env.SECRET_HASH)
            const userId = decodedToken.userId;
            let UserDetail = await User.findOne<UserSchema>({_id: userId});
            if(!UserDetail){
                return res.status(400).send("Invalid User");
            }
            let userEmail = UserDetail.email;
            let wallet = await Wallet.findOne<WalletSchema>({emailAddress: userEmail});
            if(!wallet){
                return res.status(500).send("User with email: " + userEmail + " is yet to have a wallet");
            }
            let walletAmount = wallet.amount;
            if(walletAmount == undefined || (walletAmount == 0)){
                return res.status(500).send("Please fund your wallet before requesting for a loan");
            }
            
            let amountCalc: number = walletAmount * 3;
            if(!(amountCalc >= amount)){
                return res.status(400).send("You are only allowed to request for a loan 3 times your current amoun.")
            }
            let loanModel = await Loan.create({amount, reason, due_date, desc, borrower});
            if(!loanModel){
                return res.status(500).send("Loan request failed");
            }
            guarantors.forEach(async (guarantor) => {
                if(UserDetail?._id == guarantor){
                    return res.status(400).send("You can't add yourself as guarantor!");
                }
                let result = await validateGuarantors(guarantor);
                if(!result){
                    return res.status(500).send("Guarantor is not a user of the platform"); 
                }
                await loanRequestMail(result.guarantor.email, "jothamntekim@gmail.com", result.guarantor.firstName);
                let guarantorEmail = result.guarantor.email;
                let wallet = await Wallet.findOne({guarantorEmail});
                if(!wallet){
                    return res.status(500).send("Guarantor has not added a wallet yet");
                }

                let guarantorDetail = await new Guarantor({user_id: result.guarantor._id, loan_id: loanModel._id});
                if(!guarantorDetail){
                    return res.status(500).send("Unable to save Guarantor data to database");
                }
                guarantorDetail.save();
            });

            return res.status(200).json({loanModel});
           
        } catch (error) {
            return res.status(500).json({
                error: true,
                status: 401,
                message: error
            })
        }



}


module.exports = { requestLoan };
