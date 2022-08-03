import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

exports.ResetPasswordValidator = [
  check("email", "email is required").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: true, message: errors.array() });
    }
    //errors
    next();
  },
];
