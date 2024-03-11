import { User } from "../models/user";
import { UserDto } from "../models/user-dto";
import { Update } from "../schemas/update";
import { addFileExtension } from "../utils/add-file-ext";
import { getFilePath } from "../utils/get-file-path";
import { output } from "../utils/output";
import { validate } from "uuid";

export async function updateProfile(upd: Update, id: string, file: Express.Multer.File, req: Express.Request): Promise<object> {
    if (!validate(id)) return output(null, 400, "Invalid profile ID");
    const user = await User.findByPk(id);
    if (!user) return output(null, 404, "Profile not found");
    const fileName = addFileExtension(file.originalname, file.filename);
    const updated = await user.update({
        name: upd.name,
        secondName: upd.secondName,
        email: upd.email,
        gender: upd.gender,
        photo: fileName,
    });
    return output(new UserDto(updated), 200, "Profile was updated");
}