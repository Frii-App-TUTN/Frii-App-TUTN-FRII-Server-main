require('dotenv').config();
import { Router } from "express";
const router = Router();
router.post('/create',
  require('../helpers/wallet/wallet').createWallet
)
router.get('/fetch', require('../helpers/wallet/wallet').fetchWallet)


module.exports = router;