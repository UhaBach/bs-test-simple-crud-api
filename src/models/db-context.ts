import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "./user";

dotenv.config();

export const context = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        models: [User]
    }
);