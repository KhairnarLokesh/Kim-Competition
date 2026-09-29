"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Package, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Star,
  Truck,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { SEED_LISTINGS } from "@/lib/seedData";
import { BaseListing } from "@/types";

export default function ProductsPage() {
  const { addItem, isBoxHomeEnabled, setIsBoxHomeEnabled } = useCart();
  const productListings = SEED_LISTINGS.filter((l) => l.category === "products");
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleAddToCart = (product: BaseListing) => {
    addItem({
      id: `cart-${product.id}`,
      listingId: product.id,
      title: product.title,
      category: "products",
      price: product.price,
      providerName: product.providerName,
      providerType: product.providerType,
      image: product.images[0],
      isBoxHome: isBoxHomeEnabled,
    });

    setSuccessNotice(`Added "${product.title}" to cart!`);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Toast Notice */}
      {successNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-rust text-soft-limestone px-4 py-3 rounded-lg shadow-xl border border-terracotta flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-terracotta" />
          <span>{successNotice}</span>
          <Link href="/checkout" className="underline font-bold text-white ml-2">
            Checkout &rarr;
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-hairline pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-limestone text-xs font-semibold text-deep-rust border border-hairline">
          <ShoppingBag className="w-3.5 h-3.5 text-terracotta" />
          <span>Nashik Farmers & Artisans Direct Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink">
          Authentic Local Products & Sacred Souvenirs
        </h1>
        <p className="text-body max-w-2xl text-sm leading-relaxed">
          Direct-from-source agricultural and handmade treasures. Every rupee flows straight to Dindori grape grower FPOs, Tambat Ali metal-smiths, and Yeola silk handloom weavers.
        </p>

        {/* Box Home Banner */}
        <div className="p-4 rounded-xl bg-olive/10 border border-olive/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-olive text-white flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-deep-rust">
                Don&apos;t carry heavy bags through temples!
              </h4>
              <p className="text-xs text-body">
                Use our <strong>&ldquo;Send My Nashik Box Home&rdquo;</strong> service to consolidate items and ship them directly to your home address.
              </p>
            </div>
          </div>
          <Link href="/box-home">
            <Button size="sm" variant="olive" icon={<ArrowRight className="w-4 h-4" />}>
              Explore Box Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productListings.map((item) => (
          <Card key={item.id} variant="limestone" hoverable className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative h-48 rounded-lg overflow-hidden bg-surface-soft">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5">
                  <Badge variant="terracotta" size="sm">
                    ₹{item.price}
                  </Badge>
                </div>
                <div className="absolute bottom-2.5 left-2.5">
                  <Badge variant="deep-rust" size="sm">
                    {item.unit}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-ink line-clamp-1">{item.title}</h3>
                <p className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-olive shrink-0" />
                  <span className="truncate">{item.providerName}</span>
                </p>
                <p className="text-xs text-body leading-relaxed mt-1.5 line-clamp-2">{item.description}</p>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {item.badges?.map((b) => (
                  <Badge key={b} variant="olive" size="sm">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-hairline flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted block uppercase">Direct Price</span>
                <span className="text-lg font-serif font-bold text-deep-rust">
                  ₹{item.price}
                </span>
              </div>
              <Button size="sm" variant="primary" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => handleAddToCart(item)}>
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
