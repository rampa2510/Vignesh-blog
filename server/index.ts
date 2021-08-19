import express, { Request, Response } from "express";
import cors from "cors";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

aws.config.update({
  secretAccessKey: process.env.S3_SEC_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "ap-south-1",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "vignesh-blog",
    key: function (req, file, cb) {
      const nameArr = file.originalname.split(".");
      const fileName = `${nameArr[0]}-${Date.now()}.${
        nameArr[nameArr.length - 1]
      }`;

      //@ts-ignore
      req.newName = fileName;
      cb(null, fileName); //use Date.now() for unique file keys
    },
  }),
});

app.post(
  "/upload",
  upload.single("upl"),
  function (req: Request, res: Response) {
    //@ts-ignore
    res.status(200).json({
      //@ts-ignore
      url: `https://vignesh-blog.s3.ap-south-1.amazonaws.com/${req.newName}`,
    });
  }
);

app.post("/login", (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ success: false });

  if (password === "vigBlog@8") return res.status(200).json({ success: true });

  res.status(400).json({ success: false });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});
