import { Request, Response, NextFunction, Router } from "express";
const router = Router();

router.post(
  "/store-account",
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send("Everything fine here!");
  }
);

module.exports = router;
