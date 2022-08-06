import { Request, Response, NextFunction } from "express";
import { CallbackError } from "mongoose";
import { UserSchema, User } from "../models/User";
interface ReqBody{
    user?: string;
}
type Req<Request, ReqBody> = Request & ReqBody;
const AuthMiddleWare = async (req:Req<Request,ReqBody>, res: Response, next: NextFunction) => {
    const authToken = req.headers["authorization"];
    if (authToken !== undefined) {
        const isTokenValid: boolean = await !!User.findOne<UserSchema>({ _id: authToken });
    
        if (isTokenValid) {
            const user = await User.findOne<UserSchema>({ _id: authToken});
            req.user = user?.email;
            return next();
        }
    }
    else {
        return res.status(401).json({})
    }
        
}