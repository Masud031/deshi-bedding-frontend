import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { REVIEWS } from "@/lib/catalog";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [
    { title: "Reviews — Deshi Bedding" },
    { name: "description", content: "Read 2,100+ verified reviews from families across Bangladesh who trust Deshi Bedding." },
    { property: "og:title", content: "Customer Reviews — Deshi Bedding" },
    { property: "og:description", content: "What families across Bangladesh say." },
  ]}),
  component: ReviewsPage,
});

const ALL = [...REVIEWS, ...REVIEWS, ...REVIEWS].map((r, i) => ({ ...r, id: i }));

function ReviewsPage() {
  return (
    <SiteLayout>
      <section className="bg-[color:var(--cream)] border-b border-border">
        <div className="container-x py-12 md:py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Reviews</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-primary">Loved by families across Bangladesh</h1>
          <div className="mt-5 inline-flex items-center gap-3 bg-background rounded-full px-5 py-2.5 border border-border">
            <div className="flex">{Array.from({length:5}).map((_,i)=>(<Star key={i} className="h-5 w-5 fill-accent text-accent" />))}</div>
            <span className="font-display text-lg font-semibold text-primary">4.9</span>
            <span className="text-sm text-muted-foreground">from 2,100+ reviews</span>
          </div>
        </div>
      </section>
      <section className="container-x py-12 md:py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ALL.map((r) => (
          <figure key={r.id} className="bg-card border border-border/60 rounded-3xl p-6">
            <Quote className="h-8 w-8 text-accent" />
            <blockquote className="mt-3 text-foreground/80 leading-relaxed">"{r.text}"</blockquote>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground font-semibold">{r.avatar}</span>
                <div><p className="font-semibold text-foreground text-sm">{r.name}</p><p className="text-xs text-muted-foreground">{r.city}</p></div>
              </div>
              <div className="flex">{Array.from({length: r.rating}).map((_,i)=>(<Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />))}</div>
            </div>
          </figure>
        ))}
      </section>
    </SiteLayout>
  );
}
