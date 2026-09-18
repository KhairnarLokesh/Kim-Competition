import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  visitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  bookingDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
  paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', BookingSchema);
