# Background

## The problem

Official economic statistics are accurate but slow. GDP is quarterly and gets
revised for months, and sentiment surveys arrive with a lag. When the situation
moves fast, as in a pandemic, an energy shock or a trade dispute, decision-makers
need a read on the economy today rather than next quarter.

## The idea

People reveal their economic concerns through what they search for. A spike in
searches for *Kurzarbeit* (short-time work), *Insolvenz* (bankruptcy) or
*arbeitslos* (unemployed) is a real-time signal of economic worry. trendEcon
turns Google search volumes into daily, continuously updated economic
indicators.

## How the index is built

Turning raw Google Trends into a consistent long daily series is harder than it
looks. Google returns *relative*, *rescaled* samples whose granularity and
normalisation depend on the query window, so naïve queries are noisy and not
comparable over time. Our method, published in *Economic Inquiry*, addresses
this in four steps:

1. **Sampled, overlapping queries.** Each keyword is queried many times over
   overlapping daily, weekly and monthly windows to average out Google's
   sampling noise.
2. **Harmonisation into one long daily series.** The frequencies are combined so
   that the long-run trend (from monthly data) and the short-run dynamics (from
   daily data) are both preserved.
3. **Seasonal adjustment** removes day-of-week and calendar effects.
4. **Aggregation.** Related keywords are combined into a single index via
   principal components.

The result is a daily index that is stable, comparable across time, and
reproducible. The engine is the open-source
[`trendecon` R package](https://trendecon.github.io/trendecon/), and every
day's data is published in the [data repository](https://github.com/trendecon/data).

## Reading the indicators

Each series is standardised so that its long-run mean is zero and its standard
deviation is one. A value of 2 therefore means the index is two standard
deviations above its long-run average, and a value of -1 means one standard
deviation below. The indices capture relative changes over time in interest,
concern or demand, not absolute search counts, since Google does not publish the
underlying number of searches.

Most indices track search interest directly, so higher values mean more interest
in that category. The headline *Perceived Economic Situation* index is the
exception: it is oriented like a sentiment measure, so higher values mean a
brighter assessment and the index falls when worry rises (more searches for
*Wirtschaftskrise*, *Kurzarbeit* and the like).

## Choosing the keywords

Each index combines a small set of carefully chosen keywords rather than a single
term. We keep only keywords that are likely to reflect an intention to consume
rather than general curiosity, and that move with real economic activity. More is
not always better: some candidate terms add no extra signal, and Google censors
terms with too few searches (returning zeros), so they cannot be used.

We query German keywords because German is the main language of about 63% of the
Swiss population, and German searches track the wider economy well. French and
Italian searches within Switzerland hit Google's privacy threshold more often and
get censored, which is another reason we lean on store and brand names: those do
not depend on the language the searcher uses.

## The paper

> Eichenauer, V. Z., Indergand, R., Martínez, I. Z., & Sax, C. (2022).
> *Obtaining consistent time series from Google Trends.*
> Economic Inquiry, 60(2), 694–705.
> [doi.org/10.1111/ecin.13049](https://doi.org/10.1111/ecin.13049)

The paper introduces the sampling-and-harmonisation procedure above, shows that
the resulting series are far more reliable than single Google Trends downloads,
and validates the indicators against official Swiss figures such as SECO GDP and
consumer-sentiment data.

## Limitations

The indicators reflect *attention*, not outcomes. A search for a topic signals
interest or concern, which usually but not always moves with economic activity.
Relationships can shift over time, so the indices are best read as timely,
directional signals that complement official statistics rather than replace them.
