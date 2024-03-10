import { User } from "../models/user";
import { UserDto } from "../models/user-dto";
import { Update } from "../schemas/update";
import { output } from "../utils/output";
import { validate } from "uuid";

export async function updateProfile(upd: Update, id: string): Promise<object> {
    if (!validate(id)) return output(null, 400, "Invalid profile ID");
    const user = await User.findByPk(id);
    if (!user) return output(null, 404, "Profile not found");
    const updated = await user.update({
        name: upd.name,
        secondName: upd.secondName,
        email: upd.email,
        gender: upd.gender,
        photo: upd.photo,
    });
    return output(new UserDto(updated), 200, "Profile was updated");
}