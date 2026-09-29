"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Building2, 
  Mail, 
  Lock, 
  Phone, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { UserRole, ProviderType } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const { loginAsDemoRole } = useAuth();

  const [role, setRole] = useState<UserRole>("VISITOR");
  const [providerType, setProviderType] = useState<ProviderType>("HOMESTAY");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAsDemoRole(role);
      setIsLoading(false);
      if (role === "PROVIDER") {
        router.push("/provider/dashboard");
      } else {
        router.push("/");
      }
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-canvas border border-hairline p-8 rounded-3xl shadow-lg">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-deep-rust text-soft-limestone flex items-center justify-center mx-auto font-serif text-2xl font-bold shadow-xs">
            क
          </div>
          <h2 className="text-2xl font-serif font-bold text-ink">
            Join Kumbh Local Network
          </h2>
          <p className="text-xs text-muted">
            Connect directly with pilgrims or become a verified local partner
          </p>
        </div>

        {/* Role Segment Toggle */}
        <div className="grid grid-cols-2 p-1.5 bg-surface-soft rounded-xl border border-hairline gap-1">
          <button
            type="button"
            onClick={() => setRole("VISITOR")}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === "VISITOR"
                ? "bg-deep-rust text-white shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>I am a Pilgrim / Visitor</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("PROVIDER")}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === "PROVIDER"
                ? "bg-deep-rust text-white shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>I am a Local Provider</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {role === "PROVIDER" && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">
                  Business / Offering Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Godavari Riverside Homestay"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-soft border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">
                  Provider Category:
                </label>
                <select
                  value={providerType}
                  onChange={(e) => setProviderType(e.target.value as ProviderType)}
                  className="w-full px-3 py-2 bg-surface-soft border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
                >
                  <option value="HOMESTAY">Homestay / Accommodation</option>
                  <option value="DRIVER">Auto Rickshaw / Taxi / Shuttle</option>
                  <option value="RESTAURANT">Home Kitchen / Food Stall</option>
                  <option value="FARMER">Farmer / Agriculture Collective</option>
                  <option value="GUIDE">Local Student / Heritage Guide</option>
                  <option value="VILLAGE_HOST">Artisan / Village Host</option>
                  <option value="FULFILLMENT_PARTNER">Local Delivery / Courier Rider</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-muted mb-1">
              Your Full Name:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-surface-soft border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-1">
                Email Address:
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-surface-soft border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-1">
                Phone Number:
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-surface-soft border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-muted mb-1">
              Create Password:
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-surface-soft border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
            />
          </div>

          <Button size="lg" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register & Start"}
          </Button>
        </form>

        <div className="text-center text-xs text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-deep-rust hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
