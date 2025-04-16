import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { Order } from "../modules/Order/order.model";
import { PaymentRoutes } from "../modules/payment/payment.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/payments",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
