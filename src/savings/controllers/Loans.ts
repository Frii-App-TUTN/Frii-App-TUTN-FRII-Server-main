require("dotenv").config();
import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator';
// import { User } from '../../models/User';
const { Loan, loanSchema } = require('../models/Loan');
const { validateGuarantors, loanRequestMail }  = require('../../helpers/savings/Loan')

interface loanReq{
    amount: string,
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
        let results: any[] = [];
        let mails: any[] = [];
        try {
            guarantors.forEach(async (guarantor) => {
                // console.log(typeof(guarantor) == "string");
                let result = await validateGuarantors(guarantor);
                if(result)
                    results.push(result);
                
                let mail = await loanRequestMail(result.guarantor.email, "jothamntekim@gmail.com", result.guarantor.firstName);
                if(mail)
                    mails.push(mail);

                let loanModel = new Loan({amount, reason, status: "pending", due_date, desc});
                console.log(results, mails);
                return res.status(200).json({results, mails});

            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                status: 401,
                message: error
            })
        }



}


module.exports = { requestLoan };
