import { User } from "../models/user";
import { Login } from "../schemas/login";
import { generateHash } from "../utils/generate-hash";
import { output } from "../utils/output";
import { UserDto } from "../models/user-dto";
import { createJWTToken } from "../utils/create-jwt-token";
import express from "express";

export async function login(login: Login, res: express.Response): Promise<object> {
    const user = await User.findOne({
        where: {
            email: login.email,
            password: generateHash(login.password)
        }
    });
    if (user) {
        const accessToken = createJWTToken({ id: user.id, email: user.email });
        const refreshToken = createJWTToken({ id: user.id, email: user.email }, "30d");
        res
            .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
            .header('authorization', accessToken)
            .send(JSON.stringify(output(new UserDto(user), 200, "Login done")));
        return res;
    }
    else {
        return res.end(JSON.stringify(output(null, 404, "Wrong email or password")));
    }
}