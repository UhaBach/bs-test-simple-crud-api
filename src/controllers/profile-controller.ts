import {
    Get,
    Param,
    Put,
    Body,
    QueryParam,
    JsonController,
    Authorized,
    Res,
    Req,
    UploadedFile,
    UseBefore
} from "routing-controllers";
import "reflect-metadata";
import { Update } from "../schemas/update";
import { updateProfile } from "../handlers/update";
import { getAllProfiles, getOneProfile } from "../handlers/get-profiles";
import { options } from "../utils/upload-file";
import bodyParser from "body-parser";

@JsonController()
export class ProfileController {
    @Put("/profile/:id")
    @UseBefore(bodyParser.urlencoded())
    @Authorized()
    update(@UploadedFile("file", { options }) file: Express.Multer.File,
        @Req() request: Express.Request,
        @Body() body: Update,
        @Param("id") id: string) {
        return updateProfile(body, id, file, request);
    }

    @Get("/profile/:id")
    @Authorized()
    getOne(@Param("id") id: string) {
        return getOneProfile(id);
    }

    @Get("/profiles")
    @Authorized()
    getAll(@QueryParam("page", {
        isArray: false,
        type: Number,
        required: false
    })
    page: number = 1) {
        return getAllProfiles(page);
    }
}