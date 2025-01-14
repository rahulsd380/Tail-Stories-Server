"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const users_route_1 = require("../modules/users/users.route");
const product_route_1 = require("../modules/posts/product.route");
const payment_route_1 = require("../modules/payment/payment.route");
const group_route_1 = require("../modules/groups/group.route");
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
        route: product_route_1.postRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: "/group",
        route: group_route_1.GroupRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
