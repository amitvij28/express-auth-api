import { Router } from "express";
import { getUser, deleteUser, editUser } from "../Controllers/UserController";

const router = Router();

router.get("/:username", getUser);
router.delete("/", deleteUser);
router.put("/", editUser);

export default router;
