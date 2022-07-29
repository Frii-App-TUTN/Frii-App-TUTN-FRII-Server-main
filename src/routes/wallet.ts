require('dotenv').config()
import { Request, Response, NextFunction, Router } from "express";
const router = Router();
const Wallet = require('../models/Wallet');
router.post('/create',
  require('../helpers/wallet/wallet').createWallet
)
router.get('/fetch', require('../helpers/wallet/wallet').fetchWallet)


module.exports = router;