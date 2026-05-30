<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import * as echarts from 'echarts'
import { monthly } from '../lib/agg'

const props = defineProps({
  // full CSV url in long format (id,time,value). Alternatively use `sources`.
  src: { type: String, default: null },
  // multiple files: [{ url, label, format }] where format is 'long' (default,
  // id,time,value) or 'wide' (date,value -> single series named `label`).
  // For long sources with a label, series are named "label: id".
  sources: { type: Array, default: null },
  // which series ids to show, in this order; null = all ids in the file
  ids: { type: Array, default: null },
  // trailing rolling-average window in observations; 0 = off
  roller: { type: Number, default: 0 },
  // default visible range start
  from: { type: String, default: null },
  // article-specific event markers [{date,label}]
  events: { type: Array, default: null },
  // name of a shared marker set in public/ (e.g. "reopening" -> /reopening.json)
  eventset: { type: String, default: null },
  // shortcut for the full Swiss COVID-phase markers (public/covid-phases.json)
  covid: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  height: { type: String, default: '360px' }
})

const { isDark } = useData()
const el = ref(null)
const status = ref('loading')
const errMsg = ref('')
const freq = ref('daily')   // daily | monthly
let chart = null
let rawSeries = []    // [{name, data}] raw (pre rolling-average / aggregation)
let eventList = []

function setFreq(f) {
  if (freq.value === f) return
  freq.value = f
  render()
}

// apply the current frequency / rolling-average to the raw series for display
function displaySeries() {
  return rawSeries.map((s) => ({
    name: s.name,
    data: freq.value === 'monthly' ? monthly(s.data) : rollMean(s.data, props.roller)
  }))
}

// colour-blind-friendly palette (Okabe-Ito)
const PALETTE = ['#0072B2', '#E69F00', '#009E73', '#D55E00', '#CC79A7', '#56B4E9', '#F0E442']

function splitCsvLine(line) {
  // minimal CSV split handling double-quoted fields
  const out = []
  let cur = '', q = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') q = !q
    else if (ch === ',' && !q) { out.push(cur); cur = '' }
    else cur += ch
  }
  out.push(cur)
  return out
}

function parseLong(text) {
  const lines = text.trim().split(/\r?\n/)
  const head = splitCsvLine(lines[0]).map((s) => s.trim().toLowerCase())
  const ii = head.indexOf('id')
  const ti = head.indexOf('time')
  const vi = head.indexOf('value')
  const groups = new Map()
  for (let i = 1; i < lines.length; i++) {
    const c = splitCsvLine(lines[i])
    const id = (c[ii] || '').trim()
    const t = Date.parse((c[ti] || '').trim())
    const v = parseFloat(c[vi])
    if (!id || Number.isNaN(t) || Number.isNaN(v)) continue
    if (!groups.has(id)) groups.set(id, [])
    groups.get(id).push([t, v])
  }
  for (const arr of groups.values()) arr.sort((a, b) => a[0] - b[0])
  return groups
}

// wide format: first column a date, second a value -> a single point array
function parseWide(text) {
  const lines = text.trim().split(/\r?\n/)
  const out = []
  for (let i = 1; i < lines.length; i++) {
    const c = splitCsvLine(lines[i])
    const t = Date.parse((c[0] || '').trim())
    const v = parseFloat(c[1])
    if (!Number.isNaN(t) && !Number.isNaN(v)) out.push([t, v])
  }
  out.sort((a, b) => a[0] - b[0])
  return out
}

// build the ordered [{name, data}] list from one or more sources
async function buildSeries() {
  const srcList = props.sources
    ? props.sources
    : [{ url: props.src, format: 'long', label: null }]
  const out = []
  for (const s of srcList) {
    const r = await fetch(s.url)
    if (!r.ok) throw new Error('HTTP ' + r.status)
    const text = await r.text()
    if ((s.format || 'long') === 'wide') {
      out.push({ name: s.label || s.url, data: parseWide(text) })
    } else {
      const groups = parseLong(text)
      const order = props.ids && props.ids.length ? props.ids : [...groups.keys()]
      for (const id of order) {
        if (!groups.has(id)) continue
        out.push({ name: s.label ? `${s.label}: ${id}` : id, data: groups.get(id) })
      }
    }
  }
  return out
}

function rollMean(points, w) {
  if (!w || w < 2) return points
  const out = []
  let sum = 0
  const q = []
  for (const [t, v] of points) {
    q.push(v); sum += v
    if (q.length > w) sum -= q.shift()
    out.push([t, sum / q.length])
  }
  return out
}

function startPct(series) {
  if (!props.from || !series.length) return 0
  const all = series.flatMap((s) => s.data.map((d) => d[0]))
  const lo = Math.min(...all), hi = Math.max(...all)
  const f = Date.parse(props.from)
  if (!(hi > lo) || Number.isNaN(f)) return 0
  return Math.max(0, Math.min(100, ((f - lo) / (hi - lo)) * 100))
}

function buildOption() {
  const text = isDark.value ? '#c9c9d1' : '#3c3c43'
  const axis = isDark.value ? '#3a3a40' : '#e2e2e6'
  const disp = displaySeries()
  const s0 = startPct(disp)
  const markLine = eventList.length
    ? {
        symbol: 'none', silent: true,
        lineStyle: { color: isDark.value ? '#8a8a93' : '#9a9aa3', type: 'dashed', width: 1 },
        label: { formatter: (p) => p.name, color: text, fontSize: 9, rotate: 90, position: 'insideEndTop', align: 'right' },
        data: eventList.map((e) => ({ xAxis: Date.parse(e.date), name: e.label }))
      }
    : undefined

  return {
    color: PALETTE,
    animation: false,
    grid: { left: 48, right: 16, top: 36, bottom: 64 },
    legend: { top: 0, textStyle: { color: text }, type: 'scroll' },
    tooltip: { trigger: 'axis', valueFormatter: (v) => (v == null ? '' : Number(v).toFixed(1)) },
    xAxis: { type: 'time', axisLine: { lineStyle: { color: axis } }, axisLabel: { color: text } },
    yAxis: { type: 'value', scale: true, splitLine: { lineStyle: { color: axis } }, axisLabel: { color: text } },
    dataZoom: [
      { type: 'inside', start: s0, end: 100 },
      { type: 'slider', start: s0, end: 100, height: 22, bottom: 16 }
    ],
    series: disp.map((s, i) => ({
      name: s.name, type: 'line', showSymbol: false,
      lineStyle: { width: 1.6 },
      data: s.data,
      markLine: i === 0 ? markLine : undefined
    }))
  }
}

function render() {
  if (!chart || status.value !== 'ready') return
  chart.setOption(buildOption(), true)
}

async function load() {
  try {
    rawSeries = await buildSeries()
    if (!rawSeries.length) throw new Error('no matching series')

    eventList = [...(props.events || [])]
    const setName = props.eventset || (props.covid ? 'covid-phases' : null)
    if (setName) {
      const r = await fetch(import.meta.env.BASE_URL + setName + '.json')
      if (r.ok) eventList = (await r.json()).concat(eventList)
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
onMounted(() => { load(); window.addEventListener('resize', onResize) })
onBeforeUnmount(() => { window.removeEventListener('resize', onResize); if (chart) chart.dispose() })
watch(isDark, () => render())
</script>

<template>
  <figure class="series-chart">
    <figcaption class="sc-head">
      <span v-if="title" class="sc-title">{{ title }}</span>
      <span v-if="subtitle" class="sc-sub">{{ subtitle }}</span>
      <div v-if="status === 'ready'" class="freq-toggle">
        <button :class="{ on: freq === 'daily' }" @click="setFreq('daily')">Daily</button>
        <button :class="{ on: freq === 'monthly' }" @click="setFreq('monthly')">Monthly</button>
      </div>
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
