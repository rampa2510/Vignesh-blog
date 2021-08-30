import { Document } from "mongoose";

export default interface IContact extends Document {
  fName: String;
  lName: String;
  email: String;
  query: String;
}
