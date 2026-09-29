"use client";

import React, { useState } from "react";
import { 
  UtensilsCrossed, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Star,
  Sparkles 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useCart } from "@/context/CartContext";
import { SEED_LISTINGS } from "@/lib/seedData";
import { BaseListing } from "@/types";

export default function FoodPage() {
  const { addItem } = useCart();
  const foodListings = SEED_LISTINGS.filter((l) => l.category === "food");

  const [selectedFood, setSelectedFood] = useState<BaseListing | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleOrderClick = (food: BaseListing) => {
    setSelectedFood(food);
    setQuantity(1);
  };

  const handleConfirmFoodOrder = () => {
    if (!selectedFood) return;

    addItem(
      {
        id: `cart-${selectedFood.id}-${Date.now()}`,
        listingId: selectedFood.id,
        title: selectedFood.title,
        category: "food",
        price: selectedFood.price,
        providerName: selectedFood.providerName,
        providerType: selectedFood.providerType,
        image: selectedFood.images[0],
      },
      quantity
    );

    setSuccessNotice(`Added ${quantity}x "${selectedFood.title}" to your trip!`);
    setSelectedFood(null);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Toast Notice */}
      {successNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-rust text-soft-limestone px-4 py-3 rounded-lg shadow-xl border border-terracotta flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-terracotta" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-hairline pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-limestone text-xs font-semibold text-deep-rust border border-hairline">
          <UtensilsCrossed className="w-3.5 h-3.5 text-terracotta" />
          <span>Authentic Nashik Culinary Trails</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink">
          Traditional Misal, Bhakri & Home Kitchens
        </h1>
        <p className="text-body max-w-2xl text-sm leading-relaxed">
          Nashik&apos;s culinary identity belongs to its small family eateries and women-led home kitchens. Taste real sprouted Katachi Misal and clay-baked jowar bhakris crafted from regional heritage grains.
        </p>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {foodListings.map((item) => (
          <Card key={item.id} variant="limestone" hoverable className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative h-60 rounded-lg overflow-hidden bg-surface-soft">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="terracotta" size="md">
                    ₹{item.price} {item.unit}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-xs">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{item.rating}</span>
                  <span className="text-soft-limestone/80">({item.reviewsCount} foodies)</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-ink">{item.title}</h3>
                <p className="text-xs text-muted mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                  <span>Kitchen: {item.providerName}</span>
                </p>
                <p className="text-xs text-body leading-relaxed mt-2.5">{item.description}</p>
              </div>

              {/* Prep time and heritage origin */}
              <div className="p-3 rounded-lg bg-canvas border border-hairline flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-deep-rust font-medium">
                  <Clock className="w-4 h-4 text-terracotta" />
                  Ready in: {item.metadata?.prepTime}
                </span>
                <span className="text-muted italic">{item.metadata?.origin}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.badges?.map((b) => (
                  <Badge key={b} variant="olive" size="sm">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted block uppercase font-medium">Direct Cook Earnings</span>
                <span className="text-xl font-serif font-bold text-deep-rust">
                  ₹{item.price}
                </span>
              </div>
              <Button size="md" variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => handleOrderClick(item)}>
                Order Meal
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Order Modal */}
      {selectedFood && (
        <Modal
          isOpen={Boolean(selectedFood)}
          onClose={() => setSelectedFood(null)}
          title={`Order ${selectedFood.title}`}
          subtitle={`Prepared fresh by ${selectedFood.providerName}`}
        >
          <div className="space-y-5">
            <div className="p-3 bg-surface-soft rounded-lg text-xs space-y-1">
              <p>
                <strong className="text-deep-rust">Location:</strong> {selectedFood.location}
              </p>
              <p>
                <strong className="text-deep-rust">Estimated Prep:</strong> {selectedFood.metadata?.prepTime}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-2">
                Portion Count:
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuantity(num)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                      quantity === num
                        ? "bg-deep-rust text-white shadow-xs"
                        : "bg-soft-limestone text-ink border border-hairline hover:bg-soft-limestone-hover"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-hairline pt-3 flex justify-between items-center text-sm">
              <span className="text-body font-medium">Total Meal Fare:</span>
              <span className="text-xl font-serif font-bold text-terracotta">
                ₹{selectedFood.price * quantity}
              </span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedFood(null)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleConfirmFoodOrder}>
                Add to Trip
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
