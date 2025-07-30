import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.log("Check your env file");
    }

    if (MONGODB_URI[0].readyState === 1) {
      return;
    }
    await mongoose.connect(MONGODB_URI);
    console.log("DB connected");
  } catch (error) {
    console.log("DB conncection failed");
  }
};

export default dbConnect;
