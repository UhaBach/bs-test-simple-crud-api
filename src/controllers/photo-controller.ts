import {
    Authorized,
    Get,
    JsonController,
    Param,
    Res
} from "routing-controllers";
import "reflect-metadata";
import express from "express";
import { getPhoto } from "../handlers/get-photo";

@JsonController()
export class PhotoController {
    @Get("/photo/:file")
    @Authorized()
    gegtPhoto(@Res() res: express.Response, @Param("file") file: string) {
        return getPhoto(file, res);
    }
}