import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    IsEmail,
    Length,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { generateHash } from "../utils/generate-hash";


@Table({
    tableName: "users"
})
export class User extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name: string

    @AllowNull(true)
    @Column(DataType.TEXT)
    secondName: string;

    @IsEmail
    @AllowNull(false)
    @Unique
    @Length({ min: 5, max: 255 })
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Length({ min: 5, max: 255 })
    @Column(DataType.TEXT)
    get password(): string {
        return this.password;
    }

    set password(value: string) {
        this.setDataValue("password", generateHash(value));
    }

    @AllowNull(true)
    @Column(DataType.ENUM("Male", "Female"))
    gender: string

    @AllowNull(true)
    @Column(DataType.TEXT)
    photo: string;

    @CreatedAt
    @Column(DataType.DATE)
    registrationDate: Date
}