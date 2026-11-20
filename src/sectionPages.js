/**
 * Short URLs that open the home page at a specific section. Used for Google
 * Ads sitelinks, which need a distinct URL per link. Each one is pre-rendered
 * with its own title and description (see routes.jsx), canonicalizes to the
 * home page, and stays out of the sitemap.
 */
export const sectionPages = [
  {
    path: "/commission",
    section: "commission",
    title: "AXEN Realty Commission Plans: 100% Split, Caps at $6K or $12K",
    description:
      "Keep 100% of your commission at AXEN Realty. $50/month, no annual fee, and plan fees that cap at $6,000 (Growth) or $12,000 (Elite).",
  },
  {
    path: "/calculator",
    section: "calculator",
    title: "AXEN Realty Commission Calculator | Level Up with AXEN",
    description:
      "Run your own numbers and see what you would pay at AXEN Realty on the Growth or Elite plan, plus what revenue share could add.",
  },
  {
    path: "/why-axen",
    section: "why-axen",
    title: "Why Agents Join AXEN Realty | Level Up with AXEN",
    description:
      "100% commission, your own transaction coordinator and E&O, and real support to grow. See why agents are leveling up with AXEN.",
  },
  {
    path: "/tools",
    section: "tools",
    title: "Agent Tools and Support at AXEN Realty | Level Up with AXEN",
    description:
      "Transaction coordination, lead generation, marketing tools, and a CRM to help AXEN agents grow their business.",
  },
];

/** Section id for a browser pathname like "/commission" or "/commission/", or null. */
export function sectionForPath(pathname) {
  const p = pathname.replace(/\.html$/, "").replace(/(.)\/$/, "$1").toLowerCase();
  return sectionPages.find((s) => s.path === p)?.section ?? null;
}
