"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// users.route.ts
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.get('/', users_controller_1.UserControllers.getAllUser);
router.get('/me', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.getMe);
router.get('/:userId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.getSingleUserById);
router.get('/my-posts/:authorId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.getMyPosts);
router.put('/me', (0, auth_1.default)('user', 'admin'), sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, users_controller_1.UserControllers.updateProfile);
router.delete('/delete-user/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.deleteUser);
router.put('/change-role/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.changeUserRoleToAdmin);
router.put('/make-user/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.changeUserRoleToUser);
router.put('/follow/:userId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.followUser);
router.put('/unfollow/:userId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.unfollowUser);
exports.userRoutes = router;
