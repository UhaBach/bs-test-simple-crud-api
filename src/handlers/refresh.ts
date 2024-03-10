import express from "express";
import jwt from "jsonwebtoken";
import { createJWTToken } from "../utils/create-jwt-token";
import { output } from "../utils/output";

const { verify } = jwt;

export async function refreshJWTToken(req: express.Request, res: express.Response) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) return res.status(401).send("Access Denied. No refresh token provided.");

    try {
        const decoded = verify(refreshToken, process.env.SECRET_TOKEN);
        const accessToken = createJWTToken({ id: decoded["id"], email: decoded["email"] }, "24h");

        res
            .header('authorization', accessToken)
            .send(JSON.stringify(output(null, 200, "Token refreshed")));
    } catch (err) {
        return res.status(400).send('Invalid refresh token.');
    }
    return res;
}