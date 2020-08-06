import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { User, IUser } from "../Models/User";

interface IUserID extends ParamsDictionary {
    username: string;
}

export const getUser = async (
    req: Request<IUserID>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username } = req.params;

        const user = await User.find({ username });
        if (user.length === 0) {
            return res.status(200).json({ message: "User not found" });
        }

        res.status(200).json({ user, message: "User found" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "delete user" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const editUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "edit user" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
