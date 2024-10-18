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
// import { upload } from '../../utils/sendImageToCloudinary';
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.get('/', users_controller_1.UserControllers.getAllUser);
router.get('/me', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.getMe);
router.get('/:userId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.getSingleUserById);
router.get('/my-posts/:authorId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.getMyPosts);
router.put('/me', multer_config_1.multerUpload.single("file"), (req, res, next) => {
    var _a, _b;
    if ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data) {
        req.body = JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.data);
    }
    next();
}, users_controller_1.UserControllers.updateProfile);
router.delete('/delete-user/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.deleteUser);
router.put('/make-admin/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.changeUserRoleToAdmin);
router.put('/make-user/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.changeUserRoleToUser);
router.put('/follow/:userId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.followUser);
router.put('/unfollow/:userId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.unfollowUser);
exports.userRoutes = router;
