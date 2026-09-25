import { motion } from 'motion/react'
import { accent, blocks, END, tasksOf, venue, type Block } from '../plan'
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

const tasksFor = (block: Block, me: Me) => (me === 'all' ? block.tasks : tasksOf(block, me))

function Free() {
  return <p className="free">Свободная минута — помогай, где нужно</p>
}

export function NowView({ now, me, onOpen }: { now: number; me: Me; onOpen: (blockId: string) => void }) {
  const ph = phaseAt(now)

  if (ph.kind === 'after') {
    return (
      <section className="view">
        <Stage color={accent.final}>
          <p className="stage__kicker">20:00 · сыграно</p>
          <h1 className="stage__title">Спасибо, команда</h1>
          <p className="stage__sub">«Больше драмы» — всё. Вы лучшие.</p>
        </Stage>
      </section>
    )
  }

  const nextIndex = ph.kind === 'before' ? 0 : ph.index + 1
  const next = blocks[nextIndex] as Block | undefined
  const later = blocks.slice(nextIndex + 1)

  return (
    <section className="view">
      {ph.kind === 'before' ? (
        <Stage color={accent.prep}>
          <p className="stage__kicker">До сбора команды</p>
          <Ticker className="stage__count" text={hms(ph.left)} />
          <p className="stage__sub">Суббота, 26.09 · 11:00</p>
          <a className="stage__place" href={venue.map} target="_blank" rel="noreferrer">
            <Icon name="pin" size={16} /> {venue.name}
          </a>
        </Stage>
      ) : (
        <Stage color={accent[ph.block.kind]} key={ph.block.id}>
          <p className="stage__kicker">
            <span className="live-dot" /> Сейчас · {ph.block.start}–{ph.block.end}
          </p>
          <h1 className="stage__title">{ph.block.title}</h1>
          {ph.block.sub && <p className="stage__sub">{ph.block.sub}</p>}
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
            {tasksFor(ph.block, me).length ? <TaskList tasks={tasksFor(ph.block, me)} me={me} /> : <Free />}
          </div>
        </Stage>
      )}

      {next ? (
        <motion.button
          className="card next"
          onClick={() => onOpen(next.id)}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease }}
        >
          <p className="card__kicker">
            {ph.kind === 'before' ? 'Первым делом' : `Через ${span(at(next.start) - now)}`}
            <span className="card__time">{next.start}</span>
          </p>
          <h2 className="card__title">
            <i className="dot" style={{ background: accent[next.kind] }} />
            {next.title}
          </h2>
          {tasksFor(next, me).length ? <TaskList tasks={tasksFor(next, me)} me={me} compact /> : <Free />}
        </motion.button>
      ) : (
        <motion.div className="card next" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="card__kicker">
            Потом <span className="card__time">{END}</span>
          </p>
          <h2 className="card__title">Покидаем зал</h2>
        </motion.div>
      )}

      {later.length > 0 && (
        <motion.div
          className="later"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="later__kicker">Дальше по плану</p>
          {later.map((b) => {
            const busy = me !== 'all' && tasksOf(b, me).some((t) => !t.who.includes('all'))
            return (
              <button key={b.id} className="later__row" onClick={() => onOpen(b.id)}>
                <span className="later__time">{b.start}</span>
                <i className="dot" style={{ background: accent[b.kind] }} />
                <span className="later__title">{b.title}</span>
                {busy && <span className="later__mine">ты</span>}
                <Icon name="arrow" size={16} className="later__arrow" />
              </button>
            )
          })}
          <div className="later__row later__row--end">
            <span className="later__time">{END}</span>
            <i className="dot dot--hollow" />
            <span className="later__title">Покидаем зал</span>
          </div>
        </motion.div>
      )}
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
