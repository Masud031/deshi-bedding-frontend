import catLep from "@/assets/cat-lep.jpg";
import catToshok from "@/assets/cat-toshok.jpg";
import catBalish from "@/assets/cat-balish.jpg";
import catJajim from "@/assets/cat-jajim.jpg";
import catBaby from "@/assets/cat-baby.jpg";
import catPrayer from "@/assets/cat-prayer.jpg";

export type Category = { slug: string; name: string; bangla?: string; image: string; tagline: string };
export type Product = {
  id: string; name: string; bangla?: string; category: string; image: string;
  price: number; oldPrice?: number; rating: number; reviews: number; badge?: string; material: string; sizes: string[];
};

export const CATEGORIES: Category[] = [
  { slug: "lep", name: "Lep", bangla: "লেপ", image: catLep, tagline: "Warm winter quilts" },
  { slug: "toshok", name: "Toshok", bangla: "তোশক", image: catToshok, tagline: "Custom mattresses" },
  { slug: "cotton-toshok", name: "Cotton Toshok", image: catToshok, tagline: "Pure cotton fill" },
  { slug: "shimul-balish", name: "Shimul Tular Balish", bangla: "শিমুল তুলার বালিশ", image: catBalish, tagline: "Silk-cotton pillows" },
  { slug: "kol-balish", name: "Kol Balish", image: catBalish, tagline: "Long body pillows" },
  { slug: "baby-bedding", name: "Baby Bedding", image: catBaby, tagline: "Gentle & soft" },
  { slug: "jajim", name: "Jajim", bangla: "জাজিম", image: catJajim, tagline: "Floor mats & rugs" },
  { slug: "prayer-mats", name: "Prayer Mats", bangla: "জায়নামাজ", image: catPrayer, tagline: "Handcrafted Jainamaz" },
  { slug: "hotel-bedding", name: "Hotel Bedding", image: catToshok, tagline: "For hospitality" },
  { slug: "custom", name: "Custom Bedding", image: catLep, tagline: "Made to order" },
];

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Premium Shimul Tula Lep", bangla: "প্রিমিয়াম লেপ", category: "lep", image: catLep, price: 4200, oldPrice: 5500, rating: 4.9, reviews: 218, badge: "Bestseller", material: "Shimul Tula", sizes: ["Single","Double","King"] },
  { id: "p2", name: "Royal Cotton Toshok 6\"", category: "toshok", image: catToshok, price: 6800, oldPrice: 8500, rating: 4.8, reviews: 142, badge: "-20%", material: "Pure Cotton", sizes: ["72×36","78×60","84×72"] },
  { id: "p3", name: "Shimul Tular Balish (Pair)", bangla: "শিমুল তুলার বালিশ", category: "shimul-balish", image: catBalish, price: 1450, oldPrice: 1800, rating: 4.9, reviews: 312, material: "Shimul Tula", sizes: ["Standard","King"] },
  { id: "p4", name: "Hand-Woven Jajim", category: "jajim", image: catJajim, price: 3200, rating: 4.7, reviews: 86, badge: "New", material: "Cotton Weave", sizes: ["5×7 ft","6×9 ft"] },
  { id: "p5", name: "Baby Soft Bedding Set", category: "baby-bedding", image: catBaby, price: 2100, oldPrice: 2600, rating: 5.0, reviews: 94, material: "Organic Cotton", sizes: ["Crib","Toddler"] },
  { id: "p6", name: "Traditional Jainamaz", category: "prayer-mats", image: catPrayer, price: 980, rating: 4.8, reviews: 156, material: "Velvet & Cotton", sizes: ["Standard"] },
  { id: "p7", name: "Kol Balish Long Pillow", category: "kol-balish", image: catBalish, price: 1650, rating: 4.7, reviews: 71, material: "Shimul Tula", sizes: ["4 ft","5 ft"] },
  { id: "p8", name: "Hotel Grade Toshok", category: "hotel-bedding", image: catToshok, price: 7900, oldPrice: 9500, rating: 4.9, reviews: 38, badge: "Bulk", material: "Premium Cotton", sizes: ["Custom"] },
];

export const REVIEWS = [
  { name: "Rumana Akhter", city: "Dhaka", rating: 5, text: "The Lep is incredibly warm and the cotton feels so pure. Better than anything I've bought from a showroom.", avatar: "RA" },
  { name: "Tanvir Hossain", city: "Chattogram", rating: 5, text: "Ordered a custom Toshok in an odd size — perfect fit, delivered in 4 days. Quality is genuine.", avatar: "TH" },
  { name: "Nasrin Sultana", city: "Sylhet", rating: 5, text: "Shimul tular balish is so soft my kids refuse to sleep without it. Will order more for guests.", avatar: "NS" },
  { name: "Farhan Karim", city: "Khulna", rating: 4, text: "Got the Jajim for our drawing room — beautiful weave, handcrafted feel. Recommended.", avatar: "FK" },
];
