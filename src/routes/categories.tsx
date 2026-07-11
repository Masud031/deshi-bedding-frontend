import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { CATEGORIES } from "@/lib/catalog";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [
    { title: "Categories — Deshi Bedding" },
    { name: "description", content: "Explore all bedding categories: Lep, Toshok, Balish, Jajim, Prayer Mats, Baby Bedding & more." },
    { property: "og:title", content: "Categories — Deshi Bedding" },
    { property: "og:description", content: "All bedding categories handmade in Bangladesh." },
  ]}),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <SiteLayout>
      <section className="bg-[color:var(--cream)] border-b border-border">
        <div className="container-x py-12 md:py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Categories</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-primary">Find what fits your home</h1>
          <p className="mt-4 text-foreground/70 max-w-xl mx-auto">From cozy winter Lep to hand-woven Jajim — every category, handcrafted with care.</p>
        </div>
      </section>
      <section className="container-x py-12 md:py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} to="/shop" className="group bg-card rounded-3xl overflow-hidden border border-border/60 hover:shadow-[var(--shadow-elegant)] transition-all">
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-primary">{c.name}</h2>
                {c.bangla && <span className="text-sm text-accent font-medium">{c.bangla}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent transition-colors">Shop now <ArrowRight className="h-4 w-4" /></span>
            </div>
          </Link>
        ))}
      </section>
    </SiteLayout>
  );
}
