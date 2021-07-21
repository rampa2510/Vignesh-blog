import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.send("hello");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});
