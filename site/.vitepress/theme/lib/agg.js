// Aggregate a sorted [[ms, value], ...] series to monthly averages.
// Used by the Daily | Monthly chart toggle. Timestamps are placed on the first
// of each month (UTC) so the time axis stays well-behaved.
export function monthly(points) {
  const buckets = new Map()
  for (const [t, v] of points) {
    const d = new Date(t)
    const key = d.getUTCFullYear() * 12 + d.getUTCMonth()
    let b = buckets.get(key)
    if (!b) {
      b = { y: d.getUTCFullYear(), m: d.getUTCMonth(), sum: 0, n: 0 }
      buckets.set(key, b)
    }
    b.sum += v
    b.n += 1
  }
  return [...buckets.values()]
    .sort((a, b) => a.y - b.y || a.m - b.m)
    .map((b) => [Date.UTC(b.y, b.m, 1), b.sum / b.n])
}
