import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    res.send(error);
    process.exit(1);
  }
};
