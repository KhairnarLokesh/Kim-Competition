import { BaseListing, ProviderProfile, EconomicImpactMetrics } from "@/types";

export const SEED_PROVIDERS: ProviderProfile[] = [
  {
    id: "prov-driver-1",
    userId: "user-driver-1",
    businessName: "Nashik Kumbh E-Rickshaw Collective",
    providerType: "DRIVER",
    description: "Association of 60+ local licensed electric rickshaw drivers offering zero-emission station-to-ghat shuttles.",
    phone: "+91 98230 11022",
    location: "Nashik Road Station Stand",
    verificationStatus: "VERIFIED",
    rating: 4.9,
    reviewsCount: 312,
    joinedDate: "Jan 2026",
  },
  {
    id: "prov-stay-1",
    userId: "user-stay-1",
    businessName: "Godavari Riverside Homestay",
    providerType: "HOMESTAY",
    description: "Traditional family home with peaceful courtyards, authentic home-cooked breakfast, and riverfront proximity.",
    phone: "+91 98221 44556",
    location: "Panchavati Ghat Road (2.4 km from Ramkund)",
    verificationStatus: "VERIFIED",
    rating: 4.9,
    reviewsCount: 184,
    joinedDate: "Feb 2026",
  },
  {
    id: "prov-food-1",
    userId: "user-food-1",
    businessName: "Aai's Maharashtrian Kitchen",
    providerType: "RESTAURANT",
    description: "Generations-old local kitchen serving authentic Kolhapuri/Khandeshi Misal, steaming poha, and organic jaggery tea.",
    phone: "+91 94220 77889",
    location: "Old Nashik Heritage Lane",
    verificationStatus: "VERIFIED",
    rating: 4.8,
    reviewsCount: 420,
    joinedDate: "Jan 2026",
  },
  {
    id: "prov-guide-1",
    userId: "user-guide-1",
    businessName: "Nashik Heritage Explorers (Student Collective)",
    providerType: "GUIDE",
    description: "History and literature graduates from Nashik University guiding pilgrims through Ramayana landmarks and ghat rituals.",
    phone: "+91 98600 33441",
    location: "Ramkund Ghat Steps",
    verificationStatus: "VERIFIED",
    rating: 5.0,
    reviewsCount: 96,
    joinedDate: "Mar 2026",
  },
  {
    id: "prov-farm-1",
    userId: "user-farm-1",
    businessName: "Dindori Valley Farmers Producer Co.",
    providerType: "FARMER",
    description: "Direct-from-farm collective of 80 grape growers producing export-grade golden raisins and offering farm visits.",
    phone: "+91 99210 88992",
    location: "Dindori Agri Hub, Nashik",
    verificationStatus: "VERIFIED",
    rating: 4.9,
    reviewsCount: 230,
    joinedDate: "Jan 2026",
  },
  {
    id: "prov-artisan-1",
    userId: "user-artisan-1",
    businessName: "Nashik Tambat Ali Brass Artisans",
    providerType: "VILLAGE_HOST",
    description: "4th generation coppersmiths and brass hammerers preserving traditional Indian ritual metal craft.",
    phone: "+91 97650 44110",
    location: "Tambat Ali, Old Nashik",
    verificationStatus: "VERIFIED",
    rating: 4.8,
    reviewsCount: 78,
    joinedDate: "Feb 2026",
  },
  {
    id: "prov-fulfill-1",
    userId: "user-fulfill-1",
    businessName: "Godavari Swift Logistics (Local Delivery)",
    providerType: "FULFILLMENT_PARTNER",
    description: "Nashik micro-hub delivery network employing local youth for collection, consolidation, and doorstep box shipping.",
    phone: "+91 95030 99881",
    location: "MIDC Ambad Hub, Nashik",
    verificationStatus: "VERIFIED",
    rating: 4.9,
    reviewsCount: 512,
    joinedDate: "Jan 2026",
  }
];

export const SEED_LISTINGS: BaseListing[] = [
  // 1. MOBILITY
  {
    id: "mob-1",
    providerId: "prov-driver-1",
    providerName: "Nashik Kumbh E-Rickshaw Collective",
    providerType: "DRIVER",
    category: "mobility",
    title: "Shared E-Rickshaw to Panchavati Ghat",
    description: "Zero-noise, comfortable e-rickshaw ride directly from Railway Station to holy bathing ghats with reserved seating.",
    price: 80,
    unit: "per seat",
    location: "Nashik Road Railway Station -> Panchavati",
    rating: 4.9,
    reviewsCount: 198,
    images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80"],
    badges: ["Zero Emission", "Fixed Tariff", "No Bargain"],
    metadata: {
      vehicleType: "Electric Rickshaw (4-Seater)",
      pickupPoint: "Platform 1 Exit, Nashik Road Station",
      destination: "Ramkund Pilgrim Drop Point",
      duration: "25 mins",
      capacity: 4,
      departureTimes: ["Every 10 mins (6:00 AM - 10:00 PM)"]
    }
  },
  {
    id: "mob-2",
    providerId: "prov-driver-1",
    providerName: "Nashik Kumbh E-Rickshaw Collective",
    providerType: "DRIVER",
    category: "mobility",
    title: "Dedicated Kumbh AC Shuttle — Trimbak Express",
    description: "Air-conditioned local minibus shuttle with luggage compartment, running regular frequencies for pilgrims.",
    price: 140,
    unit: "per passenger",
    location: "CBS Central Bus Stand -> Trimbakeshwar Jyotirlinga",
    rating: 4.8,
    reviewsCount: 145,
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80"],
    badges: ["Air Conditioned", "Guaranteed Seat", "Pilgrim Special"],
    metadata: {
      vehicleType: "24-Seater AC Shuttle",
      pickupPoint: "CBS Nashik Bay 4",
      destination: "Trimbakeshwar Temple Gate",
      duration: "45 mins",
      capacity: 24,
      departureTimes: ["7:00 AM", "9:30 AM", "12:00 PM", "3:30 PM", "6:00 PM"]
    }
  },

  // 2. STAYS
  {
    id: "stay-1",
    providerId: "prov-stay-1",
    providerName: "Godavari Riverside Homestay",
    providerType: "HOMESTAY",
    category: "stays",
    title: "Godavari Family Homestay & Courtyard",
    description: "Serene heritage home hosted by Mrs. Kulkarni. Includes warm Maharashtrian breakfast, hot water, and quiet temple vibe.",
    price: 900,
    unit: "per night",
    location: "2.4 km from Panchavati & Ramkund",
    rating: 4.9,
    reviewsCount: 184,
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80"],
    badges: ["Local Family Host", "Vegetarian Breakfast Included", "Power Backup"],
    metadata: {
      capacity: 4,
      amenities: ["Free Home Breakfast", "High-speed Wi-Fi", "Solar Hot Water", "Safe Locker", "Filtered Water"]
    }
  },
  {
    id: "stay-2",
    providerId: "prov-stay-1",
    providerName: "Godavari Riverside Homestay",
    providerType: "HOMESTAY",
    category: "stays",
    title: "Old Nashik Wada Heritage Rooms",
    description: "Authentic teakwood-pillared Wada room giving a timeless peek into ancient Nashik craftsmanship and pilgrim hospitality.",
    price: 1250,
    unit: "per night",
    location: "Old Heritage Quarter, 600m from Kalaram Temple",
    rating: 4.8,
    reviewsCount: 92,
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80"],
    badges: ["120-Year Heritage", "Walk to Temple", "Private Bath"],
    metadata: {
      capacity: 3,
      amenities: ["Attached Bath", "Heritage Courtyard Access", "Herbal Tea Service", "Quiet Zone"]
    }
  },

  // 3. FOOD
  {
    id: "food-1",
    providerId: "prov-food-1",
    providerName: "Aai's Maharashtrian Kitchen",
    providerType: "RESTAURANT",
    category: "food",
    title: "Famous Nashik Breakfast Trail (Misal + Poha + Tea)",
    description: "The classic Nashik morning experience: Sprouted moth bean Katachi Misal served with butter pav, steaming batata poha, and cutting chai.",
    price: 199,
    unit: "per combo",
    location: "Heritage Lane, Panchavati",
    rating: 4.9,
    reviewsCount: 380,
    images: ["https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"],
    badges: ["Local Iconic", "Pure Vegetarian", "Freshly Cooked"],
    metadata: {
      prepTime: "12-15 mins",
      origin: "Family Recipe since 1974"
    }
  },
  {
    id: "food-2",
    providerId: "prov-food-1",
    providerName: "Aai's Maharashtrian Kitchen",
    providerType: "RESTAURANT",
    category: "food",
    title: "Traditional Khandeshi Jowar Bhakri & Shev Bhaji Thali",
    description: "Clay-oven baked hot jowar bhakri, spicy red curry shev bhaji, thecha, onion salad, and homemade gulab jamun.",
    price: 260,
    unit: "per thali",
    location: "Heritage Lane, Panchavati",
    rating: 4.8,
    reviewsCount: 210,
    images: ["https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"],
    badges: ["Farm Fresh Ingredients", "Unlimited Curry", "Homestyle"],
    metadata: {
      prepTime: "20 mins",
      origin: "Local Village Grains"
    }
  },

  // 4. GUIDES
  {
    id: "guide-1",
    providerId: "prov-guide-1",
    providerName: "Nashik Heritage Explorers (Student Collective)",
    providerType: "GUIDE",
    category: "guides",
    title: "Panchavati Heritage & Ramayana Sacred Walk",
    description: "Walk the footsteps of ancient legend. Explore Sita Gumpha, Kalaram Temple architecture, Ramkund historical rituals, and oral history.",
    price: 299,
    unit: "per attendee",
    location: "Starts at Kalaram Temple North Gate",
    rating: 5.0,
    reviewsCount: 114,
    images: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80"],
    badges: ["Certified Student Historians", "Hindi & English", "Audio System Provided"],
    metadata: {
      duration: "90 minutes",
      languages: ["Marathi", "Hindi", "English"],
      capacity: 12
    }
  },
  {
    id: "guide-2",
    providerId: "prov-guide-1",
    providerName: "Nashik Heritage Explorers (Student Collective)",
    providerType: "GUIDE",
    category: "guides",
    title: "Godavari Evening Maha-Aarti Spiritual Guide",
    description: "Understand the Vedic hymns, sacred lamps ceremony, and river heritage with a dedicated cultural storyteller.",
    price: 349,
    unit: "per person",
    location: "Ramkund Ghat Platform",
    rating: 4.9,
    reviewsCount: 88,
    images: ["https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80"],
    badges: ["Includes Ritual Diya Offering", "Reserved Viewing Spot"],
    metadata: {
      duration: "75 minutes",
      languages: ["Hindi", "English", "Marathi"],
      capacity: 15
    }
  },

  // 5. VILLAGE EXPERIENCES
  {
    id: "exp-1",
    providerId: "prov-farm-1",
    providerName: "Dindori Valley Farmers Producer Co.",
    providerType: "FARMER",
    category: "experiences",
    title: "Dindori Grape Harvest & Agro-Village Immersion",
    description: "Escape the festival crowds. Tour organic grape farms, witness raisin drying racks, enjoy a bullock cart ride, and eat a farm-fresh lunch.",
    price: 499,
    unit: "per adult",
    location: "Dindori Village, 22 km from Nashik (Local Shuttle Included)",
    rating: 4.9,
    reviewsCount: 152,
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80"],
    badges: ["Direct Farmer Income", "Lunch Included", "Family Friendly"],
    metadata: {
      duration: "3.5 hours",
      capacity: 20
    }
  },
  {
    id: "exp-2",
    providerId: "prov-artisan-1",
    providerName: "Nashik Tambat Ali Brass Artisans",
    providerType: "VILLAGE_HOST",
    category: "experiences",
    title: "Tambat Ali Heritage Brass Hammering & Craft Studio",
    description: "Sit beside master coppersmiths. Learn the rhythmic 'Mathar' hammering technique and craft your own personalized copper bookmark.",
    price: 399,
    unit: "per attendee",
    location: "Tambat Ali, Old City",
    rating: 4.8,
    reviewsCount: 64,
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"],
    badges: ["Preserve Dying Craft", "Keep Your Creation", "Small Batch"],
    metadata: {
      duration: "2 hours",
      capacity: 8
    }
  },

  // 6. PRODUCTS (Send My Nashik Box Home)
  {
    id: "prod-1",
    providerId: "prov-farm-1",
    providerName: "Dindori Valley Farmers Producer Co.",
    providerType: "FARMER",
    category: "products",
    title: "GI-Certified Nashik Golden Sweet Raisins (1 kg)",
    description: "Sun-dried in Dindori valley without artificial sulfur treatments. Naturally succulent, rich in minerals, direct from farmer collective.",
    price: 320,
    unit: "1 kg sealed tin",
    location: "Dindori Farmers FPO",
    rating: 4.9,
    reviewsCount: 310,
    images: ["https://images.unsplash.com/photo-1596450514735-111a2fe0ac1f?w=800&auto=format&fit=crop&q=80"],
    badges: ["GI Tagged", "Direct Farmer Pay", "Box Home Eligible"],
    shippingAvailable: true,
    metadata: {
      stock: 450,
      origin: "Dindori Orchards, Nashik"
    }
  },
  {
    id: "prod-2",
    providerId: "prov-artisan-1",
    providerName: "Nashik Tambat Ali Brass Artisans",
    providerType: "VILLAGE_HOST",
    category: "products",
    title: "Hand-Hammered Pure Brass Kumbh Ganga Kalash",
    description: "Traditional sacred water vessel hand-beaten by Nashik brass artisans with auspicious geometric indentations for holy water.",
    price: 550,
    unit: "per handcrafted kalash",
    location: "Tambat Ali Co-operative",
    rating: 4.9,
    reviewsCount: 122,
    images: ["https://images.unsplash.com/photo-1584285418504-0051b3d37704?w=800&auto=format&fit=crop&q=80"],
    badges: ["Handmade", "Sacred Memento", "Box Home Eligible"],
    shippingAvailable: true,
    metadata: {
      stock: 120,
      origin: "Tambat Ali Artisan Guild"
    }
  },
  {
    id: "prod-3",
    providerId: "prov-food-1",
    providerName: "Aai's Maharashtrian Kitchen",
    providerType: "RESTAURANT",
    category: "products",
    title: "Authentic Nashik Kondaji Chivda & Spice Hamper",
    description: "Famous crisp flattened rice snack fried in groundnut oil with curry leaves, peanuts, and secret family masala.",
    price: 240,
    unit: "500g pouch + masala jar",
    location: "Old Nashik Bazar",
    rating: 4.8,
    reviewsCount: 240,
    images: ["https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"],
    badges: ["Iconic Taste", "Box Home Eligible"],
    shippingAvailable: true,
    metadata: {
      stock: 300,
      origin: "Nashik City"
    }
  },
  {
    id: "prod-4",
    providerId: "prov-artisan-1",
    providerName: "Yeola Silk Weavers Guild",
    providerType: "VILLAGE_HOST",
    category: "products",
    title: "Handwoven Yeola Paithani Silk Border Dupatta",
    description: "Pure zari work peacock motif handcrafted by traditional weavers of Yeola. Luxurious heirloom keepsake.",
    price: 1150,
    unit: "per handwoven dupatta",
    location: "Yeola Handloom Center",
    rating: 5.0,
    reviewsCount: 84,
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"],
    badges: ["Authentic Handloom", "Box Home Eligible"],
    shippingAvailable: true,
    metadata: {
      stock: 45,
      origin: "Yeola, Nashik District"
    }
  }
];

export const SEED_MACRO_METRICS: EconomicImpactMetrics = {
  totalRevenueGenerated: 2842500, // ₹28.4 Lakhs
  totalBookingsCompleted: 12540,
  totalServiceJobsCreated: 1860,
  registeredProvidersCount: 1248,
  providersByCategory: {
    mobility: 320,
    stays: 180,
    food: 290,
    products: 170,
    guides: 95,
    experiences: 110,
    fulfillment: 83
  }
};
