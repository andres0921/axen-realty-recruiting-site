import React, { useEffect, useState } from "react";
import { axenCost, researchedCost } from "./brokerages";
import { CtaButton } from "./Layout";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const money = (v) => (v == null ? "Not published" : usd.format(v));

function factsFor(d) {
  return [
    ["Plan", d.plan || "—"],
    [
      "Split / fee before cap",
      d.splitToBrokeragePercent != null && d.splitToBrokeragePercent > 0
        ? `${100 - d.splitToBrokeragePercent}/${d.splitToBrokeragePercent}`
        : d.flatFeePerDealBeforeCap != null
          ? `${usd.format(d.flatFeePerDealBeforeCap)} per deal`
          : "Not published",
    ],
    ["Annual cap", d.annualCap == null ? "None found" : usd.format(d.annualCap)],
    ["Monthly fee", money(d.monthlyFee)],
    ["Annual fee", money(d.annualFee)],
    ["Per-deal fees", money(d.perDealFee)],
    ["After cap, per deal", money(d.postCapPerDealFee)],
    ...(d.royaltyOrFranchise ? [["Royalty / franchise", d.royaltyOrFranchise]] : []),
  ];
}

/**
 * "Don't see your brokerage?" — researches any brokerage live via api/compare.
 * Renders nothing until the API reports it's enabled, so the page never shows
 * a broken tool (and the pre-rendered HTML stays identical for hydration).
 */
export function AiCompare() {
  const [enabled, setEnabled] = useState(false);
  const [brokerage, setBrokerage] = useState("");
  const [deals, setDeals] = useState("12");
  const [gci, setGci] = useState("9000");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/compare")
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((j) => alive && setEnabled(Boolean(j.enabled)))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!enabled) return null;

  async function run(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setData(null);
    try {
      const r = await fetch("/api/compare", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brokerage }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Something went wrong.");
      setData(j);
      setStatus("done");
      try {
        window.gtag?.("event", "ai_compare", { brokerage: j.name || brokerage, found: j.found });
      } catch {
        /* optional */
      }
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  const n = Math.max(0, Math.floor(Number(deals) || 0));
  const g = Math.max(0, Number(gci) || 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Don't see your brokerage?</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Compare any brokerage with AXEN</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Type in your current brokerage. We'll research its published fee structure and line it up next to AXEN. It
          takes about 30 seconds.
        </p>

        <form onSubmit={run} className="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-end">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-slate-700">Your brokerage</span>
            <input
              value={brokerage}
              onChange={(e) => setBrokerage(e.target.value)}
              maxLength={80}
              required
              placeholder="e.g. Compass, RE/MAX, Coldwell Banker"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base outline-none focus:border-slate-900"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-slate-700">Deals per year</span>
            <input type="number" min="0" value={deals} onChange={(e) => setDeals(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base outline-none focus:border-slate-900" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-slate-700">Avg. commission / deal</span>
            <input type="number" min="0" value={gci} onChange={(e) => setGci(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base outline-none focus:border-slate-900" />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "loading" ? "Researching…" : "Compare"}
          </button>
        </form>

        {status === "loading" && (
          <p className="mt-6 text-sm text-slate-600" aria-live="polite">
            Looking up current fees from public sources — hang tight…
          </p>
        )}
        {status === "error" && (
          <p className="mt-6 text-sm text-red-700" role="alert">{error}</p>
        )}

        {status === "done" && data && !data.found && (
          <p className="mt-6 text-slate-700" aria-live="polite">
            We couldn't find a published fee structure for that brokerage. That's common for independent offices —
            the fastest way to compare is a quick conversation with Andres.
          </p>
        )}

        {status === "done" && data?.found && (
          <div className="mt-8" aria-live="polite">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-semibold">{data.name}</h3>
                <dl className="mt-4 flex flex-col gap-3">
                  {factsFor(data).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{k}</dt>
                      <dd className="mt-0.5 text-slate-700">{v}</dd>
                    </div>
                  ))}
                </dl>
                {data.notes && <p className="mt-4 text-sm leading-6 text-slate-600">{data.notes}</p>}
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-semibold">Estimated yearly fees</h3>
                <p className="mt-1 text-sm text-slate-500">{n} deals at {usd.format(g)} each</p>
                <table className="mt-4 w-full text-left text-sm">
                  <tbody>
                    {[
                      ["AXEN — Growth Plan", axenCost("growth", n)],
                      ["AXEN — Elite Plan", axenCost("elite", n)],
                      [data.name, researchedCost(data, n, g)],
                    ].map(([name, fees]) => (
                      <tr key={name} className="border-t border-slate-100">
                        <th scope="row" className="py-2.5 font-medium">{name}</th>
                        <td className="py-2.5 text-right tabular-nums">{usd.format(fees)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Fees marked "Not published" are counted as $0, so {data.name}'s real cost may be higher. AXEN includes
                  the $50 monthly fee and $295 per-deal fee (your own TC and E&amp;O).
                </p>
                <div className="mt-5"><CtaButton cta="ai_compare_result">Talk Through It With Andres</CtaButton></div>
              </div>
            </div>

            {data.sources?.length > 0 && (
              <div className="mt-6 text-xs leading-6 text-slate-500">
                <p className="font-semibold text-slate-700">Sources</p>
                <ul className="list-disc pl-5">
                  {data.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noreferrer nofollow" className="underline underline-offset-2">{s.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-4 text-xs leading-5 text-slate-500">
              AI-generated estimate from publicly available sources, researched{" "}
              {new Date(data.researchedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}. It may be
              incomplete or out of date and isn't a statement by that brokerage — confirm current terms directly before
              making a decision. AXEN Realty is not affiliated with {data.name}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
