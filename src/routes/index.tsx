import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { CATEGORIES,  REVIEWS } from "@/lib/catalog";
import { Truck, Sparkles, Ruler, Hand, Clock, Users, ArrowRight, Star, Quote, Play } from "lucide-react";
import hero from "@/assets/hero-bedroom.jpg";
import gStitch from "@/assets/gallery-stitching.jpg";
import gCotton from "@/assets/gallery-cotton.jpg";
import gBedroom from "@/assets/gallery-bedroom.jpg";
import { ProductCard } from "@/components/product/ProductCard";
import { useGetAllProductsQuery } from "@/Redux/products/productsApi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deshi Bedding — Handmade Lep, Toshok, Balish & Jajim" },
      {
        name: "description",
        content:
          "Premium handmade Bangladeshi bedding: Lep, Toshok, Shimul Tular Balish, Jajim and custom sizes. Traditional craftsmanship, delivered nationwide.",
      },
      {
        property: "og:title",
        content: "Deshi Bedding — Handmade Bangladeshi Bedding",
      },
      {
        property: "og:description",
        content:
          "Lep, Toshok, Balish & Jajim handcrafted by Bangladeshi artisans.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const {
    data,
    isLoading,
    error,
  } = useGetAllProductsQuery();

const HIGHLIGHTS = [
  { icon: Truck, title: "Free Delivery", desc: "Across Bangladesh on orders ৳5,000+" },
  { icon: Sparkles, title: "Premium Materials", desc: "Pure Shimul Tula & cotton" },
  { icon: Ruler, title: "Custom Sizes", desc: "Made to your exact measurements" },
  { icon: Hand, title: "Handmade", desc: "Stitched by skilled artisans" },
  { icon: Clock, title: "Fast Delivery", desc: "3–5 days nationwide" },
  { icon: Users, title: "10,000+ Families", desc: "Trust our craftsmanship" },
];

const WHY = [
  { title: "Traditional Craftsmanship", desc: "Three generations of artisan hands shaping every stitch." },
  { title: "Premium Cotton & Shimul Tula", desc: "Hand-picked silk-cotton, fluffed and filled the old way." },
  { title: "Custom Sizes", desc: "Any length, width, thickness — built to fit your bed." },
  { title: "Home Delivery", desc: "Carefully packed and delivered to your door, anywhere in BD." },
  { title: "Affordable Pricing", desc: "Factory-direct, no middleman, no inflated markups." },
  { title: "Long Lasting Comfort", desc: "Built to last decades — heirloom-grade bedding." },
];

const SEASONS = [
  { title: "Winter Collection", desc: "Heavy Lep & quilted bedding for cold nights.", img: gBedroom },
  { title: "Luxury Collection", desc: "Premium Shimul Tula, hand-finished stitching.", img: gStitch },
  { title: "Hotel Collection", desc: "Bulk-ready bedding for hospitality.", img: gCotton },
  { title: "Wedding Collection", desc: "Gift sets for newly-weds & new homes.", img: hero },
];


  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[color:var(--cream)]">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 py-12 md:py-20 lg:py-28 items-center">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Handcrafted in Bangladesh
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-primary">
              Experience the comfort of <em className="text-accent not-italic">handmade</em> Bangladeshi bedding.
            </h1>
            <p className="mt-5 text-base md:text-lg text-foreground/75 max-w-xl leading-relaxed">
              Premium Lep, Toshok, Balish & Jajim crafted with traditional artistry and delivered across Bangladesh.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold shadow-[var(--shadow-soft)] hover:bg-accent hover:text-accent-foreground transition-colors">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/custom-order" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 backdrop-blur px-7 py-3.5 text-sm font-semibold text-primary hover:bg-background transition-colors">
                Custom Order
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-foreground/70">
              <div className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" /><span className="font-semibold text-foreground">4.9</span> from 2,100+ reviews</div>
              <div className="hidden sm:block h-8 w-px bg-border" />
              <div className="hidden sm:block">Trusted by <span className="font-semibold text-foreground">10,000+</span> families</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/20 rounded-[2.5rem] blur-2xl" aria-hidden />
            <div className="relative aspect-[5/4] rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)] border-4 border-background">
              <img src={hero} alt="Traditional Bangladeshi bedroom with handmade bedding" width={1920} height={1280} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 md:-bottom-8 md:-left-8 bg-background rounded-2xl shadow-[var(--shadow-elegant)] p-4 md:p-5 max-w-[220px] border border-border">
              <div className="flex -space-x-2 mb-2">
                {["bg-wood","bg-accent","bg-primary"].map((c,i)=>(<span key={i} className={`h-8 w-8 rounded-full ring-2 ring-background ${c}`} />))}
              </div>
              <p className="text-sm font-medium text-foreground">Handmade by 40+ artisans</p>
              <p className="text-xs text-muted-foreground mt-0.5">Three generations of craft</p>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="border-y border-border bg-background">
        <div className="container-x py-8 md:py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-accent"><Icon className="h-5 w-5" /></span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-16 md:py-24">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Our craft</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-primary">Shop by category</h2>
          </div>
          <Link to="/categories" className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/shop" className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-lg font-semibold text-primary-foreground">{c.name}</h3>
                {c.bangla && <p className="text-xs text-primary-foreground/80 mt-0.5">{c.bangla}</p>}
                <p className="text-[11px] text-primary-foreground/70 mt-1">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-x py-16 md:py-24 border-t border-border">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Bestsellers</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-primary">Featured products</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5">Shop all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        {/* <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"> */}


          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
  {isLoading ? (
    <div className="col-span-full text-center py-10">
      Loading products...
    </div>
  ) : error ? (
    <div className="col-span-full text-center py-10 text-red-500">
      Failed to load products.
    </div>
  ) : (
    data?.data.products
      ?.slice(0, 8)
      .map((product) => (
        <ProductCard
          key={product._id}
          p={product}
        />
      ))
  )}
</div>
        {/* </div> */}
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[color:var(--cream)]">
        <div className="container-x py-16 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src={gStitch} alt="Hand stitching" className="aspect-[3/4] w-full object-cover rounded-2xl shadow-[var(--shadow-soft)]" loading="lazy" />
              <img src={gCotton} alt="Cotton filling" className="aspect-[3/4] w-full object-cover rounded-2xl shadow-[var(--shadow-soft)] mt-8" loading="lazy" />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Why choose us</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-primary">Crafted with care, made to last.</h2>
            <p className="mt-4 text-foreground/75 leading-relaxed">Three generations of artisan tradition meet modern quality control. Every Lep, Toshok, and Balish is hand-filled, hand-stitched and inspected before it reaches your home.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {WHY.map((w, i) => (
                <div key={w.title} className="bg-background rounded-2xl p-5 border border-border/60">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-accent font-display text-sm font-semibold">{i+1}</span>
                  <h3 className="mt-3 font-display text-base font-semibold text-primary">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM TOSHOK BUILDER */}
      <CustomToshokSection />

      {/* SEASONAL */}
      <section className="container-x py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Collections</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-primary">Crafted for every season</h2>
          <p className="mt-4 text-foreground/70">Thoughtfully curated bedding sets for every occasion and space.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SEASONS.map((s) => (
            <article key={s.title} className="group relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-semibold text-primary-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/80">{s.desc}</p>
                <Link to="/shop" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Explore <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-x py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Loved by families</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold">What our customers say</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="bg-primary-foreground/5 backdrop-blur rounded-2xl p-6 border border-primary-foreground/10">
                <Quote className="h-7 w-7 text-accent" />
                <blockquote className="mt-3 text-sm leading-relaxed text-primary-foreground/90">"{r.text}"</blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground font-semibold text-sm">{r.avatar}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-primary-foreground/60">{r.city}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">{Array.from({length: r.rating}).map((_,i)=>(<Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />))}</div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="container-x py-16 md:py-24">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Behind the craft</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-primary">From our workshop</h2>
          </div>
          <Link to="/gallery" className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5">View gallery <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="lg:row-span-2 lg:col-span-2 relative aspect-square lg:aspect-auto rounded-3xl overflow-hidden group">
            <img src={hero} alt="Bedroom setup" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <button className="absolute inset-0 grid place-items-center bg-primary/0 group-hover:bg-primary/30 transition-colors">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-background/95 text-primary shadow-[var(--shadow-elegant)] opacity-0 group-hover:opacity-100 transition-opacity"><Play className="h-6 w-6 ml-1" /></span>
            </button>
          </div>
          {[gStitch, gCotton, gBedroom, hero].map((img, i) => (
            <div key={i} className="relative aspect-square rounded-3xl overflow-hidden">
              <img src={img} alt="Workshop" loading="lazy" className="absolute inset-0 h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[color:var(--cream)]">
        <div className="container-x py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={gCotton} alt="Our workshop" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Our story</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-primary">Three generations of Bangladeshi craftsmanship.</h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">From a small family workshop in Demra to homes across Bangladesh — for over forty years we've kept the art of hand-filling Lep and Toshok alive. Every product carries the warmth of our artisans and the trust of thousands of families.</p>
            <p className="mt-3 text-foreground/75 leading-relaxed">We hand-pick our Shimul Tula, sun-dry it, and fill every quilt the way our grandparents did. No shortcuts, no synthetic shortcuts — just honest bedding made to last.</p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function CustomToshokSection() {
  const [form, setForm] = useState({ length: "78", width: "60", thickness: "5", material: "Shimul Tula", fabric: "Premium Cotton", quantity: "1" });
  const estimate = Math.round((Number(form.length) * Number(form.width) * Number(form.thickness) * 0.18) * Number(form.quantity));

  return (
    <section className="container-x py-16 md:py-24">
      <div className="rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 p-8 md:p-14">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Build yours</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold">Design your custom Toshok</h2>
            <p className="mt-4 text-primary-foreground/75 leading-relaxed max-w-md">Any size, any thickness, any material. Tell us what you need and we'll craft it by hand and deliver to your door.</p>
            <div className="mt-8 space-y-3">
              {["Made-to-measure in any size","Choose your fill — Shimul Tula or Cotton","Premium fabric options","Free delivery on quotes over ৳5,000"].map((t) => (
                <p key={t} className="flex items-center gap-3 text-sm text-primary-foreground/85">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">✓</span>{t}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-background text-foreground rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-2 gap-4">
              {([["length","Length (in)","number"],["width","Width (in)","number"],["thickness","Thickness (in)","number"],["quantity","Quantity","number"]] as const).map(([k,label,type]) => (
                <label key={k} className="block">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
                  <input type={type} value={form[k as keyof typeof form]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
                </label>
              ))}
              <label className="block col-span-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Material</span>
                <select value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent">
                  <option>Shimul Tula</option><option>Pure Cotton</option><option>Mixed Cotton</option><option>Foam + Cotton</option>
                </select>
              </label>
              <label className="block col-span-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fabric</span>
                <select value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent">
                  <option>Premium Cotton</option><option>Soft Twill</option><option>Velvet</option><option>Printed Cotton</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[color:var(--cream)] p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated price</p>
                <p className="font-display text-2xl font-semibold text-primary">৳{estimate.toLocaleString()}</p>
              </div>
              <Link to="/custom-order" className="rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">Request quote</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
