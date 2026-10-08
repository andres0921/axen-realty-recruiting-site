import React, { useState } from "react";
import { axenCost } from "./brokerages";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function NumberField({ label, value, onChange, prefix, hint }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <span className="flex items-center rounded-xl border border-slate-300 bg-white px-3 focus-within:border-slate-900">
        {prefix && <span className="text-slate-400">{prefix}</span>}
        <input
          type="number"
          inputMode="numeric"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-2.5 pl-1 text-base text-slate-900 outline-none"
        />
      </span>
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

/**
 * Side-by-side yearly fee estimate: AXEN's two plans vs one competitor.
 * Pure arithmetic from the published/reported numbers in brokerages.js.
 */
export function FeeCalculator({ competitor }) {
  const [deals, setDeals] = useState("12");
  const [gci, setGci] = useState("9000");
  const [officeCap, setOfficeCap] = useState("18000");
  const [monthlyFees, setMonthlyFees] = useState("0");
  const isKw = competitor.short === "KW";

  const n = Math.max(0, Math.floor(Number(deals) || 0));
  const g = Math.max(0, Number(gci) || 0);
  const gross = n * g;

  const rows = [
    { name: "AXEN — Growth Plan", fees: axenCost("growth", n), axen: true },
    { name: "AXEN — Elite Plan", fees: axenCost("elite", n), axen: true },
    {
      name: competitor.name,
      fees: Math.round(
        competitor.cost(n, g, {
          officeCap: Number(officeCap) || 0,
          monthlyFees: Number(monthlyFees) || 0,
        })
      ),
    },
  ];
  const lowest = Math.min(...rows.map((r) => r.fees));

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Deals per year" value={deals} onChange={setDeals} />
        <NumberField
          label="Average commission per deal"
          prefix="$"
          value={gci}
          onChange={setGci}
          hint="Your side, before any brokerage split or fees"
        />
        {isKw && (
          <>
            <NumberField
              label="Your KW office's cap"
              prefix="$"
              value={officeCap}
              onChange={setOfficeCap}
              hint="Varies by market center — ask yours"
            />
            <NumberField
              label="Monthly office fees"
              prefix="$"
              value={monthlyFees}
              onChange={setMonthlyFees}
              hint="Tech, desk, or pass-through fees, if any"
            />
          </>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Brokerage</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Yearly fees</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">You keep</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <th scope="row" className={`px-4 py-3 font-medium ${r.axen ? "text-slate-900" : "text-slate-700"}`}>
                  {r.name}
                  {r.fees === lowest && n > 0 && (
                    <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      Lowest
                    </span>
                  )}
                </th>
                <td className="px-4 py-3 text-right tabular-nums">{usd.format(r.fees)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{usd.format(Math.max(0, gross - r.fees))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Estimates for comparison only, assuming every deal earns the same commission. AXEN totals include the
        $50 monthly fee and the $295 per-deal fee, which covers your transaction coordinator and E&amp;O.{" "}
        {competitor.excludes} Revenue share, stock, and team arrangements are not included.
      </p>
    </div>
  );
}
