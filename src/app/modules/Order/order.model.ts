import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
import { Payment_Status } from "./order.constance";

const orderSchema = new Schema<IOrder>({
    userId : {
        type : String,
    },
    transactionId : {
        type : String,
        required : true
    },
    price: {
        type: Number,
        required: true,
    },  
    paymentStatus: {
        type: String,
        enum: Object.values(Payment_Status),  
        default: Payment_Status.pending,  
      },
});


export const Order = model<IOrder>("Order", orderSchema);