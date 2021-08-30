import mongoose from "mongoose";
import IContact from "./interface/Contact";

const QuerySchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  query: String,
});

export default mongoose.model<IContact>("query", QuerySchema);
