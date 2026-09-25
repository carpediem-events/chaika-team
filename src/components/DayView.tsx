import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { accent, blocks, END, isAll, peopleOf, venue, type Task } from '../plan'
import { at, phaseAt, span } from '../time'
import { Burst } from './Burst'
import { Icon } from './Icon'
import { TaskList, type Me } from './Tasks'
import { Ticker } from './Ticker'

const ease = [0.22, 1, 0.36, 1] as const

function hms(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return `${h}:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/** Свои задачи наверх, чужие вниз */
function sorted(tasks: Task[], me: Me) {
  if (me === 'all') return tasks
  const rank = (t: Task) => (!peopleOf(t).includes(me) ? 2 : isAll(t) ? 1 : 0)
  return [...tasks].sort((a, b) => rank(a) - rank(b))
}

/** Весь день одной лентой: прошедшее свёрнуто, текущее — большой тёмной сценой, дальше — карточки */
export function DayView({ now, me }: { now: number; me: Me }) {
  const root = useRef<HTMLElement>(null)
  const ph = phaseAt(now)
  const current = ph.kind === 'live' ? ph.block.id : null
  const nextIndex = ph.kind === 'before' ? 0 : ph.kind === 'live' ? ph.index + 1 : -1

  // открыли страницу или начался новый блок — подкручиваем к «сейчас»
  useEffect(() => {
    if (!current) return
    const t = setTimeout(() => {
      root.current?.querySelector('.stage')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 350)
    return () => clearTimeout(t)
  }, [current])

  return (
    <section className="view" ref={root}>
      {ph.kind === 'before' && (
        <Stage color={accent.prep}>
          <p className="stage__kicker">До сбора команды</p>
          <Ticker className="stage__count" text={hms(ph.left)} />
          <p className="stage__sub">Суббота, 26.09 · 11:00</p>
          <a className="stage__place" href={venue.map} target="_blank" rel="noreferrer">
            <Icon name="pin" size={16} /> {venue.name}
          </a>
        </Stage>
      )}

      {ph.kind === 'after' && (
        <Stage color={accent.final}>
          <p className="stage__kicker">20:00 · сыграно</p>
          <h1 className="stage__title">Спасибо, команда</h1>
          <p className="stage__sub">«Больше драмы» — всё. Вы лучшие.</p>
        </Stage>
      )}

      {blocks.map((b, i) => {
        if (ph.kind === 'live' && i === ph.index) {
          const mine = me === 'all' || b.tasks.some((t) => peopleOf(t).includes(me))
          return (
            <Stage key={b.id} color={accent[b.kind]}>
              <p className="stage__kicker">
                <span className="live-dot" /> Сейчас · {b.start}–{b.end}
              </p>
              <h1 className="stage__title">{b.title}</h1>
              {b.sub && <p className="stage__sub">{b.sub}</p>}
              <div className="bar">
                <motion.i
                  className="bar__fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: ph.progress }}
                  transition={{ duration: 1.2, ease }}
                />
              </div>
              <p className="stage__left">
                ещё <Ticker text={span(ph.left)} />
              </p>
              <div className="stage__tasks">
                {!mine && <p className="free">Ты на подхвате — помогай, где нужно</p>}
                <TaskList tasks={sorted(b.tasks, me)} me={me} />
              </div>
            </Stage>
          )
        }

        const past = now >= at(b.end)
        return (
          <motion.article
            key={b.id}
            className={`block${past ? ' block--past' : ''}`}
            style={{ '--accent': accent[b.kind] } as React.CSSProperties}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: past ? 0 : 0.04 * Math.max(0, i - nextIndex), duration: 0.55, ease }}
          >
            <p className="block__meta">
              <span className="block__time">
                {b.start}–{b.end}
              </span>
              {i === nextIndex && ph.kind === 'live' && <span className="soon">через {span(at(b.start) - now)}</span>}
              {past && <Icon name="check" size={16} className="block__check" />}
            </p>
            <h2 className="block__title">
              <i className="dot" style={{ background: accent[b.kind] }} />
              {b.title}
            </h2>
            {b.sub && <p className="block__sub">{b.sub}</p>}
            <TaskList tasks={sorted(b.tasks, me)} me={me} compact />
          </motion.article>
        )
      })}

      <div className="end">
        <span className="end__time">{END}</span>
        <span>Покидаем зал</span>
      </div>

      <button className="print-btn" onClick={() => window.print()}>
        <Icon name="print" size={18} /> Распечатать
      </button>
    </section>
  )
}

function Stage({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="stage"
      style={{ '--accent': color } as React.CSSProperties}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="stage__glow" />
      <Burst size={420} className="stage__burst" />
      <div className="stage__body">{children}</div>
    </motion.div>
  )
}
