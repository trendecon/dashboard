<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import * as echarts from 'echarts'

// Year-on-year seasonal overlay of a data-repo series (time,value):
// each calendar year becomes its own line, aligned on a common month/day axis.
const props = defineProps({
  series: { type: String, required: true },          // e.g. "ch/homeoffice"
  years: { type: Array, required: true },             // e.g. [2018, 2019, 2020]
  until: { type: String, default: null },             // cut each year at "MM-DD"
  roller: { type: Number, default: 0 },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  height: { type: String, default: '360px' }
})

const { isDark } = useData()
const el = ref(null)
const status = ref('loading')
const errMsg = ref('')
let chart = null
let seriesData = []

const PALETTE = ['#bbbbbb', '#E69F00', '#0072B2', '#009E73']
const DATA_BASE = 'https://cdn.jsdelivr.net/gh/trendecon/data@master/data/'
const BASE_YEAR = 2020 // leap year, so 29 Feb maps cleanly

function rollMean(points, w) {
  if (!w || w < 2) return points
  const out = []; let sum = 0; const q = []
  for (const [t, v] of points) {
    q.push(v); sum += v
    if (q.length > w) sum -= q.shift()
    out.push([t, sum / q.length])
  }
  return out
}

function parse(text) {
  const lines = text.trim().split(/\r?\n/)
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const c = lines[i].split(',')
    const d = (c[0] || '').trim()
    const v = parseFloat(c[1])
    if (d && !Number.isNaN(v)) rows.push([d, v]) // keep date string
  }
  return rows
}

function buildOption() {
  const text = isDark.value ? '#c9c9d1' : '#3c3c43'
  const axis = isDark.value ? '#3a3a40' : '#e2e2e6'
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return {
    color: PALETTE.slice(-props.years.length),
    animation: false,
    grid: { left: 48, right: 16, top: 36, bottom: 40 },
    legend: { top: 0, textStyle: { color: text } },
    tooltip: {
      trigger: 'axis',
      formatter: (ps) => {
        const d = new Date(ps[0].value[0])
        const head = months[d.getMonth()] + ' ' + d.getDate()
        return head + '<br>' + ps.map((p) => `${p.marker}${p.seriesName}: ${p.value[1].toFixed(1)}`).join('<br>')
      }
    },
    xAxis: {
      type: 'time',
      axisLine: { lineStyle: { color: axis } },
      axisLabel: { color: text, formatter: (v) => months[new Date(v).getMonth()] }
    },
    yAxis: { type: 'value', scale: true, splitLine: { lineStyle: { color: axis } }, axisLabel: { color: text } },
    series: seriesData.map((s, i) => ({
      name: s.name, type: 'line', showSymbol: false,
      lineStyle: { width: i === seriesData.length - 1 ? 2 : 1.3, type: i === seriesData.length - 1 ? 'solid' : 'dashed' },
      data: s.data
    }))
  }
}

function render() {
  if (!chart || status.value !== 'ready') return
  chart.setOption(buildOption(), true)
}

async function load() {
  try {
    const r = await fetch(DATA_BASE + props.series + '_sa.csv')
    if (!r.ok) throw new Error('HTTP ' + r.status)
    const rows = parse(await r.text())
    seriesData = props.years.map((y) => {
      let pts = rows
        .filter((row) => row[0].slice(0, 4) === String(y))
        .filter((row) => !props.until || row[0].slice(5) <= props.until)
        .map((row) => [Date.parse(BASE_YEAR + row[0].slice(4)), row[1]])
      pts = rollMean(pts, props.roller)
      return { name: String(y), data: pts }
    }).filter((s) => s.data.length)
    if (!seriesData.length) throw new Error('no data for requested years')
    status.value = 'ready'
    await nextTick()
    chart = echarts.init(el.value)
    render()
  } catch (e) {
    errMsg.value = String(e.message || e)
    status.value = 'error'
  }
}

const onResize = () => chart && chart.resize()
onMounted(() => { load(); window.addEventListener('resize', onResize) })
onBeforeUnmount(() => { window.removeEventListener('resize', onResize); if (chart) chart.dispose() })
watch(isDark, () => render())
</script>

<template>
  <figure class="series-chart">
    <figcaption v-if="title" class="sc-head">
      <span class="sc-title">{{ title }}</span>
      <span v-if="subtitle" class="sc-sub">{{ subtitle }}</span>
    </figcaption>
    <div v-show="status === 'ready'" ref="el" :style="{ height }"></div>
    <div v-if="status === 'loading'" class="sc-msg" :style="{ height }">Loading…</div>
    <div v-if="status === 'error'" class="sc-msg sc-err" :style="{ height }">Could not load data ({{ errMsg }})</div>
  </figure>
</template>

<style scoped>
.series-chart { margin: 20px 0; }
.sc-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 2px; }
.sc-title { font-weight: 600; color: var(--vp-c-text-1); }
.sc-sub { font-size: 0.85rem; color: var(--vp-c-text-2); }
.sc-msg { display: flex; align-items: center; justify-content: center; color: var(--vp-c-text-2); font-size: 0.9rem; border: 1px dashed var(--vp-c-divider); border-radius: 8px; }
.sc-err { color: var(--vp-c-danger-1, #c00); }
</style>
