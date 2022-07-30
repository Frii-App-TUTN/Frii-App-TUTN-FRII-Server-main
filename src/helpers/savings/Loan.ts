// import { Request, Response, NextFunction } from "express";
// import { body, validationResult } from "express-validator";
import { MongooseError } from "mongoose";
import { User} from "../../models/User";
import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";


const validateGuarantors = async (guarantor:any) => {
    // console.log(typeof(guarantor));
    if (guarantor.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        let guarantors = await User.findOne({_id: guarantor});
        if(!guarantors){
            return {
                "error": true,
                "status": 400,
                "message": "Guarantor not valid!"
            };
        }else{
            return {
                status: 200,
                guarantor: guarantors
            };
        }
    }

    return {
        "status": 400,
        "message": guarantor + " is not a valid user ID"
    };
    
}

const sendMail = async (toMail:string, fromMail:string) => {

}

const validateAmount = async (amount:number) => {
    if (amount) {
        return true;
    // return res.status(400).json({ error: true, message: errors.array() });       }
    }
};


const loanRequestMail = async (toEmail:string[], fromEmail:string, name:string) => {
    if(toEmail && fromEmail && name){
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD
            }
        });
    
        var mailOptions = {
            from: '"Frii:"' + fromEmail,
            to: toEmail,
            subject: 'Loan Request',
            text: 'A friend of yours is requesting for a loan and wants you to stand for him as guarantor!',
            html: '<b>Hey' + name! + '</b><br> You can either accept or decline.'
        };
    
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
    return {
        status: 400,
        message: "Sender email, recipient email, or username was not inputed"
    };
}

module.exports = { validateAmount, validateGuarantors, loanRequestMail };
