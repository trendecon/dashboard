import DefaultTheme from 'vitepress/theme'
import './custom.css'
import TrendChart from './components/TrendChart.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TrendChart', TrendChart)
  }
}
