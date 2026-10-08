import React from "react";
import { CompareLayout, CtaButton } from "./Layout";
import { FeeCalculator } from "./FeeCalculator";
import { ASOF, axen, axenCost } from "./brokerages";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const axenFacts = [
  ["Commission split", "100% to you, from your first deal"],
  ["Monthly fee", "$50 — no annual fee"],
  ["Per-deal fee", "$295 every deal, including your own transaction coordinator and E&O"],
  ["Plan fee until cap", "Growth: $500 per deal, capped at $6,000 · Elite: $1,000 per deal, capped at $12,000"],
  ["Included", "Your own transaction coordinator, E&O, Lofty CRM, and live support"],
  ["Revenue share", "$125 (Growth) or $250 (Elite) per transaction for every agent in your downline"],
  ["Where", "Multi-state"],
];

const included = [
  ["Your own transaction coordinator", "Built into the $295 per-deal fee, so deals keep moving from contract to close without you paying a TC on the side."],
  ["E&O insurance", "Also included in the per-deal fee — no separate risk-management charge."],
  ["Lofty CRM", "An industry-leading CRM to manage your database, follow-up, and pipeline."],
  ["Live support", "Real people to help when you need it — not just a help center."],
  ["Lead generation", "Opportunities and systems that help you consistently find new clients."],
  ["Marketing tools", "Resources to promote listings, grow your personal brand, and stay visible."],
];

/** Default scenario used in the copy and FAQ. */
const SCENARIO = { deals: 12, gci: 9000 };

export function scenarioNumbers(c) {
  const growth = axenCost("growth", SCENARIO.deals);
  const elite = axenCost("elite", SCENARIO.deals);
  const theirs = Math.round(c.cost(SCENARIO.deals, SCENARIO.gci));
  return { growth, elite, theirs };
}

export function compareFaqs(c) {
  const { growth, theirs } = scenarioNumbers(c);
  const cheaper = growth < theirs;
  return [
    {
      q: `Is AXEN cheaper than ${c.name}?`,
      a: cheaper
        ? `For an agent closing ${SCENARIO.deals} deals a year at about ${usd.format(SCENARIO.gci)} commission each, AXEN's Growth Plan comes to about ${usd.format(growth)} in yearly fees versus about ${usd.format(theirs)} at ${c.name}, based on published and reported fees as of ${ASOF}. Your numbers depend on your volume — use the calculator on this page to run yours.`
        : `On fees alone, ${c.name} can come out lower: for ${SCENARIO.deals} deals a year at about ${usd.format(SCENARIO.gci)} commission each, it's about ${usd.format(theirs)} versus about ${usd.format(growth)} on AXEN's Growth Plan, based on published and reported fees as of ${ASOF}. AXEN's per-deal fee includes your own transaction coordinator and E&O, so compare what's included, not just the fee — and run your own numbers in the calculator.`,
    },
    {
      q: "What does AXEN's $295 per-deal fee include?",
      a: "It includes your own transaction coordinator and E&O insurance on every deal. On top of that, there's a $50 monthly fee, no annual fee, and a plan fee of $500 (Growth) or $1,000 (Elite) per deal until you reach your $6,000 or $12,000 cap. You keep 100% of your commission.",
    },
    {
      q: `What happens to my listings and pending deals if I leave ${c.name}?`,
      a: "In Texas, listing agreements are with your sponsoring broker, so how listings and pending deals transfer depends on your current brokerage's policies. Timing matters — Andres will walk through your active business and plan the move around it so nothing falls through the cracks.",
    },
    {
      q: "Is AXEN only in Texas?",
      a: "No. AXEN Realty is a multi-state brokerage.",
    },
  ];
}

function FactList({ title, facts, highlight = false }) {
  return (
    <div className={`rounded-[2rem] border p-6 sm:p-8 ${highlight ? "border-slate-900 bg-slate-950 text-white" : "border-slate-200 bg-white"}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <dl className="mt-5 flex flex-col gap-4">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt className={`text-xs font-semibold uppercase tracking-[0.15em] ${highlight ? "text-slate-400" : "text-slate-500"}`}>{k}</dt>
            <dd className={`mt-1 leading-7 ${highlight ? "text-slate-100" : "text-slate-700"}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ComparePage({ competitor: c }) {
  const faqs = compareFaqs(c);
  return (
    <CompareLayout
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Compare", href: "/compare" },
        { name: `AXEN vs ${c.name}`, href: `/compare/${c.slug}` },
      ]}
    >
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Brokerage comparison · {ASOF}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          AXEN Realty vs {c.name}: fees, split, and cap compared
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{c.pitch}</p>
        <div className="mt-8"><CtaButton cta={`compare_${c.slug}_hero`}>Run My Numbers With Andres</CtaButton></div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">Side by side</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          {c.name}: {c.model}. AXEN: 100% commission with flat fees and a cap.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <FactList title="AXEN Realty" facts={axenFacts} highlight />
          <FactList title={c.name} facts={c.facts} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">What would you pay in a year?</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Plug in your own volume. The math uses each brokerage's published or reported fees as of {ASOF}.
        </p>
        <div className="mt-8"><FeeCalculator competitor={c} /></div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">What's included at AXEN</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {included.map(([t, d]) => (
            <div key={t} className="rounded-[1.5rem] border border-slate-200 p-6">
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="mt-2 leading-7 text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">Common questions</h2>
        <dl className="mt-8 flex flex-col gap-6">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-[1.5rem] border border-slate-200 p-6">
              <dt className="text-lg font-semibold">{f.q}</dt>
              <dd className="mt-2 leading-7 text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight">Want a straight answer for your business?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Andres has made the move himself. Bring your real numbers and he'll walk through whether AXEN actually makes
            sense for you — no pressure either way.
          </p>
          <div className="mt-8"><CtaButton cta={`compare_${c.slug}_footer`} light /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 text-xs leading-6 text-slate-500 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-slate-700">Sources and notes</h2>
        <ul className="mt-2 list-disc pl-5">
          {c.sources.map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noreferrer nofollow" className="underline underline-offset-2">{label}</a>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Comparison based on publicly available information as of {ASOF}. Brokerages change their plans, and fees can
          vary by office, team, and state — confirm current terms directly before making a decision. AXEN Realty is not
          affiliated with {c.name}. {c.name} is a trademark of its respective owner.
        </p>
      </section>
    </CompareLayout>
  );
}

export { SCENARIO };
export const axenSummary = axen;
