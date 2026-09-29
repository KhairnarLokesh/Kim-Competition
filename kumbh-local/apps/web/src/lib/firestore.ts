import { db, isFirebaseConfigured } from "./firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";
import { 
  BaseListing, 
  ProviderProfile, 
  Booking, 
  Order, 
  SectorCategory, 
  EconomicImpactMetrics 
} from "@/types";
import { 
  SEED_LISTINGS, 
  SEED_PROVIDERS, 
  SEED_MACRO_METRICS 
} from "./seedData";

// Local storage keys for pitch-safe offline demo persistence
const LOCAL_BOOKINGS_KEY = "kumbh_local_bookings";
const LOCAL_ORDERS_KEY = "kumbh_local_orders";

function getLocalData<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalData<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

export async function getListings(category?: SectorCategory): Promise<BaseListing[]> {
  if (isFirebaseConfigured && db) {
    try {
      const listingsRef = collection(db, "listings");
      const q = category ? query(listingsRef, where("category", "==", category)) : listingsRef;
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BaseListing));
      }
    } catch (err) {
      console.warn("Firestore fetch listings failed, using seed data fallback:", err);
    }
  }

  // Graceful fallback to rich local seed data
  if (category) {
    return SEED_LISTINGS.filter(item => item.category === category);
  }
  return SEED_LISTINGS;
}

export async function getListingById(id: string): Promise<BaseListing | undefined> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "listings", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as BaseListing;
      }
    } catch (err) {
      console.warn("Firestore getListingById failed, using seed fallback:", err);
    }
  }
  return SEED_LISTINGS.find(item => item.id === id);
}

export async function getProviders(): Promise<ProviderProfile[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "providers"));
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProviderProfile));
      }
    } catch (err) {
      console.warn("Firestore getProviders failed, using seed fallback:", err);
    }
  }
  return SEED_PROVIDERS;
}

export async function createBooking(bookingData: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
  const newBooking: Booking = {
    ...bookingData,
    id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "bookings", newBooking.id), newBooking);
    } catch (err) {
      console.warn("Firestore save booking failed, persisting locally:", err);
    }
  }

  const existing = getLocalData<Booking[]>(LOCAL_BOOKINGS_KEY, []);
  setLocalData(LOCAL_BOOKINGS_KEY, [newBooking, ...existing]);

  return newBooking;
}

export async function getUserBookings(visitorId?: string): Promise<Booking[]> {
  const localList = getLocalData<Booking[]>(LOCAL_BOOKINGS_KEY, []);
  
  if (isFirebaseConfigured && db && visitorId) {
    try {
      const q = query(collection(db, "bookings"), where("visitorId", "==", visitorId), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Booking));
      }
    } catch (err) {
      console.warn("Firestore getUserBookings failed, returning local bookings:", err);
    }
  }

  if (visitorId) {
    return localList.filter(b => b.visitorId === visitorId);
  }
  return localList;
}

export async function createOrder(orderData: Omit<Order, "id" | "createdAt">): Promise<Order> {
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "orders", newOrder.id), newOrder);
    } catch (err) {
      console.warn("Firestore save order failed, persisting locally:", err);
    }
  }

  const existing = getLocalData<Order[]>(LOCAL_ORDERS_KEY, []);
  setLocalData(LOCAL_ORDERS_KEY, [newOrder, ...existing]);

  return newOrder;
}

export async function getUserOrders(visitorId?: string): Promise<Order[]> {
  const localList = getLocalData<Order[]>(LOCAL_ORDERS_KEY, []);
  if (visitorId) {
    return localList.filter(o => o.visitorId === visitorId);
  }
  return localList;
}

export async function getMacroEconomicMetrics(): Promise<EconomicImpactMetrics> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, "analytics", "macro_impact"));
      if (snap.exists()) {
        return snap.data() as EconomicImpactMetrics;
      }
    } catch (err) {
      console.warn("Firestore metrics fetch fallback:", err);
    }
  }
  return SEED_MACRO_METRICS;
}
