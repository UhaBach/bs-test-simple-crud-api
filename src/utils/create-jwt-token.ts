import jwt from "jsonwebtoken";

const { sign } = jwt;

export function createJWTToken(user: { id: string, email: string }, time: string = "24h") {
    return sign(
        user,
        process.env.SECRET_TOKEN,
        {
            algorithm: 'HS256',
            expiresIn: time
        }
    );
}