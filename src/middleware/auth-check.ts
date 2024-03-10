import jwt from "jsonwebtoken";
import { Action, UnauthorizedError } from "routing-controllers";
import { User } from "../models/user";
import { createJWTToken } from "../utils/create-jwt-token";

const { verify } = jwt;

export async function authCheck(action: Action): Promise<boolean> {
    // Header "Authorization" have string "Bearer JWT"
    // split(" ")[1] => JWT
    const accessToken = action.request.headers["authorization"].split(" ")[1];
    const refreshToken = action.request.headers.cookie.replace("refreshToken=", "");
    if (!accessToken && !refreshToken) throw new UnauthorizedError("Access Denied. No token provided.");
    try {
        const decoded = verify(accessToken, process.env.SECRET_TOKEN);
        const user = await User.findOne({
            where: {
                id: decoded["id"],
                email: decoded["email"]
            }
        });
        if (!user) throw new UnauthorizedError("Invalid Token.");
        return true;
    } catch (err) {
        if (!refreshToken) throw new UnauthorizedError("Access Denied. No refresh token provided.");
        try {
            const decoded = verify(refreshToken, process.env.SECRET_TOKEN);
            const token = createJWTToken({ id: decoded["id"], email: decoded["email"] }, "24h");
            action.response
                .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
                .header('authorization', accessToken);
            return true;
        } catch (err) {
            throw new UnauthorizedError("Invalid Token.");
        }
    }
}