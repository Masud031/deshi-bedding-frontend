import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import gStitch from "@/assets/gallery-stitching.jpg";
import gCotton from "@/assets/gallery-cotton.jpg";
import gBedroom from "@/assets/gallery-bedroom.jpg";
import hero from "@/assets/hero-bedroom.jpg";
import catLep from "@/assets/cat-lep.jpg";
import catToshok from "@/assets/cat-toshok.jpg";
import catBalish from "@/assets/cat-balish.jpg";
import catJajim from "@/assets/cat-jajim.jpg";
import { Play } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [
    { title: "Gallery — Deshi Bedding" },
    { name: "description", content: "Behind the scenes of our workshop: cotton filling, hand stitching, finished bedrooms and lifestyle photography." },
    { property: "og:title", content: "Gallery — Deshi Bedding" },
    { property: "og:description", content: "From our workshop to your home." },
  ]}),
  component: GalleryPage,
});

const IMAGES = [hero, gStitch, gCotton, gBedroom, catLep, catToshok, catBalish, catJajim];

function GalleryPage() {
  return (
    <SiteLayout>
      <section className="bg-[color:var(--cream)] border-b border-border">
        <div className="container-x py-12 md:py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Gallery</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-primary">From our workshop to your home</h1>
          <p className="mt-4 text-foreground/70 max-w-xl mx-auto">A look behind the craft — cotton, stitches, and the families who make every Lep possible.</p>
        </div>
      </section>

      <section className="container-x py-12 md:py-20">
        <div className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer">
          <img src={gBedroom} alt="Workshop video" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition-colors grid place-items-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-background/95 text-primary shadow-[var(--shadow-elegant)] group-hover:scale-110 transition-transform"><Play className="h-7 w-7 ml-1" /></span>
          </div>
          <div className="absolute bottom-6 left-6 text-primary-foreground">
            <p className="text-xs uppercase tracking-wider text-accent">Featured video</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">Inside our Demra workshop</h2>
          </div>
        </div>

        <div className="mt-10 columns-2 md:columns-3 lg:columns-4 gap-4 [&>img]:mb-4">
          {IMAGES.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" className="w-full rounded-2xl break-inside-avoid hover:scale-[1.02] transition-transform duration-500" />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
