"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Car, 
  Home as HomeIcon, 
  Compass, 
  UtensilsCrossed, 
  Trees, 
  Package, 
  CheckCircle2, 
  Download, 
  Share2, 
  TrendingUp,
  ArrowRight,
  Heart
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";

export default function ImpactSummaryPage() {
  const { user } = useAuth();
  const [totalSpent, setTotalSpent] = useState<number>(1918);

  useEffect(() => {
    const storedTotal = localStorage.getItem("kumbh_last_order_total");
    if (storedTotal) {
      setTotalSpent(parseInt(storedTotal) || 1918);
    }
  }, []);

  const beneficiaries = [
    {
      category: "Mobility",
      role: "1 Local E-Rickshaw Driver",
      provider: "Nashik Kumbh E-Rickshaw Collective",
      amount: 80,
      icon: <Car className="w-4 h-4 text-terracotta" />,
      tag: "Zero-Emission Transit",
    },
    {
      category: "Accommodation",
      role: "1 Family Homestay Host",
      provider: "Godavari Riverside Homestay (Mrs. Kulkarni)",
      amount: 900,
      icon: <HomeIcon className="w-4 h-4 text-terracotta" />,
      tag: "100% Home Revenue",
    },
    {
      category: "Heritage",
      role: "1 University Student Historian",
      provider: "Nashik Heritage Explorers (Student Collective)",
      amount: 299,
      icon: <Compass className="w-4 h-4 text-terracotta" />,
      tag: "Youth Employment",
    },
    {
      category: "Culinary",
      role: "1 Traditional Home Cook",
      provider: "Aai's Maharashtrian Kitchen",
      amount: 199,
      icon: <UtensilsCrossed className="w-4 h-4 text-terracotta" />,
      tag: "Regional Heritage Food",
    },
    {
      category: "Agriculture",
      role: "1 Grape Grower Collective",
      provider: "Dindori Valley Farmers Producer Co.",
      amount: 320,
      icon: <Trees className="w-4 h-4 text-terracotta" />,
      tag: "Direct Farm Income",
    },
    {
      category: "Logistics",
      role: "1 Local Packing & Delivery Youth",
      provider: "Godavari Swift Logistics (Nashik Hub)",
      amount: 120,
      icon: <Package className="w-4 h-4 text-terracotta" />,
      tag: "Gig Livelihood",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="olive" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Verified Pilgrim Social Impact
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink">
          Your Nashik Economic Footprint
        </h1>
        <p className="text-sm text-body max-w-xl mx-auto">
          Instead of leaking your pilgrimage funds into international booking aggregators, 
          your single trip provided direct, immediate livelihood to <strong className="text-deep-rust">6 Nashik families</strong>.
        </p>
      </div>

      {/* The Printable / Sharable Receipt Card */}
      <div className="max-w-2xl mx-auto bg-canvas border-2 border-hairline rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
        {/* Subtle decorative stamp */}
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-4 border-olive/20 flex items-center justify-center rotate-12 pointer-events-none select-none">
          <span className="text-[10px] font-bold text-olive uppercase tracking-widest text-center">
            VERIFIED<br />NASHIK<br />PATRON
          </span>
        </div>

        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-deep-rust text-soft-limestone flex items-center justify-center font-serif text-2xl font-bold">
              क
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-deep-rust">Kumbh Local</h2>
              <p className="text-xs text-muted">Nashik District Economic Ledger</p>
            </div>
          </div>
          <div className="text-left sm:text-right text-xs">
            <p className="font-mono font-bold text-ink">RECEIPT #KL-2026-8819</p>
            <p className="text-muted">Patron: {user?.name || "Rahul Sharma"}</p>
            <p className="text-muted">Date: {new Date().toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
          </div>
        </div>

        {/* Big Total Callout */}
        <div className="p-6 rounded-2xl bg-surface-card border border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-xs uppercase font-semibold text-muted tracking-wider block">
              Total Pilgrim Value Distributed:
            </span>
            <span className="text-4xl sm:text-5xl font-serif font-bold text-terracotta">
              ₹{totalSpent}
            </span>
          </div>
          <div className="sm:text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-olive text-white text-xs font-bold mb-1">
              95.2% Local Retention
            </span>
            <p className="text-[11px] text-body">
              (vs ~18% retention on conventional platforms)
            </p>
          </div>
        </div>

        {/* Line item beneficiaries */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Direct Local Beneficiaries from Your Itinerary:
          </h3>

          <div className="divide-y divide-hairline border-y border-hairline">
            {beneficiaries.map((b, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-soft-limestone shrink-0 mt-0.5">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-ink text-sm">{b.role}</h4>
                    <p className="text-muted text-[11px]">{b.provider}</p>
                    <span className="inline-block text-[10px] text-olive font-semibold mt-0.5">
                      ✓ {b.tag}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-deep-rust block">
                    ₹{b.amount}
                  </span>
                  <span className="text-[10px] text-muted">100% Payout</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote & Seal */}
        <div className="p-4 rounded-xl bg-surface-soft border border-hairline flex items-center gap-3">
          <Heart className="w-5 h-5 text-terracotta fill-terracotta shrink-0" />
          <p className="text-xs text-body italic">
            &ldquo;Thank you for choosing local. Your stay, meals, and bookings have helped educate children, maintain farm orchards, and sustain heritage arts in Nashik.&rdquo;
          </p>
        </div>

        {/* Receipt Actions */}
        <div className="pt-2 flex flex-wrap gap-3">
          <Button
            size="md"
            variant="outline"
            className="flex-1 text-xs"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => window.print()}
          >
            Download / Print Receipt
          </Button>
          <Button
            size="md"
            variant="secondary"
            className="flex-1 text-xs"
            icon={<Share2 className="w-3.5 h-3.5 text-deep-rust" />}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My Kumbh Local Economic Impact",
                  text: `My pilgrimage to Nashik directly supported 6 local families and gig workers! Check out Kumbh Local.`,
                  url: window.location.href,
                });
              } else {
                alert("Receipt URL copied to clipboard!");
              }
            }}
          >
            Share Impact
          </Button>
        </div>
      </div>

      {/* Navigation to Admin & Other Views */}
      <div className="text-center space-y-4 pt-4">
        <p className="text-xs text-muted">
          Curious how individual visitor receipts aggregate across the entire city?
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="primary" size="md" icon={<TrendingUp className="w-4 h-4" />}>
              Open Admin Macro Economic Dashboard &rarr;
            </Button>
          </Link>
          <Link href="/provider/dashboard">
            <Button variant="outline" size="md">
              Switch to Provider Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
