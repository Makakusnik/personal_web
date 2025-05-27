interface ImportMetaEnv {
  readonly STRAPI_API_KEY: string;
  readonly STRAPI_API_HOSTNAME: string;
  readonly STRAPI_API_PORT: string;
  readonly STRAPI_API_PREFIX: string;
  readonly WEB_URL: string;
  readonly UMAMI_SCRIPT_URL: string;
  readonly UMAMI_WEBSITE_ID: string;
  readonly CLOUDFLARE_ANALYTICS_TOKEN: string;
  readonly PUBLIC_CLOUDFLARE_WORKER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
