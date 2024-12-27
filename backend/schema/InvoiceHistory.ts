import mongoose, {Schema, Document, Model} from "mongoose";
export interface IInvoiceHistory extends Document{
    bill: Number;
    status: String;
    payment_id: mongoose.Types.ObjectId
}

const InvoiceHistorySchema: Schema<IInvoiceHistory> = new Schema(
    {
        bill: { type: Number, required: true},
        status: { type: String, required: true},
        payment_id: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", required:true }
    },
    {timestamps: true}
)
export const InvoiceHistory: Model<IInvoiceHistory> = mongoose.model<IInvoiceHistory>("InvoiceHistory",InvoiceHistorySchema, "invoiceHistorys");

export default InvoiceHistory;