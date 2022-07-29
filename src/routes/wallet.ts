require('dotenv').config();
import { Router } from "express";
const router = Router();
const { createWallet, fetchWallet } = require('../controllers/wallet');
router.post('/create', createWallet);
router.get('/fetch', fetchWallet);


module.exports = router;