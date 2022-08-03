require('dotenv').config();
import { Response, Request } from "express";
exports.createGroup = (req: Request, res: Response) => {
    const { emailAddress } = req.body;
} 