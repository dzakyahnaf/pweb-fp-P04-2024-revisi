import mongoose, {Schema, Document, Model} from "mongoose";
export interface IUserDetails extends Document{
    user_id: mongoose.Types.ObjectId;
    invoice_id: mongoose.Types.ObjectId;
}

const UserDetailsSchema: Schema<IUserDetails> = new Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: "InvoiceHistory", required: true},
    },
    {timestamps: true}
)

export const UserDetail: Model<IUserDetails> = mongoose.model<IUserDetails>("UserDetail",UserDetailsSchema, "userDetails");

export default UserDetail;