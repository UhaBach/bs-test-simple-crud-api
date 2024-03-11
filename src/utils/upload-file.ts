import { diskStorage } from "multer";
import path, { extname } from "path";
import { getFilePath } from "./get-file-path";

type Callback = (error: null | Error, val: any) => void;
type File = Express.Multer.File;

const dest = getFilePath("");

export const options = {
    storage: diskStorage({
        destination: dest
    }),
    fileFilter: (req: Request, file: File, cb: Callback) => {
        const isValid = (file.mimetype === "image/jpeg" || file.mimetype === "image/png") &&
            (extname(file.originalname) === ".jpg" || extname(file.originalname) === ".png");
        console.log(`Uploaded file with mime type ${file.mimetype} is ${isValid ? "valid" : "invalid"}.`);
        cb(null, isValid);
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
};