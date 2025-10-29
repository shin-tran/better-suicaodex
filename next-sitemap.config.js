const url = process.env.SITE_URL || 'https://suicaodex.com';

/** @type {import('next-sitemap').IConfig} */
export const siteUrl = url;
export const generateRobotsTxt = true;
export const sitemapSize = 100;
export const robotsTxtOptions = {
  additionalSitemaps: [
    `${url}/manga-sitemap.xml`,
    // `${url}/chapter-sitemap.xml`,
  ],
};
