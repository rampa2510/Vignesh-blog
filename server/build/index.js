"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var dotenv_1 = __importDefault(require("dotenv"));
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
            //@ts-ignore
            req.newName = fileName;
            cb(null, fileName); //use Date.now() for unique file keys
        },
    }),
});
app.post("/upload", upload.single("upl"), function (req, res) {
    //@ts-ignore
    res.status(200).json({
        //@ts-ignore
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
var port = 3000;
app.listen(port, function () {
    console.log("Server started on " + port + " port");
});
