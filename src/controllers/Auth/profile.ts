import { Response, Request } from "express";
import { User, UserSchema } from "../../models/User";
import { MongooseError } from "mongoose";

exports.updateUser = (req: Request, res: Response) => {
  const { userId, phoneNumber, email } = req.body;
  User.findOneAndUpdate(
    { _id: userId },
    { phoneNumber, email },
    (err: MongooseError, user: UserSchema) => {
      if (err || !user) {
        return res.status(404).json({
          error: true,
          message: "User does not exist",
        });
      }
      return res.status(200).json({
        error: false,
        message: `User Updated`,
      });
    }
  );
};
