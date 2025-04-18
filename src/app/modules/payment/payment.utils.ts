/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import config from '../../config'

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/payments/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `http://localhost:5000/payments/confirmation?status=failed`,
      cancel_url: 'https://frontend-url',
      amount: paymentData.totalPrice,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: paymentData.custormerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_phone: "01319539510",
      cus_add2: 'N/A',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1206',
      cus_country: 'Bangladesh', 
      type: 'json',
    })
    // console.log('intial', response)
    return response.data
  } catch (err) {
    throw new Error('Payment initiation fialed ')
  }
}

export const verifyPayment = async (transictonId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
        request_id: transictonId,
      },
    })

    return response.data
  } catch (err) {
    throw new Error('Payment validation failed')
  }
}
