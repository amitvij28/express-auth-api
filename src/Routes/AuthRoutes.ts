import { Router } from "express";
import { signup, login } from "../Controllers/AuthController";

const router = Router();

//@access Public
router.post("/signin", login);
//@access Public
router.post("/signup", signup);

export default router;
