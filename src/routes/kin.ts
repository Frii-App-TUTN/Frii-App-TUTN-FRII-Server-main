import { Router } from "express";
const { createKin, updateKin } = require("../controllers/Kin/kin");
const { tokenValidator } = require("../helpers/Auth/Validator/Token");

const router = Router();

router.post("/create-kin", tokenValidator, createKin);
router.post("/update-kin", tokenValidator, updateKin);

module.exports = router;
