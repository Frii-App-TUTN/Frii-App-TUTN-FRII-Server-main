require("dotenv").config();
import _ from "lodash";
import { Response, Request } from "express";
import { MongooseError } from "mongoose";
import { User, UserSchema } from "../../models/User";
import jwt from "jsonwebtoken";
const helpers = require("../../helpers/helpers");

exports.login = (req: Request, res: Response) => {
  let { loginType, password } = req.body;

  //find user by email
  if (loginType?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    let emailLowerCase = loginType.toLowerCase();

    User.findOne(
      { email: emailLowerCase },
      (err: MongooseError, user: UserSchema) => {
        if (err || !user) {
          return res.status(404).json({
            error: true,
            message: "Email not found",
          });
        } else {
          if (process.env.SECRET_HASH) {
            if (helpers.hash(password) === user.password) {
              const token = jwt.sign(
                { userId: user._id },
                process.env.SECRET_HASH,
                { expiresIn: "30m" }
              );
              if (user.emailVerified) {
                return res.status(200).json({
                  error: false,
                  message: "Login Successful",
                  token: token,
                });
              } else {
                return res.status(404).json({
                  error: true,
                  message: "Email not verified",
                });
              }
            } else {
              return res.status(404).json({
                error: true,
                message: "Password does not match",
              });
            }
          } else {
            throw new Error("SECRET_HASH is not defined");
          }
        }
      }
    );
  } else {
    User.findOne(
      { username: loginType },
      (err: MongooseError, user: UserSchema) => {
        if (err || !user) {
          return res.status(404).json({
            error: true,
            message: "UserName not found",
          });
        } else {
          if (process.env.SECRET_HASH) {
            if (helpers.hash(password) === user.password) {
              if (user.emailVerified) {
                const token = jwt.sign(
                  { userId: user._id },
                  process.env.SECRET_HASH,
                  { expiresIn: "30m" }
                );
                return res.status(200).json({
                  error: false,
                  message: "Login Successful",
                  token: token,
                });
              } else {
                return res.status(404).json({
                  error: true,
                  message: "Email not verified",
                });
              }
            } else {
              return res.status(404).json({
                error: true,
                message: "Password does not match",
              });
            }
          }
        }
      }
    );
  }
};
