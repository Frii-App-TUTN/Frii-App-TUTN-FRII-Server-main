require('dotenv').config()
import { Request, Response, NextFunction, Router } from "express";
import axios from "axios";
const router = Router();
const Wallet = require('../models/Wallet');
const randomChar = require('../helpers/helpers').createRandomString;
console.log(require('../helpers/wallet/create').createUser);
interface Wallet {
    error?: boolean;
    message?: string;
}
router.post('/create',
  require('../helpers/wallet/create').createUser
)
router.get('/login', (req:Request, res:Response, next:NextFunction) => {
    return res.status(200).send('Everything fine here!')
})


module.exports = router;