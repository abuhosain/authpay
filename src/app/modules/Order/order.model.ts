import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
    userId : {
        type : String,
        required : true
    },
    price: {
        type: Number,
        required: true,
    },  
});


export const Order = model<IOrder>("Order", orderSchema);