import { Router } from "express";
const {
  storeAccount,
  deleteAccount,
} = require("../controllers/AccountDetail/accountDetail");
const router = Router();

router.post("/store-account", storeAccount);
router.delete("/delete-account", deleteAccount);

module.exports = router;
