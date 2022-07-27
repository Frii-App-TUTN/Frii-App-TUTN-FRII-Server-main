import { Router } from "express";
const {
  checkEmailAndValidate,
  checkOTP,
} = require("../controllers/Auth/signup");
const { login } = require("../controllers/Auth/login");
const {
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/Auth/password");
import { SignUpValidator } from "../helpers/Auth/Validator/SignUp";
const { LoginValidator } = require("../helpers/Auth/Validator/Login");
const {
  ResetPasswordValidator,
} = require("../helpers/Auth/Validator/ResetPassword");

const router = Router();

router.post("/signup", SignUpValidator, checkEmailAndValidate);
router.post("/login", LoginValidator, login);
router.post("/otp", checkOTP);
router.post("/forgot-password", ResetPasswordValidator, forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);

module.exports = router;
