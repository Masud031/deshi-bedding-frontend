import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Deshi Bedding" },
    { name: "description", content: "Get in touch with Deshi Bedding. Call, WhatsApp, email or visit our workshop in Demra, Dhaka." },
    { property: "og:title", content: "Contact Deshi Bedding" },
    { property: "og:description", content: "Reach our team on phone, WhatsApp or email." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="bg-[color:var(--cream)] border-b border-border">
        <div className="container-x py-12 md:py-16">
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Contact</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-primary">We'd love to hear from you</h1>
          <p className="mt-4 text-foreground/70 max-w-xl">Questions, custom orders, bulk inquiries — our team responds within 24 hours.</p>
        </div>
      </section>

      <section className="container-x py-12 md:py-20 grid lg:grid-cols-[1fr_360px] gap-10">
        {sent ? (
          <div className="bg-card rounded-3xl border border-border/60 p-10 text-center">
            <CheckCircle2 className="h-14 w-14 mx-auto text-accent" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-primary">Message sent!</h2>
            <p className="mt-2 text-foreground/70">We'll get back to you shortly.</p>
            <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-accent">Send another</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-card rounded-3xl border border-border/60 p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name"><input type="text" required className={inp} /></Field>
              <Field label="Phone / WhatsApp"><input type="tel" required className={inp} /></Field>
              <Field label="Email"><input type="email" required className={inp} /></Field>
              <Field label="Subject"><input type="text" className={inp} /></Field>
            </div>
            <Field label="Message"><textarea rows={6} required className={inp + " resize-none"} /></Field>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-4 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">Send message</button>
          </form>
        )}

        <aside className="space-y-4">
          {[
            { icon: Phone, title: "Phone", value: "+880 1700-000000", href: "tel:+8801700000000" },
            { icon: MessageCircle, title: "WhatsApp", value: "Chat with us instantly", href: "https://wa.me/8801700000000" },
            { icon: Mail, title: "Email", value: "hello@deshibedding.bd", href: "mailto:hello@deshibedding.bd" },
            { icon: MapPin, title: "Workshop & Showroom", value: "Demra, Dhaka, Bangladesh" },
            { icon: Clock, title: "Business hours", value: "Sat–Thu • 9 AM – 8 PM" },
          ].map((c, i) => {
            const Inner = (
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><c.icon className="h-5 w-5" /></span>
                <div className="min-w-0"><p className="font-display font-semibold text-primary">{c.title}</p><p className="text-sm text-foreground/70 mt-0.5 break-words">{c.value}</p></div>
              </div>
            );
            return c.href ? <a key={i} href={c.href} className="block bg-card rounded-2xl border border-border/60 p-5 hover:border-accent/40 transition-colors">{Inner}</a> : <div key={i} className="bg-card rounded-2xl border border-border/60 p-5">{Inner}</div>;
          })}
        </aside>
      </section>

      <section className="container-x pb-20">
        <div className="rounded-3xl overflow-hidden border border-border/60 aspect-[16/7]">
          <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=90.41%2C23.71%2C90.49%2C23.76&layer=mapnik" className="h-full w-full" loading="lazy" />
        </div>
      </section>
    </SiteLayout>
  );
}

const inp = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span><div className="mt-1.5">{children}</div></label>);
}
