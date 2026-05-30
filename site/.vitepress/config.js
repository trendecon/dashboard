// Production site served at https://www.trendecon.org (GitHub Pages, docs/).
const base = '/'
const site = 'https://www.trendecon.org'

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
  outDir: '../docs',
  title: 'trendEcon',
  description: 'Daily economic indicators from Google searches',
  sitemap: { hostname: site },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'trendEcon' }],
    ['meta', { property: 'og:image', content: `${site}/og.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${site}/og.png` }],
    // Privacy-friendly analytics by Plausible
    ['script', { async: '', src: 'https://plausible.io/js/pa-79upm-rxKdRQVyQ3JxXuW.js' }],
    ['script', {}, 'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()']
  ],
  // per-page Open Graph / Twitter title, description and canonical URL
  transformPageData(pageData) {
    const clean = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const url = `${site}/${clean}`
    const title = pageData.title ? `${pageData.title} | trendEcon` : 'trendEcon'
    const desc = pageData.description || 'Daily economic indicators from Google searches'
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: desc }]
    )
  },
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
        'Developed by <a href="https://cynkra.com" target="_blank"><img src="/logo-cynkra.png" alt="cynkra" style="height:30px;border-radius:4px"></a> and trendEcon &middot; released under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a> / <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GPL-3.0</a>'
    }
  }
}
