import { resolve } from "path";
import { defineConfig } from "vite";

/**
 * Vite plugin that replaces `react` and `react/jsx-runtime` imports with
 * virtual modules that read from Metabase's `window.__METABASE_VIZ_API__`.
 *
 * This is necessary because the ES module output format cannot use
 * `output.globals`, and bare `import 'react'` would fail in the browser.
 */
function metabaseVizExternals() {
  const VIRTUAL_REACT = "\0virtual:react";
  const VIRTUAL_JSX_RUNTIME = "\0virtual:react/jsx-runtime";

  return {
    name: "metabase-viz-externals",
    enforce: "pre" as const,

    resolveId(source) {
      if (source === "react") {
        return VIRTUAL_REACT;
      }
      if (source === "react/jsx-runtime") {
        return VIRTUAL_JSX_RUNTIME;
      }
      return null;
    },

    load(id) {
      if (id === VIRTUAL_REACT) {
        return [
          "const React = window.__METABASE_VIZ_API__.React;",
          "export default React;",
          "export const { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, createElement, Fragment } = React;",
        ].join("\n");
      }
      if (id === VIRTUAL_JSX_RUNTIME) {
        return [
          "const jsxRuntime = window.__METABASE_VIZ_API__.jsxRuntime;",
          "export const { jsx, jsxs, Fragment } = jsxRuntime;",
        ].join("\n");
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [metabaseVizExternals()],
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
      fileName: () => "index.js",
    },
  },
});
