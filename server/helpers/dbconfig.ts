import mongoose from "mongoose";

const dbConnect = async () => {
  const mongoUri = process.env.MONGO_URI || "";
  try {
    let mongooseOptions = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    const conn = await mongoose.connect(mongoUri, mongooseOptions);
    console.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
  }
};

export default dbConnect;
