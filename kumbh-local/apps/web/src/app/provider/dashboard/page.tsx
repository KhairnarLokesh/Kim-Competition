"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Home as HomeIcon, 
  Plus, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  IndianRupee, 
  ShieldCheck, 
  Eye, 
  Calendar 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";

export default function ProviderDashboardPage() {
  const { user, role, loginAsDemoRole } = useAuth();
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("stays");
  const [newPrice, setNewPrice] = useState("900");
  const [notice, setNotice] = useState<string | null>(null);

  const [activeBookings, setActiveBookings] = useState([
    {
      id: "b-101",
      visitorName: "Rahul Sharma",
      service: "Godavari Family Homestay & Courtyard",
      category: "stays",
      date: "2026-03-28",
      guests: 2,
      amount: 1800,
      status: "CONFIRMED",
    },
    {
      id: "b-102",
      visitorName: "Amitabh Verma",
      service: "Nashik Breakfast Trail (Misal + Poha)",
      category: "food",
      date: "2026-03-29",
      guests: 4,
      amount: 796,
      status: "PENDING",
    },
    {
      id: "b-103",
      visitorName: "Priya Nair",
      service: "Godavari Riverside Homestay",
      category: "stays",
      date: "2026-04-01",
      guests: 3,
      amount: 2700,
      status: "CONFIRMED",
    },
  ]);

  const handleConfirmPending = (id: string) => {
    setActiveBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "CONFIRMED" } : b))
    );
    setNotice("Booking confirmed! SMS dispatch sent to pilgrim.");
    setTimeout(() => setNotice(null), 3500);
  };

  const handleCreateListing = () => {
    setNotice(`New listing "${newTitle}" created & submitted for municipal verification!`);
    setIsAddListingOpen(false);
    setNewTitle("");
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Toast Notice */}
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-rust text-soft-limestone px-4 py-3 rounded-lg shadow-xl border border-terracotta flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-terracotta" />
          <span>{notice}</span>
        </div>
      )}

      {/* Role Context Notification Banner */}
      {role !== "PROVIDER" && (
        <div className="bg-surface-card border border-olive/40 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-olive animate-pulse shrink-0" />
            <span className="text-body">
              Presentation Mode: You are currently viewing the Provider Operations Hub as <strong>{user?.name} ({role})</strong>.
            </span>
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="text-xs shrink-0 font-semibold"
            onClick={() => loginAsDemoRole("PROVIDER")}
          >
            Switch to Sunita Kulkarni (Provider Mode)
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="olive" size="sm">
              Verified Local Provider
            </Badge>
            <span className="text-xs text-muted">ID: PROV-NSK-4491</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-ink mt-1">
            Provider Operations Hub
          </h1>
          <p className="text-xs text-body">
            Welcome back, <strong>Sunita Kulkarni</strong> (Godavari Homestay & Kitchen)
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddListingOpen(true)}
        >
          Add New Listing / Service
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card variant="limestone" className="p-5 space-y-2">
          <div className="flex justify-between items-center text-muted">
            <span className="text-xs uppercase font-semibold">Total Net Earnings</span>
            <IndianRupee className="w-4 h-4 text-terracotta" />
          </div>
          <p className="text-2xl font-serif font-bold text-deep-rust">₹42,850</p>
          <span className="text-[11px] text-olive font-medium">✓ 100% direct bank payout</span>
        </Card>

        <Card variant="limestone" className="p-5 space-y-2">
          <div className="flex justify-between items-center text-muted">
            <span className="text-xs uppercase font-semibold">Bookings Received</span>
            <Calendar className="w-4 h-4 text-olive" />
          </div>
          <p className="text-2xl font-serif font-bold text-deep-rust">38 Bookings</p>
          <span className="text-[11px] text-muted">Across Homestay & Breakfast</span>
        </Card>

        <Card variant="limestone" className="p-5 space-y-2">
          <div className="flex justify-between items-center text-muted">
            <span className="text-xs uppercase font-semibold">Guest Rating</span>
            <CheckCircle2 className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-serif font-bold text-deep-rust">4.9 / 5.0</p>
          <span className="text-[11px] text-muted">184 Verified Reviews</span>
        </Card>

        <Card variant="limestone" className="p-5 space-y-2">
          <div className="flex justify-between items-center text-muted">
            <span className="text-xs uppercase font-semibold">Verification</span>
            <ShieldCheck className="w-4 h-4 text-olive" />
          </div>
          <p className="text-2xl font-serif font-bold text-olive">Verified</p>
          <span className="text-[11px] text-muted">Nashik Municipal Board</span>
        </Card>
      </div>

      {/* Incoming Bookings Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-ink">
            Live Incoming Bookings & Reservations
          </h2>
          <span className="text-xs text-muted">Auto-refreshed via Cloud Firestore</span>
        </div>

        <div className="bg-canvas border border-hairline rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-soft border-b border-hairline text-deep-rust font-serif text-sm">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Visitor Name</th>
                  <th className="py-3.5 px-4 font-semibold">Service Offering</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">Guests</th>
                  <th className="py-3.5 px-4 font-semibold">Payout</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {activeBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-soft/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-ink">{b.visitorName}</td>
                    <td className="py-4 px-4 text-body">{b.service}</td>
                    <td className="py-4 px-4 text-muted font-mono">{b.date}</td>
                    <td className="py-4 px-4 text-body">{b.guests}</td>
                    <td className="py-4 px-4 font-serif font-bold text-deep-rust">
                      ₹{b.amount}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === "CONFIRMED"
                            ? "bg-olive/15 text-olive"
                            : "bg-terracotta/15 text-terracotta animate-pulse"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {b.status === "PENDING" ? (
                        <Button
                          size="sm"
                          variant="primary"
                          className="text-xs"
                          onClick={() => handleConfirmPending(b.id)}
                        >
                          Accept Booking
                        </Button>
                      ) : (
                        <span className="text-[11px] text-muted italic">Confirmed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Listing Modal */}
      {isAddListingOpen && (
        <Modal
          isOpen={isAddListingOpen}
          onClose={() => setIsAddListingOpen(false)}
          title="Create New Local Listing"
          subtitle="Add your vehicle, room, food menu, or experience"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-1">
                Category:
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta"
              >
                <option value="mobility">Mobility / Shuttle Route</option>
                <option value="stays">Family Homestay / Room</option>
                <option value="food">Home Kitchen Meal</option>
                <option value="guides">Heritage Guide Service</option>
                <option value="experiences">Village / Farm Tour</option>
                <option value="products">Local Farm / Artisan Product</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-1">
                Listing Title:
              </label>
              <input
                type="text"
                placeholder="e.g. Garden View Homestay Suite"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-1">
                Price (INR):
              </label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsAddListingOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleCreateListing} disabled={!newTitle}>
                Publish Listing
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
