import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import gStitch from "@/assets/gallery-stitching.jpg";
import gCotton from "@/assets/gallery-cotton.jpg";
import gBedroom from "@/assets/gallery-bedroom.jpg";
import hero from "@/assets/hero-bedroom.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Deshi Bedding" },
    { name: "description", content: "Three generations of Bangladeshi craftsmanship. Learn our story, mission and the families behind every handmade Lep & Toshok." },
    { property: "og:title", content: "About Deshi Bedding" },
    { property: "og:description", content: "Generations of Bangladeshi craftsmanship." },
    { property: "og:image", content: gCotton },
  ]}),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-[color:var(--cream)] border-b border-border">
        <div className="container-x py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Our story</p>
            <h1 className="mt-2 font-display text-4xl md:text-6xl font-semibold text-primary leading-tight">Generations of warmth, woven by hand.</h1>
            <p className="mt-5 text-foreground/75 leading-relaxed">From a small family workshop in Demra, Dhaka, our artisans have been crafting Lep, Toshok and Balish for over forty years. We keep the old methods alive — sun-dried cotton, hand-stitched seams, and bedding that lasts a lifetime.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={gStitch} alt="Hand stitching" className="aspect-[3/4] object-cover rounded-2xl" loading="lazy" />
            <img src={gCotton} alt="Cotton" className="aspect-[3/4] object-cover rounded-2xl mt-8" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24 grid md:grid-cols-3 gap-6">
        {[
          { title: "Our Mission", desc: "To bring authentic Bangladeshi craftsmanship to every home — affordable, durable, and made with love." },
          { title: "Our Vision", desc: "To preserve traditional bedding crafts while raising the standard of comfort across Bangladesh." },
          { title: "Quality Promise", desc: "Every product is hand-inspected. If it isn't perfect, it doesn't leave our workshop." },
        ].map((c) => (
          <div key={c.title} className="bg-card border border-border/60 rounded-3xl p-7">
            <h3 className="font-display text-xl font-semibold text-primary">{c.title}</h3>
            <p className="mt-3 text-foreground/75 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-x py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <img src={gBedroom} alt="Workshop" className="rounded-3xl aspect-[4/3] object-cover" loading="lazy" />
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold">The handmade process</h2>
            <ol className="mt-6 space-y-4">
              {[
                ["Source", "Hand-picked Shimul Tula from local growers."],
                ["Clean & dry", "Sun-dried to remove moisture and ensure loft."],
                ["Fill", "Our artisans hand-fill each Lep and Toshok evenly."],
                ["Stitch", "Hand-stitched seams for decades of durability."],
                ["Inspect", "Every piece checked by a senior craftsman before shipping."],
              ].map(([t,d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground font-display font-semibold">{i+1}</span>
                  <div><p className="font-display font-semibold">{t}</p><p className="text-sm text-primary-foreground/75">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24 text-center">
        <img src={hero} alt="Bedroom" className="rounded-3xl w-full aspect-[16/7] object-cover" loading="lazy" />
        <h2 className="mt-10 font-display text-3xl md:text-5xl font-semibold text-primary max-w-3xl mx-auto">"Comfort isn't bought — it's crafted."</h2>
        <p className="mt-3 text-muted-foreground">— Deshi Bedding artisans</p>
      </section>
    </SiteLayout>
  );
}
