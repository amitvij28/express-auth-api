import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { DB, PORT } from "./envSetup";
import mainRoutes from "./Routes";
import passport from "passport";
import { passportSetup } from "./passport";

const app = express();

mongoose.connect(
    DB,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
        if (err) throw err;
    }
);

app.use(passport.initialize());
passportSetup(passport);
app.use(cors());
app.use(express.json());

app.use("/api", mainRoutes);

app.listen(PORT);
