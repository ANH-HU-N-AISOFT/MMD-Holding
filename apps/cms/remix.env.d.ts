/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

interface Window {
  ENV: typeof process.env & `PUBLIC_${string}`;
}
