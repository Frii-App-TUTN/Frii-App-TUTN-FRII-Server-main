require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

exports.TokenValiator = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers["authorization"] === undefined) {
      return res
        .status(400)
        .send({ error: true, message: "Token is required" });
    } else {
      if (process.env.SECRET_HASH) {
        const tokenCode = req.headers["authorization"].split(" ")[1];
        const decodedValue = jsonwebtoken.verify(
          tokenCode,
          process.env.SECRET_HASH
        );

        if (typeof decodedValue != "string") {
          req.body.userId = decodedValue.userId;
        }
        next();
      } else {
        throw new Error("secret hash missing");
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(404).send({ error: true, message: "Un Authorized" });
  }
};
