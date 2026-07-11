import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
// import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { SlidersHorizontal, LayoutGrid, List, Star } from "lucide-react";
import { useGetAllProductsQuery } from "@/Redux/products/productsApi";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [
    { title: "Shop — Deshi Bedding" },
    { name: "description", content: "Shop handmade Lep, Toshok, Balish, Jajim and more — premium Bangladeshi bedding with free delivery." },
    { property: "og:title", content: "Shop — Deshi Bedding" },
    { property: "og:description", content: "Premium handmade Bangladeshi bedding." },
  ]}),
  component: ShopPage,
});

function ShopPage() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [price, setPrice] = useState(10000);

  const {
    data,
    isLoading,
    isError,
  } = useGetAllProductsQuery();
  console.log("Products API Response:", data);

  const products = useMemo(() => {
  if (!data?.data?.products) return [];

   let list = [...data.data.products];

    if (category !== "all") {
      list = list.filter(
        (product) => product.category === category
      );
    }

    list = list.filter(
      (product) => product.price <= price
    );

    switch (sort) {
      case "low":
        list.sort((a, b) => a.price - b.price);
        break;

      case "high":
        list.sort((a, b) => b.price - a.price);
        break;

      case "new":
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;
    }

    return list;
  }, [data, category, sort, price]);

  if (isLoading) {
    return <SiteLayout>Loading...</SiteLayout>;
  }

  if (isError) {
    return <SiteLayout>Failed to load products.</SiteLayout>;
  }

  return (
    <SiteLayout>
      <section className="bg-[color:var(--cream)] border-b border-border">
        <div className="container-x py-10 md:py-14">
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold">Shop</p>
          <h1 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-primary">All products</h1>
          <p className="mt-3 text-foreground/70 max-w-xl">Browse our full collection of handmade bedding — every piece crafted by Bangladeshi artisans.</p>
        </div>
      </section>

      <div className="container-x py-10 grid lg:grid-cols-[280px_1fr] gap-10">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-card rounded-2xl border border-border/60 p-5">
            <h3 className="font-display text-base font-semibold text-primary flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Filters</h3>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
              <div className="mt-3 space-y-1.5">
                <button onClick={() => setCategory("all")} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${category==="all"?"bg-primary text-primary-foreground":"hover:bg-secondary text-foreground/80"}`}>All categories</button>
                {CATEGORIES.map((c) => (
                  <button key={c.slug} onClick={() => setCategory(c.slug)} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${category===c.slug?"bg-primary text-primary-foreground":"hover:bg-secondary text-foreground/80"}`}>{c.name}</button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max price: ৳{price.toLocaleString()}</p>
              <input type="range" min={500} max={10000} step={100} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-3 w-full accent-accent" />
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Material</p>
              <div className="mt-3 space-y-2">
                {["Shimul Tula","Pure Cotton","Velvet","Organic Cotton"].map((m) => (
                  <label key={m} className="flex items-center gap-2.5 text-sm text-foreground/80"><input type="checkbox" className="accent-accent" /> {m}</label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rating</p>
              <div className="mt-3 space-y-2">
                {[5,4,3].map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm text-foreground/80"><input type="checkbox" className="accent-accent" />
                    <span className="flex">{Array.from({length:r}).map((_,i)=>(<Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />))}</span>
                    & up
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-muted-foreground">{products.length} products</p>
            <div className="flex items-center gap-3">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:border-accent">
                <option value="popular">Popular</option>
                <option value="new">Newest</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <div className="hidden md:flex rounded-full border border-border p-1">
                <button onClick={() => setView("grid")} aria-label="Grid" className={`grid h-8 w-8 place-items-center rounded-full ${view==="grid"?"bg-primary text-primary-foreground":"text-muted-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
                <button onClick={() => setView("list")} aria-label="List" className={`grid h-8 w-8 place-items-center rounded-full ${view==="list"?"bg-primary text-primary-foreground":"text-muted-foreground"}`}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          <div className={`mt-6 ${view==="grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" : "flex flex-col gap-4"}`}>
            {products.map((p) => <ProductCard key={p._id} p={p} />)}
          </div>
          {products.length === 0 && (
            <div className="mt-12 text-center py-20 bg-secondary/40 rounded-2xl">
              <p className="font-display text-xl text-primary">No products match your filters.</p>
              <button onClick={() => { setCategory("all"); setPrice(10000); }} className="mt-4 text-sm font-semibold text-accent">Reset filters</button>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
