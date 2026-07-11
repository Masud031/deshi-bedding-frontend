import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X, Phone, MapPin, Mail, Facebook, Instagram, Youtube, ArrowUp, MessageCircle, Home, LayoutGrid, Sparkles } from "lucide-react";
import AccountDropdown from "./nav2";


const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/custom-order", label: "Custom Order" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg shadow-[var(--shadow-soft)]">দ</span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">Deshi Bedding</span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Lep • Toshok • Balish</span>
      </span>
    </Link>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <div className="hidden md:block bg-primary text-primary-foreground/90 text-xs">
        <div className="container-x flex h-9 items-center justify-between">
          <span>Free delivery across Bangladesh on orders over ৳5,000</span>
          <span className="flex items-center gap-4">
            <a href="tel:+8801700000000" className="hover:text-accent flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +880 1700-000000</a>
            <span className="opacity-60">|</span>
            <span>Bangla • English</span>
          </span>
        </div>
      </div>
      <header className={`sticky top-0 z-40 w-full transition-all ${scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-sm" : "bg-background"}`}>
        <div className="container-x grid grid-cols-[auto_1fr_auto] items-center gap-4 h-16 md:h-20">
          <Logo />
          <nav className="hidden lg:flex items-center justify-center gap-7">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link key={n.to} to={n.to} className={`relative text-sm font-medium transition-colors ${active ? "text-primary" : "text-foreground/75 hover:text-primary"}`}>
                  {n.label}
                  {active && <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full" />}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <button aria-label="Search" className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary hover:text-primary transition-colors"><Search className="h-5 w-5" /></button>
            <button aria-label="Wishlist" className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary hover:text-primary transition-colors"><Heart className="h-5 w-5" /></button>
            {/* <button aria-label="Account" className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary hover:text-primary transition-colors"><User className="h-5 w-5" /></button> */}
           
            <button aria-label="Cart" className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary hover:text-primary transition-colors">
           
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">2</span>
            </button>
              <AccountDropdown />
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="lg:hidden grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-background shadow-2xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto p-5 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-secondary transition-colors">{n.label}</Link>
              ))}
            </nav>
            <div className="p-5 border-t border-border space-y-2">
              <a href="tel:+8801700000000" className="flex items-center gap-3 text-sm text-foreground"><Phone className="h-4 w-4 text-accent" /> +880 1700-000000</a>
              <a href="mailto:hello@deshibedding.bd" className="flex items-center gap-3 text-sm text-foreground"><Mail className="h-4 w-4 text-accent" /> hello@deshibedding.bd</a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground font-display text-lg">দ</span>
            <span className="font-display text-xl font-semibold">Deshi Bedding</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/75 leading-relaxed">
            Handcrafted Lep, Toshok, Balish & Jajim made by Bangladeshi artisans — traditional comfort, modern quality.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-accent">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            {["Shop","Categories","Custom Order","About","Gallery","Reviews"].map((l) => (
              <li key={l}><Link to="/shop" className="hover:text-accent transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-accent">Customer Support</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-accent transition-colors">Shipping Information</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-accent">Stay in touch</h4>
          <p className="mt-4 text-sm text-primary-foreground/75">New arrivals, seasonal collections & artisan stories.</p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="Your email" className="flex-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2.5 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent" />
            <button className="rounded-full bg-accent text-accent-foreground font-medium text-sm px-5 hover:opacity-90 transition-opacity">Join</button>
          </form>
          <div className="mt-5 space-y-2 text-sm text-primary-foreground/75">
            <p className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" /> Demra, Dhaka, Bangladesh</p>
            <p className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-accent shrink-0" /> +880 1700-000000</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} Deshi Bedding. All rights reserved.</span>
          <span>Made with care in Bangladesh.</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform">
        <MessageCircle className="h-6 w-6" />
      </a>
      {show && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className="fixed bottom-24 left-5 md:bottom-8 md:left-auto md:right-28 z-30 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-accent hover:text-accent-foreground transition-colors animate-fade-in">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}

function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/shop", label: "Shop", icon: LayoutGrid },
    { to: "/custom-order", label: "Custom", icon: Sparkles },
    { to: "/contact", label: "Contact", icon: MessageCircle },
  ] as const;
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-lg border-t border-border">
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link to={to} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className={`h-5 w-5 ${active ? "text-accent" : ""}`} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <FloatingActions />
      <MobileBottomNav />
    </div>
  );
}
