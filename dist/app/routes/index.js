"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const users_route_1 = require("../modules/users/users.route");
const posts_route_1 = require("../modules/posts/posts.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: users_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute,
    },
    {
        path: "/posts",
        route: posts_route_1.postRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
