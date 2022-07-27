import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

exports.LoginValidator = (req: Request, res: Response, next: NextFunction) => {
  body("loginType", "loginType is required").notEmpty();

  //password
  body("password", "Password is required").notEmpty();

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, message: errors.array() });
  }
  //errors
  next();
};
