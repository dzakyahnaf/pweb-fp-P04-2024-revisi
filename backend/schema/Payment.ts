import mongoose, {Schema, Document, Model} from "mongoose";
import {PaymentMethod} from "../enum/payment_method"
export interface IPayment extends Document{
    total_bill: Number;
    payment_method: PaymentMethod.BankTransfer | PaymentMethod.Qris,
    rent_period: Number
}

const PaymentSchema: Schema<IPayment> = new Schema(
    {
        total_bill: { type: Number, required: true},
        payment_method: {type: String, enum: [PaymentMethod.Qris, PaymentMethod.BankTransfer], default: PaymentMethod.Qris, required:true},
        rent_period: {type:Number, required:true}
    },
    {timestamps: true}
)
export const Payment: Model<IPayment> = mongoose.model<IPayment>("Payment",PaymentSchema, "payments");

export default Payment;