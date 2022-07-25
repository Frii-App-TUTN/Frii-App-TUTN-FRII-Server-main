import { Request, Response, NextFunction, Router } from "express";
const router = Router();


router.get('/create', (req:Request, res:Response, next:NextFunction) => {
    return res.status(200).send('Everything fine here!')
})
router.get('/login', (req:Request, res:Response, next:NextFunction) => {
    return res.status(200).send('Everything fine here!')
})


module.exports = router;