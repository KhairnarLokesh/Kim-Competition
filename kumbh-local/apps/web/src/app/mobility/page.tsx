"use client";

import React, { useState } from "react";
import { 
  Car, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Filter
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useCart } from "@/context/CartContext";
import { SEED_LISTINGS } from "@/lib/seedData";
import { BaseListing } from "@/types";

export default function MobilityPage() {
  const { addItem } = useCart();
  const mobilityListings = SEED_LISTINGS.filter((l) => l.category === "mobility");

  const [selectedRoute, setSelectedRoute] = useState<string>("all");
  const [selectedListing, setSelectedListing] = useState<BaseListing | null>(null);
  const [seats, setSeats] = useState<number>(1);
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState<string | null>(null);

  const routes = [
    { id: "all", label: "All Pilgrim Routes" },
    { id: "station", label: "Nashik Road Station &rarr; Panchavati" },
    { id: "trimbak", label: "Central Bus Stand &rarr; Trimbakeshwar" },
  ];

  const filteredListings = mobilityListings.filter((l) => {
    if (selectedRoute === "station") return l.id === "mob-1";
    if (selectedRoute === "trimbak") return l.id === "mob-2";
    return true;
  });

  const handleBookClick = (listing: BaseListing) => {
    setSelectedListing(listing);
    setSeats(1);
  };

  const handleConfirmBooking = () => {
    if (!selectedListing) return;

    addItem(
      {
        id: `cart-${selectedListing.id}-${Date.now()}`,
        listingId: selectedListing.id,
        title: `${selectedListing.title} (${seats} ${seats === 1 ? "seat" : "seats"})`,
        category: "mobility",
        price: selectedListing.price * seats,
        providerName: selectedListing.providerName,
        providerType: selectedListing.providerType,
        image: selectedListing.images[0],
        selectedSeats: seats,
      },
      1
    );

    setBookingSuccessNotice(
      `Booked ${seats} seat(s) on ${selectedListing.title}! Direct fare assigned to local driver.`
    );
    setSelectedListing(null);
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

      {/* Header Banner */}
      <div className="border-b border-hairline pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-limestone text-xs font-semibold text-deep-rust border border-hairline">
          <Car className="w-3.5 h-3.5 text-terracotta" />
          <span>Kumbh Local Mobility Network</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink">
          Nashik Arrival & Last-Mile Shuttles
        </h1>
        <p className="text-body max-w-2xl text-sm leading-relaxed">
          Skip exploitative station queues and bargaining. Connect directly with licensed local electric rickshaw collectives and municipal pilgrim shuttles at verified, government-capped tariffs.
        </p>

        {/* Route Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {routes.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoute(r.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedRoute === r.id
                  ? "bg-deep-rust text-white shadow-xs"
                  : "bg-soft-limestone text-ink hover:bg-soft-limestone-hover border border-hairline"
              }`}
              dangerouslySetInnerHTML={{ __html: r.label }}
            />
          ))}
        </div>
      </div>

      {/* Mobility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredListings.map((item) => (
          <Card key={item.id} variant="limestone" hoverable className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative h-56 rounded-lg overflow-hidden bg-surface-soft">
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
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                  {item.badges?.map((b) => (
                    <Badge key={b} variant="deep-rust" size="sm">
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-ink">{item.title}</h3>
                <p className="text-xs text-muted mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-olive" />
                  <span>Provider: {item.providerName}</span>
                </p>
                <p className="text-xs text-body leading-relaxed mt-2">{item.description}</p>
              </div>

              {/* Route details box */}
              <div className="p-3.5 rounded-lg bg-canvas border border-hairline space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-deep-rust">Pickup:</span>
                    <span className="text-body ml-1">{item.metadata?.pickupPoint}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-deep-rust">Drop-off:</span>
                    <span className="text-body ml-1">{item.metadata?.destination}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-1 text-muted border-t border-hairline/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.metadata?.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    Capacity: {item.metadata?.capacity} seats
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted block uppercase font-medium">Fixed Transparent Tariff</span>
                <span className="text-lg font-serif font-bold text-deep-rust">
                  ₹{item.price} <span className="text-xs font-sans font-normal text-muted">/ seat</span>
                </span>
              </div>
              <Button size="md" variant="primary" onClick={() => handleBookClick(item)}>
                Reserve Seat &rarr;
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedListing && (
        <Modal
          isOpen={Boolean(selectedListing)}
          onClose={() => setSelectedListing(null)}
          title={`Reserve ${selectedListing.title}`}
          subtitle={`Operated by ${selectedListing.providerName}`}
        >
          <div className="space-y-5">
            <div className="p-3 bg-surface-soft rounded-lg text-xs space-y-1">
              <p>
                <strong className="text-deep-rust">Pickup:</strong> {selectedListing.metadata?.pickupPoint}
              </p>
              <p>
                <strong className="text-deep-rust">Destination:</strong> {selectedListing.metadata?.destination}
              </p>
              <p>
                <strong className="text-deep-rust">Frequency:</strong> {selectedListing.metadata?.departureTimes?.[0]}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-muted mb-2">
                Number of Seats:
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSeats(num)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                      seats === num
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
              <span className="text-body font-medium">Total Payable to Driver:</span>
              <span className="text-xl font-serif font-bold text-terracotta">
                ₹{selectedListing.price * seats}
              </span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedListing(null)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleConfirmBooking}>
                Confirm Seat
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
