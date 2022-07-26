import { Request, Response, NextFunction, Router } from "express";
const router = Router();
const Wallet = require('../models/Wallet');

interface Wallet {
    error?: string;
    success?: string;
} 
router.get('/create', async (req: Request,
    res: Response<Wallet>, next: NextFunction) => {
    const { customerID, accountName, currency, accountOpeningDate, lastTransactionDate, userName, purses, emailAddress } = req.body;
    try {
          let wallet = await Wallet.findOne({ emailAddress });
          if (wallet) {
            res.status(500).json({error: "Wallet Already exists"});
          } else {
              wallet = new Wallet(
                  {
                      customerID,
                      accountName,
                      currency,
                      accountOpeningDate,
                      lastTransactionDate,
                      userName,
                      purses,
                      emailAddress
                  }
            
            );
            await wallet.save();

            res.status(200).json({success: "Created wallet succesfully"});
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({error: 'Server error'});
        }
    
})
router.get('/login', (req:Request, res:Response, next:NextFunction) => {
    return res.status(200).send('Everything fine here!')
})


module.exports = router;