<script setup>
import { ref, onMounted, onBeforeUnmount, shallowRef, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import * as echarts from 'echarts'

const props = defineProps({
  // path under the data repo, e.g. "ch/trendecon"
  series: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  // default start of the visible range (full history is always loaded)
  from: { type: String, default: '2020-01-01' },
  // overlay curated macro events from /events.json
  events: { type: Boolean, default: false },
  height: { type: String, default: '420px' }
})

const { isDark } = useData()

const el = ref(null)
const status = ref('loading') // loading | ready | error
const errMsg = ref('')
let chart = null
let rows = []        // [[ms, value], ...]
let eventList = []   // [{date, label}]

const DATA_BASE = 'https://cdn.jsdelivr.net/gh/trendecon/data@master/data/'

function parseCsv(text) {
  // expects a "time,value" header; tolerant of extra columns
  const lines = text.trim().split(/\r?\n/)
  const header = lines[0].split(',').map((s) => s.trim().toLowerCase())
  const ti = header.indexOf('time')
  const vi = header.indexOf('value')
  const out = []
  for (let i = 1; i < lines.length; i++) {
    const c = lines[i].split(',')
    const t = Date.parse(c[ti === -1 ? 0 : ti])
    const v = parseFloat(c[vi === -1 ? 1 : vi])
    if (!Number.isNaN(t) && !Number.isNaN(v)) out.push([t, v])
  }
  return out
}

function brand() {
  return isDark.value
    ? { line: '#e85fc8', areaTop: 'rgba(232,95,200,0.35)', areaBot: 'rgba(232,95,200,0.02)' }
    : { line: '#b50d93', areaTop: 'rgba(181,13,147,0.28)', areaBot: 'rgba(181,13,147,0.02)' }
}

function buildOption() {
  const c = brand()
  const axisColor = isDark.value ? '#3a3a40' : '#e2e2e6'
  const textColor = isDark.value ? '#c9c9d1' : '#3c3c43'
  const startPct = (() => {
    if (!rows.length) return 0
    const fromMs = Date.parse(props.from)
    const span = rows[rows.length - 1][0] - rows[0][0]
    if (!span || Number.isNaN(fromMs)) return 0
    return Math.max(0, Math.min(100, ((fromMs - rows[0][0]) / span) * 100))
  })()

  const markLine = props.events && eventList.length
    ? {
        symbol: 'none',
        silent: true,
        lineStyle: { color: isDark.value ? '#8a8a93' : '#9a9aa3', type: 'dashed', width: 1 },
        label: {
          formatter: (p) => p.name,
          color: textColor,
          fontSize: 10,
          rotate: 90,
          position: 'insideEndTop',
          align: 'right'
        },
        data: eventList.map((e) => ({ xAxis: Date.parse(e.date), name: e.label }))
      }
    : undefined

  return {
    animation: false,
    grid: { left: 48, right: 18, top: 18, bottom: 70 },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' },
      valueFormatter: (v) => (v == null ? '' : Number(v).toFixed(1))
    },
    xAxis: {
      type: 'time',
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: { color: textColor }
    },
    yAxis: {
      type: 'value',
      scale: true,
      splitLine: { lineStyle: { color: axisColor } },
      axisLabel: { color: textColor }
    },
    dataZoom: [
      { type: 'inside', start: startPct, end: 100 },
      { type: 'slider', start: startPct, end: 100, height: 26, bottom: 18 }
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        smooth: false,
        lineStyle: { color: c.line, width: 1.6 },
        itemStyle: { color: c.line },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: c.areaTop },
            { offset: 1, color: c.areaBot }
          ])
        },
        data: rows,
        markLine
      }
    ]
  }
}

function render() {
  if (!chart || status.value !== 'ready') return
  chart.setOption(buildOption(), true)
}

async function load() {
  try {
    const reqs = [fetch(DATA_BASE + props.series + '_sa.csv')]
    if (props.events) reqs.push(fetch(import.meta.env.BASE_URL + 'events.json'))
    const res = await Promise.all(reqs)
    if (!res[0].ok) throw new Error('HTTP ' + res[0].status + ' for ' + props.series)
    rows = parseCsv(await res[0].text())
    if (!rows.length) throw new Error('no data points parsed')
    if (props.events && res[1] && res[1].ok) {
      eventList = await res[1].json()
    }
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

onMounted(() => {
  load()
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (chart) chart.dispose()
})
watch(isDark, () => render())
</script>

<template>
  <figure class="trend-chart">
    <figcaption v-if="title" class="tc-head">
      <span class="tc-title">{{ title }}</span>
      <span v-if="subtitle" class="tc-sub">{{ subtitle }}</span>
    </figcaption>
    <div v-show="status === 'ready'" ref="el" class="tc-canvas" :style="{ height }"></div>
    <div v-if="status === 'loading'" class="tc-msg" :style="{ height }">Loading…</div>
    <div v-if="status === 'error'" class="tc-msg tc-err" :style="{ height }">
      Could not load data ({{ errMsg }})
    </div>
  </figure>
</template>

<style scoped>
.trend-chart {
  margin: 20px 0 8px;
}
.tc-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 4px;
}
.tc-title {
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}
.tc-sub {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
.tc-canvas {
  width: 100%;
}
.tc-msg {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}
.tc-err {
  color: var(--vp-c-danger-1, #c00);
}
</style>
