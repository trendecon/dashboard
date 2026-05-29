import DefaultTheme from 'vitepress/theme'
import './custom.css'
import TrendChart from './components/TrendChart.vue'
import SeriesChart from './components/SeriesChart.vue'
import YoYChart from './components/YoYChart.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TrendChart', TrendChart)
    app.component('SeriesChart', SeriesChart)
    app.component('YoYChart', YoYChart)
  }
}
