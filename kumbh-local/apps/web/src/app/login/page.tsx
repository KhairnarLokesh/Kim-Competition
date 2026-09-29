"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemoRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickDemoLogin = (role: UserRole, targetRoute: string) => {
    loginAsDemoRole(role);
    router.push(targetRoute);
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAsDemoRole("VISITOR");
      setIsLoading(false);
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-canvas border border-hairline p-8 rounded-3xl shadow-lg">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-deep-rust text-soft-limestone flex items-center justify-center mx-auto font-serif text-2xl font-bold shadow-xs">
            क
          </div>
          <h2 className="text-2xl font-serif font-bold text-ink">
            Welcome to Kumbh Local
          </h2>
          <p className="text-xs text-muted">
            Direct pilgrim transactions powering Nashik local families
          </p>
        </div>

        {/* 1-Click Pitch Demonstration Logins */}
        <div className="p-4 rounded-xl bg-surface-soft border border-hairline space-y-2.5">
          <span className="text-[11px] font-semibold text-deep-rust uppercase tracking-wider block text-center">
            🚀 1-Click Pitch Quick Access
          </span>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleQuickDemoLogin("VISITOR", "/")}
              className="w-full text-left p-2.5 rounded-lg bg-canvas border border-hairline hover:bg-soft-limestone text-xs font-semibold text-ink flex items-center justify-between"
            >
              <span>Login as <strong>Pilgrim Visitor</strong> (Rahul)</span>
              <span className="text-terracotta">&rarr;</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin("PROVIDER", "/provider/dashboard")}
              className="w-full text-left p-2.5 rounded-lg bg-canvas border border-hairline hover:bg-soft-limestone text-xs font-semibold text-ink flex items-center justify-between"
            >
              <span>Login as <strong>Local Provider</strong> (Sunita)</span>
              <span className="text-terracotta">&rarr;</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin("ADMIN", "/admin/dashboard")}
              className="w-full text-left p-2.5 rounded-lg bg-canvas border border-hairline hover:bg-soft-limestone text-xs font-semibold text-ink flex items-center justify-between"
            >
              <span>Login as <strong>Smart City Admin</strong></span>
              <span className="text-terracotta">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-hairline w-full" />
          <span className="bg-canvas px-3 text-[11px] text-muted uppercase">or custom login</span>
          <div className="border-t border-hairline w-full" />
        </div>

        {/* Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-muted mb-1">
              Email Address:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="pilgrim@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-surface-soft border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-muted mb-1">
              Password:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-surface-soft border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
              />
            </div>
          </div>

          <Button size="lg" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In to Platform"}
          </Button>
        </form>

        <div className="text-center text-xs text-muted">
          New to Kumbh Local?{" "}
          <Link href="/register" className="font-semibold text-deep-rust hover:underline">
            Register as Visitor or Local Partner
          </Link>
        </div>
      </div>
    </div>
  );
}
