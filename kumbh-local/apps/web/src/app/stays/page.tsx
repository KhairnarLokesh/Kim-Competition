"use client";

import React, { useState } from "react";
import { 
  Home as HomeIcon, 
  MapPin, 
  Coffee, 
  Wifi, 
  Sun, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Star 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useCart } from "@/context/CartContext";
import { SEED_LISTINGS } from "@/lib/seedData";
import { BaseListing } from "@/types";

export default function StaysPage() {
  const { addItem } = useCart();
  const stayListings = SEED_LISTINGS.filter((l) => l.category === "stays");

  const [selectedStay, setSelectedStay] = useState<BaseListing | null>(null);
  const [nights, setNights] = useState<number>(1);
  const [guests, setGuests] = useState<number>(2);
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState<string | null>(null);

  const handleBookClick = (stay: BaseListing) => {
    setSelectedStay(stay);
    setNights(1);
    setGuests(2);
  };

  const handleConfirmStayBooking = () => {
    if (!selectedStay) return;

    addItem({
      id: `cart-${selectedStay.id}-${Date.now()}`,
      listingId: selectedStay.id,
      title: `${selectedStay.title} (${nights} ${nights === 1 ? "night" : "nights"}, ${guests} guests)`,
      category: "stays",
      price: selectedStay.price * nights,
      providerName: selectedStay.providerName,
      providerType: selectedStay.providerType,
      image: selectedStay.images[0],
    });

    setBookingSuccessNotice(
      `Reserved ${selectedStay.title}! Booking forwarded directly to ${selectedStay.providerName}.`
    );
    setSelectedStay(null);
    setTimeout(() => setBookingSuccessNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Toast Notice */}
      {bookingSuccessNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-rust text-soft-limestone px-4 py-3 rounded-lg shadow-xl border border-terracotta flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-terracotta" />
          <span>{bookingSuccessNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-hairline pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-limestone text-xs font-semibold text-deep-rust border border-hairline">
          <HomeIcon className="w-3.5 h-3.5 text-terracotta" />
          <span>Nashik Local Stay Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink">
          Verified Family Homestays & Heritage Wadas
        </h1>
        <p className="text-body max-w-2xl text-sm leading-relaxed">
          Stay in authentic Nashik homes instead of sterile, overpriced corporate hotels. Enjoy peaceful courtyards, traditional Maharashtrian breakfast, and direct cultural connections with local residents.
        </p>
      </div>

      {/* Stays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stayListings.map((item) => (
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
                    ₹{item.price} / night
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-xs">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{item.rating}</span>
                  <span className="text-soft-limestone/80">({item.reviewsCount} reviews)</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-ink">{item.title}</h3>
                <p className="text-xs text-muted mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />
                  <span>{item.location}</span>
                </p>
                <p className="text-xs text-body leading-relaxed mt-2.5">{item.description}</p>
              </div>

              {/* Amenities chips */}
              <div className="pt-2 flex flex-wrap gap-2">
                {item.metadata?.amenities?.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-canvas border border-hairline text-deep-rust font-medium"
                  >
                    <Coffee className="w-3 h-3 text-terracotta" />
                    {amenity}
                  </span>
                ))}
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
                <span className="text-[11px] text-muted block uppercase font-medium">Direct Family Payout</span>
                <span className="text-xl font-serif font-bold text-deep-rust">
                  ₹{item.price} <span className="text-xs font-sans font-normal text-muted">/ night</span>
                </span>
              </div>
              <Button size="md" variant="primary" onClick={() => handleBookClick(item)}>
                Reserve Homestay &rarr;
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Reservation Modal */}
      {selectedStay && (
        <Modal
          isOpen={Boolean(selectedStay)}
          onClose={() => setSelectedStay(null)}
          title={`Reserve ${selectedStay.title}`}
          subtitle={`Hosted directly by ${selectedStay.providerName}`}
        >
          <div className="space-y-5">
            <div className="p-3 bg-surface-soft rounded-lg text-xs space-y-1">
              <p>
                <strong className="text-deep-rust">Location:</strong> {selectedStay.location}
              </p>
              <p>
                <strong className="text-deep-rust">Tariff:</strong> ₹{selectedStay.price} per night (Includes Breakfast)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1.5">
                  Number of Nights:
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={nights}
                  onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 bg-canvas border border-hairline rounded-lg text-sm font-medium text-ink focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1.5">
                  Guests:
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedStay.metadata?.capacity || 4}
                  value={guests}
                  onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 bg-canvas border border-hairline rounded-lg text-sm font-medium text-ink focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div className="border-t border-hairline pt-3 flex justify-between items-center text-sm">
              <span className="text-body font-medium">Total Family Payout:</span>
              <span className="text-xl font-serif font-bold text-terracotta">
                ₹{selectedStay.price * nights}
              </span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedStay(null)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleConfirmStayBooking}>
                Confirm Reservation
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
