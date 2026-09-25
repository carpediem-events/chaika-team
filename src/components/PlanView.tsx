import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { accent, blocks, END, isAll, peopleOf } from '../plan'
import { at } from '../time'
import { Icon } from './Icon'
import { TaskList, type Me } from './Tasks'

export function PlanView({ now, me, focus }: { now: number; me: Me; focus: string | null }) {
  const list = useRef<HTMLOListElement>(null)

  // открыли план — сразу к нужному блоку: к тому, на который нажали, или к текущему
  useEffect(() => {
    const el = list.current?.querySelector<HTMLElement>(focus ? `[data-id="${focus}"]` : '.tl__item.is-now')
    if (!el) return
    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      if (focus) {
        el.classList.remove('is-flash')
        void el.offsetWidth
        el.classList.add('is-flash')
      }
    }, 250)
    return () => clearTimeout(t)
  }, [focus])

  return (
    <section className="view">
      <header className="view__head">
        <h1 className="view__title">План дня</h1>
        <p className="view__sub">Суббота, 26 сентября</p>
      </header>

      <ol className="tl" ref={list}>
        {blocks.map((b, i) => {
          const s = at(b.start)
          const e = at(b.end)
          const state = now >= e ? 'is-past' : now >= s ? 'is-now' : ''
          const progress = Math.min(1, Math.max(0, (now - s) / (e - s)))
          const mine = me !== 'all' && b.tasks.some((t) => !isAll(t) && peopleOf(t).includes(me))
          return (
            <motion.li
              key={b.id}
              data-id={b.id}
              className={`tl__item ${state}`}
              style={{ '--accent': accent[b.kind] } as React.CSSProperties}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.035 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="tl__time">
                <b>{b.start}</b>
                <span>{b.end}</span>
              </div>
              <div className="tl__rail">
                <i className="tl__fill" style={{ transform: `scaleY(${progress})` }} />
                <i className="tl__dot" />
              </div>
              <div className="tl__card">
                <div className="tl__head">
                  <h2>{b.title}</h2>
                  {state === 'is-now' && <span className="live-pill"><span className="live-dot" /> сейчас</span>}
                  {mine && state !== 'is-now' && <span className="mine-pill">ты</span>}
                </div>
                {b.sub && <p className="tl__sub">{b.sub}</p>}
                <TaskList tasks={b.tasks} me={me} compact />
              </div>
            </motion.li>
          )
        })}
        <li className={`tl__item tl__item--end${now >= at(END) ? ' is-past' : ''}`}>
          <div className="tl__time">
            <b>{END}</b>
          </div>
          <div className="tl__rail">
            <i className="tl__dot" />
          </div>
          <div className="tl__card tl__card--end">
            <h2>Покидаем зал</h2>
          </div>
        </li>
      </ol>

      <button className="print-btn" onClick={() => window.print()}>
        <Icon name="print" size={18} /> Распечатать
      </button>
    </section>
  )
}
