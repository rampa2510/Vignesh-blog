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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var dbconfig_1 = __importDefault(require("./helpers/dbconfig"));
var dotenv_1 = __importDefault(require("dotenv"));
var Blog_1 = __importDefault(require("./models/Blog"));
dotenv_1.default.config();
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
aws_sdk_1.default.config.update({
    secretAccessKey: process.env.S3_SEC_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: "ap-south-1",
});
var s3 = new aws_sdk_1.default.S3();
var upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: "vignesh-blog",
        key: function (req, file, cb) {
            var nameArr = file.originalname.split(".");
            var fileName = nameArr[0] + "-" + Date.now() + "." + nameArr[nameArr.length - 1];
            req.newName = fileName;
            cb(null, fileName); //use Date.now() for unique file keys
        },
    }),
});
app.post("/upload", upload.single("upl"), function (req, res) {
    res.status(200).json({
        url: "https://vignesh-blog.s3.ap-south-1.amazonaws.com/" + req.newName,
    });
});
app.post("/login", function (req, res) {
    var password = req.body.password;
    if (!password)
        return res.status(400).json({ success: false });
    if (password === "vigBlog@8")
        return res.status(200).json({ success: true });
    res.status(400).json({ success: false });
});
app.post("/blog", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, blog, blogPhotoUrl, description, title, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, blog = _a.blog, blogPhotoUrl = _a.blogPhotoUrl, description = _a.description, title = _a.title;
                if (!blog || !blogPhotoUrl || !description || !title)
                    return [2 /*return*/, res.status(400).json({ message: "Invalid data" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Blog_1.default.create({
                        html: blog,
                        blogPhotoUrl: blogPhotoUrl,
                        description: description,
                        title: title,
                    })];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ message: "Error = " + error_1.message, error: error_1 });
                return [2 /*return*/];
            case 4:
                res.status(200).json({ message: "Blog added!!" });
                return [2 /*return*/];
        }
    });
}); });
app.put("/blog/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, blog, blogPhotoUrl, description, title, id, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, blog = _a.blog, blogPhotoUrl = _a.blogPhotoUrl, description = _a.description, title = _a.title;
                id = req.params.id;
                if (!blog || !blogPhotoUrl || !description || !title)
                    return [2 /*return*/, res.status(400).json({ message: "Invalid data" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Blog_1.default.findByIdAndUpdate(id, {
                        html: blog,
                        blogPhotoUrl: blogPhotoUrl,
                        description: description,
                        title: title,
                    })];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "Error = " + error_2.message, error: error_2 })];
            case 4:
                res.status(200).json({ message: "Blog added!!" });
                return [2 /*return*/];
        }
    });
}); });
app.get("/blog/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Blog_1.default.findById(id).lean()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.status(200).json({ data: data })];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: "Error = " + error_3.message, error: error_3 })];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/blog", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Blog_1.default.find({}, "blogPhotoUrl description title").lean()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.status(200).json({ data: data })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: "Error = " + error_4.message, error: error_4 })];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/blog/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Blog_1.default.findByIdAndUpdate(id, { $inc: { likes: 1 } })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true })];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: "Error = " + error_5.message, error: error_5 })];
            case 3: return [2 /*return*/];
        }
    });
}); });
var port = 3000;
app.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbconfig_1.default()];
            case 1:
                _a.sent();
                console.log("Server started on " + port + " port");
                return [2 /*return*/];
        }
    });
}); });
