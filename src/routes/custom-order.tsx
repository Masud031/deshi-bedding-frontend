import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/custom-order")({
  head: () => ({ meta: [
    { title: "Custom Order — Deshi Bedding" },
    { name: "description", content: "Request a custom-made Lep, Toshok, Balish or Jajim in any size, material and fabric." },
    { property: "og:title", content: "Custom Order — Deshi Bedding" },
    { property: "og:description", content: "Custom handmade bedding — built to your exact size." },
  ]}),
  component: CustomOrderPage,
});

function CustomOrderPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <SiteLayout>
      <section className="bg-[color:var(--cream)] border-b border-border">
        <div className="container-x py-12 md:py-16">
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Custom order</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-primary">Tell us what you need.</h1>
          <p className="mt-4 text-foreground/70 max-w-xl">Any size, any material, any fabric. Fill the form below and our team will get back with a quote within 24 hours.</p>
        </div>
      </section>

      <section className="container-x py-12 md:py-20 grid lg:grid-cols-[1fr_360px] gap-10">
        {submitted ? (
          <div className="bg-card rounded-3xl border border-border/60 p-10 text-center">
            <CheckCircle2 className="h-14 w-14 mx-auto text-accent" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-primary">Request received!</h2>
            <p className="mt-2 text-foreground/70 max-w-md mx-auto">Our team will contact you on WhatsApp within 24 hours with a detailed quote and timeline.</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-accent">Submit another request</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="bg-card rounded-3xl border border-border/60 p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Product Type"><select className={inp}><option>Lep</option><option>Toshok</option><option>Balish</option><option>Kol Balish</option><option>Jajim</option><option>Baby Bedding</option><option>Other</option></select></Field>
              <Field label="Quantity"><input type="number" defaultValue={1} min={1} className={inp} required /></Field>
              <Field label="Length (inches)"><input type="number" className={inp} required /></Field>
              <Field label="Width (inches)"><input type="number" className={inp} required /></Field>
              <Field label="Thickness (inches)"><input type="number" className={inp} /></Field>
              <Field label="Material"><select className={inp}><option>Shimul Tula</option><option>Pure Cotton</option><option>Mixed Cotton</option><option>Foam + Cotton</option></select></Field>
              <Field label="Fabric"><select className={inp}><option>Premium Cotton</option><option>Soft Twill</option><option>Velvet</option><option>Printed Cotton</option></select></Field>
              <Field label="Delivery Location"><input type="text" placeholder="City, area" className={inp} required /></Field>
              <Field label="Name"><input type="text" className={inp} required /></Field>
              <Field label="Phone / WhatsApp"><input type="tel" placeholder="+880" className={inp} required /></Field>
            </div>
            <Field label="Notes (optional)"><textarea rows={4} className={inp + " resize-none"} placeholder="Any special instructions, colors, fabric preferences..." /></Field>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-4 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">Submit Request</button>
          </form>
        )}
        <aside className="space-y-6">
          <div className="bg-primary text-primary-foreground rounded-3xl p-6">
            <h3 className="font-display text-lg font-semibold">How it works</h3>
            <ol className="mt-4 space-y-4">
              {["Submit your request","Receive a quote within 24h","We craft your order by hand","Free delivery to your door"].map((s, i) => (
                <li key={s} className="flex gap-3 text-sm text-primary-foreground/90">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground font-display font-semibold text-sm">{i+1}</span>{s}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-[color:var(--cream)] rounded-3xl p-6">
            <h3 className="font-display text-lg font-semibold text-primary">Need help?</h3>
            <p className="mt-2 text-sm text-foreground/75">Chat with us directly on WhatsApp for instant assistance.</p>
            <a href="https://wa.me/8801700000000" className="mt-4 inline-flex items-center justify-center w-full rounded-full bg-[#25D366] text-white py-3 text-sm font-semibold">WhatsApp us</a>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

const inp = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span><div className="mt-1.5">{children}</div></label>);
}
