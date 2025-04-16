import { Document } from "mongoose"; 
export interface IOrder extends Document {
  userId : string;
  price: number;   
  transactionId?: string;  
}
