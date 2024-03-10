import express from "express";
import { output } from "../utils/output";
import fs from "fs";
import { __dirname } from "../utils/get-dirname";
import { getFilePath } from "../utils/get-file-path";

export async function getPhoto(file: string, res: express.Response): Promise<express.Response> {
    const filePath = getFilePath(file);
    if (!fs.existsSync(filePath)) {
        res.end(JSON.stringify(output(null, 404, "Images not found")));
        return res;
    }
    try {
        res.sendFile(filePath, function (err) {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Sent:', file);
            }
        });
    } catch (err) {
        return res.end(JSON.stringify(output(null, 404, err.message)));
    }
    return res;
}