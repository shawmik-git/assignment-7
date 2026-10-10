export const API = process.env.NEXT_PUBLIC_API || "https://api.api-store.workers.dev/api/bazardor";
const BN = "০১২৩৪৫৬৭৮৯";
export const bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);
const num = (v) => { const s = String(v ?? "").replace(/[০-৯]/g, (c) => BN.indexOf(c)).replace(/[^\d.-]/g, ""); return parseFloat(s) || 0; };
const pick = (o, ...k) => { for (const x of k) if (o?.[x] !== undefined && o?.[x] !== null) return o[x]; };
const UNITS = { kg: "প্রতি কেজি", liter: "প্রতি লিটার", litre: "প্রতি লিটার", l: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস", pcs: "প্রতি পিস", pc: "প্রতি পিস", halli: "প্রতি হালি" };
const chg = (c) => { if (c && typeof c === "object") { const v = Math.abs(num(c.pct)); return c.dir === "down" ? -v : c.dir === "up" ? v : num(c.pct); } return num(c); };
export const norm = (p) => ({
  ...p,
  slug: String(pick(p, "slug", "id")),
  name: pick(p, "name", "nameBn", "title", "name_bn"),
  emoji: pick(p, "image", "emoji", "icon") || "🛒",
  unit: UNITS[String(p.unit || "").toLowerCase()] || p.unit || "",
  price: num(pick(p, "today", "price", "todayPrice", "currentPrice", "avgPrice")),
  change: chg(p.change),
  category: pick(p, "category", "categorySlug"),
  desc: pick(p, "description", "summary", "subtitle") || (p.yesterday ? `গতকাল ${bn(p.yesterday)} টাকা · গত সপ্তাহ ${bn(p.lastWeek)} টাকা · গত মাস ${bn(p.lastMonth)} টাকা` : ""),
  tags: [p.categoryNameBn || p.category].filter(Boolean),
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
