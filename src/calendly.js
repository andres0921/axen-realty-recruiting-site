/**
 * Calendly popup + booked-call conversion.
 *
 * Any click on a link to calendly.com opens Calendly as a popup on the page
 * instead of a new tab, so we can see when the call is actually booked. When
 * it is, we push { event: "booked_call" } to the dataLayer; Google Tag Manager
 * fires the Google Ads conversion from that event.
 *
 * The ad's UTM tags (and gclid) are saved on landing and passed into Calendly,
 * so each booking in Calendly shows which campaign and keyword it came from.
 *
 * If Calendly's script can't load, the visitor goes straight to Calendly.
 */

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const STORAGE_KEY = "axen_utm";
const UTM_KEYS = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
};

function push(data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/** Save UTM tags from the landing URL for this visit; return what we have. */
function captureUtm() {
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    /* storage can be unavailable */
  }
  const params = new URLSearchParams(window.location.search);
  const fresh = {};
  for (const [param, key] of Object.entries(UTM_KEYS)) {
    const v = params.get(param);
    if (v) fresh[key] = v;
  }
  // A gclid with no utm_content still tells us it was a Google ad click.
  const gclid = params.get("gclid");
  if (gclid && !fresh.utmContent) fresh.utmContent = `gclid:${gclid}`.slice(0, 255);

  if (Object.keys(fresh).length) {
    saved = fresh;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      /* ignore */
    }
  }
  return saved;
}

let loading = null;
function loadWidget() {
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = WIDGET_CSS;
    document.head.appendChild(css);

    const s = document.createElement("script");
    s.src = WIDGET_JS;
    s.async = true;
    s.onload = () => (window.Calendly ? resolve() : reject(new Error("Calendly missing")));
    s.onerror = reject;
    document.head.appendChild(s);
  }).catch((err) => {
    loading = null;
    throw err;
  });
  return loading;
}

function isCalendlyLink(a) {
  try {
    return new URL(a.href).hostname.endsWith("calendly.com");
  } catch {
    return false;
  }
}

export function initCalendly() {
  if (typeof window === "undefined" || window.__axenCalendly) return;
  window.__axenCalendly = true;

  const utm = captureUtm();

  // Load Calendly in the background once the page has settled, so the first
  // click opens instantly without slowing the initial page load.
  const preload = () => loadWidget().catch(() => {});
  if ("requestIdleCallback" in window) window.requestIdleCallback(preload, { timeout: 4000 });
  else setTimeout(preload, 2500);

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest?.("a[href]");
    if (!a || !isCalendlyLink(a)) return;

    e.preventDefault();
    const url = a.href;
    loadWidget()
      .then(() => {
        window.Calendly.initPopupWidget({ url, utm });
        push({ event: "calendly_opened" });
      })
      .catch(() => {
        // Script blocked or offline: go to Calendly directly.
        window.location.assign(url);
      });
  });

  // Calendly reports progress from inside the popup via postMessage.
  window.addEventListener("message", (e) => {
    if (e.origin !== "https://calendly.com") return;
    const name = e.data?.event;
    if (name === "calendly.date_and_time_selected") push({ event: "calendly_time_selected" });
    if (name === "calendly.event_scheduled") push({ event: "booked_call" });
  });
}
