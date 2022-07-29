require("dotenv").config();
import _ from "lodash";
import { Response, Request } from "express";
import { User, UserSchema } from "../../models/User";
import { MongooseError } from "mongoose";
import { sha512_256 } from "js-sha512";
import otpGenerator from "otp-generator";

exports.forgotPassword = (req: Request, res: Response) => {
  if (!req.body.email)
    return res.status(400).json({ error: true, message: "Email is required" });

  let emailLowerCase = req.body.email.toLowerCase();

  User.findOne({ email: emailLowerCase }, (err: MongooseError, user:UserSchema) => {
    // if err or no user
    if (err || !user) {
      return res.status(401).json({
        error: true,
        message: "Email not found",
      });
    } else {
      let token = otpGenerator.generate(50, {
        upperCaseAlphabets: true,
        specialChars: false,
      });
      return user.updateOne(
        { resetPasswordCode: token, resetPasswordCreated: Date.now() },
        (err: MongooseError) => {
          if (err) {
            return res.json({ error: true });
          } else {
            return res.status(200).json({
              error: false,
              message: `An email has been sent to ${emailLowerCase}`,
            });
          }
        }
      );
    }
  });
};

exports.resetPassword = (req: Request, res: Response) => {
  let { resetPasswordCode, password } = req.body;
  User.findOne(
    { resetPasswordCode },
    (err: MongooseError, user: UserSchema) => {
      // if err or no user
      let minutesLeft = (Date.now() - user.resetPasswordCreated) / (1000 * 60);
      if (err || !user)
        return res.status(401).json({
          error: true,
          message: "Invalid link code!",
        });
      else if (minutesLeft > 10) {
        return res.status(401).json({
          error: true,
          message: "Link code expired!",
        });
      } else {
        let updatedFields = {
          password: sha512_256(password),
          resetPasswordCode: "",
          resetPasswordCreated: 0,
        };
        user = _.extend(user, updatedFields);
        user.save((err: MongooseError) => {
          if (err) {
            return res.json({ error: err });
          } else {
            return res.status(200).json({
              message: `Password Updated`,
            });
          }
        });
      }
    }
  );
};

exports.changePassword = (req: Request, res: Response) => {
  let { password, id, newPassword } = req.body;
  User.findOne({ _id: id }, (err: MongooseError, user: UserSchema) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User does not exist",
      });
    }
    if (sha512_256(password) === user.password) {
      return res.status(401).json({
        error: "Password does not match",
      });
    } else {
      let updatedFields = {
        password: sha512_256(newPassword),
      };

      user = _.extend(user, updatedFields);
      user.save((err: MongooseError) => {
        if (err) {
          return res.json({ error: err });
        } else {
          return res.status(200).json({
            message: `Password Updated`,
          });
        }
      });
    }
  });
};
