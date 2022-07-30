import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator';
const Loan = require('../models/Loan');
const { validateGuarantors, loanRequestMail }  = require('../../helpers/savings/Loan')

interface loanReq{
    amount: string,
    due_date: Date,
    reason: string,
    desc?: string,
    guarantors: string[],
    borrower: string,
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
        let results = [];
        try {
            // if(guarantors.length > 1){
                // for(let i = 0; i < guarantors.length; i++){
                //     // let result = validateGuarantors(guarantors[i]);
                //     // if()
                //     console.log(guarantors[i]); 
                //     console.log(validateGuarantors(guarantors[i]));
                // }
                guarantors.forEach(async (guarantor) => {
                    console.log(typeof(guarantor) == "string");
                    let result = await validateGuarantors(guarantor);
                    if(result)
                        results.push(result);
                    
                    let mail = loanRequestMail(result.guarantor.email, result.guarantor.firstname);

                })
                // console.log(results);
            // }
            console.log(guarantors.length); 
        } catch (error) {
            return res.status(500).json({
                error: true,
                status: 401,
                message: error
            })
        }



}


module.exports = { requestLoan };
