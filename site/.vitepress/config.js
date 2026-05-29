// Served from the dashboard repo's docs/next/ -> https://www.trendecon.org/next/
// (hidden URL). On promotion to the main site, change this to '/'.
const base = '/next/'

export default {
  base,
  // Build into the repo's served docs/ folder, under /next/ (the hidden URL).
  // GitHub Pages serves docs/ at the site root, so docs/next/ -> /next/.
  outDir: '../docs/next',
  title: 'trendEcon',
  description: 'Daily economic indicators from Google searches',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }]
  ],
  themeConfig: {
    siteTitle: 'trendEcon',
    nav: [
      { text: 'Switzerland', link: '/indicators' },
      { text: 'Other countries', link: '/countries' },
      { text: 'Background', link: '/background' },
      { text: 'About', link: '/about' },
      { text: 'Data', link: 'https://github.com/trendecon/data' },
      { text: 'R package', link: 'https://trendecon.github.io/trendecon/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/trendecon' }
    ],
    footer: {
      message:
        'Daily economic indicators from Google Trends. Developed by <a href="https://cynkra.com" target="_blank">cynkra</a> with KOF, SECO and partners.',
      copyright:
        'Data &amp; code released under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a> / <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GPL-3.0</a>.'
    }
  }
}
