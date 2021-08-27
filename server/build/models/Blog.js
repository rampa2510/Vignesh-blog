"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var BlogSchema = new mongoose_1.default.Schema({
    html: String,
    createdAt: { type: Date, default: Date.now },
    author: { type: String, default: "Vignesh Nayak" },
    updatedAt: Date,
    isDeleted: { type: Boolean, default: false },
    blogPhotoUrl: String,
    description: String,
    title: String,
    likes: { type: Number, default: 0 }
});
exports.default = mongoose_1.default.model("blog", BlogSchema);
