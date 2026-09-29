"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Trash2, 
  Package, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createBooking, createOrder } from "@/lib/firestore";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { 
    items, 
    removeItem, 
    clearCart, 
    subtotal, 
    isBoxHomeEnabled, 
    setIsBoxHomeEnabled,
    packagingFee, 
    shippingFee, 
    totalAmount 
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [shippingAddress, setShippingAddress] = useState(
    "Flat 402, Royal Palms, Link Road, Andheri West, Mumbai, Maharashtra - 400053"
  );
  const [visitorName, setVisitorName] = useState(user?.name || "Rahul Sharma");
  const [visitorPhone, setVisitorPhone] = useState(user?.phone || "+91 98765 43210");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCompleteOrder = async () => {
    setIsProcessing(true);

    try {
      // 1. Create bookings for services (mobility, stays, guides, food, experiences)
      const serviceItems = items.filter((i) => i.category !== "products");
      for (const item of serviceItems) {
        await createBooking({
          visitorId: user?.uid || "visitor-demo",
          visitorName: visitorName,
          visitorPhone: visitorPhone,
          providerId: `provider-${item.providerType.toLowerCase()}`,
          providerName: item.providerName,
          serviceType: item.category,
          serviceTitle: item.title,
          bookingDate: new Date().toISOString().split("T")[0],
          amount: item.price * item.quantity,
          status: "CONFIRMED",
          paymentStatus: "PAID",
        });
      }

      // 2. Create Order for physical products and Nashik Box
      const productItems = items.filter((i) => i.category === "products");
      if (productItems.length > 0 || isBoxHomeEnabled) {
        await createOrder({
          visitorId: user?.uid || "visitor-demo",
          visitorName: visitorName,
          visitorAddress: shippingAddress,
          items: items,
          totalAmount: totalAmount,
          isBoxHome: isBoxHomeEnabled,
          fulfillmentPartnerName: "Godavari Swift Logistics (Local Delivery)",
          deliveryStatus: "RECEIVED",
          trackingNumber: `NSK-KL-${Math.floor(100000 + Math.random() * 900000)}`,
        });
      }

      // Store personal receipt in local storage for instant display
      localStorage.setItem("kumbh_last_order_total", totalAmount.toString());
      localStorage.setItem("kumbh_last_order_items", JSON.stringify(items));

      setIsProcessing(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Order processing error:", err);
      setIsProcessing(false);
    }
  };

  const handleViewReceipt = () => {
    clearCart();
    router.push("/impact-summary");
  };

  if (items.length === 0 && !showSuccessModal) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-soft-limestone text-deep-rust flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-ink">
          Your Kumbh Itinerary is Empty
        </h2>
        <p className="text-sm text-body max-w-md mx-auto">
          You haven&apos;t reserved any pilgrim transit, homestays, meals, or curated local products yet.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link href="/mobility">
            <Button variant="primary">Explore Transit & Stays</Button>
          </Link>
          <Link href="/box-home">
            <Button variant="secondary">Send Box Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-hairline pb-6 space-y-2">
        <Badge variant="terracotta" size="sm">
          Unified Multi-Sector Checkout
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink">
          Review Your Trip & Complete Payment
        </h1>
        <p className="text-xs text-muted">
          All bookings and purchases are consolidated. Direct payouts will be dispatched instantly to each Nashik provider.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Line Items & Visitor Info */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Cart Items List */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-ink border-b border-hairline pb-2 flex justify-between items-center">
              <span>Selected Services & Goods ({items.length})</span>
              <button
                onClick={clearCart}
                className="text-xs text-terracotta hover:underline font-normal"
              >
                Clear All
              </button>
            </h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-canvas border border-hairline flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                    )}
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-olive block">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-ink">{item.title}</h4>
                      <p className="text-xs text-muted">
                        Provider: <strong>{item.providerName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-base font-serif font-bold text-deep-rust">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-muted hover:text-red-600 rounded-md hover:bg-surface-soft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visitor Details */}
          <div className="p-6 rounded-xl bg-surface-soft border border-hairline space-y-4">
            <h3 className="text-base font-serif font-bold text-ink flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracotta" />
              <span>Pilgrim Traveler Contact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted mb-1">
                  Mobile Number (for SMS & OTP):
                </label>
                <input
                  type="text"
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:border-terracotta font-medium"
                />
              </div>
            </div>

            {/* Shipping Address (if Box Home enabled) */}
            <div className="pt-2 border-t border-hairline/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase text-muted flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-olive" />
                  <span>Send My Nashik Box Home Address:</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBoxHomeEnabled}
                    onChange={(e) => setIsBoxHomeEnabled(e.target.checked)}
                    className="rounded text-terracotta focus:ring-terracotta"
                  />
                  <span className="font-semibold text-deep-rust">Ship Items Home</span>
                </label>
              </div>

              {isBoxHomeEnabled && (
                <textarea
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-hairline rounded-lg text-xs text-ink focus:outline-none focus:border-terracotta"
                  placeholder="Enter your home address for consolidated courier delivery..."
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Cost Breakdown & Payment Gateway */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="limestone" className="p-6 space-y-6 sticky top-28 border-hairline shadow-md">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Order Summary
              </span>
              <h3 className="text-2xl font-serif font-bold text-ink mt-1">
                Payout Breakdown
              </h3>
            </div>

            <div className="space-y-2.5 text-xs border-y border-hairline py-4">
              <div className="flex justify-between text-body">
                <span>Services & Marketplace Subtotal:</span>
                <span className="font-mono font-semibold text-ink">₹{subtotal}</span>
              </div>
              {isBoxHomeEnabled && (
                <>
                  <div className="flex justify-between text-body">
                    <span>Eco Gift Box Packaging:</span>
                    <span className="font-mono font-semibold text-ink">₹{packagingFee}</span>
                  </div>
                  <div className="flex justify-between text-body">
                    <span>Consolidated Interstate Courier:</span>
                    <span className="font-mono font-semibold text-ink">₹{shippingFee}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-olive font-medium pt-1">
                <span>Platform Commission:</span>
                <span>₹0 (0% Platform Fee for Kumbh)</span>
              </div>
            </div>

            {/* Direct Wealth Notice */}
            <div className="p-3 bg-canvas rounded-lg border border-hairline text-xs space-y-1">
              <span className="text-muted font-semibold uppercase text-[10px] block">
                Local Impact Guarantee:
              </span>
              <p className="text-deep-rust font-medium">
                100% of ₹{totalAmount} is disbursed directly to Nashik drivers, homestay families, guides, cooks, and local delivery couriers.
              </p>
            </div>

            {/* Payment Mode Selector */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase text-muted block">
                Simulated Payment Gateway:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "upi"
                      ? "bg-deep-rust text-white border-deep-rust shadow-xs"
                      : "bg-canvas text-ink border-hairline hover:bg-surface-soft"
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>Instant UPI / QR</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "card"
                      ? "bg-deep-rust text-white border-deep-rust shadow-xs"
                      : "bg-canvas text-ink border-hairline hover:bg-surface-soft"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card / NetBanking</span>
                </button>
              </div>
            </div>

            {/* Total and CTA */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-ink">Total Payable:</span>
                <span className="text-3xl font-serif font-bold text-terracotta">
                  ₹{totalAmount}
                </span>
              </div>

              <Button
                size="lg"
                variant="primary"
                className="w-full"
                disabled={isProcessing}
                onClick={handleCompleteOrder}
              >
                {isProcessing ? "Authorizing Payout..." : "Authorize Payout & View Impact Receipt \u2192"}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSuccessModal && (
        <Modal
          isOpen={showSuccessModal}
          onClose={() => {}}
          title="Payment Successful!"
          subtitle="Your bookings and orders are confirmed."
        >
          <div className="text-center space-y-5 py-2">
            <div className="w-16 h-16 rounded-full bg-olive/20 text-olive flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold text-ink">
                ₹{totalAmount} Disbursed to Nashik Families!
              </h4>
              <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
                Your reservations are locked. SMS confirmations have been sent to your phone and the providers.
              </p>
            </div>

            <div className="p-4 bg-surface-soft rounded-xl border border-hairline text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted">Transaction ID:</span>
                <span className="font-mono font-bold text-ink">TXN-KL-2026-9812</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Direct Nashik Beneficiaries:</span>
                <span className="font-semibold text-olive">6 Local Participants</span>
              </div>
            </div>

            <Button
              size="lg"
              variant="primary"
              className="w-full"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={handleViewReceipt}
            >
              Generate My Economic Impact Receipt &rarr;
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
