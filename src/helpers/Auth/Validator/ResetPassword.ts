import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

exports.ResetPasswordValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  body("email", "email is required").notEmpty();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, message: errors.array() });
  }
  //errors
  next();
};
