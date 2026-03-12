import React, { useState, useEffect, useRef } from "react";

export default function AxenRealtyRecruitingPage() {
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const trackEvent = (eventName, payload = {}) => {
    const detail = { event: eventName, payload, timestamp: Date.now() };

    if (window?.gtag) window.gtag("event", eventName, payload);
    if (window?.dataLayer) window.dataLayer.push(detail);

    window.dispatchEvent(new CustomEvent("axen-analytics", { detail }));
    console.log("[AXEN analytics]", detail);
  };
  const calendlyUrl = "https://calendly.com/aaviles-nexalending/is-axen-right-for-you";

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Why AXEN", id: "why-axen" },
    { label: "Commission", id: "commission" },
    { label: "About", id: "about" },
  ];

  const highlights = [
    {
      title: "Better Commission Opportunities",
      text: "Choose the structure that fits how you want to build your business.",
      icon: "01",
    },
    {
      title: "Real Support",
      text: "Leadership, systems, and resources designed to help agents succeed.",
      icon: "02",
    },
    {
      title: "More Opportunities to Close",
      text: "Lead generation and tools that help agents grow faster.",
      icon: "03",
    },
  ];

  const tools = [
    {
      title: "Transaction Coordination",
      text: "Professional support to keep deals moving smoothly from contract to close.",
    },
    {
      title: "Lead Generation",
      text: "Opportunities and systems that help agents consistently find new clients.",
    },
    {
      title: "Marketing Tools",
      text: "Resources to promote listings, grow your personal brand, and stay visible.",
    },
    {
      title: "Powerful CRM",
      text: "Manage leads, track follow-up, and stay organized with the right technology.",
    },
  ];

  const testimonials = [
    { quote: "AXEN gave me the support I needed to grow my business while still maintaining independence.", name: "Agent — Texas" },
    { quote: "The structure and systems here make it easier to focus on clients and closing deals.", name: "Agent — California" },
    { quote: "It feels like a brokerage that actually understands how modern agents want to work.", name: "Agent — Arizona" },
    { quote: "The support and technology made a huge difference in how I run my business.", name: "Agent — Florida" },
    { quote: "I finally feel like I’m part of a brokerage that helps me grow instead of slowing me down.", name: "Agent — Texas" },
    { quote: "The leadership and systems make it easier to scale a real estate business.", name: "Agent — California" },
    { quote: "AXEN feels modern compared to the old-school brokerages I’ve been with.", name: "Agent — Arizona" },
    { quote: "Having the right tools and support behind me has made a massive difference.", name: "Agent — Florida" },
    { quote: "The commission structure is clear and actually rewards production.", name: "Agent — Texas" },
    { quote: "If you're serious about growing your business, AXEN is worth looking at.", name: "Agent — California" },
  ];

  const fitItems = [
    "Ready to grow your real estate business",
    "Looking for better systems and support",
    "Tired of outdated brokerage models",
    "Serious about building long-term success",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes testimonial-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <Navbar
        navItems={navItems}
        onNavClick={scrollToId}
        calendlyUrl={calendlyUrl}
        trackEvent={trackEvent}
      />

      <main>
        <HeroSection calendlyUrl={calendlyUrl} onLearnMore={() => scrollToId("why-axen")} trackEvent={trackEvent} />
        <CredibilitySection trackEvent={trackEvent} />
        <WhyAxenSection highlights={highlights} trackEvent={trackEvent} />
        <CommissionSection calendlyUrl={calendlyUrl} trackEvent={trackEvent} />
        <CalculatorSection calendlyUrl={calendlyUrl} trackEvent={trackEvent} />
        <ToolsSection tools={tools} trackEvent={trackEvent} />
        <TestimonialsSection testimonials={testimonials} trackEvent={trackEvent} />
        <AboutSection trackEvent={trackEvent} />
        <FitSection items={fitItems} trackEvent={trackEvent} />
        <FinalCtaSection calendlyUrl={calendlyUrl} trackEvent={trackEvent} />
      </main>

      <Footer calendlyUrl={calendlyUrl} onNavClick={scrollToId} trackEvent={trackEvent} />
      <FloatingCta calendlyUrl={calendlyUrl} trackEvent={trackEvent} isVisible={showFloatingCta} />
    </div>
  );
}

function Navbar({ navItems, onNavClick, calendlyUrl, trackEvent }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center"
        >
          <img
            src="/axen-logo.png"
            alt="AXEN Realty"
            className="h-14 w-auto transition-opacity duration-300 hover:opacity-80"
          />
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                trackEvent("nav_click", { target: item.id, location: "header" });
                onNavClick(item.id);
              }}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <a
          href={calendlyUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("cta_click", { cta: "header_start_conversation", location: "header" })}
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          Start the Conversation
        </a>
      </div>
    </header>
  );
}

function HeroSection({ calendlyUrl, onLearnMore, trackEvent }) {
  useSectionView("hero", trackEvent);
  const trustPoints = [
    "Two commission plan options",
    "Built with NEXA-inspired support",
    "Unlimited Growth",
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
            Level Up with AXEN
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
            For real estate agents exploring better opportunities
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            A Brokerage Built for Agents Who Want More
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Competitive commission plans, real support, powerful systems, and growth opportunities for agents ready to level up.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("cta_click", { cta: "hero_start_conversation", location: "hero" })}
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              Start the Conversation
            </a>
            <button
              onClick={() => {
              trackEvent("cta_click", { cta: "hero_learn_more", location: "hero" });
              onLearnMore();
            }}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See What Makes AXEN Different
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs text-white">
                    ✓
                  </span>
                  <span className="leading-6">{point}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-900">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-100 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Support</div>
                  <div className="mt-2 text-2xl font-semibold">Built to help agents grow</div>
                </div>
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Commission</div>
                  <div className="mt-2 text-2xl font-semibold">Two plans. Clear options.</div>
                </div>
                <div className="rounded-2xl bg-slate-900 p-5 text-white sm:col-span-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Opportunity</div>
                  <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-4xl font-semibold">Level Up</div>
                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
                        Modern systems, real support, and a brokerage model designed for ambitious agents.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-200">
                      Powered by structure inspired by NEXA Lending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilitySection({ trackEvent }) {
  useSectionView("credibility", trackEvent);
  return (
    <section id="credibility" className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Built for growth</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          A Modern Brokerage Built for Growth
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          AXEN Realty was built with the same support philosophy behind <span className="font-semibold text-slate-900">NEXA Lending</span>, the largest mortgage broker in the world.
          That foundation gives AXEN the structure, technology, and leadership needed to help agents build a real business.
        </p>
      </div>
    </section>
  );
}

function WhyAxenSection({ highlights, trackEvent }) {
  useSectionView("why-axen", trackEvent);
  return (
    <section id="why-axen" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Why agents join</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Why Agents Are Leveling Up With AXEN
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
              {item.icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CommissionSection({ calendlyUrl, trackEvent }) {
  useSectionView("commission", trackEvent);
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setActivePlan((prev) => {
        if (prev) trackEvent("commission_card_closed", { reason: "scroll", plan: prev });
        return null;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackEvent]);

  const plans = [
    {
      name: "Growth Plan",
      fee: "$500 / transaction",
      cap: "Caps at $6,000",
      description:
        "Best for agents who want a lower annual cap and strong earning potential as they grow their network.",
      perks: [
        "Lower transaction fee",
        "Annual cap at $6K",
        "$125 earned per transaction for every agent in your downline",
      ],
      featured: false,
    },
    {
      name: "Elite Plan",
      fee: "$1,000 / transaction",
      cap: "Caps at $12,000",
      description:
        "Best for agents focused on maximizing long-term upside, access, and opportunity.",
      perks: [
        "Higher transaction fee",
        "Annual cap at $12K",
        "$250 earned per transaction for every agent in your downline",
        "Special invites to exclusive events",
        "Additional growth opportunities and perks",
      ],
      featured: true,
    },
  ];

  return (
    <section id="commission" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Commission plans</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Two Commission Plans. One Goal — Your Growth.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Choose the structure that fits how you want to build your business.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <HoverPlanCard
              key={plan.name}
              plan={plan}
              isActive={activePlan === plan.name}
              onToggle={() =>
                setActivePlan((prev) => {
                  const next = prev === plan.name ? null : plan.name;
                  trackEvent(next ? "commission_card_opened" : "commission_card_closed", {
                    plan: plan.name,
                    method: "tap",
                  });
                  return next;
                })
              }
              trackEvent={trackEvent}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("cta_click", { cta: "commission_start_conversation", location: "commission" })}
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Start the Conversation
          </a>
          <p className="mt-3 text-sm text-slate-500">Not sure which plan fits you best? Let’s talk it through.</p>
        </div>
      </div>
    </section>
  );
}

function HoverPlanCard({ plan, isActive, onToggle, trackEvent }) {
  const [isHovered, setIsHovered] = useState(false);

  const isRevealed = isActive || isHovered;

  return (
    <div
      onMouseEnter={() => {
      setIsHovered(true);
      trackEvent("commission_card_hovered", { plan: plan.name, method: "hover" });
    }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      className={`group relative w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto aspect-square cursor-pointer overflow-hidden rounded-2xl border p-6 text-center transition-all duration-500 ${
        plan.featured
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-slate-100 text-slate-900"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isRevealed ? "opacity-100" : "opacity-0"
        } ${
          plan.featured
            ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.03)_38%,rgba(255,255,255,0)_62%)]"
            : "bg-[linear-gradient(135deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.02)_38%,rgba(15,23,42,0)_62%)]"
        }`}
      />

      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-full -translate-x-full transition-transform duration-700 ease-out ${
          isRevealed ? "translate-x-full" : "translate-x-[-120%]"
        } ${
          plan.featured
            ? "bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.12)_55%,transparent_100%)]"
            : "bg-[linear-gradient(90deg,transparent_0%,rgba(15,23,42,0.05)_45%,rgba(15,23,42,0.11)_50%,rgba(15,23,42,0.05)_55%,transparent_100%)]"
        }`}
      />

      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isRevealed ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide">{plan.name}</h3>
          {plan.featured && (
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">Premium option</p>
          )}
        </div>
      </div>

      <div
        className={`absolute inset-0 flex flex-col justify-center p-6 text-left transition-all duration-500 ${
          isRevealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="text-xs uppercase tracking-[0.3em] opacity-70">Commission</div>
        <div className="mt-3 text-xl md:text-2xl font-semibold">{plan.fee}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.2em] opacity-70">{plan.cap}</div>

        <ul className="mt-4 space-y-2 text-sm">
          {plan.perks.slice(0, 3).map((perk, index) => (
            <li
              key={perk}
              className={`flex gap-2 transition-all duration-500 ${
                isRevealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: `${120 + index * 70}ms` }}
            >
              <span
                className={`mt-2 h-1.5 w-1.5 rounded-full ${
                  plan.featured ? "bg-white" : "bg-slate-900"
                }`}
              />
              <span className={plan.featured ? "text-slate-200" : "text-slate-700"}>{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CalculatorSection({ calendlyUrl, trackEvent }) {
  useSectionView("calculator", trackEvent);
  const calculatorTrackedRef = useRef(false);
  const [transactions, setTransactions] = useState(12);
  const [downlineAgents, setDownlineAgents] = useState(3);
  const [avgTransactions, setAvgTransactions] = useState(8);

  const growthFees = Math.min((Number(transactions) || 0) * 500, 6000);
  const eliteFees = Math.min((Number(transactions) || 0) * 1000, 12000);
  const growthDownline = (Number(downlineAgents) || 0) * (Number(avgTransactions) || 0) * 125;
  const eliteDownline = (Number(downlineAgents) || 0) * (Number(avgTransactions) || 0) * 250;

  useEffect(() => {
    if (!calculatorTrackedRef.current) {
      calculatorTrackedRef.current = true;
      return;
    }

    trackEvent("calculator_used", {
      transactions: Number(transactions) || 0,
      downlineAgents: Number(downlineAgents) || 0,
      avgTransactions: Number(avgTransactions) || 0,
    });
  }, [transactions, downlineAgents, avgTransactions, trackEvent]);

  const currency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section id="calculator" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-slate-200 p-8 lg:border-b-0 lg:border-r lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Level Up Calculator</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Run the Numbers
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                See how the AXEN commission plans could work based on your production and growth goals.
              </p>
              <p className="mt-5 text-sm font-medium text-slate-500">
                Many agents are surprised how quickly the caps are reached.
              </p>

              <div className="mt-10 space-y-6">
                <NumberInput
                  label="How many transactions do you close per year?"
                  value={transactions}
                  onChange={setTransactions}
                />
                <NumberInput
                  label="How many agents are in your downline?"
                  value={downlineAgents}
                  onChange={setDownlineAgents}
                />
                <NumberInput
                  label="Average transactions per downline agent per year"
                  value={avgTransactions}
                  onChange={setAvgTransactions}
                />
              </div>

              <p className="mt-8 text-sm text-slate-500">
                Your comparison updates instantly as you type.
              </p>
            </div>

            <div className="bg-slate-50 p-8 lg:p-12">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Live Results</p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-900">Your plan comparison</h3>
                </div>
              </div>

              <div className="mt-8 grid gap-5">
                <ResultCard
                  title="Growth Plan"
                  fee={currency(growthFees)}
                  downline={currency(growthDownline)}
                  cap="$6,000"
                />
                <ResultCard
                  title="Elite Plan"
                  fee={currency(eliteFees)}
                  downline={currency(eliteDownline)}
                  cap="$12,000"
                  featured
                  note="Includes exclusive event access and additional perks."
                />
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900">Want help choosing the right plan?</h4>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Let’s walk through what makes the most sense for your business.
                </p>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("cta_click", { cta: "calculator_start_conversation", location: "calculator" })}
                  className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Start the Conversation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-semibold text-slate-800">{label}</span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-lg text-slate-900 outline-none transition focus:border-slate-900"
      />
    </label>
  );
}

function ResultCard({ title, fee, downline, cap, featured = false, note }) {
  return (
    <div
      className={`rounded-[1.5rem] border p-6 ${
        featured ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-xl font-semibold">{title}</h4>
        {featured && (
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Premium
          </span>
        )}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p className={`text-sm ${featured ? "text-slate-300" : "text-slate-500"}`}>Estimated transaction fees</p>
          <div className="mt-2 text-2xl font-semibold">{fee}</div>
        </div>
        <div>
          <p className={`text-sm ${featured ? "text-slate-300" : "text-slate-500"}`}>Estimated downline earnings</p>
          <div className="mt-2 text-2xl font-semibold">{downline}</div>
        </div>
      </div>
      <p className={`mt-5 text-sm ${featured ? "text-slate-300" : "text-slate-600"}`}>Cap: {cap}</p>
      {note && <p className="mt-3 text-sm text-slate-300">{note}</p>}
    </div>
  );
}

function ToolsSection({ tools, trackEvent }) {
  useSectionView("tools", trackEvent);
  return (
    <section id="tools" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tools and support</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            The Systems That Help Agents Win
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <div key={tool.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{tool.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{tool.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials, trackEvent }) {
  useSectionView("testimonials", trackEvent);
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Testimonials</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What Agents Are Saying
          </h2>
        </div>

        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-[testimonial-marquee_70s_linear_infinite] gap-6 hover:[animation-play-state:paused]">
            {marqueeItems.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex h-[240px] w-[340px] shrink-0 flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ trackEvent }) {
  useSectionView("about", trackEvent);
  return (
    <section id="about" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">About AXEN</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for Agents Who Want to Grow
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          AXEN Realty was created to give real estate agents the structure, support, and tools needed to build a long-term business.
          Built with the same support philosophy behind <span className="font-semibold text-white">NEXA Lending</span>, the largest mortgage broker in the world, AXEN focuses on empowering agents with modern systems and real opportunities to grow.
        </p>
      </div>
    </section>
  );
}

function FitSection({ items, trackEvent }) {
  useSectionView("fit", trackEvent);
  return (
    <section id="fit" className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Who AXEN is for</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            AXEN May Be a Great Fit If You Are:
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-sm text-white">✓</span>
                <p className="text-base leading-7 text-slate-700">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({ calendlyUrl, trackEvent }) {
  useSectionView("final_cta", trackEvent);
  return (
    <section id="final_cta" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-900 px-8 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Start the conversation</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to Level Up Your Real Estate Business?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            If you're exploring new opportunities or simply want to learn more about AXEN Realty, let’s have a quick conversation.
            Your conversation is completely confidential.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("cta_click", { cta: "final_start_conversation", location: "final_cta" })}
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            Start the Conversation
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ calendlyUrl, onNavClick, trackEvent }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* subtle divider line */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {/* clickable logo back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          <img
            src="axen-realty-horizontal.png"
            alt="AXEN Realty"
            className="h-10 sm:h-12 md:h-14 w-auto opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
          <p className="text-sm text-slate-500">A brokerage built for agents who want more.</p>
        </button>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <button
            onClick={() => {
              trackEvent("nav_click", { target: "why-axen", location: "footer" });
              onNavClick("why-axen");
            }}
            className="transition hover:text-slate-900"
          >
            Why AXEN
          </button>

          <button
            onClick={() => {
              trackEvent("nav_click", { target: "commission", location: "footer" });
              onNavClick("commission");
            }}
            className="transition hover:text-slate-900"
          >
            Commission
          </button>

          <button
            onClick={() => {
              trackEvent("nav_click", { target: "about", location: "footer" });
              onNavClick("about");
            }}
            className="transition hover:text-slate-900"
          >
            About
          </button>

          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("cta_click", { cta: "footer_start_conversation", location: "footer" })}
            className="font-semibold text-slate-900"
          >
            Start the Conversation
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingCta({ calendlyUrl, trackEvent, isVisible }) {
  return (
    <a
      href={calendlyUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("cta_click", { cta: "floating_start_conversation", location: "floating" })}
      className={`fixed bottom-5 right-5 z-50 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-0.5 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      Level Up With AXEN
    </a>
  );
}

function useSectionView(sectionName, trackEvent) {
  useEffect(() => {
    const element = document.getElementById(sectionName);
    if (!element || !trackEvent) return undefined;

    let hasTracked = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked) {
          hasTracked = true;
          trackEvent("section_view", { section: sectionName });
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionName, trackEvent]);
}

