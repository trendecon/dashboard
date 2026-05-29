# Football is back! But what about the fans?

<div class="byline"><span class="byline-author">Alexander Götz</span><span class="byline-date">18 September 2020</span></div>

This weekend marks the start of the new football season in Switzerland and
Germany. Because of the Corona crisis, the Swiss Football League adjusted its
schedule for 2020/21. Beyond postponements, fans face new rules they will have
to adapt to. But are they ready, and have they already bought their tickets?

The Swiss Football Association had been working on a
[protection concept](https://www.football.ch/portaldata/27/resources/dokumente/diverses/Covid_Schutzkonzept_August2020_DE.pdf)
for handling fans in a Corona-compliant way. Alongside individual rules, clubs
had to follow guidelines such as a cap of 1000 people in the stadium until the
end of October. From October, the Federal Council allowed more than 1000 people
at major events in principle, but protecting citizens, and stadium-goers, fell
to the cantons, so fans had to adapt to regional conditions.

Using our cultural-events indicator, we see a level shift since the start of the
year that is unique in the last four years, illustrating uncertainty about
attending events in general. The chart below shows the search terms *spielplan*
(match schedule) and *saisonkarte* (season ticket) alongside *maskenpflicht*
(mask requirement) and *fallzahlen* (case numbers). Interest in match schedules
and season tickets dropped to unprecedented lows, while case numbers reached a
new record, far above the first wave.

<SeriesChart
  src="https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_6.csv"
  :ids="['saisonkarte', 'spielplan', 'maskenpflicht', 'fallzahlen']"
  from="2020-01-01"
  eventset="reopening"
  title="Football and the pandemic"
  subtitle="2020; dashed lines mark Swiss reopening phases" />

The cultural-events index makes the uncertainty about attending events clear. A
year-on-year comparison shows 2020 sitting well below earlier years.

<YoYChart series="ch/social" :years="[2017, 2018, 2019, 2020]" until="09-17" title="Cultural events index: year-on-year" />

Given uncertainty about a second wave and possible new restrictions, we expected
stadium attendance to stay low. That same uncertainty affected most people, with
possible knock-on effects not just on ticket sales but on consumer spending more
broadly.
