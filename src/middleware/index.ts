import { Request, Response, NextFunction } from "express";
import { CallbackError } from "mongoose";
import { UserSchema, User } from "../models/User";
import { Req, ReqBody } from "../custom";
import jsonwebtoken from "jsonwebtoken";
const AuthMiddleWare = async (req:Req<Request,ReqBody>, res: Response, next: NextFunction) => {
    let authToken = req.headers["authorization"];
    if (authToken !== undefined) {
        if (process.env.SECRET_HASH) {
            const tokenCode:string = String(req.headers["authorization"]?.split(" ")[1]);
            const decodedValue = jsonwebtoken.verify(
                tokenCode,
                process.env.SECRET_HASH
                );
                if (typeof decodedValue != "string") {
                    authToken = decodedValue.userId;
                    const isTokenValid: boolean = await !!User.findOne<UserSchema>({ _id: authToken });
                if (isTokenValid) {
                    const user = await User.findOne<UserSchema>({ _id: authToken});
                    req.user = user?.email;
                    return next();
                }
                }
        }
    }
    else {
        return res.status(401).json({
            error: true,
            message: "UnAuthorized user"
        })
    }
        
}
export default AuthMiddleWare;