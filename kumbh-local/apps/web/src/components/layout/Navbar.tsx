"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Package, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X,
  UserCheck,
  ChevronDown,
  Ticket,
  Building2,
  Home as HomeIcon,
  IndianRupee,
  Layers,
  SlidersHorizontal,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/Badge";
import { UserRole } from "@/types";
import { RoleControlPanel } from "./RoleControlPanel";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, role, demoUsers, loginAsDemoRole } = useAuth();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  // Dynamic Navigation Links based on Active Stakeholder Role
  const visitorNavLinks = [
    { href: "/mobility", label: "Mobility" },
    { href: "/stays", label: "Stays" },
    { href: "/food", label: "Food Trails" },
    { href: "/guides", label: "Local Guides" },
    { href: "/experiences", label: "Village Tours" },
    { href: "/products", label: "Products" },
    { href: "/bookings", label: "My Passes" },
  ];

  const providerNavLinks = [
    { href: "/provider/dashboard", label: "Operations Hub" },
    { href: "/provider/dashboard#bookings", label: "Live Bookings" },
    { href: "/provider/dashboard#listings", label: "My Services" },
    { href: "/mobility", label: "Preview Pilgrim Catalog" },
  ];

  const adminNavLinks = [
    { href: "/admin/dashboard", label: "Macro Command" },
    { href: "/admin/dashboard#verification", label: "Accreditation Queue (3)" },
    { href: "/admin/dashboard#metrics", label: "Economic Multiplier" },
    { href: "/mobility", label: "Preview Pilgrim Catalog" },
  ];

  const activeLinks = role === "PROVIDER" ? providerNavLinks : role === "ADMIN" ? adminNavLinks : visitorNavLinks;

  const handleRoleSelect = (newRole: UserRole, targetRoute?: string) => {
    loginAsDemoRole(newRole);
    setIsRoleDropdownOpen(false);
    if (targetRoute) {
      router.push(targetRoute);
    }
  };

  const getRoleBadgeVariant = (r: UserRole): "terracotta" | "olive" | "deep-rust" => {
    switch (r) {
      case "VISITOR": return "terracotta";
      case "PROVIDER": return "olive";
      case "ADMIN": return "deep-rust";
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-hairline shadow-xs">
        {/* Top Micro-Bar with Active Persona Snapshot & Pitch Context */}
        <div className="bg-deep-rust text-soft-limestone text-[11px] py-1 px-4 tracking-wide flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span className="font-medium">KIM Ignite 2026 — Track 3: Local Economic Value Architecture</span>
            <span className="hidden md:inline text-soft-limestone/50">|</span>
            <span className="hidden md:inline text-soft-limestone/90">
              Active Persona: <strong>{user?.name}</strong> ({demoUsers[role]?.personaTitle})
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[10px] text-soft-limestone/75 font-mono">
              {demoUsers[role]?.statLabel}: <strong>{demoUsers[role]?.earningsOrSpend}</strong>
            </span>
            <button
              onClick={() => setIsControlPanelOpen(true)}
              className="text-[10px] uppercase font-bold text-terracotta hover:text-white bg-surface-dark-elevated px-2 py-0.5 rounded transition-colors flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Pitch Controller</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-deep-rust text-soft-limestone flex items-center justify-center font-serif text-2xl font-bold shadow-xs border border-terracotta/40 group-hover:bg-terracotta transition-colors duration-300">
                क
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl font-semibold tracking-tight text-deep-rust">
                    Kumbh Local
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                </div>
                <p className="text-[10px] text-muted uppercase tracking-widest -mt-1 font-medium">
                  {role === "PROVIDER" ? "Provider Portal" : role === "ADMIN" ? "Smart City Command" : "Nashik Economic Layer"}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links (Role Adaptive) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {activeLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-md font-medium transition-colors ${
                      isActive
                        ? "text-deep-rust bg-soft-limestone font-semibold"
                        : "text-ink/80 hover:text-deep-rust hover:bg-surface-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Special Visitor CTA: Send Box Home */}
              {role === "VISITOR" && (
                <Link
                  href="/box-home"
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider rounded-full transition-all ${
                    pathname === "/box-home"
                      ? "bg-olive text-white shadow-xs"
                      : "bg-olive/15 text-olive hover:bg-olive hover:text-white"
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span className="font-medium">Send Box Home</span>
                </Link>
              )}

              {/* Special Provider Indicator */}
              {role === "PROVIDER" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs text-olive font-medium bg-olive/10 rounded-full border border-olive/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Municipal Verified</span>
                </span>
              )}

              {/* Special Admin Indicator */}
              {role === "ADMIN" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs text-deep-rust font-medium bg-deep-rust/10 rounded-full border border-deep-rust/20">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Command Center L3</span>
                </span>
              )}
            </nav>

            {/* Right Action Icons & Role Switcher */}
            <div className="flex items-center gap-3">
              {/* Impact Receipt Shortcut (Visitor) */}
              {role === "VISITOR" && (
                <Link
                  href="/impact-summary"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-deep-rust font-medium bg-soft-limestone hover:bg-surface-card-hover rounded-md border border-hairline transition-colors"
                  title="View your personal economic footprint"
                >
                  <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                  <span>Impact Receipt</span>
                </Link>
              )}

              {/* Provider Quick Payout Chip */}
              {role === "PROVIDER" && (
                <div className="hidden md:flex items-center gap-1 px-3 py-1.5 text-xs font-serif font-bold text-olive bg-olive/10 border border-olive/20 rounded-md">
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>₹42,850 Payout Ready</span>
                </div>
              )}

              {/* Admin Quick Velocity Chip */}
              {role === "ADMIN" && (
                <div className="hidden md:flex items-center gap-1 px-3 py-1.5 text-xs font-serif font-bold text-deep-rust bg-deep-rust/10 border border-deep-rust/20 rounded-md">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>₹28.4L City Total</span>
                </div>
              )}

              {/* Cart Trigger */}
              <Link
                href="/checkout"
                className="relative p-2 text-ink hover:text-deep-rust hover:bg-soft-limestone rounded-md transition-colors"
                title="Cart & Bookings"
              >
                <ShoppingBag className="w-5 h-5 text-deep-rust" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-terracotta text-white text-[11px] font-bold flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Interactive Role Switcher Pill */}
              <div className="relative">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-xl border border-hairline bg-canvas hover:bg-surface-soft transition-all shadow-xs"
                >
                  <img
                    src={user?.avatarUrl || demoUsers[role]?.avatarUrl}
                    alt={user?.name || role}
                    className="w-5 h-5 rounded-full object-cover border border-hairline"
                  />
                  <div className="text-left hidden sm:block">
                    <span className="block text-[10px] text-muted uppercase font-bold leading-none">
                      {role}
                    </span>
                    <span className="block font-semibold text-deep-rust text-xs leading-tight">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-muted" />
                </button>

                {/* Role Fast Dropdown */}
                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-canvas border border-hairline rounded-2xl shadow-2xl p-3 z-50 animate-fade-in space-y-2">
                    <div className="flex items-center justify-between border-b border-hairline pb-2 px-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        Switch Active Stakeholder
                      </span>
                      <button
                        onClick={() => {
                          setIsRoleDropdownOpen(false);
                          setIsControlPanelOpen(true);
                        }}
                        className="text-[11px] text-terracotta font-semibold hover:underline flex items-center gap-0.5"
                      >
                        Full Hub &rarr;
                      </button>
                    </div>

                    {/* Persona 1: Visitor */}
                    <button
                      onClick={() => handleRoleSelect("VISITOR", "/mobility")}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                        role === "VISITOR"
                          ? "bg-surface-card border-terracotta text-deep-rust shadow-xs"
                          : "border-hairline hover:bg-surface-soft text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={demoUsers.VISITOR.avatarUrl}
                          alt="Rahul"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold font-serif">{demoUsers.VISITOR.name}</span>
                            <Badge variant="terracotta" size="sm">Pilgrim</Badge>
                          </div>
                          <span className="text-[10px] text-muted block">Direct bookings & Box Home</span>
                        </div>
                      </div>
                      {role === "VISITOR" && <span className="w-2 h-2 rounded-full bg-terracotta" />}
                    </button>

                    {/* Persona 2: Provider */}
                    <button
                      onClick={() => handleRoleSelect("PROVIDER", "/provider/dashboard")}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                        role === "PROVIDER"
                          ? "bg-surface-card border-olive text-deep-rust shadow-xs"
                          : "border-hairline hover:bg-surface-soft text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={demoUsers.PROVIDER.avatarUrl}
                          alt="Sunita"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold font-serif">{demoUsers.PROVIDER.name}</span>
                            <Badge variant="olive" size="sm">Host</Badge>
                          </div>
                          <span className="text-[10px] text-muted block">Live bookings & ₹42,850 payout</span>
                        </div>
                      </div>
                      {role === "PROVIDER" && <span className="w-2 h-2 rounded-full bg-olive" />}
                    </button>

                    {/* Persona 3: Admin */}
                    <button
                      onClick={() => handleRoleSelect("ADMIN", "/admin/dashboard")}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                        role === "ADMIN"
                          ? "bg-surface-card border-deep-rust text-deep-rust shadow-xs"
                          : "border-hairline hover:bg-surface-soft text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={demoUsers.ADMIN.avatarUrl}
                          alt="Admin"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold font-serif">{demoUsers.ADMIN.name.split(" (")[0]}</span>
                            <Badge variant="deep-rust" size="sm">Admin</Badge>
                          </div>
                          <span className="text-[10px] text-muted block">Macro velocity & 3 approvals</span>
                        </div>
                      </div>
                      {role === "ADMIN" && <span className="w-2 h-2 rounded-full bg-deep-rust" />}
                    </button>

                    <div className="pt-1 border-t border-hairline flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => {
                          setIsRoleDropdownOpen(false);
                          setIsControlPanelOpen(true);
                        }}
                        className="w-full text-center py-1.5 bg-surface-soft hover:bg-surface-card rounded-lg font-semibold text-deep-rust transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Layers className="w-3.5 h-3.5 text-terracotta" />
                        <span>Open 3-Step Presentation Walkthrough</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-ink hover:bg-soft-limestone rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-hairline bg-canvas px-4 pt-3 pb-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hairline">
              <span className="text-xs font-bold text-muted uppercase">Role: {role}</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsControlPanelOpen(true);
                }}
                className="text-xs text-terracotta font-semibold"
              >
                Switch Role &rarr;
              </button>
            </div>

            <div className="space-y-1">
              {activeLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-ink hover:bg-soft-limestone rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-hairline flex flex-col gap-2">
              <Link
                href="/bookings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-deep-rust bg-soft-limestone rounded-lg"
              >
                <Ticket className="w-4 h-4 text-terracotta" />
                <span>My Kumbh Passes</span>
              </Link>
              <Link
                href="/impact-summary"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-deep-rust bg-soft-limestone rounded-lg"
              >
                <Sparkles className="w-4 h-4 text-terracotta" />
                <span>Economic Impact Receipt</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Floating Presentation & Stakeholder Switcher Dock (Bottom-Right) */}
      <aside aria-label="Pitch controller" className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsControlPanelOpen(true)}
          className="group flex items-center gap-2.5 bg-deep-rust/95 hover:bg-deep-rust text-soft-limestone px-4 py-2.5 rounded-full shadow-2xl border border-terracotta/40 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          title="Open KIM Ignite Pitch Controller"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta" />
          </span>
          <span className="text-xs font-semibold tracking-wide">
            Pitch Mode: <strong className="text-terracotta">{user?.name?.split(" ")[0]} ({role})</strong>
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-surface-dark-elevated rounded-full text-soft-limestone/80 group-hover:text-white">
            Switch
          </span>
        </button>
      </aside>

      {/* Full Multi-Stakeholder Control Center Modal */}
      {isControlPanelOpen && (
        <RoleControlPanel
          isOpen={isControlPanelOpen}
          onClose={() => setIsControlPanelOpen(false)}
        />
      )}
    </>
  );
}
