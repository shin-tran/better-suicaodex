export const siteConfig = {
  name: "SuicaoDex",
  url: "https://suicaodex.com",
  ogImage: "https://suicaodex.com/hanabi_holder.webp",
  description: "SuicaoDex - Trang web truyện tranh đầu hàng VN",
  links: {
    discord: "https://discord.gg/dongmoe",
    github: "https://github.com/TNTKien/better-suicaodex",
    facebook: "https://facebook.com/suicaodex",
  },
  mangadexAPI: {
    webURL: "https://mangadex.org",
    baseURL: "https://api.mangadex.org",
    coverURL: "https://uploads.mangadex.org/covers",
    imgURL: "https://uploads.mangadex.org",
    ogURL: "https://og.mangadex.org/og-image",
  },
  suicaodex: {
    domain: "https://suicaodex.com",
    apiURL: "https://api.suicaodex.com", //pls use your own proxy server; or use built-in proxy, see /lib/axios.ts
  },
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
