import mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  providerType: { 
    type: String, 
    enum: [
      'DRIVER', 'BUS_OPERATOR', 'HOTEL', 'HOMESTAY', 
      'RESTAURANT', 'PRODUCT_SELLER', 'FARMER', 
      'GUIDE', 'VILLAGE_HOST', 'FULFILLMENT_PARTNER'
    ], 
    required: true 
  },
  description: { type: String },
  phone: { type: String, required: true },
  location: { type: String },
  verificationStatus: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED'], default: 'PENDING' },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Provider = mongoose.model('Provider', ProviderSchema);
