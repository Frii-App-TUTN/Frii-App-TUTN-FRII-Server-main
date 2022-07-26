import { Kin } from "../../models/Kin";
import { Response, Request } from "express";

exports.createKin = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, relationship } = req.body;

  let kin = new Kin({
    firstName,
    lastName,
    email,
    phoneNumber,
    relationship,
  });
  await kin.save();
  return res.status(200).json({
    error: false,
    message: "Kin saved successfully",
  });
};
