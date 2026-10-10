export const API = process.env.NEXT_PUBLIC_API || "https://api.api-store.workers.dev/api/bazardor";
const BN = "০১২৩৪৫৬৭৮৯";
export const bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);
const num = (v) => { const s = String(v ?? "").replace(/[০-৯]/g, (c) => BN.indexOf(c)).replace(/[^\d.-]/g, ""); return parseFloat(s) || 0; };
const pick = (o, ...k) => { for (const x of k) if (o?.[x] !== undefined && o?.[x] !== null) return o[x]; };
export const norm = (p) => ({
  ...p,
  slug: String(pick(p, "slug", "id")),
  name: pick(p, "name", "nameBn", "title", "name_bn"),
  emoji: pick(p, "emoji", "icon", "image") || "🛒",
  unit: pick(p, "unit", "unitBn") || "",
  price: num(pick(p, "price", "todayPrice", "currentPrice", "avgPrice")),
  change: num(pick(p, "change", "changePercent", "percent", "priceChange")),
  category: pick(p, "category", "categorySlug"),
  desc: pick(p, "description", "summary", "subtitle") || "",
  markets: pick(p, "markets", "bazars", "prices", "marketPrices") || [],
});
export const money = (n) => bn(Number(n).toLocaleString("en-IN")) + " টাকা";
export async function getJSON(path) {
  const r = await fetch(API + path, { cache: "no-store" });
  if (!r.ok) throw new Error(r.status);
  const d = await r.json();
  return d?.data ?? d?.products ?? d?.categories ?? d;
}
export const getProducts = async (q = "") => (await getJSON("/products" + q)).map(norm);
