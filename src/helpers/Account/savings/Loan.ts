import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const validateAmount = async (amount:number) => {
    if (amount) {
        return true;
    // return res.status(400).json({ error: true, message: errors.array() });       }
    }
};

const valiadteGuarantors = async (guarantors:string[]) => {

}

const loanRequestMail = async (toEmail:string, fromEmail:string) => {

}

module.exports = { validateAmount, valiadteGuarantors, loanRequestMail };
