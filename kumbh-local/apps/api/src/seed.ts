import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Provider } from './models/Provider';
import { MobilityListing, StayListing, FoodListing, ProductListing, ExperienceListing, GuideListing } from './models/Listings';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kumbh_local';

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    // Clear existing data
    console.log('Clearing old data...');
    await User.deleteMany({});
    await Provider.deleteMany({});
    await mongoose.model('Listing').deleteMany({});

    // 1. Create Users (Admin, Visitor, Providers)
    const admin = await User.create({ name: 'Admin', email: 'admin@kumbhlocal.com', phone: '9999999999', passwordHash: 'hashedpassword', role: 'ADMIN' });
    const visitor = await User.create({ name: 'Rahul Visitor', email: 'rahul@example.com', phone: '8888888888', passwordHash: 'hashedpassword', role: 'VISITOR' });
    const providerUser1 = await User.create({ name: 'Nashik Cab Owner', email: 'cab@example.com', phone: '7777777771', passwordHash: 'hashedpassword', role: 'PROVIDER' });
    const providerUser2 = await User.create({ name: 'Godavari Homestay Owner', email: 'stay@example.com', phone: '7777777772', passwordHash: 'hashedpassword', role: 'PROVIDER' });
    const providerUser3 = await User.create({ name: 'Aai Kitchen', email: 'food@example.com', phone: '7777777773', passwordHash: 'hashedpassword', role: 'PROVIDER' });
    const providerUser4 = await User.create({ name: 'Nashik Farmer', email: 'farm@example.com', phone: '7777777774', passwordHash: 'hashedpassword', role: 'PROVIDER' });

    // 2. Create Providers
    const cabProvider = await Provider.create({ userId: providerUser1._id, businessName: 'Nashik Kumbh Shuttle', providerType: 'DRIVER', phone: '7777777771', verificationStatus: 'VERIFIED', rating: 4.8 });
    const stayProvider = await Provider.create({ userId: providerUser2._id, businessName: 'Godavari Homestay', providerType: 'HOMESTAY', phone: '7777777772', verificationStatus: 'VERIFIED', rating: 4.9 });
    const foodProvider = await Provider.create({ userId: providerUser3._id, businessName: 'Aais Maharashtrian Kitchen', providerType: 'RESTAURANT', phone: '7777777773', verificationStatus: 'VERIFIED', rating: 4.7 });
    const farmProvider = await Provider.create({ userId: providerUser4._id, businessName: 'Nashik Farmer Collective', providerType: 'FARMER', phone: '7777777774', verificationStatus: 'VERIFIED', rating: 4.6 });

    // 3. Create Listings
    await MobilityListing.create({
      providerId: cabProvider._id, title: 'Shared E-Rickshaw to Panchavati', description: 'Fast shared transport from Station',
      price: 80, vehicleType: 'E-Rickshaw', pickupPoint: 'Nashik Road Railway Station', destination: 'Panchavati',
      capacity: 4, availableSeats: 4
    });

    await StayListing.create({
      providerId: stayProvider._id, title: 'Nashik Family Homestay', description: 'Cozy rooms near the river.',
      price: 900, type: 'Homestay', location: '2.4 km from Panchavati', capacity: 4, amenities: ['Breakfast', 'WiFi']
    });

    await FoodListing.create({
      providerId: foodProvider._id, title: 'Nashik Breakfast Trail', description: 'Includes Poha, Misal, Tea.',
      price: 199, category: 'Traditional Food', preparationTime: '15 mins'
    });

    await ExperienceListing.create({
      providerId: farmProvider._id, title: 'Nashik Village Experience', description: 'Farm visit, traditional meal, local activity.',
      price: 499, category: 'Village', duration: '3 hours', location: 'Trimbak Farm', capacity: 10
    });

    await ProductListing.create({
      providerId: farmProvider._id, title: 'Nashik Raisin Box', description: 'Fresh local raisins from our farms.',
      price: 300, category: 'Food', stock: 50, origin: 'Nashik Farms', shippingAvailable: true
    });

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
