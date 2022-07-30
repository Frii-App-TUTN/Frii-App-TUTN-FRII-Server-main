import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
const Purse = require('../models/Purse');

interface createPurse {
    name: string,
    desc?: String,
    expectedAmount?: number,
    category?: string
}

const createPurse = async (req: Request, res: Response, next:NextFunction) => {
    const { name, expectedAmount, category, desc }:createPurse = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, message: errors.array() });
    }
    try {
        let purseData =  await Purse.findOne({name});

        if(!purseData){
            purseData = new Purse({name, expectedAmount, desc, category});
            await purseData.save()
            res.status(201).json(purseData);
            // console.log(purseData);
        }else{
            res.json({
                message: "Purse name already in use"
            });
        }
    } catch (err) {
        res.status(409).json({error: err});
    }
}

interface updatepurse {
    name?: string,
    desc?: string,
    category?: string,
    _id?: string
}

const updatepurse = async (req:Request, res:Response) => {
    const { name, desc, category }:updatepurse = req.body;
    const { _id }:updatepurse = req.params;

    try {
        let purse = await Purse.findOne({_id});

        if(!purse)
            res.status(404).send('Invalid Purse ID');

        purse.name = name;
        purse.category = category;
        purse.desc = desc;
        await purse.save();

        res.status(200).json(purse);
    } catch (err) {
        res.status(409).json({error: err});
    }

    
}

interface purseId{
    _id?: string
}

const getPurse = async (req:Request, res:Response) => {
    const { _id }:purseId = req.params;
    try {
        let purseData = await Purse.findOne({_id});
        if(!purseData)
            res.status(404).send('Purse does not exit!');

        res.status(200).json(purseData);
    } catch (err) {
        res.status(409).json({error: err});
    }

    
}

const deactivatePurse = async (req:Request, res:Response) => {
    const { _id }:purseId = req.params || req.body;
    try {
        let purseData = await Purse.findOne({_id});
        if(!purseData)
            res.status(404).send('Purse not found!');

        if(purseData.status == 0)
            res.status(500).send('Purse already deactivated');

        purseData.status = 0;
        await purseData.save();
        res.status(200).send('Purse deactivated');
    } catch (err) {
        res.status(409).json({error: err});
    }
}

const getAllPurse = async (req:Request, res:Response) => {
    try {
       let purseData =  await Purse.find({status: 1});

       if(!purseData){
            res.status(500).send("Error fetching record");
       }

       res.status(200).json(purseData);
    } catch (err) {
       return res.status(409).json({error: err});
    }
}
module.exports = { createPurse, getPurse, getAllPurse, deactivatePurse, updatepurse };