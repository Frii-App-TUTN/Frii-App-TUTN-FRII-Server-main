import { Request, Response, NextFunction, Router } from "express";
const router = Router();

router.post("/signin", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("Everything fine here!");
});
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("Everything fine here!");
});
router.post("/otp", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("Everything fine here!");
});
router.post(
  "/reset-password",
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send("Everything fine here!");
  }
);

module.exports = router;
