require("dotenv").config();
import { User, UserSchema } from "../../models/User";
import { Response, Request } from "express";
import { CourierClient } from "@trycourier/courier";
import { MongooseError } from "mongoose";
import otpGenerator from "otp-generator";
import { sha512_256 } from "js-sha512";

//Check if email exists
exports.checkEmailAndValidate = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  let emailExists = await User.findOne({
    email: email.toLowerCase(),
  });
  let phoneNumberExists = await User.findOne({
    phoneNumber: phoneNumber,
  });

  //if email exists
  if (emailExists) {
    return res.status(403).json({
      error: true,
      message: "Email has been taken",
    });
  }
  //if phone number exists
  else if (phoneNumberExists) {
    return res.status(403).json({
      error: true,
      message: "Phone Number has been taken",
    });
  } else {
    const otp = otpGenerator.generate(8, {
      upperCaseAlphabets: true,
      specialChars: false,
    });

    const courier = CourierClient({
      authorizationToken: process.env.COURIER_AUTH_TOKEN,
    });
    const { requestId } = await courier.send({
      message: {
        content: {
          title: "Get FRII",
          body: "Please use this code to verify your account {{code}}",
        },
        data: {
          code: otp,
        },
        to: {
          email,
        },
      },
    });

    let otpCreated = Date.now();
    let user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: sha512_256(req.body.password),
      phoneNumber,
      otp,
      otpCreated,
    });
    await user.save();
    return res.status(200).json({
      error: false,
      message: "OTP has been sent to your email",
    });
  }
};

//Sign up a user
//Checks for otp first
exports.checkOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  User.findOne(
    { email: email.toLowerCase() },
    (err: MongooseError, user: UserSchema) => {
      // if err or no user
      if (err || !user) {
        return res.status(401).json({
          error: true,
          message: "Email not found",
        });
      } else {
        let minutesLeft = (Date.now() - user.otpCreated) / (1000 * 60);
        if (user.otp === otp && 10 >= minutesLeft) {
          User.findOneAndUpdate(
            { _id: user._id },
            { emailVerified: true },
            (err: MongooseError, user: UserSchema) => {
              if (err) {
                return res.json({ error: err });
              } else {
                return res.status(200).json({
                  error: false,
                  message: `Email verified`,
                  token: "",
                });
              }
            }
          );
        } else {
          return res.status(401).json({
            error: true,
            message: "OTP Expired",
          });
        }
      }
    }
  );
};
