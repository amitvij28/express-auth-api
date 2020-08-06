import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import { IUser, User } from "../Models/User";
import { SALT, SecretKEY } from "../envSetup";
import jwt from "jsonwebtoken";

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            firstname,
            lastname,
            username,
            password,
            dob,
            verified,
            email,
        } = req.body as IUser;

        const prevUser = await User.find({ $or: [{ username }, { email }] });
        if (prevUser.length === 0) {
            const errors = registerValidation(req.body);

            if (Object.keys(errors).length > 0) {
                return res
                    .status(406)
                    .json({ errors, message: "Invalid input format" });
            }

            const salt = await bcrypt.genSalt(parseInt(SALT));
            const encryptedPW = await bcrypt.hash(password, salt);

            const newUser = new User({
                firstname,
                lastname,
                username,
                password: encryptedPW,
                dob,
                verified,
                email,
            });
            const result = await newUser.save();
            return res
                .status(200)
                .json({ message: "New user created", user: result });
        }
        if (prevUser[0].email === email) {
            res.status(409).json({
                message: "Email already exists",
                user: false,
            });
        } else if (prevUser[0].username === username) {
            res.status(409).json({
                message: "Username already exists",
                user: false,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const registerValidation = (data: IUser): { [key: string]: string } => {
    let errors: { [key: string]: string } = {};
    const { email, firstname, lastname, password, dob, username } = data;
    if (!validator.isEmail(email)) {
        errors["email"] = "Invalid email";
    }
    if (validator.isEmpty(firstname)) {
        errors["firstname"] = "Invalid first name";
    }

    if (validator.isEmpty(lastname)) {
        errors["lastname"] = "Invalid last name";
    }

    if (!validator.isAlphanumeric(username)) {
        errors["username"] = "Invalid username";
    }

    if (!validator.isAscii(password)) {
        errors["password"] = "Invalid password";
    }

    return errors;
};

interface ILoginBody {
    username: string;
    password: string;
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body as ILoginBody;
        const user = await User.find({ username });
        if (user.length === 1) {
            const samePW = await bcrypt.compare(password, user[0].password);
            if (samePW) {
                const payload = { username, firstname: user[0].firstname };
                const token = await jwt.sign(payload, SecretKEY, {
                    expiresIn: 604800,
                });
                return res
                    .status(200)
                    .json({ success: true, token: `Bearer ${token}` });
            }
        }
        res.status(409).json({
            success: false,
            message: "Invalid in username/password",
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
