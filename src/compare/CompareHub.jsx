import React from "react";
import { CompareLayout, CtaButton } from "./Layout";
import { ASOF, axenCost, competitorList } from "./brokerages";
import { SCENARIO, axenFacts } from "./ComparePage";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function hubRows() {
  return [
    { name: "AXEN — Growth Plan", fees: axenCost("growth", SCENARIO.deals), axen: true },
    { name: "AXEN — Elite Plan", fees: axenCost("elite", SCENARIO.deals), axen: true },
    ...competitorList.map((c) => ({
      name: c.name,
      fees: Math.round(c.cost(SCENARIO.deals, SCENARIO.gci)),
      href: `/compare/${c.slug}`,
    })),
  ].sort((a, b) => a.fees - b.fees);
}

export function CompareHub() {
  const rows = hubRows();
  return (
    <CompareLayout crumbs={[{ name: "Home", href: "/" }, { name: "Compare", href: "/compare" }]}>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Brokerage comparison · {ASOF}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Compare real estate brokerages: what you actually pay
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Splits, caps, monthly fees, per-deal fees — every brokerage stacks them differently, which makes it hard to
          compare. Here's an honest, side-by-side look at AXEN Realty and the brokerages agents ask about most, using
          real numbers. Where another brokerage costs less on fees, we'll show you that too.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          A year of fees: {SCENARIO.deals} deals at {usd.format(SCENARIO.gci)} commission each
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Brokerage</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Yearly fees</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">You keep</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className={`border-t border-slate-100 ${r.axen ? "bg-slate-50" : ""}`}>
                  <th scope="row" className="px-4 py-3 font-medium">
                    {r.href ? (
                      <a href={r.href} className="underline-offset-4 hover:underline">{r.name}</a>
                    ) : (
                      r.name
                    )}
                  </th>
                  <td className="px-4 py-3 text-right tabular-nums">{usd.format(r.fees)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {usd.format(SCENARIO.deals * SCENARIO.gci - r.fees)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          Keller Williams assumes an $18,000 market center cap and no extra office fees; your office may differ. Fathom
          uses its flat-fee plan. Revenue share, stock, and team arrangements aren't included. Each comparison page has a
          calculator so you can run your own volume.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">Detailed comparisons</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {competitorList.map((c) => (
            <a
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group rounded-[1.5rem] border border-slate-200 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold">AXEN vs {c.name}</h3>
              <p className="mt-2 leading-7 text-slate-600">{c.model}.</p>
              <span className="mt-4 inline-block text-sm font-semibold text-slate-900">
                See the full comparison →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">How AXEN's fees work</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {axenFacts.map(([k, v]) => (
            <div key={k} className="rounded-[1.5rem] border border-slate-200 p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{k}</dt>
              <dd className="mt-1 leading-7 text-slate-700">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight">Not sure which model fits you?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Bring your real numbers. Andres will give you the honest version — even if the answer is to stay where you are.
          </p>
          <div className="mt-8"><CtaButton cta="compare_hub_footer" light /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 text-xs leading-6 text-slate-500 sm:px-6 lg:px-8">
        <p>
          Based on publicly available information as of {ASOF}; sources are listed on each comparison page. Brokerages
          change their plans, and fees can vary by office, team, and state — confirm current terms directly. AXEN Realty
          is not affiliated with the other brokerages named, whose names are trademarks of their respective owners.
        </p>
      </section>
    </CompareLayout>
  );
}
