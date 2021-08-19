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
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
aws_sdk_1.default.config.update({
    secretAccessKey: "0vui4FEyR4zRK//nvIpbXQYgWZ4SUzmjr6Angeij",
    accessKeyId: "AKIAZLC4HILPVWXG7L6T",
    region: "us-east-1",
});
var s3 = new aws_sdk_1.default.S3();
var upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: "bucket-name",
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        },
    }),
});
app.post("/upload", upload.array("upl", 1), function (req, res, next) {
    res.send("Uploaded!");
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
