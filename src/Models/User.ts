import { Schema, model, Document } from "mongoose";

export interface IUser {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    dob: Date;
    password: string;
    verified: boolean;
}

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
    },
});

UserSchema.index({ email: 1, username: 1 }, { unique: true });

export const User = model<IUser & Document>("User", UserSchema);
