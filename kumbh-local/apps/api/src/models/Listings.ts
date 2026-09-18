import mongoose from 'mongoose';

const baseListingOptions = { discriminatorKey: 'listingType', collection: 'listings' };

const ListingSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now }
}, baseListingOptions);

export const Listing = mongoose.model('Listing', ListingSchema);

// Discriminators
export const MobilityListing = Listing.discriminator('Mobility', new mongoose.Schema({
  vehicleType: { type: String, required: true },
  route: { type: String },
  pickupPoint: { type: String, required: true },
  destination: { type: String, required: true },
  capacity: { type: Number },
  availableSeats: { type: Number },
  departureTime: { type: Date }
}));

export const StayListing = Listing.discriminator('Stay', new mongoose.Schema({
  type: { type: String, required: true }, // Hotel, Homestay, etc
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  amenities: [{ type: String }],
  availability: { type: Boolean, default: true },
  rating: { type: Number, default: 0 }
}));

export const FoodListing = Listing.discriminator('Food', new mongoose.Schema({
  category: { type: String, required: true },
  preparationTime: { type: String },
  availability: { type: Boolean, default: true }
}));

export const ProductListing = Listing.discriminator('Product', new mongoose.Schema({
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  origin: { type: String },
  shippingAvailable: { type: Boolean, default: true }
}));

export const ExperienceListing = Listing.discriminator('Experience', new mongoose.Schema({
  category: { type: String, required: true },
  duration: { type: String, required: true },
  capacity: { type: Number },
  location: { type: String, required: true },
  availability: { type: Boolean, default: true }
}));

export const GuideListing = Listing.discriminator('Guide', new mongoose.Schema({
  languages: [{ type: String }],
  specialization: { type: String },
  duration: { type: String, required: true },
  locations: [{ type: String }],
  rating: { type: Number, default: 0 }
}));
