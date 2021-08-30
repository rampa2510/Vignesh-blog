import express, { Request, Response } from "express";
import cors from "cors";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import dbConnect from "./helpers/dbconfig";
import dotenv from "dotenv";
import Blog from "./models/Blog";
import Contact from "./models/Contact";

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

      req.newName = fileName;
      cb(null, fileName); //use Date.now() for unique file keys
    },
  }),
});

app.post(
  "/upload",
  upload.single("upl"),
  function (req: Request, res: Response) {
    res.status(200).json({
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

app.post("/blog", async (req: Request, res: Response) => {
  const { blog, blogPhotoUrl, description, title } = req.body;

  if (!blog || !blogPhotoUrl || !description || !title)
    return res.status(400).json({ message: "Invalid data" });

  try {
    await Blog.create({
      html: blog,
      blogPhotoUrl,
      description,
      title,
    });
  } catch (error) {
    res.status(500).json({ message: `Error = ${error.message}`, error });
    return;
  }

  res.status(200).json({ message: "Blog added!!" });
});

app.put("/blog/:id", async (req: Request, res: Response) => {
  const { blog, blogPhotoUrl, description, title } = req.body;
  const { id } = req.params;

  if (!blog || !blogPhotoUrl || !description || !title)
    return res.status(400).json({ message: "Invalid data" });

  try {
    await Blog.findByIdAndUpdate(id, {
      html: blog,
      blogPhotoUrl,
      description,
      title,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error = ${error.message}`, error });
  }

  res.status(200).json({ message: "Blog added!!" });
});

app.get("/blog/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Blog.findById(id).lean();

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: `Error = ${error.message}`, error });
  }
});

app.get("/blog", async (_: Request, res: Response) => {
  try {
    const data = await Blog.find({}, "blogPhotoUrl description title").lean();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: `Error = ${error.message}`, error });
  }
});

app.post("/blog/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: `Error = ${error.message}`, error });
  }
});

app.post("/contact", async (req: Request, res: Response) => {
  const { fName, lName, email, query } = req.body;
  await Contact.create({ fName, lName, email, query });
  res.status(200).json({ msg: "Query added" });
});

app.get("/contact", async (req: Request, res: Response) => {
  const queryData = await Contact.find({}).lean();
  res.status(200).json({ data: queryData });
});

const port = 3000;

app.listen(port, async () => {
  await dbConnect();
  console.log(`Server started on ${port} port`);
});
