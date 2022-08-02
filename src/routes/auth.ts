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
const { signUpValidator } = require("../helpers/Auth/Validator/SignUp");
const { LoginValidator } = require("../helpers/Auth/Validator/Login");
const {
  ResetPasswordValidator,
} = require("../helpers/Auth/Validator/ResetPassword");
const { updatePin, checkPin } = require("../controllers/Auth/userPin");
const { tokenValidator } = require("../helpers/Auth/Validator/Token");

const router = Router();

router.post("/signup", signUpValidator, checkEmailAndValidate);
router.post("/login", LoginValidator, login);
router.post("/otp", checkOTP);
router.post("/updatePin", tokenValidator, updatePin);
router.post("/checkPin", tokenValidator, checkPin);
router.post("/forgot-password", ResetPasswordValidator, forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);

module.exports = router;
