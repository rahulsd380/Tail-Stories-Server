"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
// group.model.ts
const mongoose_1 = require("mongoose");
const GroupSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    members: { type: [String], default: [] },
    logo: { type: String, required: true },
    coverImage: { type: String, required: true },
    tagline: { type: String, required: true },
});
exports.Group = (0, mongoose_1.model)('Group', GroupSchema);
