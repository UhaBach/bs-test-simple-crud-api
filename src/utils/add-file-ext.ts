import { extname } from "path";
import { getFilePath } from "./get-file-path";
import { rename } from "fs";

export function addFileExtension(originalName: string, fileName: string){
    const filePath = getFilePath(fileName);
    rename(filePath, filePath + extname(originalName), () => console.log("file renamed"));
    return fileName + extname(originalName);
}