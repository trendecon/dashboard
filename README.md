# trendEcon dashboard

Source of [www.trendecon.org](https://www.trendecon.org), the public dashboard
for the trendEcon economic indicators. GitHub Pages serves the `docs/` folder.

The indicators themselves are built by the
[`trendecon`](https://github.com/trendecon/trendecon) R package and published
daily to the [`trendecon/data`](https://github.com/trendecon/data) repository;
this repository only visualises them.

## Layout

- `docs/index.html` — the current site, a flexdashboard rendered from
  `docs/index.Rmd` by `.github/workflows/render.yml` (daily).
- `site/` — a modern [VitePress](https://vitepress.dev) rewrite (Vue + ECharts)
  that fetches the published CSVs at runtime. It builds into `docs/next/` and is
  previewed at [www.trendecon.org/next/](https://www.trendecon.org/next/).

## Build the VitePress site

```sh
cd site
npm install
npm run dev      # local preview
npm run build    # writes the static site into ../docs/next
```

## See also

- [Indicator data](https://github.com/trendecon/data) (updated daily, CC BY 4.0)
- [`trendecon` R package](https://trendecon.github.io/trendecon/)
- Method: Eichenauer, Indergand, Martínez & Sax (2022), *Obtaining consistent
  time series from Google Trends*, Economic Inquiry 60(2), 694–705,
  [doi.org/10.1111/ecin.13049](https://doi.org/10.1111/ecin.13049)
