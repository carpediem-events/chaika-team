import { useEffect, useState } from 'react'
import { blocks, END, EVENT, type Block } from './plan'

export const at = (hm: string) => {
  const [h, m] = hm.split(':').map(Number)
  return new Date(EVENT.y, EVENT.m - 1, EVENT.d, h, m).getTime()
}

/**
 * Часы страницы. Для проверки можно промотать время: ?t=13:40 — день ивента в 13:40,
 * ?t=2026-09-25T18:00 — любой момент. Дальше часы идут как обычно.
 */
const offset = (() => {
  const t = new URLSearchParams(location.search).get('t')
  if (!t) return 0
  const target = /^\d{1,2}:\d{2}$/.test(t) ? at(t) : new Date(t).getTime()
  return Number.isNaN(target) ? 0 : target - Date.now()
})()

export function useNow() {
  const [now, setNow] = useState(() => Date.now() + offset)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now() + offset), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export type Phase =
  | { kind: 'before'; next: Block; left: number }
  | { kind: 'live'; block: Block; index: number; left: number; progress: number }
  | { kind: 'after' }

export function phaseAt(now: number): Phase {
  if (now < at(blocks[0].start)) return { kind: 'before', next: blocks[0], left: at(blocks[0].start) - now }
  if (now >= at(END)) return { kind: 'after' }
  const index = blocks.findIndex((b) => now >= at(b.start) && now < at(b.end))
  const block = blocks[index]
  const s = at(block.start)
  const e = at(block.end)
  return { kind: 'live', block, index, left: e - now, progress: (now - s) / (e - s) }
}

/** «34 мин», «1 ч 05 мин» */
export function span(ms: number) {
  const min = Math.max(0, Math.ceil(ms / 60000))
  if (min < 1) return 'меньше минуты'
  if (min < 60) return `${min} мин`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} ч ${String(m).padStart(2, '0')} мин` : `${h} ч`
}

export function clock(ms: number) {
  const d = new Date(ms)
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}
