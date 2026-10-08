import React from "react";
import { renderToString } from "react-dom/server";
import { routes, SITE_URL } from "./routes";

/**
 * Used only at build time (see prerender.js) to bake each page's HTML, so
 * search engines and link previews see the real content without running
 * JavaScript first. The browser then hydrates it (see main.jsx).
 */
export { routes, SITE_URL };

export function render(route) {
  const { Component } = route;
  return renderToString(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
}
