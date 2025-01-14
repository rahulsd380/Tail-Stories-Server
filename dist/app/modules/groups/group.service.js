"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupServices = void 0;
const group_model_1 = require("./group.model");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const createGroup = (payload, logoFile, coverImageFile) => __awaiter(void 0, void 0, void 0, function* () {
    let logoUrl = '';
    let coverImageUrl = '';
    if (logoFile) {
        const imageName = `${payload.name}-logo-${Date.now()}`;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, logoFile.path);
        logoUrl = secure_url;
    }
    if (coverImageFile) {
        const imageName = `${payload.name}-cover-${Date.now()}`;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, coverImageFile.path);
        coverImageUrl = secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, payload), { logo: logoUrl, coverImage: coverImageUrl, createdAt: new Date() });
    const result = yield group_model_1.Group.create(payloadData);
    return result;
});
const getAllGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield group_model_1.Group.find();
    return result;
});
const getSingleGroup = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield group_model_1.Group.findById(groupId);
    return result;
});
const deleteGroup = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    yield group_model_1.Group.findByIdAndDelete(groupId);
});
exports.GroupServices = {
    createGroup,
    getAllGroups,
    getSingleGroup,
    deleteGroup,
};
