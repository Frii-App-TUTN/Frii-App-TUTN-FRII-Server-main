import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

exports.SignUpValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  body("firstName", "FirstName is required").notEmpty();
  body("lastName", "LastName is required").notEmpty();
  body("phoneNumber", "PhoneNumber is required").notEmpty();

  body("email")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .withMessage("Email doesn't exist");

  //password
  body("password", "Password is required").notEmpty();

  body("password")
    .isLength({ min: 7 })
    .withMessage("Password must contain at least 7 characters");

  body("phoneNumber")
    .isLength({ min: 10 })
    .withMessage("Please enter a valid Phone Number");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, message: errors.array() });
  } else {
    //errors
    next();
  }
};
