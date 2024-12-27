import mongoose, {Schema, Document, Model} from "mongoose";
export interface IDamageReport extends Document{
    user_id: mongoose.Types.ObjectId;
    message: String;
}

const DamageReportSchema: Schema<IDamageReport> = new Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        message: { type: String, required: true, trim: true },
    },
    {timestamps: true}
)

export const DamageReport: Model<IDamageReport> = mongoose.model<IDamageReport>("DamageReport",DamageReportSchema, "damageReports");

export default DamageReport;