interface ImportMetaEnv {
  readonly STRAPI_API_KEY: string;
  readonly STRAPI_API_HOSTNAME: string;
  readonly STRAPI_API_PORT: string;
  readonly STRAPI_API_PREFIX: string;
  readonly WEB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
