import mongoose, {Schema, Document, Model} from "mongoose";
export interface IRoomOccupancy extends Document{
    empty: Number;
    filled: Number;
}

const RoomOccupancySchema: Schema<IRoomOccupancy> = new Schema(
    {
        empty: { type: Number, required: true},
        filled: { type: Number, required: true},
    },
    {timestamps: true}
)
export const RoomOccupancy: Model<IRoomOccupancy> = mongoose.model<IRoomOccupancy>("RoomOccupancy",RoomOccupancySchema, "roomOccupancys");

export default RoomOccupancy;