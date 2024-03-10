import { User } from "../models/user";
import { UserDto } from "../models/user-dto";
import { Register } from "../schemas/register";
import { output } from "../utils/output";

export async function registerHandler(reg: Register): Promise<object> {
    const user = await User.findOne({
        where: {
            email: reg.email
        }
    });
    if (user) {
        return output(null, 409, "User already exists");
    }
    else {
        const res = new UserDto(await User.create({
            name: reg.name,
            password: reg.password,
            email: reg.email
        }));
        return output(res, 201, "Usesr created");
    }
}