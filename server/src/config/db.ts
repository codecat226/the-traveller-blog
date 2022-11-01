import mongoose from 'mongoose';
import { dev } from '.';

export const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.mongo_url);
    console.log('database is connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
