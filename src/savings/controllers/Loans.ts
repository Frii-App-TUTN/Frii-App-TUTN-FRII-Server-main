import { Response, Request, NextFunction } from 'express'
const Loan = require('../models/Loan');

interface requestLoan{
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
        borrower } = req.body;


}

const valiadteAmount = (amount:number) => {
    if(amount)
    return true;
}

// const 

module.exports = { requestLoan };
