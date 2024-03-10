import { User } from "./user";

export class UserDto {
    id?: string;
    name?: string;
    secondName?: string;
    email?: string;
    gender?: string;
    photo?: string;
    registrationDate?: Date;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.secondName = user.secondName;
        this.email = user.email;
        this.gender = user.gender;
        this.photo = user.photo;
        this.registrationDate = user.registrationDate;
    }

    static getDtoArray(users: User[]) {
        return users.map(user => {
            return new UserDto(user);
        });
    }
}