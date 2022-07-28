require("dotenv").config();
import { Response, Request } from "express";
import { User, UserSchema } from "../../models/User";
import { MongooseError } from "mongoose";
const helpers = require("../../helpers/helpers");

exports.updatePin = (req: Request, res: Response) => {
  let { pin, newPin, userId } = req.body;
  User.findOne({ _id: userId }, (err: MongooseError, user: UserSchema) => {
    if (err || !user) {
      return res.status(404).json({
        error: false,
        message: "User does not exist",
      });
    }
    //check if pin already exists
    //if it does, then we are updating the pin
    if (typeof user.pin === "string") {
      if (user.pin === helpers.hash(pin.toString())) {
        User.findOneAndUpdate(
          { _id: userId },
          {
            pin: helpers.hash(newPin.toString()),
          },
          (err: MongooseError) => {
            if (err) {
              return res.json({ error: err });
            } else {
              return res.status(200).json({
                error: false,
                message: `Pin Updated`,
              });
            }
          }
        );
      } else {
        return res.status(404).json({
          error: true,
          message: "Pin does not match",
        });
      }
    } else {
      User.findOneAndUpdate(
        { _id: userId },
        {
          pin: helpers.hash(pin.toString()),
        },
        (err: MongooseError) => {
          if (err) {
            return res.json({ error: err });
          } else {
            return res.status(200).json({
              error: false,
              message: `Pin Created`,
            });
          }
        }
      );
    }
  });
};
