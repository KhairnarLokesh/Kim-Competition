import { Router } from 'express';
import { Provider } from '../models/Provider';
import { MobilityListing, StayListing, FoodListing, ProductListing, ExperienceListing, GuideListing } from '../models/Listings';

export const router = Router();

router.get('/providers', async (req, res) => {
  const providers = await Provider.find();
  res.json(providers);
});

router.get('/mobility', async (req, res) => {
  const listings = await MobilityListing.find().populate('providerId');
  res.json(listings);
});

router.get('/stays', async (req, res) => {
  const listings = await StayListing.find().populate('providerId');
  res.json(listings);
});

router.get('/food', async (req, res) => {
  const listings = await FoodListing.find().populate('providerId');
  res.json(listings);
});

router.get('/products', async (req, res) => {
  const listings = await ProductListing.find().populate('providerId');
  res.json(listings);
});

router.get('/experiences', async (req, res) => {
  const listings = await ExperienceListing.find().populate('providerId');
  res.json(listings);
});

router.get('/guides', async (req, res) => {
  const listings = await GuideListing.find().populate('providerId');
  res.json(listings);
});
