"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRoutes = void 0;
const express_1 = __importDefault(require("express"));
const group_controller_1 = require("./group.controller");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post('/create-group', multer_config_1.multerUpload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
]), (req, res, next) => {
    // Parse the JSON data from the 'data' field
    if (req.body.data) {
        req.body = JSON.parse(req.body.data);
    }
    next();
}, group_controller_1.GroupControllers.createGroup);
router.get('/', group_controller_1.GroupControllers.getAllGroups);
router.get('/:groupId', group_controller_1.GroupControllers.getSingleGroup);
router.delete('/:groupId', group_controller_1.GroupControllers.deleteGroup);
exports.GroupRoutes = router;
