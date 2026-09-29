"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, UserRole } from "@/types";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  VISITOR: {
    uid: "demo-visitor-rahul",
    name: "Rahul Sharma",
    email: "rahul.pilgrim@kumbhlocal.in",
    phone: "+91 98765 43210",
    role: "VISITOR",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    personaTitle: "Pilgrim & Heritage Traveler",
    badge: "Verified Pilgrim Benefactor",
    cityOrZone: "Origin: Pune, Maharashtra",
    rating: 4.95,
    earningsOrSpend: "₹3,480",
    statLabel: "Nashik Economic Contribution",
    statsSummary: "4 Local Families Funded • 2 Transit Passes",
    createdAt: "2026-03-01",
  },
  PROVIDER: {
    uid: "demo-provider-kulkarni",
    name: "Sunita Kulkarni",
    email: "sunita.kulkarni@kumbhlocal.in",
    phone: "+91 98221 44556",
    role: "PROVIDER",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    personaTitle: "Godavari Homestay & Kitchen Host",
    badge: "Municipal Verified Provider (ID: NSK-4491)",
    cityOrZone: "Panchavati Ghats Zone, Nashik",
    rating: 4.9,
    earningsOrSpend: "₹42,850",
    statLabel: "Direct Bank Payouts Received",
    statsSummary: "38 Bookings Fulfilled • 100% Payout Share",
    createdAt: "2026-02-15",
  },
  ADMIN: {
    uid: "demo-admin-kumbh",
    name: "Dr. Sanjay Deshmukh (IAS)",
    email: "commissioner@nashiksmartcity.gov.in",
    phone: "+91 253 2575555",
    role: "ADMIN",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    personaTitle: "Nashik Kumbh Mela Officer & Smart City Admin",
    badge: "Municipal Command Center • Clearance Level 3",
    cityOrZone: "Command & Control Center, Nashik",
    rating: 5.0,
    earningsOrSpend: "₹28.4L",
    statLabel: "Tracked City Economic Velocity",
    statsSummary: "1,248 Verified Providers • 1,860 Local Jobs",
    createdAt: "2026-01-01",
  }
};

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoading: boolean;
  demoUsers: Record<UserRole, UserProfile>;
  loginAsDemoRole: (role: UserRole) => void;
  logout: () => Promise<void>;
  updateUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: DEMO_USERS.VISITOR,
  role: "VISITOR",
  isLoading: false,
  demoUsers: DEMO_USERS,
  loginAsDemoRole: () => {},
  logout: async () => {},
  updateUserRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USERS.VISITOR);
  const [role, setRole] = useState<UserRole>("VISITOR");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check local storage for persisted role
    const savedRole = localStorage.getItem("kumbh_active_role") as UserRole;
    if (savedRole && DEMO_USERS[savedRole]) {
      setRole(savedRole);
      setUser(DEMO_USERS[savedRole]);
    }

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          setUser({
            uid: fbUser.uid,
            name: fbUser.displayName || "Kumbh Traveler",
            email: fbUser.email || "",
            role: role,
            avatarUrl: fbUser.photoURL || undefined,
          });
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const loginAsDemoRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(DEMO_USERS[newRole]);
    localStorage.setItem("kumbh_active_role", newRole);
  };

  const updateUserRole = (newRole: UserRole) => {
    setRole(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
    localStorage.setItem("kumbh_active_role", newRole);
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.error("Firebase signOut error", e);
      }
    }
    loginAsDemoRole("VISITOR");
  };

  return (
    <AuthContext.Provider value={{ user, role, isLoading, demoUsers: DEMO_USERS, loginAsDemoRole, logout, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
