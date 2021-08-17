import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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
