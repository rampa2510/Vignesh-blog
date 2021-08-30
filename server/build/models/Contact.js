"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var QuerySchema = new mongoose_1.default.Schema({
    fName: String,
    lName: String,
    email: String,
    query: String,
});
exports.default = mongoose_1.default.model("query", QuerySchema);
