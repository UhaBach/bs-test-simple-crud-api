import { Post, Body, JsonController, Res, Req, Authorized } from "routing-controllers";
import "reflect-metadata";
import { Register } from "../schemas/register";
import { Login } from "../schemas/login";
import { registerHandler } from "../handlers/register";
import { login } from "../handlers/login";
import express from "express";
import { refreshJWTToken } from "../handlers/refresh";

@JsonController()
export class UserController {

    @Post("/user/register")
    register(@Body({ required: true }) body: Register) {
        return registerHandler(body);
    }

    @Post("/user/login")
    login(@Res() response: express.Response, @Body({ required: true }) data: Login) {
        return login(data, response);
    }

    @Authorized()
    @Post("/refresh")
    refresh(@Req() request: express.Request, @Res() response: express.Response) {
        return refreshJWTToken(request, response);
    }
}