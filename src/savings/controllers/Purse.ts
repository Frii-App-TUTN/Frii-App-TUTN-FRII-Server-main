import { NextFunction, Request, Response } from "express";
const Purse = require('../models/Purse');

interface createPurse {
    name: string,
    desc?: String,
    expectedAmount: number,
    currentAmount?: number,
    category?: string
}

const createPurse = async (req: Request, res: Response, next:NextFunction) => {
    const { name, expectedAmount, currentAmount, category, desc }:createPurse = req.body;

    // if(!name || amount || category)
    //     res.status(422).send('All fields are required!');
    try {
        let purseData =  await Purse.findOne({name});

        if(!purseData){
            purseData = new Purse({name, expectedAmount, currentAmount, desc, category});
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
        purse.save();

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
        purseData.save();
        res.status(200).send('Purse deactivated');
    } catch (err) {
        res.status(409).json({error: err});
    }
}

// const getAllPurse = async (req:Request, res:Response) => {
//     // Find and return purses with status=1
//     // Purses that isnt deactivated
//     // try {
//         // Purse.find({},  (err:Error, data:any) => {
//         //     if(err){
//         //         console.log(err);
//         //         return res.status(500).send({
//         //             msg: 'Error while finding records',
//         //             data: []
//         //         });
//         //     }else {
//         //         return res.send(200).json(data);
//         //     }
//         // })  

//         console.log(Purse.find());
//     // } catch (err) {
//     //     res.status(409).json({error: err});
//     // }
// }

const getAllPurse = async (res:Response) => {
    try {
       let pursedata =  Purse.find({});

       console.log(pursedata);
    } catch (err) {
        res.status(409).send({error: err});
    }
}
module.exports = { createPurse, getPurse, getAllPurse, deactivatePurse, updatepurse };