import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

exports.signUpValidator = [
  check("firstName", "FirstName is required").notEmpty(),
  check("lastName", "LastName is required").notEmpty(),
  check("phoneNumber", "PhoneNumber is required").notEmpty(),

  check("email")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .withMessage("Email doesn't exist"),

  //password
  check("password", "Password is required").notEmpty(),

  check("password")
    .isLength({ min: 7 })
    .withMessage("Password must contain at least 7 characters"),

  check("phoneNumber")
    .isLength({ min: 10 })
    .withMessage("Please enter a valid Phone Number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: true, message: errors.array() });
    } else {
      //errors
      next();
    }
  },
];
