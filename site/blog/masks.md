# How do Swiss consumers cope with masks?

<div class="byline"><span class="byline-author">Alexander Götz</span><span class="byline-date">21 October 2020</span></div>

The introduction of compulsory masks on public transport (6 July 2020) and for
store visits in Zurich (27 August 2020) was viewed critically at first, as it
could slow a recovering post-lockdown demand. After the nationwide tightening of
protective measures on 19 October 2020, the question of the effects of mandatory
masks became even more pressing. This article adds evidence from Google search
behaviour.

The trendEcon data allow a differentiated view of on-site and online retail.
First, the new term *maskenpflicht* (mask requirement) triggered great interest
both in the canton of Zurich and across the country. After the Federal Council's
decision of 18 October, searches reached a new record high.

<SeriesChart
  :sources="[
    { url: 'https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_7_CH.csv', label: 'CH' },
    { url: 'https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_7_ZH.csv', label: 'ZH' }
  ]"
  :ids="['maskenpflicht']"
  :roller="4"
  eventset="masks"
  title="Searches for &quot;maskenpflicht&quot;: Switzerland vs Zurich"
  subtitle="4-week rolling average" />

The terms *öffnungszeiten* (opening hours) and *shopping center* stand for
physically visited consumption. *Öffnungszeiten* is hard to read: the pre-Corona
level was reached again, even exceeding the same months a year earlier, but this
could mean people check opening hours more often rather than risk a closed door.
*Shopping center* was searched slightly less in Zurich after masks became
mandatory and had not yet recovered to the previous year's level.

<SeriesChart
  :sources="[
    { url: 'https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_7_CH.csv', label: 'CH' },
    { url: 'https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_7_ZH.csv', label: 'ZH' }
  ]"
  :ids="['öffnungszeiten', 'shopping center']"
  :roller="4"
  eventset="masks"
  title="Opening hours and shopping centres: CH vs ZH"
  subtitle="4-week rolling average" />

Finally, the big names of Swiss online commerce: *galaxus*, *coop at home* and
*le shop*. The e-commerce giant Galaxus improved its already strong position
during the lockdown and settled at a new level above the previous year. The
online arms of Coop and Migros saw an enormous lockdown peak followed by a return
to roughly the previous year's level. The renewed security measures lifted demand
across all online retailers again.

<SeriesChart
  src="https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_7_CH.csv"
  :ids="['coop at home', 'le shop', 'galaxus']"
  eventset="masks"
  title="Swiss online retailers"
  subtitle="searches in Switzerland" />

The data cannot directly identify an effect of the mask requirement, but they do
point to a shift in non-food consumption from on-site to online. The renewed
upturn in online shopping suggests Swiss people moved into the safety of their
own homes rather than visiting stores.
