import path from "path";
import { __dirname } from "./get-dirname";
import dotenv from "dotenv";
dotenv.config();

export function getFilePath(text: string) {
    const splited = __dirname.split("\\");
    let rootPath = "";
    for (let i = 0; i < splited.length - 2; i++) {
        rootPath += splited[i] + "\\";
    };
    return path.join(rootPath, process.env.PHOTO_DIR, text);
}