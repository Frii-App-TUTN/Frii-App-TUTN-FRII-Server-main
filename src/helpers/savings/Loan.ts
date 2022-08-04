import { response } from 'express'
import { User} from "../../models/User";
import nodemailer from 'nodemailer';


const validateGuarantors = async (guarantor:string) => {
    if (guarantor) {
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

    return response.status(400).json({
        "status": 400,
        "message": guarantor + " is not a valid user ID"
    });
    
}


const loanRequestMail = async (toEmail:string, fromEmail:string, name:string) => {
    try {
        if(toEmail && fromEmail && name){
            var transport = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                secure: false,
                auth: {
                  user: fromEmail,
                  pass: process.env.MAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        
            var mailOptions = {
                from: fromEmail,
                to: toEmail,
                subject: 'Frii: Loan Request',
                text: 'A friend of yours is requesting for a loan and wants you to stand for him as guarantor!',
                html: '<div> <b style="color: rgb(0, 119, 255);"> Hey ' + name! + '</b><br> You can either accept or decline. <br> <button style="background-color: rgb(6, 180, 73); color: #fff; margin-right:1rem">Accept</button><button style="background-color: rgba(255, 0, 0, 0.911); color: #fff">Decline</button></div>'
            };
        
            await transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return {
                        "error": true,
                        "message": "Unable to send mail!"
                    };
                }
                console.log('Message sent: %s', info.messageId, info.response);
    
                return {
                    "message": info.response
                }
                
            });
        }
    } catch (error) {
        return {
            "error": true,
            "message": "Sender email, recipient email, or username was not inputed"
        }   
    }
}

module.exports = { validateGuarantors, loanRequestMail };