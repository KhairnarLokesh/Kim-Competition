"use client";

import React, { useState } from "react";
import { 
  Compass, 
  Clock, 
  Languages, 
  MapPin, 
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

export default function GuidesPage() {
  const { addItem } = useCart();
  const guideListings = SEED_LISTINGS.filter((l) => l.category === "guides");

  const [selectedGuide, setSelectedGuide] = useState<BaseListing | null>(null);
  const [attendees, setAttendees] = useState<number>(1);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleBookClick = (guide: BaseListing) => {
    setSelectedGuide(guide);
    setAttendees(1);
  };

  const handleConfirmGuideBooking = () => {
    if (!selectedGuide) return;

    addItem({
      id: `cart-${selectedGuide.id}-${Date.now()}`,
      listingId: selectedGuide.id,
      title: `${selectedGuide.title} (${attendees} ${attendees === 1 ? "person" : "persons"})`,
      category: "guides",
      price: selectedGuide.price * attendees,
      providerName: selectedGuide.providerName,
      providerType: selectedGuide.providerType,
      image: selectedGuide.images[0],
    });

    setSuccessNotice(`Booked "${selectedGuide.title}"! Student honorarium reserved.`);
    setSelectedGuide(null);
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
          <Compass className="w-3.5 h-3.5 text-terracotta" />
          <span>Verified Local Guide Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink">
          Student Historians & Sacred Heritage Walks
        </h1>
        <p className="text-body max-w-2xl text-sm leading-relaxed">
          Discover the profound spiritual legacy of Panchavati, Ramkund, and the Godavari River through local university students and cultural researchers. Authentic storytelling with fixed, transparent honorariums.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guideListings.map((item) => (
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
                  <span className="text-soft-limestone/80">({item.reviewsCount} reviews)</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-ink">{item.title}</h3>
                <p className="text-xs text-muted mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-olive" />
                  <span>Curator: {item.providerName}</span>
                </p>
                <p className="text-xs text-body leading-relaxed mt-2.5">{item.description}</p>
              </div>

              {/* Metadata chips */}
              <div className="p-3.5 rounded-lg bg-canvas border border-hairline space-y-2 text-xs">
                <div className="flex items-center gap-2 text-deep-rust">
                  <Clock className="w-4 h-4 text-terracotta shrink-0" />
                  <span>Duration: {item.metadata?.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-deep-rust">
                  <Languages className="w-4 h-4 text-olive shrink-0" />
                  <span>Languages: {item.metadata?.languages?.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-deep-rust">
                  <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                  <span>Meeting Point: {item.location}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.badges?.map((b) => (
                  <Badge key={b} variant="deep-rust" size="sm">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted block uppercase font-medium">Student Honorarium</span>
                <span className="text-xl font-serif font-bold text-deep-rust">
                  ₹{item.price} <span className="text-xs font-sans font-normal text-muted">/ person</span>
                </span>
              </div>
              <Button size="md" variant="primary" onClick={() => handleBookClick(item)}>
                Book Heritage Walk &rarr;
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Guide Booking Modal */}
      {selectedGuide && (
        <Modal
          isOpen={Boolean(selectedGuide)}
          onClose={() => setSelectedGuide(null)}
          title={`Book ${selectedGuide.title}`}
          subtitle={`Led by ${selectedGuide.providerName}`}
        >
          <div className="space-y-5">
            <div className="p-3 bg-surface-soft rounded-lg text-xs space-y-1">
              <p>
                <strong className="text-deep-rust">Meeting Point:</strong> {selectedGuide.location}
              </p>
              <p>
                <strong className="text-deep-rust">Duration:</strong> {selectedGuide.metadata?.duration}
              </p>
              <p>
                <strong className="text-deep-rust">Languages:</strong> {selectedGuide.metadata?.languages?.join(", ")}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-2">
                Number of Attendees:
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setAttendees(num)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                      attendees === num
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
              <span className="text-body font-medium">Total Honorarium:</span>
              <span className="text-xl font-serif font-bold text-terracotta">
                ₹{selectedGuide.price * attendees}
              </span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedGuide(null)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleConfirmGuideBooking}>
                Confirm Guide Walk
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
