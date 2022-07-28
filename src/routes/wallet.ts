require('dotenv').config()
import { Request, Response, NextFunction, Router } from "express";
const router = Router();
const Wallet = require('../models/Wallet');
router.post('/create',
  require('../helpers/wallet/create').createUser
)
router.get('/fetch',  )


module.exports = router;