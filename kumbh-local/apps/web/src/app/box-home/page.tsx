"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Package, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Minus, 
  ArrowRight,
  HeartHandshake,
  Users
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { SEED_LISTINGS } from "@/lib/seedData";

export default function SendBoxHomePage() {
  const { addItem, setIsBoxHomeEnabled } = useCart();
  const products = SEED_LISTINGS.filter((l) => l.category === "products");

  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({
    "prod-1": 1, // GI Raisins
    "prod-2": 1, // Brass Kalash
    "prod-3": 1, // Chivda
  });
  const [packagingType, setPackagingType] = useState<"standard" | "jute">("standard");
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const packagingOptions = {
    standard: { name: "Eco Corrugated Gift Hamper", price: 90 },
    jute: { name: "Handwoven Natural Jute Basket", price: 160 },
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const itemsSubtotal = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    const item = products.find((p) => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const packagingCost = packagingOptions[packagingType].price;
  const shippingCost = 120; // Flat Nashik to Anywhere in India subsidized pilgrim rate
  const totalBoxPrice = itemsSubtotal + packagingCost + shippingCost;

  const handleAddCustomBoxToCart = () => {
    setIsBoxHomeEnabled(true);
    Object.entries(selectedItems).forEach(([id, qty]) => {
      const p = products.find((prod) => prod.id === id);
      if (p) {
        addItem(
          {
            id: `box-item-${p.id}`,
            listingId: p.id,
            title: `[Nashik Box] ${p.title}`,
            category: "products",
            price: p.price,
            providerName: p.providerName,
            providerType: p.providerType,
            image: p.images[0],
            isBoxHome: true,
          },
          qty
        );
      }
    });

    setSuccessNotice("Custom Nashik Box added to your trip cart! Consolidated shipping applied.");
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Toast Notice */}
      {successNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-rust text-soft-limestone px-4 py-3 rounded-lg shadow-xl border border-terracotta flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-terracotta" />
          <span>{successNotice}</span>
          <Link href="/checkout" className="underline font-bold text-white ml-2">
            Proceed to Checkout &rarr;
          </Link>
        </div>
      )}

      {/* Hero Explainer Band */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="olive" size="md" icon={<Package className="w-4 h-4" />}>
          Patented Economic Innovation
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ink">
          Send My Nashik Box Home
        </h1>
        <p className="text-base text-body leading-relaxed">
          <strong>The Kumbh Problem:</strong> Visitors love buying fresh raisins, temple brass, and local sweets, but carrying heavy luggage through ghats and train stations is exhausting.
          <br className="hidden sm:inline" />
          <strong>Our Solution:</strong> Curate authentic treasures from multiple Nashik farmers and craftsmen. Our local fulfillment partners consolidate, pack, and courier your box straight to your home.
        </p>
      </div>

      {/* Visual Supply Chain Flow */}
      <div className="bg-surface-soft p-6 sm:p-8 rounded-2xl border border-hairline">
        <h3 className="text-center font-serif text-xl font-bold text-deep-rust mb-6">
          How One Box Generates 5 Local Livelihoods
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
          <div className="p-4 bg-canvas rounded-xl border border-hairline space-y-2">
            <span className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center mx-auto text-xs font-bold">1</span>
            <h4 className="text-xs font-bold text-ink">You Curate Goods</h4>
            <p className="text-[11px] text-muted">Select from Dindori farmers & Tambat Ali smiths</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline space-y-2">
            <span className="w-8 h-8 rounded-full bg-olive text-white flex items-center justify-center mx-auto text-xs font-bold">2</span>
            <h4 className="text-xs font-bold text-ink">Local Collection</h4>
            <p className="text-[11px] text-muted">Nashik youth riders collect items directly from stalls</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline space-y-2">
            <span className="w-8 h-8 rounded-full bg-deep-rust text-white flex items-center justify-center mx-auto text-xs font-bold">3</span>
            <h4 className="text-xs font-bold text-ink">Central Hub Packing</h4>
            <p className="text-[11px] text-muted">Items safely consolidated into an eco-friendly gift box</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline space-y-2">
            <span className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center mx-auto text-xs font-bold">4</span>
            <h4 className="text-xs font-bold text-ink">Direct Interstate Transit</h4>
            <p className="text-[11px] text-muted">Dispatched with live tracking via postal partner</p>
          </div>
          <div className="p-4 bg-canvas rounded-xl border border-hairline space-y-2">
            <span className="w-8 h-8 rounded-full bg-olive text-white flex items-center justify-center mx-auto text-xs font-bold">5</span>
            <h4 className="text-xs font-bold text-ink">Arrives at Your Doorstep</h4>
            <p className="text-[11px] text-muted">You return home empty-handed; your mementos await you</p>
          </div>
        </div>
      </div>

      {/* Interactive Box Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Product Selector */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <h2 className="text-2xl font-serif font-bold text-ink">
              Choose Items for Your Hamper
            </h2>
            <span className="text-xs text-muted">Select quantities below</span>
          </div>

          <div className="space-y-4">
            {products.map((p) => {
              const qty = selectedItems[p.id] || 0;
              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    qty > 0
                      ? "bg-soft-limestone border-terracotta shadow-xs"
                      : "bg-canvas border-hairline hover:border-muted-light"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-serif font-bold text-ink">{p.title}</h4>
                      <p className="text-[11px] text-muted">{p.providerName}</p>
                      <span className="text-xs font-serif font-bold text-deep-rust mt-1 block">
                        ₹{p.price} {p.unit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(p.id, -1)}
                      className="w-8 h-8 rounded-md bg-white border border-hairline flex items-center justify-center text-ink hover:bg-surface-soft"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-ink">{qty}</span>
                    <button
                      onClick={() => handleQuantityChange(p.id, 1)}
                      className="w-8 h-8 rounded-md bg-deep-rust text-white flex items-center justify-center hover:bg-deep-rust-dark"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Packaging Selection */}
          <div className="space-y-3 pt-4 border-t border-hairline">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Select Hamper Presentation:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPackagingType("standard")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  packagingType === "standard"
                    ? "bg-soft-limestone border-deep-rust ring-1 ring-deep-rust"
                    : "bg-canvas border-hairline hover:bg-surface-soft"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-ink">Eco Corrugated Box</span>
                  <span className="text-xs font-serif font-bold text-deep-rust">₹90</span>
                </div>
                <p className="text-xs text-muted mt-1">Sturdy biodegradable box with straw lining</p>
              </div>

              <div
                onClick={() => setPackagingType("jute")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  packagingType === "jute"
                    ? "bg-soft-limestone border-deep-rust ring-1 ring-deep-rust"
                    : "bg-canvas border-hairline hover:bg-surface-soft"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-ink">Handwoven Jute Basket</span>
                  <span className="text-xs font-serif font-bold text-deep-rust">₹160</span>
                </div>
                <p className="text-xs text-muted mt-1">Handmade by tribal artisans of Nashik</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Box Hamper Summary */}
        <div className="lg:col-span-5">
          <Card variant="limestone" className="p-6 space-y-6 sticky top-28 border-hairline shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="terracotta" size="sm">
                  Live Hamper Manifest
                </Badge>
                <span className="text-xs text-muted">Ship to Anywhere in India</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-ink mt-2">
                Your Custom Nashik Hamper
              </h3>
            </div>

            {/* List of included items */}
            <div className="space-y-2.5 text-xs border-y border-hairline py-4">
              {Object.entries(selectedItems).length === 0 ? (
                <p className="text-muted italic py-4 text-center">No items selected yet. Choose above.</p>
              ) : (
                Object.entries(selectedItems).map(([id, qty]) => {
                  const item = products.find((p) => p.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between items-center">
                      <span className="text-body">
                        {item.title} <strong className="text-deep-rust">&times; {qty}</strong>
                      </span>
                      <span className="font-mono font-semibold text-ink">
                        ₹{item.price * qty}
                      </span>
                    </div>
                  );
                })
              )}

              <div className="pt-2 border-t border-hairline/60 flex justify-between text-muted">
                <span>{packagingOptions[packagingType].name}</span>
                <span className="font-mono">₹{packagingCost}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Interstate Safe Logistics & Delivery</span>
                <span className="font-mono">₹{shippingCost}</span>
              </div>
            </div>

            {/* Beneficiaries Breakdown */}
            <div className="p-3 bg-canvas rounded-lg border border-hairline text-xs space-y-1.5">
              <span className="text-muted font-semibold uppercase text-[10px] block">
                Local Families Supported by this Hamper:
              </span>
              <p className="text-deep-rust font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-olive shrink-0" />
                <span>1 Grape Farmer + 1 Brass Artisan + 1 Box Packer + 1 Courier Rider</span>
              </p>
            </div>

            {/* Total and Action */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-ink">Consolidated Box Total:</span>
                <span className="text-3xl font-serif font-bold text-terracotta">
                  ₹{totalBoxPrice}
                </span>
              </div>

              <Button
                size="lg"
                variant="primary"
                className="w-full"
                disabled={itemsSubtotal === 0}
                onClick={handleAddCustomBoxToCart}
              >
                Add Box to Trip Cart &rarr;
              </Button>

              <Link href="/checkout" className="block text-center text-xs text-deep-rust font-semibold hover:underline">
                Or Go Straight to Checkout
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
