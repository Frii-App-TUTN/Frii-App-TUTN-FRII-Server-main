require('dotenv').config();
import { Response, Request } from "express";
import { User, UserSchema } from '../models/User'
import { GroupSchema, Group } from '../models/Group';
const {createRandomNumber, sendMail} = require('../helpers/helpers');
interface Group {
    error: boolean;
    message?: string;
    data?: any;
}
type RequestBody = {
    emailAddress?: string;
    groupName?: string;
    userEmail?: string;
}
exports.createGroup = async (req: Request, res: Response<Group>) => {
    const { emailAddress, groupName }:RequestBody = req.body;
    if (emailAddress) {
        const user = await User.findOne<UserSchema>({ email: emailAddress }) ?? false;
        if (!!user) {
            const id:number = createRandomNumber(16);
            const idCheck = await Group.findOne({ id }) ?? false;
            const name: string = groupName ? groupName : "FRII" + createRandomNumber(8);
            if (!idCheck) {
                const group = new Group<GroupSchema>({
                    id,
                    Admin: emailAddress,
                    name,
                    members: [],
                    createdAt: Date.now(),
                    disabled: false,
                })
                group.save();
                return res.status(201).json({
                    error: false,
                    message: "created group successfully",
                    data: group,
                });
                
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
exports.addMember = async (req: Request, res: Response<Group>) => {
    const { userEmail, groupName }: RequestBody = req.body;
    if (groupName) {
        let group = await Group.findOne<GroupSchema>({ name: groupName });
        if (!!group) {
            let link = process.env.BASE_URL + createRandomNumber(8);
            let {Admin} = group;
            // sendMail(`Join ${groupName}`, `The Admin Of **${groupName}** want's you to join their group,\n use the link below to join the group [{{link}}]({{link}})`, "https://github.com", userEmail);
            res.status(200).json({
                error: false,
                message: "email sent"
            })
        } else {
            return res.status(404).json({
                error: true,
                message: "group with this name not found"
            })
        }
    } else {
        res.status(400).json({
            error: true,
            message: "invalid request",
        })  
    }
}