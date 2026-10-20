import { axen } from "./compare/brokerages";

const usd = (n) => `$${n.toLocaleString("en-US")}`;
const { growth, elite } = axen.plans;

/**
 * Homepage FAQ. Rendered on the page (App.jsx) and as FAQPage schema
 * (routes.jsx), so the two always match. Numbers come from brokerages.js.
 */
export const homeFaqs = [
  {
    q: "How does AXEN Realty's commission work?",
    a: `You keep 100% of your commission from your first deal. Fees are flat: ${usd(axen.monthly)} a month with no annual fee, ${usd(axen.perDeal)} per deal (which includes your own transaction coordinator and E&O), and a plan fee of ${usd(growth.planFee)} (Growth) or ${usd(elite.planFee)} (Elite) per deal until you reach your ${usd(growth.cap)} or ${usd(elite.cap)} annual cap.`,
  },
  {
    q: "What's the difference between the Growth and Elite plans?",
    a: `Growth has the lower cap (${usd(growth.cap)}) and pays ${usd(growth.revShare)} per transaction for every agent in your downline. Elite has a ${usd(elite.cap)} cap, pays ${usd(elite.revShare)} per downline transaction, and includes invites to exclusive events. Most agents pick based on whether they plan to build a team.`,
  },
  {
    q: "What's included with AXEN?",
    a: "Your own transaction coordinator, E&O insurance, Lofty CRM, and live support, plus marketing tools and lead generation opportunities.",
  },
  {
    q: "Is AXEN only in Texas?",
    a: "No. AXEN Realty is a multi-state brokerage.",
  },
  {
    q: "What happens to my listings and pending deals if I switch brokerages?",
    a: "Listing agreements are with your sponsoring broker, so how listings and pending deals transfer depends on your current brokerage's policies. Andres will walk through your active business with you and time the move so nothing falls through the cracks.",
  },
  {
    q: "Is the conversation confidential?",
    a: "Yes. Nobody at your current brokerage hears about it from us, and there's no pressure to move. Sometimes the honest answer is to stay where you are.",
  },
];
