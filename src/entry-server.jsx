import React from "react";
import { renderToString } from "react-dom/server";
import AxenRealtyRecruitingPage from "./App";

/**
 * Used only at build time (see prerender.js) to bake the page's HTML into
 * dist/index.html, so search engines and link previews see the real content
 * without having to run JavaScript first. The browser then hydrates it.
 */
export function render() {
  return renderToString(
    <React.StrictMode>
      <AxenRealtyRecruitingPage />
    </React.StrictMode>
  );
}
