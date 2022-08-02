import { Request, Response } from "express";
const Users = require('../models/User');

interface createUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export const createUser = async (req:Request, res:Response) => {
    const { firstName, lastName, email, password, phoneNumber }:createUser = req.body;
    try {
        let User = await Users.findOne({ email });

        if (!User) {
            User = new User({ firstName, lastName, email, password, phoneNumber })
            await User.save()
            res.status(200).json(User);
        } else {
            res.status(409).json({ error: 'User Already exists' });
        }

    }   
    catch (err) {
        res.status(404).json({error: err})
    }
}

interface getUserBody {
    password: string;
    email: string;
}

export const getUser = async (req:Request, res:Response) => {
    const { password, email }:getUserBody = req.body;
    try {
        const User = await Users.findOne({ email });

        res.status(200).json(User);

    }   
    catch (err) {
        res.status(404).json({Error: err})
    }
}

interface updateUser {
    password: string;
    email: string;
}

export const updateUser = async (req:Request, res:Response) => {
    const { password, email }:updateUser = req.body;
    try {
        const User = await Users.updateOne({ email }, {
            $set: {
            // data to be updated
        }});
        res.status(200).json(User);

    }   
    catch (err) {
        res.status(404).json({Error: err})
    }
}

interface deleteUser {
    password: string;
    email: string;
}

export const deleteUser = async (req:Request, res:Response) => {
    const { password, email }:deleteUser = req.body;
    try {
        const User = await Users.deleteOne({ email });
        res.status(200).json(User);

    }   
    catch (err) {
        res.status(404).json({Error: err})
    }
}