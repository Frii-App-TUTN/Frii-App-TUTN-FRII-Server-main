import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
const { tokenValidator } = require("../../helpers/Auth/Validator/Token");
const LoanController = require('../controllers/Loans.ts')
const router = Router();

// router.get('/purse/list', (req:Request, res:Response, next:NextFunction) => {
//     PurseController.getAllPurse(req, res);
// });

router.post('/request-loan',   
    body("amount", "Amount is required and should not include alphabets or special characters!").not().isEmpty().isNumeric(),
    body("reason", "Please state your reason for the Loan").not().isEmpty(),
    body("due_date", "Please state when you intend to pay back").not().isEmpty(),
    body("guarantors", "Please add guarantors").not().isEmpty().matches(/^[0-9a-fA-F]{24}$/).isArray(), tokenValidator,
    async (req:Request, res:Response) => {
    LoanController.requestLoan(req, res);
});

// router.get('/purse/:_id', (req:Request, res:Response, next:NextFunction) => {
//     PurseController.getPurse(req, res);
// });

// router.post('/purse/deactivate/:_id', (req:Request, res:Response, next:NextFunction) => {
//     PurseController.deactivatePurse(req, res);
// });

// router.post('/purse/update/:_id', (req:Request, res:Response, next:NextFunction) => {
//     PurseController.getPurse(res);
// });

module.exports = router;