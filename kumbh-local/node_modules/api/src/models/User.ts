import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['VISITOR', 'PROVIDER', 'ADMIN'], default: 'VISITOR' },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
