"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Car, 
  Store, 
  Wheat, 
  Home, 
  Map as MapIcon,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemoRole } = useAuth();
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const identities = [
    { id: "pilgrim", label: "Pilgrim", icon: User, role: "VISITOR", desc: "Explore & Experience", color: "bg-blue-50 text-blue-600 border-blue-200" },
    { id: "driver", label: "Driver", icon: Car, role: "PROVIDER", desc: "Provide Mobility", color: "bg-amber-50 text-amber-600 border-amber-200" },
    { id: "seller", label: "Product Seller", icon: Store, role: "PROVIDER", desc: "Sell Local Goods", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: "farmer", label: "Farmer", icon: Wheat, role: "PROVIDER", desc: "Direct Farm Produce", color: "bg-green-50 text-green-600 border-green-200" },
    { id: "homegiver", label: "Home Giver", icon: Home, role: "PROVIDER", desc: "Offer Homestays", color: "bg-rose-50 text-rose-600 border-rose-200" },
    { id: "guide", label: "Local Guide", icon: MapIcon, role: "PROVIDER", desc: "Share Local Wisdom", color: "bg-purple-50 text-purple-600 border-purple-200" }
  ];

  const handleLogin = () => {
    if (!selectedIdentity) return;
    
    setIsLoading(true);
    const identity = identities.find(i => i.id === selectedIdentity);
    
    if (identity) {
      setTimeout(() => {
        loginAsDemoRole(identity.role as UserRole);
        setIsLoading(false);
        router.push(identity.role === "VISITOR" ? "/" : "/provider/dashboard");
      }, 600);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-4xl w-full space-y-8 bg-canvas border border-hairline p-8 md:p-12 rounded-3xl shadow-xl">
        {/* Brand */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-deep-rust text-soft-limestone flex items-center justify-center mx-auto font-serif text-3xl font-bold shadow-md">
            क
          </div>
          <h2 className="text-3xl font-serif font-bold text-ink tracking-tight">
            Choose Your Identity
          </h2>
          <p className="text-sm text-muted max-w-md mx-auto">
            Select how you would like to participate in the Kumbh Mela ecosystem today.
          </p>
        </div>

        {/* Identity Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
          {identities.map((identity) => {
            const Icon = identity.icon;
            const isSelected = selectedIdentity === identity.id;
            return (
              <button
                key={identity.id}
                onClick={() => setSelectedIdentity(identity.id)}
                className={`relative flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isSelected 
                    ? 'border-terracotta bg-terracotta/5 shadow-md scale-[1.02]' 
                    : 'border-hairline bg-surface hover:border-terracotta/40 hover:bg-surface-soft hover:scale-[1.01]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 text-terracotta animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 className="w-6 h-6 fill-terracotta/20" />
                  </div>
                )}
                
                <div className={`p-5 rounded-full mb-4 border ${identity.color} transition-transform duration-300 ${isSelected ? 'scale-110 shadow-sm' : ''}`}>
                  <Icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                
                <h3 className="font-bold text-ink mb-1 md:text-lg">{identity.label}</h3>
                <p className="text-xs text-muted text-center leading-tight">
                  {identity.desc}
                </p>
              </button>
            );
          })}
        </div>

        <div className="pt-8 flex justify-center">
          <Button 
            size="xl" 
            variant="primary" 
            className="w-full md:w-2/3 group relative overflow-hidden text-lg shadow-lg" 
            disabled={!selectedIdentity || isLoading}
            onClick={handleLogin}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
              {isLoading ? "Authenticating..." : "Continue to Dashboard"}
              {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </span>
          </Button>
        </div>

        <div className="text-center text-xs text-muted pt-6 border-t border-hairline">
          Need a custom admin account?{" "}
          <button 
            onClick={() => { loginAsDemoRole("ADMIN"); router.push("/admin/dashboard"); }}
            className="font-semibold text-deep-rust hover:underline transition-colors"
          >
            Login as Smart City Admin
          </button>
        </div>
      </div>
    </div>
  );
}
