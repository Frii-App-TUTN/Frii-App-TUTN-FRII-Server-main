import { Router } from "express";
const {
  storeAccount,
  deleteAccount,
} = require("../controllers/AccountDetail/accountDetail");
const { tokenValidator } = require("../helpers/Auth/Validator/Token");

const router = Router();

router.post("/store-account", tokenValidator, storeAccount);
router.delete("/delete-account", tokenValidator, deleteAccount);

module.exports = router;
