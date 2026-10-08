import AxenRealtyRecruitingPage from "./App";
import { CompareHub } from "./compare/CompareHub";
import { ComparePage, compareFaqs } from "./compare/ComparePage";
import { ASOF, competitorList } from "./compare/brokerages";

export const SITE_URL = "https://www.levelupwithaxen.com";

const author = {
  "@type": "Person",
  name: "Andres Aviles",
  jobTitle: "Real Estate Agent, AXEN Realty",
  url: "https://www.andresaviles.com",
  telephone: "+12149085914",
};

/**
 * Every page on the site. Each one is pre-rendered at build time to
 * dist/<file> with its own title, description, canonical and schema
 * (see prerender.js), and the browser hydrates the matching component.
 */
export const routes = [
  {
    path: "/",
    file: "index.html",
    title: "Level Up with AXEN Realty | A Brokerage for Agents Who Want More",
    description:
      "Thinking about your next brokerage? AXEN Realty offers real estate agents competitive commission plans, real support, powerful systems, and growth opportunities. See the numbers and start a no-pressure conversation with Andres Aviles.",
    ogDescription:
      "Competitive commission plans, real support, powerful systems, and growth opportunities for real estate agents ready to level up.",
    Component: AxenRealtyRecruitingPage,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "Level Up with AXEN Realty | A Brokerage for Agents Who Want More",
        inLanguage: "en-US",
        about: { "@type": "Organization", name: "AXEN Realty", logo: `${SITE_URL}/axen-logo.png` },
        author,
      },
    ],
  },
];

const crumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
  })),
});

const webPage = (path, name, description) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: `${SITE_URL}${path}`,
  name,
  description,
  inLanguage: "en-US",
  author,
  publisher: { "@type": "Organization", name: "AXEN Realty", logo: `${SITE_URL}/axen-logo.png` },
});

routes.push({
  path: "/compare",
  file: "compare.html",
  title: "Compare Real Estate Brokerages: AXEN vs eXp, Real, KW & Fathom",
  description: `An honest, side-by-side look at what agents actually pay at AXEN Realty, eXp Realty, Real Brokerage, Keller Williams, and Fathom Realty — splits, caps, and fees as of ${ASOF}.`,
  Component: CompareHub,
  jsonLd: [
    webPage("/compare", "Compare Real Estate Brokerages", "Side-by-side brokerage fee comparison for real estate agents."),
    crumbs([["Home", "/"], ["Compare", "/compare"]]),
  ],
});

for (const c of competitorList) {
  const path = `/compare/${c.slug}`;
  const title = `AXEN Realty vs ${c.name}: Fees, Split & Cap Compared (${ASOF.split(" ")[1]})`;
  const description = `AXEN Realty vs ${c.name} for real estate agents: commission split, cap, monthly and per-deal fees side by side, plus a calculator to run your own numbers. Updated ${ASOF}.`;
  routes.push({
    path,
    file: `compare/${c.slug}.html`,
    title,
    description,
    Component: () => <ComparePage competitor={c} />,
    jsonLd: [
      webPage(path, title, description),
      crumbs([["Home", "/"], ["Compare", "/compare"], [`AXEN vs ${c.name}`, path]]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: compareFaqs(c).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });
}

export const routeAuthor = author;

/** Normalize a browser pathname ("/compare/", "/index.html") to a route path. */
export function findRoute(pathname) {
  const p = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "").replace(/(.)\/$/, "$1") || "/";
  return routes.find((r) => r.path === p) ?? routes[0];
}
