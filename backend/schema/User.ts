import mongoose, {Schema, Document, Model} from "mongoose";
import {Role} from "../enum/role"
export interface IUsers extends Document{
    username: String;
    password: String;
    role: Role.Admin | Role.User ;
}

const UsersSchema: Schema<IUsers> = new Schema(
    {
        username: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim:true },
        role: { type: String, enum: [Role.User, Role.Admin], default: Role.User },
    },
    {timestamps: true}
)

export const User: Model<IUsers> = mongoose.model<IUsers>("Users",UsersSchema, "users");

export default User;