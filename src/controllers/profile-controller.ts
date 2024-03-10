import {
    Get,
    Param,
    Put,
    Body,
    QueryParam,
    JsonController,
    Authorized
} from "routing-controllers";
import "reflect-metadata";
import { Update } from "../schemas/update";
import { updateProfile } from "../handlers/update";
import { getAllProfiles, getOneProfile } from "../handlers/get-profiles";

@JsonController()
export class ProfileController {
    @Put("/profile/:id")
    @Authorized()
    update(
        @Param("id") id: string,
        @Body() data: Update) {
        return updateProfile(data, id);
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