/**
 * Brokerage fee data for the comparison pages.
 *
 * KEEP THIS ACCURATE. Competitors change their plans; re-check each source
 * and update `asOf` before relying on these pages. Where a brokerage doesn't
 * publish a number, we say so instead of guessing.
 */

export const ASOF = "October 2026";

export const axen = {
  name: "AXEN Realty",
  split: "100% to you",
  monthly: 50,
  annualFee: 0,
  perDeal: 295, // includes your own transaction coordinator and E&O, every deal
  plans: {
    growth: { name: "Growth Plan", planFee: 500, cap: 6000, revShare: 125 },
    elite: { name: "Elite Plan", planFee: 1000, cap: 12000, revShare: 250 },
  },
  multiState: true,
};

/** Annual cost at AXEN for `deals` closings. */
export function axenCost(planKey, deals) {
  const plan = axen.plans[planKey];
  return (
    axen.monthly * 12 +
    deals * axen.perDeal +
    Math.min(deals * plan.planFee, plan.cap)
  );
}

/**
 * Each competitor: display facts, a cost function (deals, avg commission per
 * deal, extra inputs) → { total, note }, and sources.
 */
export const competitors = {
  exp: {
    slug: "exp-realty",
    name: "eXp Realty",
    short: "eXp",
    model: "80/20 split up to a cap, plus revenue share and stock",
    facts: [
      ["Commission split", "80/20 until you cap"],
      ["Annual cap", "$16,000 (resets on your anniversary date)"],
      ["Monthly fee", "$85 Cloud Brokerage fee"],
      ["One-time startup", "$149"],
      ["Per-deal fees", "$25 broker review + $60 risk management"],
      ["After cap", "Reported: $250 per deal until $5,000, then $75 per deal"],
      ["Revenue share", "Paid on agents you sponsor, multiple tiers"],
      ["Stock", "Awards for milestones like capping; typically vests over 3 years"],
    ],
    cost(deals, gci) {
      let paidToCap = 0;
      let postCapFees = 0;
      let total = 85 * 12 + deals * (25 + 60);
      for (let i = 0; i < deals; i++) {
        if (paidToCap < 16000) {
          const s = Math.min(gci * 0.2, 16000 - paidToCap);
          paidToCap += s;
          total += s;
        } else {
          const fee = postCapFees < 5000 ? 250 : 75;
          postCapFees += fee;
          total += fee;
        }
      }
      return total;
    },
    excludes: "Excludes the one-time $149 startup fee.",
    sources: [
      ["eXp Realty — Income (fees, split, cap)", "https://www.exprealty.com/income"],
      ["Post-cap fee as reported by EvenInsight", "https://eveninsight.com/exp-realty-review/"],
    ],
    pitch:
      "eXp and AXEN both let you build income beyond your own deals. The difference is how much you hand over before you get there: eXp takes 20% of every commission until you've paid $16,000, while AXEN starts you at 100% with flat per-deal fees and a cap as low as $6,000.",
  },
  real: {
    slug: "real-brokerage",
    name: "Real Brokerage",
    short: "Real",
    model: "85/15 split up to a cap, plus revenue share and stock",
    facts: [
      ["Commission split", "85/15 until you cap"],
      ["Annual cap", "$12,000 individual (lower for some teams)"],
      ["Annual fee", "Reported between $750 and $900 (sources differ)"],
      ["Monthly fee", "None reported"],
      ["Per-deal fee", "Reported: $50 per deal, all year"],
      ["After cap", "Reported: $285 per deal"],
      ["Revenue share", "Paid on agents you attract, multiple tiers"],
    ],
    cost(deals, gci) {
      let paidToCap = 0;
      let total = 900 + deals * 50;
      for (let i = 0; i < deals; i++) {
        if (paidToCap < 12000) {
          const s = Math.min(gci * 0.15, 12000 - paidToCap);
          paidToCap += s;
          total += s;
        } else {
          total += 285;
        }
      }
      return total;
    },
    excludes:
      "Uses the higher reported $900 annual fee; Real doesn't publish a full fee schedule, so confirm current numbers with them.",
    sources: [
      ["Houston Properties Team — Real cost to join (Sept 2026)", "https://join.houstonproperties.com/real/cost-to-join/"],
      ["Pass and Earn — Real commission split", "https://passandearn.com/commission-splits/real-brokerage/"],
    ],
    pitch:
      "Real and AXEN are both modern, cloud-based models with revenue share. The biggest difference is the starting point: at Real you keep 85% until you've paid $12,000. At AXEN you keep 100% from day one, your transaction coordinator and E&O are built into the per-deal fee, and the Growth Plan caps at $6,000. One honest note: at higher volume, AXEN's Elite Plan can cost more than Real in fees — the calculator below shows exactly where.",
  },
  kw: {
    slug: "keller-williams",
    name: "Keller Williams",
    short: "KW",
    model: "Traditional franchise: split with your market center plus a royalty",
    facts: [
      ["Commission split", "Typically 64/30/6 (you / market center / KW royalty)"],
      ["Royalty", "6% of gross, capped at $3,000 per year"],
      ["Market center cap", "Set by each office — not published"],
      ["Office fees", "Desk, tech, and transaction fees vary by office"],
      ["E&O", "Required; cost varies by office and state"],
      ["Profit share", "Based on agents you help bring in, 7 levels"],
    ],
    cost(deals, gci, { officeCap = 18000, monthlyFees = 0 } = {}) {
      let paidCap = 0;
      let paidRoyalty = 0;
      let total = monthlyFees * 12;
      for (let i = 0; i < deals; i++) {
        const s = Math.min(gci * 0.3, Math.max(0, officeCap - paidCap));
        const r = Math.min(gci * 0.06, Math.max(0, 3000 - paidRoyalty));
        paidCap += s;
        paidRoyalty += r;
        total += s + r;
      }
      return total;
    },
    excludes:
      "Your office's cap and fees vary — enter yours above. Excludes E&O and any per-deal office fees.",
    sources: [
      ["Clever — Keller Williams commission model (Sept 2026)", "https://listwithclever.com/real-estate-blog/keller-williams-commission-model/"],
    ],
    pitch:
      "Keller Williams is known for training and local offices, but the cost structure is layered: a split with your market center, a separate royalty to KW, and office fees that vary from one market center to the next. AXEN keeps it simple: 100% commission, one per-deal fee that includes your transaction coordinator and E&O, and a published cap.",
  },
  fathom: {
    slug: "fathom-realty",
    name: "Fathom Realty",
    short: "Fathom",
    model: "Flat per-deal fee up to a cap (flat-fee plan)",
    facts: [
      ["Flat-fee plan", "$465 per deal until you cap"],
      ["Annual cap", "$9,000"],
      ["After cap", "$165 per deal"],
      ["Annual fee", "$700"],
      ["High-value fee", "Extra fees on homes priced $600,000 and up"],
      ["Other plans", "A 12% split plan (cap $12,000) and a 20% split option"],
    ],
    cost(deals) {
      let paidToCap = 0;
      let total = 700;
      for (let i = 0; i < deals; i++) {
        if (paidToCap < 9000) {
          const f = Math.min(465, 9000 - paidToCap);
          paidToCap += f;
          total += f;
        } else {
          total += 165;
        }
      }
      return total;
    },
    excludes: "Fathom's flat-fee plan. Excludes high-value property fees.",
    sources: [
      ["Inman — Fathom plans and fees (April 2025)", "https://www.inman.com/2025/04/03/fathom-realty-now-offering-agents-20-commission-split-option/"],
      ["Fathom Q1 2024 release (annual fee, high-value fee) — SEC", "https://www.sec.gov/Archives/edgar/data/1753162/000110465924059378/tm2413420d2_ex99-1.htm"],
    ],
    pitch:
      "Fathom and AXEN are the closest on paper: both are flat-fee models where you keep your commission. We'll be straight with you — on fees alone, Fathom's flat-fee plan usually comes out lower. The difference is what you get for the fee: at AXEN, every deal includes your own transaction coordinator and E&O, plus Lofty CRM, live support, and no annual fee. Fathom charges a $700 annual fee and extra fees on homes priced $600,000 and up.",
  },
};

export const competitorList = [competitors.exp, competitors.real, competitors.kw, competitors.fathom];

/**
 * Yearly fee estimate from an AI-researched fee structure (see api/compare.js).
 * Unknown (null) values count as $0, so the result can only understate their
 * cost — the UI says so.
 */
export function researchedCost(d, deals, gci) {
  const pct = (d.splitToBrokeragePercent ?? 0) / 100;
  const flat = d.flatFeePerDealBeforeCap ?? 0;
  const cap = d.annualCap ?? Infinity;
  let paidToCap = 0;
  let total = (d.monthlyFee ?? 0) * 12 + (d.annualFee ?? 0) + deals * (d.perDealFee ?? 0);
  for (let i = 0; i < deals; i++) {
    if (paidToCap < cap) {
      const s = Math.min(gci * pct + flat, cap - paidToCap);
      paidToCap += s;
      total += s;
    } else {
      total += d.postCapPerDealFee ?? 0;
    }
  }
  return Math.round(total);
}
