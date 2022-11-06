import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isVerified: boolean;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  id: {
    type: String
  },
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
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<UserDocument>('User', userSchema);
