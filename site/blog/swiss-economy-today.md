# How is the Swiss economy doing today?

<div class="byline"><span class="byline-author">trendEcon</span><span class="byline-date">25 May 2020</span></div>

The first half of 2020 can already be regarded as historic. Seldom before have
economies shrunk so fast in such a short time. As a result of Covid-19 and the
related government measures, unemployment figures rose rapidly almost
everywhere. Economic output measured by gross domestic product (GDP) fell more
sharply than we had seen in decades. Yet there was still vast uncertainty about
how dramatic the slump would be and how quickly economies would recover.

In Switzerland, annual GDP was expected to fall by around six percent
([Seco, April 2020](https://www.seco.admin.ch/seco/de/home/wirtschaftslage---wirtschaftspolitik/Wirtschaftslage/konjunkturprognosen.html)).
This would not affect all sectors equally. Restaurants and airports are hit much
harder than supermarkets or the pharmaceutical industry. While the extremes are
obvious, many questions remain open.

How quickly, for example, will demand for durable goods rise again? In
recessions, consumers save money and cut spending especially on clothing,
furniture or cars. That spending is easier to postpone, which makes those
sectors very pro-cyclical: in a recession they suffer particularly, and with
them the advertising industry and, in turn, newspapers, which sell fewer ads.
Demand for clothing or cars therefore matters for many other industries through
second- and third-round effects.

This high uncertainty is a problem for politicians and companies alike. How much
government support is needed, and where? When will companies again face rising
demand and turnover?

Data can help answer such questions, but often they first have to be prepared
and visualised. That is exactly what trendEcon does. Every day, Swiss people
search Google for countless keywords. Via
[Google Trends](https://trends.google.de/trends/?geo=CH), anyone can see which
terms are currently searched most. The terms *WC Papier* (toilet paper) and
*Rezession* (recession) are illustrative:

<SeriesChart
  :sources="[
    { url: 'https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/wc_papier.csv', label: 'WC Papier', format: 'wide' },
    { url: 'https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/rezession.csv', label: 'Rezession', format: 'wide' }
  ]"
  title="Two illustrative searches" />

From the second week of March onwards, searches for *recession* clearly rose. We
also see the large number of people searching for toilet paper in mid-March,
during a short-term shortage. The toilet-paper worry quickly faded, but the
recession topic stayed present.

Such examples are illustrative, but they also highlight the problems: which
search terms are actually relevant, and how can several be combined? How can the
data be presented cleanly and comparably? What are useful benchmarks? trendEcon
addresses this by selecting suitable search terms from many candidates and
preparing the data from January 2006 onwards, including seasonal adjustment and
the treatment of public holidays.

Our main indicator, *Perceived Economic Situation*, is based on the keywords
*economic crisis*, *short-time work*, *unemployed* and *insolvency*. The more
often these terms are searched, the worse the assessment of the current
situation. The slump from late February and the low point shortly after the
Federal Council's decisions of 16 March 2020 are clearly visible:

<TrendChart series="ch/trendecon" title="Perceived Economic Situation" subtitle="daily, seasonally adjusted" :events="true" />

Sentiment had already brightened considerably by late May, although the
indicator was still below its long-term level. A year-on-year comparison with
2019 shows the striking difference:

<YoYChart series="ch/trendecon" :years="[2019, 2020]" until="05-25" title="Perceived Economic Situation: 2019 vs 2020" subtitle="aligned on month and day" />
