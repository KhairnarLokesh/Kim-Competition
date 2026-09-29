"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  IndianRupee, 
  Car, 
  Home as HomeIcon, 
  UtensilsCrossed, 
  Compass, 
  Trees, 
  Package, 
  CheckCircle2, 
  XCircle,
  FileCheck2,
  Building2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SEED_MACRO_METRICS, SEED_PROVIDERS } from "@/lib/seedData";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user, role, loginAsDemoRole } = useAuth();
  const [providers, setProviders] = useState([
    {
      id: "p-pend-1",
      businessName: "Godavari Auto Rickshaw Sangha (Panchavati)",
      category: "DRIVER",
      phone: "+91 98221 00011",
      appliedDate: "Today, 09:30 AM",
      status: "PENDING",
      documents: "Aadhaar + Commercial Permit Verified",
    },
    {
      id: "p-pend-2",
      businessName: "Trimbakeshwar Pilgrim Dharamshala Trust",
      category: "HOMESTAY",
      phone: "+91 98221 00022",
      appliedDate: "Yesterday",
      status: "PENDING",
      documents: "Charity Commissioner Registration",
    },
    {
      id: "p-pend-3",
      businessName: "Khandesh Jowar Mahila Bachat Gat",
      category: "RESTAURANT",
      phone: "+91 98221 00033",
      appliedDate: "2 days ago",
      status: "VERIFIED",
      documents: "FSSAI + Self Help Group Certificate",
    },
  ]);

  const [notice, setNotice] = useState<string | null>(null);

  const handleApprove = (id: string, name: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "VERIFIED" } : p))
    );
    setNotice(`Approved "${name}"! Enabled for live pilgrim bookings.`);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleReject = (id: string, name: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "REJECTED" } : p))
    );
    setNotice(`Rejected "${name}". Reason sent to applicant.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Toast Notice */}
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-rust text-soft-limestone px-4 py-3 rounded-lg shadow-xl border border-terracotta flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-terracotta" />
          <span>{notice}</span>
        </div>
      )}

      {/* Role Context Notification Banner */}
      {role !== "ADMIN" && (
        <div className="bg-surface-card border border-deep-rust/40 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-deep-rust animate-pulse shrink-0" />
            <span className="text-body">
              Presentation Mode: You are currently viewing the Macro Economic Dashboard as <strong>{user?.name} ({role})</strong>.
            </span>
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="text-xs shrink-0 font-semibold"
            onClick={() => loginAsDemoRole("ADMIN")}
          >
            Switch to Municipal Admin Mode
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-hairline pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="deep-rust" size="sm">
              Municipal & Smart City Authority
            </Badge>
            <span className="text-xs text-muted">Nashik Kumbh Command Center</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-ink mt-1">
            Macro Economic Activity Dashboard
          </h1>
          <p className="text-xs text-body">
            Real-time monitoring of local transaction volume, jobs generated, and provider accreditation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-olive animate-pulse" />
          <span className="text-xs font-semibold text-deep-rust">Live Telemetry Active</span>
        </div>
      </div>

      {/* 4 Macro KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="limestone" className="p-6 space-y-2">
          <div className="flex justify-between items-center text-muted">
            <span className="text-xs uppercase font-bold tracking-wider">Local Volume</span>
            <IndianRupee className="w-4 h-4 text-terracotta" />
          </div>
          <p className="text-3xl font-serif font-bold text-terracotta">₹28.4 Lakh</p>
          <p className="text-[11px] text-olive font-medium">
            ↑ 24.5% vs previous week
          </p>
        </Card>

        <Card variant="limestone" className="p-6 space-y-2">
          <div className="flex justify-between items-center text-muted">
            <span className="text-xs uppercase font-bold tracking-wider">Jobs / Gigs Created</span>
            <Users className="w-4 h-4 text-olive" />
          </div>
          <p className="text-3xl font-serif font-bold text-deep-rust">1,860</p>
          <p className="text-[11px] text-muted">Local drivers, cooks, student guides</p>
        </Card>

        <Card variant="limestone" className="p-6 space-y-2">
          <div className="flex justify-between items-center text-muted">
            <span className="text-xs uppercase font-bold tracking-wider">Completed Bookings</span>
            <TrendingUp className="w-4 h-4 text-deep-rust" />
          </div>
          <p className="text-3xl font-serif font-bold text-deep-rust">12,540</p>
          <p className="text-[11px] text-muted">Zero middlemen commission</p>
        </Card>

        <Card variant="limestone" className="p-6 space-y-2">
          <div className="flex justify-between items-center text-muted">
            <span className="text-xs uppercase font-bold tracking-wider">Verified Providers</span>
            <ShieldCheck className="w-4 h-4 text-olive" />
          </div>
          <p className="text-3xl font-serif font-bold text-olive">1,248</p>
          <p className="text-[11px] text-muted">Across 6 economic sectors</p>
        </Card>
      </div>

      {/* Sector Distribution Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-ink">
          Sector Distribution & Provider Density
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 bg-canvas rounded-xl border border-hairline text-center space-y-1">
            <Car className="w-5 h-5 text-terracotta mx-auto mb-1" />
            <span className="text-xl font-serif font-bold text-deep-rust">320</span>
            <p className="text-[11px] text-muted">Mobility Providers</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline text-center space-y-1">
            <HomeIcon className="w-5 h-5 text-terracotta mx-auto mb-1" />
            <span className="text-xl font-serif font-bold text-deep-rust">180</span>
            <p className="text-[11px] text-muted">Family Homestays</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline text-center space-y-1">
            <UtensilsCrossed className="w-5 h-5 text-terracotta mx-auto mb-1" />
            <span className="text-xl font-serif font-bold text-deep-rust">290</span>
            <p className="text-[11px] text-muted">Food Kitchens</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline text-center space-y-1">
            <Trees className="w-5 h-5 text-terracotta mx-auto mb-1" />
            <span className="text-xl font-serif font-bold text-deep-rust">170</span>
            <p className="text-[11px] text-muted">Farmer Collectives</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline text-center space-y-1">
            <Compass className="w-5 h-5 text-terracotta mx-auto mb-1" />
            <span className="text-xl font-serif font-bold text-deep-rust">95</span>
            <p className="text-[11px] text-muted">Student Guides</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline text-center space-y-1">
            <Package className="w-5 h-5 text-terracotta mx-auto mb-1" />
            <span className="text-xl font-serif font-bold text-deep-rust">83</span>
            <p className="text-[11px] text-muted">Delivery Hubs</p>
          </div>
        </div>
      </div>

      {/* Provider Verification Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-ink">
              Municipal Accreditation & Verification Queue
            </h2>
            <p className="text-xs text-muted">
              Verify local business licenses, food safety registrations, and commercial vehicle permits.
            </p>
          </div>
          <span className="text-xs font-semibold text-terracotta">
            {providers.filter((p) => p.status === "PENDING").length} Pending Review
          </span>
        </div>

        <div className="bg-canvas border border-hairline rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-soft border-b border-hairline text-deep-rust font-serif text-sm">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Business Entity</th>
                  <th className="py-3.5 px-4 font-semibold">Sector</th>
                  <th className="py-3.5 px-4 font-semibold">Contact</th>
                  <th className="py-3.5 px-4 font-semibold">Documentation</th>
                  <th className="py-3.5 px-4 font-semibold">Applied</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Accreditation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {providers.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-soft/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-ink">{p.businessName}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-surface-soft text-[10px] font-bold text-deep-rust">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted font-mono">{p.phone}</td>
                    <td className="py-4 px-4 text-body font-medium">{p.documents}</td>
                    <td className="py-4 px-4 text-muted">{p.appliedDate}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === "VERIFIED"
                            ? "bg-olive/15 text-olive"
                            : p.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-terracotta/15 text-terracotta font-semibold"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {p.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="primary"
                            className="text-xs h-7 px-2.5"
                            onClick={() => handleApprove(p.id, p.businessName)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 px-2.5"
                            onClick={() => handleReject(p.id, p.businessName)}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted italic">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
