/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RESTFUL_API: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
