"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  ShoppingBag, 
  Ticket, 
  IndianRupee,
  Layers,
  ChevronRight,
  ExternalLink,
  X
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

interface RoleControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleControlPanel({ isOpen, onClose }: RoleControlPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, role, demoUsers, loginAsDemoRole } = useAuth();
  const [activeTab, setActiveTab] = useState<"personas" | "walkthrough">("personas");

  const personas: {
    role: UserRole;
    name: string;
    title: string;
    avatar: string;
    badgeText: string;
    badgeVariant: "terracotta" | "olive" | "deep-rust";
    description: string;
    targetRoute: string;
    routeLabel: string;
    metricLabel: string;
    metricValue: string;
    highlights: string[];
  }[] = [
    {
      role: "VISITOR",
      name: demoUsers.VISITOR.name,
      title: demoUsers.VISITOR.personaTitle || "Pilgrim & Heritage Traveler",
      avatar: demoUsers.VISITOR.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      badgeText: "Demand Side • Pilgrim",
      badgeVariant: "terracotta",
      description: "Arrives in Nashik, books transit, stays & food, curates a luggage-free Nashik Box, and generates direct economic impact.",
      targetRoute: "/mobility",
      routeLabel: "Explore Transit & Stays",
      metricLabel: "Nashik Contribution",
      metricValue: demoUsers.VISITOR.earningsOrSpend || "₹3,480",
      highlights: [
        "Selects 6 economic verticals without middleman markups",
        "Curates 'Send My Nashik Box Home' for interstate courier",
        "Generates personal Economic Beneficiary Receipt",
      ],
    },
    {
      role: "PROVIDER",
      name: demoUsers.PROVIDER.name,
      title: demoUsers.PROVIDER.personaTitle || "Godavari Homestay & Kitchen Host",
      avatar: demoUsers.PROVIDER.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      badgeText: "Supply Side • Micro-Business",
      badgeVariant: "olive",
      description: "Local Nashik resident receiving live bookings directly into bank account with zero platform commission fee.",
      targetRoute: "/provider/dashboard",
      routeLabel: "Open Provider Operations Hub",
      metricLabel: "Net Earnings (100% Payout)",
      metricValue: demoUsers.PROVIDER.earningsOrSpend || "₹42,850",
      highlights: [
        "Real-time incoming booking notifications & 1-click acceptance",
        "Instant listing creator for rooms, auto rides, and local meals",
        "Municipal verification badge and direct bank disbursement",
      ],
    },
    {
      role: "ADMIN",
      name: demoUsers.ADMIN.name,
      title: demoUsers.ADMIN.personaTitle || "Nashik Kumbh Mela Officer & Smart City Admin",
      avatar: demoUsers.ADMIN.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      badgeText: "Governance • Smart City",
      badgeVariant: "deep-rust",
      description: "Municipal command authority overseeing local wealth retention, provider accreditation, and service capacity.",
      targetRoute: "/admin/dashboard",
      routeLabel: "Open Macro Economic Dashboard",
      metricLabel: "City Economic Velocity",
      metricValue: demoUsers.ADMIN.earningsOrSpend || "₹28.4 Lakhs",
      highlights: [
        "City-wide transaction monitoring across 6 micro-sectors",
        "Live Provider Verification Queue (Aadhaar & Municipal Permits)",
        "Economic Multiplier analytics proving local GDP retention",
      ],
    },
  ];

  const handleSwitchAndNavigate = (targetRole: UserRole, targetRoute?: string) => {
    loginAsDemoRole(targetRole);
    if (targetRoute) {
      router.push(targetRoute);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Role & Presentation Control Center"
      subtitle="Switch personas instantly to demonstrate the complete multi-stakeholder economic loop"
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-1">
        
        {/* Toggle Mode: Personas vs Walkthrough */}
        <div className="flex bg-surface-soft p-1 rounded-xl border border-hairline">
          <button
            onClick={() => setActiveTab("personas")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "personas"
                ? "bg-canvas text-deep-rust shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            1-Click Stakeholder Switcher
          </button>
          <button
            onClick={() => setActiveTab("walkthrough")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "walkthrough"
                ? "bg-canvas text-deep-rust shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Competition Demo Walkthrough (3 Steps)
          </button>
        </div>

        {activeTab === "personas" && (
          <div className="space-y-4">
            {personas.map((p) => {
              const isCurrent = role === p.role;
              return (
                <div
                  key={p.role}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    isCurrent
                      ? "bg-surface-card border-terracotta ring-2 ring-terracotta/20 shadow-md"
                      : "bg-canvas border-hairline hover:border-muted-light hover:bg-surface-soft/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-13 h-13 rounded-full object-cover border-2 border-hairline shadow-xs"
                        />
                        {isCurrent && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-terracotta rounded-full border-2 border-canvas flex items-center justify-center text-[9px] text-white font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-base text-ink">{p.name}</h4>
                          <Badge variant={p.badgeVariant} size="sm">
                            {p.badgeText}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted font-medium mt-0.5">{p.title}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-muted uppercase font-bold block">{p.metricLabel}</span>
                      <span className="text-lg font-serif font-bold text-deep-rust">{p.metricValue}</span>
                    </div>
                  </div>

                  <p className="text-xs text-body mt-3 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-hairline/60 flex flex-wrap gap-2 text-[11px] text-muted">
                    {p.highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-canvas/80 px-2.5 py-1 rounded-md border border-hairline">
                        <CheckCircle2 className="w-3 h-3 text-olive shrink-0" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between gap-3">
                    {isCurrent ? (
                      <span className="text-xs font-semibold text-terracotta flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
                        Currently Active Stakeholder
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-xs"
                        onClick={() => handleSwitchAndNavigate(p.role)}
                      >
                        Switch to {p.name.split(" ")[0]}
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant={isCurrent ? "primary" : "outline"}
                      className="text-xs"
                      onClick={() => handleSwitchAndNavigate(p.role, p.targetRoute)}
                    >
                      {p.routeLabel} &rarr;
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "walkthrough" && (
          <div className="space-y-4">
            <div className="bg-deep-rust text-soft-limestone p-4 rounded-xl space-y-1">
              <span className="text-xs text-terracotta font-mono uppercase tracking-wider font-semibold">
                KIM Ignite 2026 Presentation Playbook
              </span>
              <h4 className="text-base font-serif font-bold">
                How to Demonstrate the Economic Loop in 3 Minutes
              </h4>
              <p className="text-xs text-soft-limestone/80 leading-relaxed">
                Follow this sequential 3-step storyline to demonstrate how visitor demand converts directly into verifiable local Nashik prosperity.
              </p>
            </div>

            {/* Step 1 */}
            <div className="p-4 bg-canvas border border-hairline rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-terracotta">STEP 1: VISITOR DISCOVERY & BOX HOME</span>
                <Badge variant="terracotta" size="sm">Pilgrim View</Badge>
              </div>
              <h5 className="font-serif font-bold text-ink">Arrive, Reserve & Send Box Home Without Luggage</h5>
              <p className="text-xs text-body">
                Open as <strong>Rahul Sharma</strong>. Browse the 6 sectors, select an E-Rickshaw shuttle and Godavari Homestay, then add GI Raisins to &quot;Send My Nashik Box Home&quot;. Proceed to checkout to see the zero-commission payout.
              </p>
              <Button
                size="sm"
                variant="primary"
                className="w-full text-xs"
                onClick={() => handleSwitchAndNavigate("VISITOR", "/mobility")}
              >
                1️⃣ Start Visitor Journey (/mobility)
              </Button>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-canvas border border-hairline rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-olive">STEP 2: LOCAL PROVIDER FULFILLMENT</span>
                <Badge variant="olive" size="sm">Provider View</Badge>
              </div>
              <h5 className="font-serif font-bold text-ink">Real-time Order Acceptance & 100% Payout</h5>
              <p className="text-xs text-body">
                Switch to <strong>Sunita Kulkarni</strong>. Show the incoming reservation appearing live in the operations table. Click &quot;Accept Booking&quot; and highlight the direct bank payout ledger (₹42,850 earnings).
              </p>
              <Button
                size="sm"
                variant="primary"
                className="w-full text-xs"
                onClick={() => handleSwitchAndNavigate("PROVIDER", "/provider/dashboard")}
              >
                2️⃣ Open Provider Operations Hub (/provider/dashboard)
              </Button>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-canvas border border-hairline rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-deep-rust">STEP 3: MUNICIPAL SMART CITY IMPACT</span>
                <Badge variant="deep-rust" size="sm">Command Center</Badge>
              </div>
              <h5 className="font-serif font-bold text-ink">Prove Retained Local GDP to the Jury</h5>
              <p className="text-xs text-body">
                Switch to <strong>Admin</strong>. Show city-wide aggregate statistics: ₹28.4 Lakhs in verified local transactions, 1,860 gig jobs created, and approve pending local auto drivers in the live accreditation queue.
              </p>
              <Button
                size="sm"
                variant="primary"
                className="w-full text-xs"
                onClick={() => handleSwitchAndNavigate("ADMIN", "/admin/dashboard")}
              >
                3️⃣ Show Macro City Velocity (/admin/dashboard)
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
