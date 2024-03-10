import { validate } from "uuid";
import { output } from "../utils/output";
import { User } from "../models/user";
import { UserDto } from "../models/user-dto";

export async function getOneProfile(id: string): Promise<object> {
    if (!validate(id)) return output(null, 400, "Invalid profile ID");
    const user = await User.findByPk(id);
    if (user) return output(new UserDto(user), 200, "Profile was found");
    else return output(null, 404, "Profile not found");
}

export async function getAllProfiles(page: number = 1, limit: number = 10): Promise<object> {
    const users = await User.findAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: [
            ["registrationDate", "ASC"]
        ]
    });
    return output(UserDto.getDtoArray(users), 200, "All profiles");
}