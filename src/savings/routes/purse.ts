import { Router, Request, Response, NextFunction } from "express";
const PurseController = require('../controllers/Purse.ts')
const router = Router();

router.post('/create-purse', async (req:Request, res:Response, next:NextFunction) => {
    PurseController.createPurse(req, res);
});

router.get('/purse/:_id', (req:Request, res:Response, next:NextFunction) => {
    PurseController.getPurse(req, res);
});

// router.get('/purse/all', (req:Request, res:Response, next:NextFunction) => {
//     PurseController.getAllPurse(req, res);
// });

router.get('/purse/list', (req:Request, res:Response, next:NextFunction) => {
    PurseController.getAllPurse(res);
})

router.post('/purse/deactivate/:_id', (req:Request, res:Response, next:NextFunction) => {
    PurseController.deactivatePurse(req, res);
});

router.post('/purse/update/:_id', (req:Request, res:Response, next:NextFunction) => {
    PurseController.getPurse(res);
});

module.exports = router;