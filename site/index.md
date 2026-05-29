---
layout: home

hero:
  name: trendEcon
  text: Daily economic indicators from Google searches
  tagline: How Switzerland perceives the economy, measured every day from what people search for.
  actions:
    - theme: brand
      text: How it works
      link: /background
    - theme: alt
      text: Other countries
      link: /countries
---

<div class="vp-doc home-section">

## Perceived economic situation

The trendEcon index reads economic worry from how often people search for terms
like *Wirtschaftskrise*, *Kurzarbeit*, *arbeitslos* and *Insolvenz*. Higher
values mean more worry. The series is daily, seasonally adjusted, and goes back
to 2006.

<TrendChart series="ch/trendecon" title="trendEcon Index (CH)" subtitle="daily, seasonally adjusted" :events="true" />

<p class="muted">Drag the slider below the chart to change the time range. Dashed lines mark a few macro events.</p>

<div class="paper-box">
  <div class="paper-tag">The Paper</div>
  <p class="paper-cite">
    Eichenauer, V. Z., Indergand, R., Martínez, I. Z., &amp; Sax, C. (2022).
    <em>Obtaining consistent time series from Google Trends.</em>
    Economic Inquiry, 60(2), 694–705.
  </p>
  <p class="paper-links">
    <a href="https://doi.org/10.1111/ecin.13049" target="_blank" rel="noreferrer">doi.org/10.1111/ecin.13049</a>
    <span class="sep">·</span>
    <a href="/background">How it works</a>
  </p>
</div>

## Perceived inflation

A second index follows searches about prices and the cost of living
(*inflation*, *Preise*, *Benzinpreis*, *Mietzins*). It tends to react when
inflation is on people's minds, such as the 2022 energy shock, the 2025 tariff
announcements, and the oil-price jump around the US strikes on Iran.

<TrendChart series="ch/inflationrate" title="Perceived Inflation (CH)" subtitle="daily, seasonally adjusted" :events="true" />

<p class="muted">See the <a href="/indicators">other Swiss indicators</a> for mobility, travel, cultural events and more.</p>

## News

- 2026: Daily updates are back. We rebuilt the data pipeline as a plain GitHub
  Actions job and replaced the old dashboard with this faster site. Every index
  runs through today.
- 2022: Our method was published in *Economic Inquiry*. Eichenauer, Indergand,
  Martínez and Sax, [Obtaining consistent time series from Google
  Trends](https://doi.org/10.1111/ecin.13049), 60(2), 694–705. The
  [Background](/background) page summarises it.
- 2020: trendEcon on TV, an
  [interview](https://www.rsi.ch/la1/programmi/informazione/tempi-moderni/i-servizi/Come-va-l%E2%80%99economia-te-lo-dice-Google-13429910.html)
  on RSI LA1.
- 2020: Covered in the Swiss press, including
  [NZZ](https://www.nzz.ch/wirtschaft/corona-krise-wie-die-lockerungsmassnahmen-wirken-ld.1556075),
  [Republik](https://www.republik.ch/2020/11/23/die-fieberkurven-der-corona-rezession),
  the [Tages-Anzeiger](https://www.tagesanzeiger.ch/der-konsum-bricht-wegen-corona-ein-107545280598)
  and [Finanz und Wirtschaft](https://www.fuw.ch/article/die-schweiz-faehrt-etwas-herunter-und-bestellt-wieder-pizza/).
- 2020: Awarded at the
  [eRum2020::CovidR contest](https://milano-r.github.io/erum2020-covidr-contest/trendecon.html).
- 2020: Funded by the [#versusvirus hackathon](https://www.versusvirus.ch/funding),
  one of 16 selected projects.
- 2020: The [trendecon R package](https://trendecon.github.io/trendecon/) was released.

</div>

<style scoped>
.home-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 8px 24px 48px;
}
.muted {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-top: 4px;
}
.paper-box {
  margin: 28px 0;
  padding: 18px 22px;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}
.paper-tag {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.paper-cite {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}
.paper-links {
  margin: 8px 0 0;
  font-size: 0.9rem;
}
.paper-links .sep {
  color: var(--vp-c-text-3);
  margin: 0 8px;
}
</style>
