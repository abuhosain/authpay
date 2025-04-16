import { JwtPayload } from "jsonwebtoken";
import { User } from "../User/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { initiatePayment } from "../payment/payment.utils";


const createOrder = async (user: JwtPayload, payload: Partial<IOrder>) => {

    // Find user
    const isUser = await User.findOne({ email: user?.email });
    if (!isUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
 
 
    // Generate a new transaction ID
    const transactionId = `TXN-${Date.now()}`;
 
    // Prepare the new order data
    const orderData: Partial<IOrder> = {
        userId: payload.userId,
        price: payload.price, 
        transactionId: transactionId
    };
 
    // Create the new order
    const order = await Order.create(orderData);
 
   const paymentData = {
     transactionId : transactionId,
     totalPrice: payload?.price,
     custormerName: isUser.name,
     customerEmail: isUser.email, 
     customerAddress: "Bogura, Bangladesh", 
   };
 
   
   const paymentSeasion = await initiatePayment(paymentData)
   return paymentSeasion
 
 }
 
 export const orderService = {
   createOrder,
 }
 