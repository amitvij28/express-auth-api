import { Router } from "express";
import UserRoutes from "./UserRoute";
import AuthRoutes from "./AuthRoutes";
import passport, { session } from "passport";

const router = Router();

router.use(
    "/user",
    passport.authenticate("jwt", { session: false }),
    UserRoutes
);
router.use("/auth", AuthRoutes);

export default router;
