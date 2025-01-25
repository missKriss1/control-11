import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from 'bcrypt';
import {UserFields} from "../types";
import {randomUUID} from "node:crypto";

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;

    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<
    HydratedDocument<UserFields>,
    UserModel,
    UserMethods
>({
    username: {
        type: String,
        unique: true,
        validate: [
            {
                validator: async function (this: HydratedDocument<UserFields>, value: string): Promise<boolean> {
                    if (!this.isModified('username')) return true;
                    const user: UserFields | null = await User.findOne({username: value});
                    return !user;
                },
                message: "Данное имя пользователя уже занято.",
            },
            {
                validator: function (value: string): boolean {
                    return value.trim().length > 0;
                },
                message: "Заполните логин.",
            },
        ],
    },
    password: {
        type: String,
        validate: [
            {
                validator: async function (value: string): Promise<boolean> {
                    return value === value.trim();
                },
                message: "Пароль не должен содержать пробелов."
            },
            {
                validator: async function (value: string): Promise<boolean> {
                    return value.trim().length > 0;
                },
                message: "Заполните пароль.",
            },
        ],
    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    next();
});

UserSchema.methods.checkPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
}

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);

export default User;