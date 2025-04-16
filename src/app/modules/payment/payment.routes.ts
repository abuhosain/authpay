import express from 'express' 
import auth from '../../middleware/auth'; 
import { USER_ROLE } from '../User/auth.constance';
import { OrderControllers } from '../Order/order.controller';
import { PaymentControllers } from './payment.controller';
const router = express.Router()

router.post("/checkout", auth(USER_ROLE.user), OrderControllers.createOrder);

router.post("/confirmation", PaymentControllers.confirmationController)
export const PaymentRoutes = router;
