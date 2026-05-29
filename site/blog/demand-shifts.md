# Back to normal or permanent shifts in demand?

<div class="byline"><span class="byline-author">Stefan Legge</span><span class="byline-date">2 September 2020</span></div>

Life changed dramatically for people in Switzerland in spring 2020 when the
Federal Council announced the lockdown in mid-March. Unable to go to
restaurants, bars or shopping malls, people found new ways to spend their
leisure time.

Two food-related activities stood out: baking bread and ordering food online.
Baking was so widespread that The Economist
[wrote about it in July](https://www.economist.com/leaders/2020/07/09/sourdough-economics-no-need-to-knead).
As the magazine noted, once the downturn was over people should probably leave
bread-making to the experts and focus on bread-winning at their normal jobs.
Likewise, when restaurants reopened many people quickly abandoned food delivery
and went out again.

This raises a question: did the Covid-19 shock lead only to short-term changes in
how people spend their leisure time, or are there lasting shifts in demand?

Using trendEcon we can see how Google search frequencies evolved over the past
weeks, months and years, and test whether preferences shifted temporarily or
permanently. Below we show *Brot backen* (baking bread), *Essen bestellen*
(order food) and *Netflix*.

<SeriesChart
  src="https://cdn.jsdelivr.net/gh/trendecon/media-content@master/data_examples/article_4.csv"
  :ids="['Netflix', 'Essen bestellen', 'Brot backen']"
  title="New habits during the lockdown" />

For some keywords the data show a short-term boom: interest in baking bread or
food delivery surged during the lockdown but fell back equally fast once
restrictions eased. Gardening-related searches, by contrast, stayed elevated
compared with pre-Corona times. The year-on-year views below make the pattern
clear: food delivery and gardening both ran above earlier years through 2020.

<YoYChart series="ch/fooddelivery" :years="[2018, 2019, 2020]" until="09-01" title="Food delivery: year-on-year" />

<YoYChart series="ch/garden" :years="[2018, 2019, 2020]" until="09-01" title="Gardening and home improvement: year-on-year" />

If these habits stick, companies will face a different consumer demand in
future, with first-order implications for investment decisions. trendEcon helps
by offering timely insight into how consumer preferences are shifting.
