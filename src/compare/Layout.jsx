import React from "react";

export const CALENDLY_URL = "https://calendly.com/andres-axenrealty/30min";

function track(cta) {
  try {
    if (window?.gtag) window.gtag("event", "cta_click", { cta });
    if (window?.dataLayer) window.dataLayer.push({ event: "cta_click", payload: { cta } });
  } catch {
    /* analytics is optional */
  }
}

export function CtaButton({ cta, children = "Start the Conversation", light = false }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => track(cta)}
      className={
        light
          ? "inline-block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          : "inline-block rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5"
      }
    >
      {children}
    </a>
  );
}

/** Shared shell for the comparison pages: header, breadcrumb, footer. */
export function CompareLayout({ crumbs = [], children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center">
            <img src="/axen-logo.png" alt="AXEN Realty" className="h-8 w-auto" />
          </a>
          <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="/" className="hidden transition hover:text-slate-900 sm:inline">Why AXEN</a>
            <a href="/compare" className="transition hover:text-slate-900">Compare</a>
            <CtaButton cta="compare_header">Talk to Andres</CtaButton>
          </nav>
        </div>
      </header>

      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < crumbs.length - 1 ? (
                  <a href={c.href} className="transition hover:text-slate-900">{c.name}</a>
                ) : (
                  <span className="text-slate-700">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <main>{children}</main>

      <footer className="mt-20 border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/axen-logo.png" alt="AXEN Realty" className="h-6 w-auto opacity-90" />
            <span>A brokerage built for agents who want more.</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/" className="transition hover:text-slate-900">Why AXEN</a>
            <a href="/compare" className="transition hover:text-slate-900">Compare brokerages</a>
            <a href="https://www.andresaviles.com" className="transition hover:text-slate-900">Andres Aviles</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
