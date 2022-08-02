import { Kin, KinSchema } from "../../models/Kin";
import { Response, Request } from "express";
import { MongooseError } from "mongoose";

exports.createKin = async (req: Request, res: Response) => {
  const { userId, firstName, lastName, email, phoneNumber, relationship } =
    req.body;

  let kin = new Kin({
    firstName,
    lastName,
    email,
    phoneNumber,
    relationship,
    createdBy: userId,
  });
  await kin.save();
  return res.status(200).json({
    error: false,
    message: "Kin saved successfully",
  });
};

exports.updateKin = (req: Request, res: Response) => {
  const {
    userId,
    kinId,
    firstName,
    lastName,
    email,
    phoneNumber,
    relationship,
  } = req.body;
  Kin.findOneAndUpdate(
    { _id: kinId },
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      relationship,
      createdBy: userId,
    },
    (err: MongooseError, kin: KinSchema) => {
      if (err || !kin) {
        return res.status(404).json({
          error: true,
          message: "Kin does not exist",
        });
      }
      return res.status(200).json({
        error: false,
        message: `Kin Updated`,
      });
    }
  );
};
