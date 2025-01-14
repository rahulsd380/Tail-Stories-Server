import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { postRoutes } from "../modules/posts/product.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { GroupRoutes } from "../modules/groups/group.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/posts",
    route: postRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/group",
    route: GroupRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
