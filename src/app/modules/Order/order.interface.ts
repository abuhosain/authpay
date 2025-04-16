import { Document } from "mongoose"; 
import { Payment_Status } from "./order.constance";
export interface IOrder extends Document {
  userId? : string;
  price: number;   
  transactionId?: string;  
  paymentStatus?: keyof typeof Payment_Status;
}
