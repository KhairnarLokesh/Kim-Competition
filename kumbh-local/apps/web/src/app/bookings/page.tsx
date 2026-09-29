"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Ticket, 
  QrCode, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Package, 
  ArrowRight, 
  Download, 
  Share2, 
  Sparkles,
  ExternalLink,
  Car,
  Home as HomeIcon,
  UtensilsCrossed,
  UserCheck
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";

export default function VisitorBookingsPage() {
  const { user } = useAuth();
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const bookings = [
    {
      id: "TKT-NSK-9011",
      category: "mobility",
      categoryLabel: "Clean E-Shuttle Transit",
      serviceTitle: "Nashik Road Railway Station \u2192 Panchavati Ghats",
      icon: <Car className="w-5 h-5 text-terracotta" />,
      providerName: "Ramesh Gaikwad (Green Kumbh Fleet)",
      providerPhone: "+91 98220 11223",
      vehicleNo: "MH-15-EV-4412 (Shared E-Rickshaw)",
      date: "28 Mar 2026",
      time: "09:30 AM Pickup",
      pickupPoint: "Nashik Road Station, Platform 1 West Commercial Exit",
      seatCount: 1,
      paidAmount: 80,
      status: "ACTIVE",
      qrCodePlaceholder: "KUMBH-TRANSIT-9011-VALID",
    },
    {
      id: "BST-NSK-4082",
      category: "stays",
      categoryLabel: "Heritage Homestay",
      serviceTitle: "Godavari Family Homestay & Courtyard",
      icon: <HomeIcon className="w-5 h-5 text-terracotta" />,
      providerName: "Sunita Kulkarni",
      providerPhone: "+91 98221 44556",
      vehicleNo: "Heritage Courtyard Room (Private Bath + Breakfast)",
      date: "28 Mar - 30 Mar 2026 (2 Nights)",
      time: "Check-in: 12:00 PM",
      pickupPoint: "Old Nashik, 200m from Ramkund Ghat, Panchavati",
      seatCount: 2,
      paidAmount: 1800,
      status: "CONFIRMED",
      qrCodePlaceholder: "KUMBH-HOMESTAY-4082-CONFIRMED",
    },
    {
      id: "FD-NSK-112",
      category: "food",
      categoryLabel: "Authentic Food Trail",
      serviceTitle: "Nashik Breakfast Trail (Misal Pav + Poha + Tea)",
      icon: <UtensilsCrossed className="w-5 h-5 text-terracotta" />,
      providerName: "Khandesh Mahila Self Help Kitchen",
      providerPhone: "+91 98221 00033",
      vehicleNo: "Authentic Wood-fired Breakfast Token",
      date: "29 Mar 2026",
      time: "Morning 07:30 AM - 10:30 AM",
      pickupPoint: "Khandesh Rasoi Kitchen, Godavari Riverside Lane",
      seatCount: 2,
      paidAmount: 398,
      status: "CONFIRMED",
      qrCodePlaceholder: "KUMBH-FOOD-112-TOKEN",
    },
    {
      id: "BX-SWIFT-8891",
      category: "box-home",
      categoryLabel: "Luggage-Free Nashik Box",
      serviceTitle: "Send My Nashik Box Home (Direct Interstate Dispatch)",
      icon: <Package className="w-5 h-5 text-olive" />,
      providerName: "Dispatched via Godavari Swift Logistics",
      providerPhone: "+91 253 2889900",
      vehicleNo: "Includes GI Dindori Black Raisins & Artisanal Brass Diya",
      date: "Estimated Delivery: 02 Apr 2026",
      time: "Status: Packed in Eco-Jute \u2022 Transit Hub Nashik",
      pickupPoint: "Delivery Address: 402, Shanti Vihar, Kothrud, Pune, MH",
      seatCount: 1,
      paidAmount: 690,
      status: "IN_TRANSIT",
      qrCodePlaceholder: "KUMBH-BOX-8891-TRACK",
    },
  ];

  const handleDownloadOfflinePass = (id: string) => {
    setDownloadNotice(`Digital Pass #${id} downloaded for offline presentation at police & station checkpoints!`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Toast Notice */}
      {downloadNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-rust text-soft-limestone px-4 py-3 rounded-lg shadow-xl border border-terracotta flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-terracotta" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-hairline pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="terracotta" size="sm">
              Pilgrim Digital Hub
            </Badge>
            <span className="text-xs text-muted">Pass Holder: <strong>{user?.name || "Rahul Sharma"}</strong></span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink mt-1">
            My Kumbh Passes & Reservations
          </h1>
          <p className="text-xs text-body">
            All tickets work 100% offline. Present these QR badges at railway stations, homestay gates, and shuttle boarding points.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/impact-summary">
            <Button variant="outline" size="sm" icon={<Sparkles className="w-4 h-4 text-terracotta" />}>
              My Impact Receipt
            </Button>
          </Link>
          <Button 
            variant="primary" 
            size="sm" 
            icon={<Download className="w-4 h-4" />}
            onClick={() => handleDownloadOfflinePass("ALL-PASSES")}
          >
            Save All Offline
          </Button>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card variant="limestone" className="p-4 space-y-1">
          <span className="text-[11px] uppercase font-semibold text-muted">Active Passes</span>
          <p className="text-2xl font-serif font-bold text-deep-rust">{bookings.length}</p>
          <span className="text-[10px] text-olive font-medium">✓ Instant check-in ready</span>
        </Card>
        <Card variant="limestone" className="p-4 space-y-1">
          <span className="text-[11px] uppercase font-semibold text-muted">Families Benefited</span>
          <p className="text-2xl font-serif font-bold text-deep-rust">4 Providers</p>
          <span className="text-[10px] text-muted">Driver, Host, Kitchen & Courier</span>
        </Card>
        <Card variant="limestone" className="p-4 space-y-1">
          <span className="text-[11px] uppercase font-semibold text-muted">Total Local Spend</span>
          <p className="text-2xl font-serif font-bold text-terracotta">₹2,968</p>
          <span className="text-[10px] text-olive font-medium">100% Disbursed Directly</span>
        </Card>
        <Card variant="limestone" className="p-4 space-y-1">
          <span className="text-[11px] uppercase font-semibold text-muted">Nashik Box Status</span>
          <p className="text-2xl font-serif font-bold text-olive">In Transit</p>
          <span className="text-[10px] text-muted">Tracking #BX-SWIFT-8891</span>
        </Card>
      </div>

      {/* Bookings & Passes List */}
      <div className="space-y-6">
        <h2 className="text-xl font-serif font-bold text-ink">
          Confirmed Passes & Travel Documents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} variant="limestone" className="p-6 space-y-5 relative overflow-hidden border border-hairline hover:shadow-md transition-shadow">
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-canvas rounded-lg border border-hairline">
                    {booking.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                      {booking.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-semibold text-deep-rust">
                      Pass #{booking.id}
                    </span>
                  </div>
                </div>

                <Badge 
                  variant={booking.status === "ACTIVE" || booking.status === "CONFIRMED" ? "olive" : "terracotta"}
                  size="sm"
                >
                  {booking.status === "ACTIVE" ? "READY TO BOARD" : booking.status}
                </Badge>
              </div>

              {/* Title & Service Details */}
              <div>
                <h3 className="text-lg font-serif font-bold text-ink leading-snug">
                  {booking.serviceTitle}
                </h3>
                <p className="text-xs text-muted mt-1 font-medium">
                  {booking.vehicleNo}
                </p>
              </div>

              {/* Timing & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-canvas/70 p-3.5 rounded-xl border border-hairline text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-muted">
                    <Calendar className="w-3.5 h-3.5 text-terracotta" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-deep-rust font-medium">
                    <Clock className="w-3.5 h-3.5 text-olive" />
                    <span>{booking.time}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-muted">
                    <Phone className="w-3.5 h-3.5 text-olive" />
                    <span>{booking.providerPhone}</span>
                  </div>
                  <div className="text-[11px] text-body font-medium truncate" title={booking.providerName}>
                    Host/Driver: {booking.providerName}
                  </div>
                </div>

                <div className="sm:col-span-2 pt-1 border-t border-hairline text-[11px] text-muted flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                  <span>{booking.pickupPoint}</span>
                </div>
              </div>

              {/* QR Code Pass Section */}
              <div className="flex items-center justify-between p-3 bg-surface-soft rounded-xl border border-dashed border-hairline">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-canvas border border-ink/20 rounded-lg flex items-center justify-center font-mono text-[9px] text-center p-1 font-bold text-ink leading-tight shadow-xs">
                    <QrCode className="w-9 h-9 text-deep-rust" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted block">Check-in Verification</span>
                    <span className="text-xs font-mono font-bold text-ink tracking-widest">{booking.id}</span>
                    <span className="block text-[10px] text-olive font-medium">✓ Scannable by Municipal Volunteers</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-muted block">Direct Payout</span>
                  <span className="text-base font-serif font-bold text-deep-rust">₹{booking.paidAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => handleDownloadOfflinePass(booking.id)}
                >
                  Offline Pass
                </Button>
                <Link href="/impact-summary" className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    Impact Breakdown
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
