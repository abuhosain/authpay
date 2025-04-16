import { join } from "path";
import ejs from "ejs";

import { verifyPayment } from "../payment/payment.utils";
import { Order } from "../Order/order.model";
import { Payment_Status } from "../Order/order.constance";

const confirmationService = async (txId: string, status: string) => {
  // Verify payment
  const verifyResponse = await verifyPayment(txId);
  // console.log("verifyResponse", verifyResponse);
  let paymentData;

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    // Update order payment status
    const updatedOrder = await Order.findOneAndUpdate(
      { transactionId: txId },
      {
        paymentStatus: Payment_Status.paid,
      },
      {
        new: true,
      }
    );

    // Retrieve updated order details
    const orderData = await Order.findOne({ transactionId: txId });

    if (!orderData) {
      throw new Error("Order not found.");
    }

    // Prepare payment data for the confirmation template
    paymentData = {
      consumerName: verifyResponse.cus_name,
      email: verifyResponse.cus_email, 
      transactionId: verifyResponse?.mer_txnid || txId,
      amount: verifyResponse.amount,
      currency: "BDT",
      paymentType: verifyResponse?.payment_type,
      payTime: verifyResponse.date,
      paymentStatus: verifyResponse.pay_status,
    }; 
  } 
  // Render appropriate template based on status
  const templatePath =
    status === "success"
      ? join(process.cwd(), "views", "confirmation.ejs")
      : join(process.cwd(), "views", "failed.ejs");

  const template = await ejs.renderFile(templatePath, paymentData || {});
  return template;
};

export const paymentServices = {
  confirmationService,
};
