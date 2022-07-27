require('dotenv').config()
import { Request, Response, NextFunction, Router } from "express";
const router = Router();
const Wallet = require('../models/Wallet');
router.post('/create',
  require('../helpers/wallet/create').createUser
)
router.get('/login', (req:Request, res:Response, next:NextFunction) => {
    return res.status(200).send('Everything fine here!')
})


module.exports = router;