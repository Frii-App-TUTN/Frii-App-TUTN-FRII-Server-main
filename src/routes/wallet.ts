import { Request, Response, NextFunction, Router } from "express";
const router = Router();
const Wallet = require('../models/Wallet');
const randomChar = require('../helpers/helpers').createRandomString;
interface Wallet {
    error?: boolean;
    message?: string;
} 
router.get('/create', async (req: Request,
    res: Response<Wallet>, next: NextFunction) => {
    // send request to paystack
    const {accountName, currency, accountOpeningDate, lastTransactionDate, userName, emailAddress } = req.body;
    try {
          let wallet = await Wallet.findOne({ emailAddress });
          if (wallet) {
              res.status(500).json({
                  error: true,
                  message: "Wallet Already exists",
              });
          } else {
              const customerID:string = randomChar(10);
              wallet = new Wallet(
                  {
                      customerID,
                      accountName,
                      currency,
                      accountOpeningDate,
                      lastTransactionDate,
                      userName,
                      purses: [],
                      emailAddress
                  }
            
            );
            await wallet.save();
              res.status(200).json({
                  error: false,
                  message: "Created wallet successfully"
              });
          }
        } catch (err) {
          console.error(err);
        res.status(500).json({
            error: true,
            message: 'Server error'
        });
        }
    
})
router.get('/login', (req:Request, res:Response, next:NextFunction) => {
    return res.status(200).send('Everything fine here!')
})


module.exports = router;