import { fileURLToPath } from "node:url";
import fs from "node:fs";
import esbuild from "esbuild";

const SRC_DIR = new URL("../../src/", import.meta.url);
const STUBS_DIR = new URL("./stubs/", import.meta.url);

const STUB_COMPONENTS = new Set([
  "Navbar",
  "Footer",
  "BackButton",
  "Roundel",
  "BacaanMalamJumat",
  "BacaanTahlil",
]);

function resolveAliased(specifier) {
  if (!specifier.startsWith("@/")) return null;
  const rest = specifier.slice(2);
  const componentMatch = rest.match(/^components\/([A-Za-z0-9_]+)$/);
  if (componentMatch && STUB_COMPONENTS.has(componentMatch[1])) {
    return new URL("PassThrough.tsx", STUBS_DIR).href;
  }
  return new URL(rest, SRC_DIR).href;
}

function addExt(url) {
  if (fs.existsSync(fileURLToPath(url))) return url;
  for (const ext of [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]) {
    const candidate = url + ext;
    if (fs.existsSync(fileURLToPath(candidate))) return candidate;
  }
  return url;
}

export async function resolve(specifier, context, nextResolve) {
  const aliased = resolveAliased(specifier);
  if (aliased) {
    return { url: addExt(aliased), shortCircuit: true };
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL) {
    const resolved = new URL(specifier, context.parentURL).href;
    return { url: addExt(resolved), shortCircuit: true };
  }
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if (specifier.startsWith("next/")) {
      // Modul next/* (mis. next/link, next/image) tidak relevan untuk
      // ekstraksi teks statis -- diganti stub pass-through.
      return { url: new URL("PassThrough.tsx", STUBS_DIR).href, shortCircuit: true };
    }
    throw err;
  }
}

export async function load(url, context, nextLoad) {
  if (url.endsWith(".tsx") || url.endsWith(".ts") || url.endsWith(".jsx")) {
    const filePath = fileURLToPath(url);
    const source = fs.readFileSync(filePath, "utf-8");
    const result = await esbuild.transform(source, {
      loader: url.endsWith(".tsx") ? "tsx" : url.endsWith(".jsx") ? "jsx" : "ts",
      jsx: "automatic",
      jsxImportSource: "react",
      format: "esm",
      target: "es2022",
      sourcefile: filePath,
    });
    return { format: "module", source: result.code, shortCircuit: true };
  }
  return nextLoad(url, context);
}
