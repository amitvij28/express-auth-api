import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT || "",
    DB = process.env.DB || "",
    SALT = process.env.salt || "",
    SecretKEY = process.env.secretkey || "";
