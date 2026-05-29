// Served from the dashboard repo's docs/next/ -> https://www.trendecon.org/next/
// (hidden URL). On promotion to the main site, change this to '/'.
const base = '/next/'

// Sidebar shared by the Switzerland indicators page and the archived blog posts,
// so the blog reads as a sub-section of Switzerland rather than a top-level area.
function switzerlandSidebar() {
  return [
    {
      text: 'Switzerland',
      items: [{ text: 'Indicators', link: '/indicators' }]
    },
    {
      text: 'Blog (2020–21)',
      collapsed: false,
      items: [
        { text: 'How is the Swiss economy doing today?', link: '/blog/swiss-economy-today' },
        { text: 'Large events: will people show up?', link: '/blog/large-events' },
        { text: 'Still a long way to go (mobility)', link: '/blog/mobility' },
        { text: 'Back to normal or permanent shifts?', link: '/blog/demand-shifts' },
        { text: 'Culinary consumption patterns', link: '/blog/culinary' },
        { text: 'Football is back, but the fans?', link: '/blog/football' },
        { text: 'Coping with masks: online vs on-site', link: '/blog/masks' },
        { text: 'Home office and Black Friday', link: '/blog/home-office-black-friday' },
        { text: "The home office employee's best companion", link: '/blog/home-office-pet' }
      ]
    }
  ]
}

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
    sidebar: {
      // shared sidebar for the Switzerland section: indicators + the archived blog
      '/indicators': switzerlandSidebar(),
      '/blog/': switzerlandSidebar()
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/trendecon' }
    ],
    footer: {
      message:
        'Daily economic indicators from Google Trends. Developed by trendEcon, in collaboration with <a href="https://cynkra.com" target="_blank">cynkra</a>, KOF, SECO and others.',
      copyright:
        'Data &amp; code released under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a> / <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GPL-3.0</a>.'
    }
  }
}
