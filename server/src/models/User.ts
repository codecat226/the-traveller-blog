import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'email can not be empty'],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model<UserDocument>('User', userSchema);
