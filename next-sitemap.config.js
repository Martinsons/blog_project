/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://veselibatev.lv',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://veselibatev.lv/server-sitemap.xml',
    ],
  },
}
