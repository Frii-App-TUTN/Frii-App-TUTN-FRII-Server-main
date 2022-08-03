require('dotenv').config();
import { Response, Request } from "express";
import { User, UserSchema } from '../models/User'
import { GroupSchema, Group } from '../models/Group';
const {createRandomNumber} = require('../helpers/helpers');
interface Group {
    error: boolean;
    message?: string;
    data?: any;
}
exports.createGroup = async (req: Request, res: Response<Group>) => {
    const { emailAddress, groupName, } = req.body;
    if (emailAddress) {
        const user = await User.findOne<UserSchema>({ email: emailAddress }) ?? false;
        console.log(user)
        if (!!user) {
            const id = createRandomNumber(16);
            console.log(id);
            const idCheck =  await Group.findOne({ id }) ?? false;
            console.log(idCheck)
            if (!idCheck) {
                res.status(200).json({
                    error: false
                })
            } else {
                res.status(500).json({
                    error: true,
                    message: "id Generated already exists"
                })
            }
        } else {
            return res.status(404).json({
                error: true,
                message: "user with email not found"
            });
        }
    } else {
        res.status(400).json({
            error: true,
            message: "invalid request",
        })
    }
} 