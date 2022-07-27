import { Router } from "express";
const {
  storeAccount,
  deleteAccount,
} = require("../controllers/Account/storeAccount");
const router = Router();

router.post("/store-account", storeAccount);
router.delete("/delete-account", deleteAccount);

module.exports = router;
