const url = process.env.SITE_URL || 'https://suicaodex.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: url,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${url}/manga-sitemap.xml`,
      `${url}/chapter-sitemap.xml`,
    ],
  },
};