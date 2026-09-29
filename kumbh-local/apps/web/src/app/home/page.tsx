"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Car, 
  Home as HomeIcon, 
  UtensilsCrossed, 
  Compass, 
  Trees, 
  ShoppingBag, 
  Package, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  MapPin,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { SEED_LISTINGS } from "@/lib/seedData";

export default function HomePage() {
  const { addItem } = useCart();
  const [selectedDemoTab, setSelectedDemoTab] = useState<number>(0);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const sectors = [
    {
      id: "mobility",
      title: "Mobility & Shuttles",
      subtitle: "Last-mile transit directly from railway stations & bus stands",
      priceTag: "from ₹80",
      icon: <Car className="w-5 h-5 text-terracotta" />,
      href: "/mobility",
      badge: "60+ Electric Rickshaws",
      sample: "Nashik Road Station to Panchavati Ghat (Fixed ₹80)",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "stays",
      title: "Family Homestays",
      subtitle: "Verified Nashik homes, Wada rooms & quiet riverside retreats",
      priceTag: "from ₹900/night",
      icon: <HomeIcon className="w-5 h-5 text-terracotta" />,
      href: "/stays",
      badge: "Breakfast Included",
      sample: "Godavari Riverside Homestay (Mrs. Kulkarni)",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "food",
      title: "Authentic Food Trails",
      subtitle: "Generational Misal Pav, Khandeshi Bhakri & home kitchens",
      priceTag: "from ₹199",
      icon: <UtensilsCrossed className="w-5 h-5 text-terracotta" />,
      href: "/food",
      badge: "Pure Vegetarian",
      sample: "Aai's Kitchen Breakfast Trail (Misal + Poha + Chai)",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "guides",
      title: "Local Student Guides",
      subtitle: "Certified university historians guiding Ramayana & Ghat walks",
      priceTag: "from ₹299",
      icon: <Compass className="w-5 h-5 text-terracotta" />,
      href: "/guides",
      badge: "Hindi, Marathi & Eng",
      sample: "Panchavati Heritage & Sita Gumpha Walk (90 Mins)",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "experiences",
      title: "Village Agro-Tours",
      subtitle: "Grape farm immersions, raisin racks & traditional village meals",
      priceTag: "from ₹499",
      icon: <Trees className="w-5 h-5 text-terracotta" />,
      href: "/experiences",
      badge: "Dindori Agri Hub",
      sample: "Grape Harvest Tour & Bullock Cart Ride",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "products",
      title: "Artisanal Marketplace",
      subtitle: "GI-tagged Dindori raisins, Yeola silk & Tambat brassware",
      priceTag: "Direct Farmer Rate",
      icon: <ShoppingBag className="w-5 h-5 text-terracotta" />,
      href: "/products",
      badge: "Box Home Eligible",
      sample: "1 kg GI Golden Raisins + Brass Ganga Kalash",
      image: "https://images.unsplash.com/photo-1596450514735-111a2fe0ac1f?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const demoSteps = [
    {
      step: "01",
      title: "Arrival Mobility",
      action: "Book Station E-Rickshaw",
      price: "₹80",
      impact: "Funds 1 local electric auto driver",
      listingId: "mob-1",
    },
    {
      step: "02",
      title: "Rest & Hospitality",
      action: "Reserve Godavari Homestay",
      price: "₹900",
      impact: "Direct earnings to local host family",
      listingId: "stay-1",
    },
    {
      step: "03",
      title: "Cultural Heritage",
      action: "Book Panchavati Heritage Walk",
      price: "₹299",
      impact: "Employs 1 Nashik university history student",
      listingId: "guide-1",
    },
    {
      step: "04",
      title: "Local Sustenance",
      action: "Order Nashik Breakfast Trail",
      price: "₹199",
      impact: "Supports traditional home kitchen cooks",
      listingId: "food-1",
    },
    {
      step: "05",
      title: "Agro Immersion",
      action: "Book Dindori Village Experience",
      price: "₹499",
      impact: "Income shared across 6 village families",
      listingId: "exp-1",
    },
    {
      step: "06",
      title: "Send Box Home",
      action: "GI Raisins + Tambat Brass Hamper",
      price: "₹870",
      impact: "Direct pay to farmer + artisan + delivery rider",
      listingId: "prod-1",
    },
  ];

  const handleQuickAdd = (listingId: string, title: string) => {
    const listing = SEED_LISTINGS.find((l) => l.id === listingId);
    if (listing) {
      addItem({
        id: `cart-${listing.id}`,
        listingId: listing.id,
        title: listing.title,
        category: listing.category,
        price: listing.price,
        providerName: listing.providerName,
        providerType: listing.providerType,
        image: listing.images[0],
      });
      setAddedItemNotice(`Added "${title}" to your trip!`);
      setTimeout(() => setAddedItemNotice(null), 3000);
    }
  };

  return (
    <div className="space-y-24 py-8">
      {/* Toast Notification for Quick Add */}
      {addedItemNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-rust text-soft-limestone px-4 py-3 rounded-lg shadow-xl border border-terracotta flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-terracotta" />
          <span>{addedItemNotice}</span>
          <Link href="/checkout" className="underline font-bold text-white ml-2">
            View Cart &rarr;
          </Link>
        </div>
      )}

      {/* SECTION 1: HERO BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-limestone border border-hairline text-xs font-semibold text-deep-rust">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>Nashik Local Economy Architecture</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink leading-[1.08] tracking-tight">
              Experience Nashik. <br />
              <span className="text-terracotta italic font-normal">Support Nashik.</span>
            </h1>

            <p className="text-lg text-body max-w-xl leading-relaxed">
              Every year, millions visit Nashik for Kumbh Mela. Today, spending concentrates in distant corporate chains. 
              <strong className="text-ink font-semibold"> Kumbh Local</strong> connects pilgrims directly to verified auto drivers, family homestays, student historians, home kitchens, and grape farmers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/mobility">
                <Button size="lg" variant="primary">
                  Begin Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/box-home">
                <Button size="lg" variant="secondary" icon={<Package className="w-4 h-4 text-olive" />}>
                  Send Box Home
                </Button>
              </Link>
              <Link href="/impact-summary" className="text-xs text-deep-rust font-semibold hover:underline px-2">
                View Impact Receipt &rarr;
              </Link>
            </div>

            {/* Quick Stat Pill Bar */}
            <div className="pt-6 border-t border-hairline grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-serif font-bold text-deep-rust">1,248+</p>
                <p className="text-xs text-muted">Verified Local Providers</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-terracotta">₹28.4L</p>
                <p className="text-xs text-muted">Direct Nashik Volume</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-olive">1,860</p>
                <p className="text-xs text-muted">Micro Jobs Created</p>
              </div>
            </div>
          </div>

          {/* Right Featured Hero Visual Card */}
          <div className="lg:col-span-5">
            <Card variant="limestone" className="p-6 shadow-md border-hairline space-y-5">
              <div className="flex items-center justify-between">
                <Badge variant="olive" size="sm">
                  Verified Local Impact
                </Badge>
                <span className="text-xs font-mono text-muted">Nashik District Pilot</span>
              </div>

              {/* Sample Journey Card */}
              <div className="relative rounded-lg overflow-hidden h-52 bg-deep-rust">
                <img
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80"
                  alt="Ramkund Ghats, Nashik"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-xs font-medium text-soft-limestone">Featured Heritage Walk</span>
                  <h3 className="text-lg font-serif font-bold">Panchavati & Ramkund Sacred Trail</h3>
                  <p className="text-xs text-soft-limestone/80 mt-0.5">Guided by Rohit Joshi (Nashik University Historian)</p>
                </div>
              </div>

              {/* Real-time Economic Beneficiaries */}
              <div className="bg-canvas rounded-lg p-4 border border-hairline space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Where Your ₹1,000 Goes:
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-body flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                      E-Rickshaw Driver Fare
                    </span>
                    <span className="font-semibold text-deep-rust">₹80 (100%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                      Homestay Host Direct Payout
                    </span>
                    <span className="font-semibold text-deep-rust">₹450 (100%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                      Local Food Cook & Farm Ingredients
                    </span>
                    <span className="font-semibold text-deep-rust">₹250 (100%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                      Student Guide Honorarium
                    </span>
                    <span className="font-semibold text-deep-rust">₹220 (100%)</span>
                  </div>
                </div>
              </div>

              <Link href="/impact-summary" className="block">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Explore The Economic Multiplier Model &rarr;
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 6 CORE SECTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="terracotta" size="sm">
            Ecosystem Verticals
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink">
            Six Sectors. One Unified Local Experience.
          </h2>
          <p className="text-sm text-body leading-relaxed">
            From last-mile e-rickshaw booking to homestays and doorstep luggage delivery, every single service directly enriches a Nashik resident.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sec) => (
            <Card
              key={sec.id}
              variant="limestone"
              hoverable
              className="flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative h-44 rounded-lg overflow-hidden bg-surface-soft">
                  <img
                    src={sec.image}
                    alt={sec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="limestone" size="sm">
                      {sec.priceTag}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="deep-rust" size="sm">
                      {sec.badge}
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {sec.icon}
                    <h3 className="text-xl font-serif font-bold text-ink group-hover:text-terracotta transition-colors">
                      {sec.title}
                    </h3>
                  </div>
                  <p className="text-xs text-body leading-relaxed">{sec.subtitle}</p>
                </div>

                <div className="p-2.5 rounded-md bg-canvas/80 border border-hairline text-xs">
                  <span className="text-muted block text-[10px] uppercase font-semibold">Example Offering:</span>
                  <span className="font-medium text-deep-rust">{sec.sample}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
                <Link
                  href={sec.href}
                  className="text-xs font-semibold text-deep-rust hover:text-terracotta flex items-center gap-1"
                >
                  <span>Explore Sector</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link href={sec.href}>
                  <Button size="sm" variant="primary">
                    Book Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 3: "SEND MY NASHIK BOX HOME" MARQUEE FEATURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-dark text-on-dark rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-surface-dark-elevated">
          {/* Subtle decorative background watermarks */}
          <div className="absolute -right-10 -bottom-10 opacity-10 font-serif text-[180px] pointer-events-none select-none text-soft-limestone">
            Nashik
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="olive" size="md">
                Unique Economic Innovation
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-soft-limestone leading-tight">
                Send My Nashik Box Home. <br />
                <span className="text-terracotta italic font-normal">Travel Light. Support More.</span>
              </h2>
              <p className="text-sm text-on-dark-soft leading-relaxed max-w-xl">
                Pilgrims hesitate to purchase bulky local goods (1 kg raisins, brass lamps, handicrafts) because carrying them through crowded temples is cumbersome. 
                Our platform lets you buy from multiple local farmers & artisans, hands off fulfillment to a Nashik delivery partner, and ships the consolidated box right to your home state.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-surface-dark-elevated border border-hairline/10">
                  <Package className="w-5 h-5 text-terracotta mb-1" />
                  <h4 className="text-xs font-semibold text-soft-limestone">Multi-Vendor Box</h4>
                  <p className="text-[11px] text-on-dark-soft">Farmer + Artisan + Food in 1 shipment</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-dark-elevated border border-hairline/10">
                  <ShieldCheck className="w-5 h-5 text-olive mb-1" />
                  <h4 className="text-xs font-semibold text-soft-limestone">Zero Tourist Burden</h4>
                  <p className="text-[11px] text-on-dark-soft">Walk the ghats without luggage</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-dark-elevated border border-hairline/10">
                  <TrendingUp className="w-5 h-5 text-terracotta mb-1" />
                  <h4 className="text-xs font-semibold text-soft-limestone">Logistics Gig Jobs</h4>
                  <p className="text-[11px] text-on-dark-soft">Creates jobs for Nashik delivery youth</p>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/box-home">
                  <Button size="lg" variant="primary" icon={<Package className="w-4 h-4" />}>
                    Curate Your Nashik Box Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Box Preview Mock */}
            <div className="lg:col-span-5 bg-surface-dark-elevated p-6 rounded-2xl border border-hairline/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-dark">
                <span className="text-xs font-semibold text-soft-limestone">Sample Nashik Hamper</span>
                <span className="text-xs text-terracotta font-mono font-bold">Total: ₹1,110</span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 rounded bg-surface-dark/70">
                  <div>
                    <span className="font-semibold text-soft-limestone">GI Golden Raisins (1 kg)</span>
                    <span className="text-[10px] text-on-dark-soft block">Dindori Grape Collective</span>
                  </div>
                  <span className="font-mono text-soft-limestone">₹320</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-dark/70">
                  <div>
                    <span className="font-semibold text-soft-limestone">Tambat Pure Brass Kalash</span>
                    <span className="text-[10px] text-on-dark-soft block">Nashik Metal Artisans</span>
                  </div>
                  <span className="font-mono text-soft-limestone">₹550</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-dark/70">
                  <div>
                    <span className="font-semibold text-soft-limestone">Authentic Kondaji Chivda</span>
                    <span className="text-[10px] text-on-dark-soft block">Old Nashik Kitchen</span>
                  </div>
                  <span className="font-mono text-soft-limestone">₹240</span>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-dark flex items-center justify-between text-xs text-on-dark-soft">
                <span>Direct Beneficiaries:</span>
                <span className="font-semibold text-olive">1 Farmer + 1 Artisan + 1 Cook + 1 Rider</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE 6-STEP DEMO JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <Badge variant="deep-rust" size="sm">
            Live Demo Flow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink">
            Experience the Pilgrim Journey
          </h2>
          <p className="text-xs text-body">
            Test how a visitor arrives at Nashik Road Station and leaves behind a wide web of local economic value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoSteps.map((s, idx) => (
            <Card
              key={s.step}
              variant="limestone"
              className="p-5 border-hairline flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded">
                    Step {s.step}
                  </span>
                  <span className="font-serif font-bold text-deep-rust">{s.price}</span>
                </div>
                <h4 className="text-base font-serif font-bold text-ink">{s.title}</h4>
                <p className="text-xs font-semibold text-deep-rust">{s.action}</p>
                <p className="text-[11px] text-olive font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  {s.impact}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-hairline">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => handleQuickAdd(s.listingId, s.action)}
                >
                  + Add to Demo Trip
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/checkout">
            <Button size="lg" variant="primary" icon={<Sparkles className="w-4 h-4" />}>
              Proceed to Unified Checkout & Impact Receipt &rarr;
            </Button>
          </Link>
        </div>
      </section>

      {/* SECTION 5: MACRO IMPACT DASHBOARD CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-surface-soft border border-hairline flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="olive" size="sm">
              Municipal & Smart City Integration
            </Badge>
            <h3 className="text-2xl font-serif font-bold text-ink">
              Real-Time District Economic Monitoring
            </h3>
            <p className="text-xs text-body max-w-xl">
              Administrators and tourism boards can observe live transaction distributions, detect underserved pilgrim routes, and verify local vendor compliance in real-time.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="md">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/provider/dashboard">
              <Button variant="primary" size="md">
                Provider Hub
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
