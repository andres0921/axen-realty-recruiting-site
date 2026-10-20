import AxenRealtyRecruitingPage from "./App";
import { CompareHub } from "./compare/CompareHub";
import { ComparePage, compareFaqs } from "./compare/ComparePage";
import { ASOF, competitorList } from "./compare/brokerages";
import { homeFaqs } from "./homeFaqs";

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
    title: "AXEN Realty: 100% Commission Brokerage | Level Up with AXEN",
    description:
      "Thinking about switching brokerages? AXEN Realty agents keep 100% of their commission, pay $50/month with no annual fee, and cap at $6,000. See the numbers and start a confidential, no-pressure conversation with Andres Aviles.",
    ogDescription:
      "Keep 100% of your commission, $50/month, caps as low as $6,000 — plus your own transaction coordinator and E&O. For agents ready to level up.",
    Component: AxenRealtyRecruitingPage,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "AXEN Realty: 100% Commission Brokerage | Level Up with AXEN",
        inLanguage: "en-US",
        about: { "@id": `${SITE_URL}/#organization` },
        author,
      },
      {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#organization`,
        name: "AXEN Realty",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/axen-logo.png`,
        image: `${SITE_URL}/og-image.png`,
        description: "Multi-state real estate brokerage offering agents a 100% commission split with flat fees and an annual cap.",
        employee: author,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: homeFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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
