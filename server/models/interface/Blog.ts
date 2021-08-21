import { Document } from "mongoose";

export default interface IBlog extends Document {
  html: string;
  createdAt: Date;
  author: string;
  updatedAt: Date;
  isDeleted: boolean;
  blogPhotoUrl: string;
  description: string;
  title: string;
}
