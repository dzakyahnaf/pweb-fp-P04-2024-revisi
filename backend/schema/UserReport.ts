import mongoose, {Schema, Document, Model} from "mongoose";

export interface IUserReport extends Document{
    message: String;
}

const UserReportSchema: Schema<IUserReport> = new Schema(
    {
        message: { type: String, required: true, trim: true },
    },
    {timestamps: true}
)

export const UserReport: Model<IUserReport> = mongoose.model<IUserReport>("UsersReport",UserReportSchema, "userReports");

export default UserReport;