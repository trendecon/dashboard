# The home office employee's best companion

<div class="byline"><span class="byline-author">Alexander Götz</span><span class="byline-date">8 January 2021</span></div>

Consumption can satisfy many needs. But what about feelings of loneliness? The
pandemic calls for reduced mobility and a retreat into one's own four walls,
where home offices are less crowded. Figures from animal shelters document an
increased interest in acquiring pets. The free newspaper 20 Minuten reported
from a survey of some animal shelters that demand for dogs and cats rose sharply
during the pandemic
([20 Minuten](https://www.20min.ch/story/die-leute-kompensierten-mit-einem-neuen-buesi-oder-hund-ihre-einsamkeit-332588381409)).
At the beginning of 2021, the NZZ confirmed this with registration figures from
animal databases
([NZZ](https://www.nzz.ch/schweiz/haustiere-boomen-waehrend-der-corona-pandemie-ld.1594752)).
According to the article, the home-office recommendation is the cause of this
higher demand.

Internet search queries allow a more differentiated look at the developments.
Over the last five years, interest in the keywords *tierheim* (animal shelter),
*qualipet* (a Swiss pet retailer) and *meerschweinchen* (guinea pig) clearly
increased. March 2020 produced strong peaks for *qualipet* and *meerschweinchen*.
This could indicate that the Swiss preferred pet shops over animal shelters,
which makes sense, since the shelters had to close under the Covid-19 measures
and could only serve the rising demand at the very start of the lockdown.

<SeriesChart
  src="https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_9.csv"
  :ids="['qualipet', 'tierheim', 'meerschweinchen']"
  :roller="8"
  title="Pet-related searches"
  subtitle="8-week rolling average" />

The NZZ reports concrete figures from the animal databases Amicus and Identitas.
According to their numbers, the upward trend in animal registrations also showed
a disproportionate jump in 2020. The trendEcon data below indicates that small
animals such as guinea pigs were in particularly high demand during the first
phase of the lockdown. The keywords *hund kaufen* (buy dog) and *katze kaufen*
(buy cat) also became more popular, though less so than *meerschweinchen*. After
a short drop in the summer, searches for all pets rebounded, with cats enjoying
the greatest popularity.

<SeriesChart
  src="https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_9.csv"
  :ids="['hund kaufen', 'katze kaufen', 'meerschweinchen']"
  :roller="4"
  from="2020-01-01"
  :covid="true"
  title="Buying a pet in 2020"
  subtitle="4-week rolling average; dashed lines mark Swiss Covid-19 phases" />

How far pets are part of the new standard of living remains uncertain. Depending
on federal and cantonal guidelines, the desire for a home-office dog could
endure. If normality returns through vaccination, keeping a pet may become
cumbersome and some employees might return their animals to the shelters. That,
too, depends on whether home offices stay after the pandemic.

