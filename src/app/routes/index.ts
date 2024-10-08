import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { postRoutes } from "../modules/posts/posts.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
