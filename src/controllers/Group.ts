require('dotenv').config();
import { Response, Request } from "express";
import { User, UserSchema } from '../models/User';
import { GroupSchema, Group, AddUserSchema, AddUser  } from '../models/Group';
const { createRandomNumber, sendMail } = require('../helpers/helpers');
import { validationResult } from 'express-validator';
import { Res } from "../custom";
import { Req, ReqBody } from "../custom";

exports.createGroup = async (req: Req<Request, GroupSchema>, res: Response<Res>) => {
    const { emailAddress, groupName, groupType, threshold, duration, friiPeriod, reason, description, visibility } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: "invalid request",
            data: errors.array()
        });
    }
    else {
        if (!!emailAddress) {
            const user = await User.findOne<UserSchema>({ email: emailAddress }) ?? false;
            if (!!user) {
                const id: number = createRandomNumber(16);
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
                        groupType,
                        threshold,
                        duration,
                        friiPeriod,
                        reason,
                        description,
                        visibility
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
} 
exports.addMember = async (req: Req<Request, GroupSchema>, res: Response<Res>) => {
    const { userEmail, groupName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: "invalid request",
            data: errors.array()
        });
    }
    else {
        if (!!groupName && !!userEmail) {
            let group = await Group.findOne<GroupSchema>({ name: groupName });
            if (!!group) {
                const code: number = createRandomNumber(8);
                let link: string = String(process.env.BASE_URL) + code;
                let addUser = new AddUser<AddUserSchema>({
                    code,
                    groupName,
                    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
                    userEmail,
                    expired: false
                });
                await addUser.save();
                let { Admin } = group;
                await sendMail(`Join ${groupName}`,
                    `The Admin  {{Admin}} Of ${groupName} want's you to join his/her group.
            \n use the [link]({{link}}) below to join the group [{{link}}]({{link}})
            \n Please ignore if you do not recognize this message`,
                    { Admin, link },
                    userEmail);
                return res.status(200).json({
                    error: false,
                    message: "email sent"
                });
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
}
exports.joinGroup = async (req: Req<Request, GroupSchema>, res: Response) => { 
    const { code } = req.params;
    const addUser = await AddUser.findOneAndDelete<AddUserSchema>({ code });
    if (!!addUser) {
        const { userEmail, groupName } = addUser;
        let group = await Group.findOne<GroupSchema>({ name: groupName });
        if (!!group) {
            const { members } = group;
            if (members.indexOf(userEmail) < 0) {
                const newMembers = [...members, userEmail];
                group = await Group.findOneAndUpdate(
                    { name: groupName },
                    { members: newMembers }
                );
                if (!!group) {
                  return  res.status(202).render('join', { groupName });
                } else {
                    return res.status(500).render('error', { message: "Failed to Add User to group" });
                }
            } else {
                return res.status(401).render('error', { message: "User already in group"  });  
            }
    }
    else {
            return res.status(404).render('error', { message: "group with name not found" });
    }
    } else {
        return res.status(410).render('error', { message: "Invite Expired" });
    } 
}
exports.removeMember = async (req: Req<Request, GroupSchema>, res: Response<Res>) => {
    const { userEmail, groupName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: "invalid request",
            data: errors.array()
        });
    }
    else {
        if (!!userEmail && !!groupName) {
            let group = await Group.findOne<GroupSchema>({ name: groupName });
            if (!!group) {
                const { members } = group;
                let newMembers = [...members];
                const userIndexInGroup = newMembers.indexOf(userEmail);
                if (userIndexInGroup > -1) {
                    newMembers.splice(userIndexInGroup, 1);
                    group = await Group.findOneAndUpdate(
                        { name: groupName },
                        { members: newMembers }
                    );
                    if (!!group) {
                        res.status(202).json({
                            error: false,
                            message: "User Removed"
                        });
                    } else {
                        return res.status(500).json({
                            error: false,
                            message: "Failed To remove user from group"
                        });

                    }
                } else {
                    return res.status(404).json({
                        error: true,
                        message: "User Not In group"
                    });
                }
            }
            else {
                return res.status(404).json({
                    error: true,
                    message: "Group not found"
                });
            }
        }
        else {
            return res.status(400).json({
                error: true,
                message: "invalid request"
            })
        }
    }
}
exports.fetchGroup = async (req: Req<Request, GroupSchema>, res: Response<Res>) => {
    const { groupName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: "invalid request",
            data: errors.array()
        });
    }
    else {
        if (!!groupName) {
            let group = await Group.findOne<GroupSchema>({ name: groupName });
            if (!!group) {
                return res.status(200).json({
                    error: false,
                    data: group,
                });
            } else {
                return res.status(404).json({
                    error: true,
                    message: "Group not found"
                });
            }
        } else {
            return res.status(400).json({
                error: true,
                message: "invalid request"
            })
        }
    }
}
exports.renameGroup = async (req: Req<Request, GroupSchema>, res: Response<Res>) => {
    const { groupName, newName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: "invalid request",
            data: errors.array()
        });
    }
    else{
    if (!!groupName && !!newName) {
        let group = await Group.findOne<GroupSchema>({ name: groupName });
        if (!!group) {
            let nameTaken = await Group.findOne<GroupSchema>({ name: newName });
            if (!nameTaken) {
                group = await Group.findOneAndUpdate(
                    { name: groupName },
                    { name: newName }
                );
                if (!!group) {
                    return res.status(202).json({
                        error: false,
                        message: "Rename Successful"
                    })
                } else {
                    return res.status(500).json({
                        error: true,
                        message: "Failed to save update name"
                    })
                }
            } else {
                return res.status(409).json({
                    error: true,
                    message: "Group Name Already Taken"
                });
            }
        }
         else {
            return res.status(404).json({
                error: true,
                message: "Group not found"
            });
        }
    }
    else {
        return res.status(400).json({
            error: true,
            message: "invalid request"
        });
        }
    }
}
exports.pingAdmin = async (req: Req<Request, GroupSchema>, res: Response<Res>) => {

}