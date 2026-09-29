import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Heart, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark border-t border-surface-dark-elevated mt-24">
      {/* Editorial Quote Ribbon */}
      <div className="border-b border-surface-dark-elevated/80 py-8 px-4 sm:px-6 lg:px-8 bg-surface-dark-elevated/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-serif text-lg text-soft-limestone italic">
              &ldquo;Visitor demand &rarr; Local businesses &rarr; Local jobs &rarr; Local income &rarr; Long-term economic activity.&rdquo;
            </p>
            <p className="text-xs text-muted-light mt-1">
              The founding economic thesis of Kumbh Local — Nashik District Pilot
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-deep-rust/60 border border-terracotta/30 text-xs text-soft-limestone">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span>KIM Ignite 2026 — Track 3 Prototype</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-terracotta text-white flex items-center justify-center font-serif text-xl font-bold">
                क
              </div>
              <span className="font-serif text-2xl font-bold text-soft-limestone">
                Kumbh Local
              </span>
            </div>
            <p className="text-xs text-muted-light leading-relaxed">
              A decentralized local economic layer connecting millions of Kumbh Mela pilgrims directly with Nashik&apos;s auto drivers, family homestays, student historians, village cooks, and grape farmers.
            </p>
            <div className="flex items-center gap-2 text-xs text-olive font-medium pt-2">
              <Shield className="w-4 h-4" />
              <span>100% Direct Payout to Local Families</span>
            </div>
          </div>

          {/* Sectors Col 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-soft-limestone mb-4 border-b border-surface-dark-elevated pb-2">
              Travel & Lodging
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-light">
              <li>
                <Link href="/mobility" className="hover:text-terracotta transition-colors">
                  Nashik E-Rickshaw Shuttles
                </Link>
              </li>
              <li>
                <Link href="/mobility" className="hover:text-terracotta transition-colors">
                  Trimbakeshwar Pilgrim Express
                </Link>
              </li>
              <li>
                <Link href="/stays" className="hover:text-terracotta transition-colors">
                  Verified Family Homestays
                </Link>
              </li>
              <li>
                <Link href="/stays" className="hover:text-terracotta transition-colors">
                  Heritage Wada Rooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Sectors Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-soft-limestone mb-4 border-b border-surface-dark-elevated pb-2">
              Culture & Commerce
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-light">
              <li>
                <Link href="/food" className="hover:text-terracotta transition-colors">
                  Authentic Misal & Breakfast Trails
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-terracotta transition-colors">
                  Student Heritage Guides (Ramayana Walk)
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-terracotta transition-colors">
                  Dindori Grape Harvest & Agro-Tours
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-terracotta transition-colors">
                  GI-Tagged Raisins & Tambat Brass
                </Link>
              </li>
              <li>
                <Link href="/box-home" className="hover:text-terracotta text-olive font-semibold transition-colors">
                  Send My Nashik Box Home &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Municipal / Impact Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-soft-limestone mb-4 border-b border-surface-dark-elevated pb-2">
              Ecosystem & Impact
            </h4>
            <p className="text-xs text-muted-light mb-3">
              Prototype built for Nashik Smart City & KIM Ignite 2026.
            </p>
            <div className="p-3 rounded-lg bg-surface-dark-elevated border border-hairline/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-light">Pilot Providers:</span>
                <span className="font-semibold text-soft-limestone">1,248 Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-light">Economic Volume:</span>
                <span className="font-semibold text-terracotta">₹28.4 Lakhs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-light">Gig Jobs Created:</span>
                <span className="font-semibold text-olive">1,860 Local Youth</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-surface-dark-elevated/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-light gap-4">
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
            <span>for Nashik & the Kumbh Mela 2026 Economy</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="hover:text-soft-limestone transition-colors">
              Admin Analytics
            </Link>
            <Link href="/provider/dashboard" className="hover:text-soft-limestone transition-colors">
              Provider Hub
            </Link>
            <span>Nashik, Maharashtra, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
