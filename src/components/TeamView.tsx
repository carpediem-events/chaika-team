import { motion } from 'motion/react'
import { isAll, people, personById, roles, rolesOf, tasksOf, type PersonId } from '../plan'
import { phaseAt } from '../time'
import { Avatar } from './Avatar'
import { Icon } from './Icon'
import type { Me } from './Tasks'

const ease = [0.22, 1, 0.36, 1] as const

/** Чем человек занят прямо сейчас — одной строкой */
export function doingNow(now: number, id: PersonId) {
  const ph = phaseAt(now)
  if (ph.kind !== 'live') return null
  const mine = tasksOf(ph.block, id)
  const own = mine.filter((t) => !isAll(t))
  return (own[0] ?? mine[0])?.text ?? 'на подхвате'
}

export function TeamView({ now, me, onPerson }: { now: number; me: Me; onPerson: (id: PersonId) => void }) {
  return (
    <section className="view">
      <div className="people">
        {people.map((p, i) => {
          const doing = doingNow(now, p.id)
          return (
            <motion.button
              key={p.id}
              className={`person${p.id === me ? ' person--me' : ''}`}
              onClick={() => onPerson(p.id)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.5, ease }}
              whileTap={{ scale: 0.97 }}
            >
              <Avatar id={p.id} size={46} />
              <span className="person__body">
                <span className="person__name">
                  {p.name}
                  {p.id === me && <span className="mine-pill">ты</span>}
                </span>
                <span className="person__roles">{rolesOf(p.id).map((r) => r.title).join(' · ')}</span>
                {doing && (
                  <span className="person__now">
                    <span className="live-dot" /> {doing}
                  </span>
                )}
              </span>
              <Icon name="arrow" size={18} className="person__arrow" />
            </motion.button>
          )
        })}
      </div>

      <h2 className="section-title">Кто за что</h2>
      <div className="roles">
        {roles.map((r, i) => (
          <motion.div
            key={r.id}
            className="role"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + 0.03 * i, duration: 0.5, ease }}
          >
            <span className="role__icon">
              <Icon name={r.icon} size={20} />
            </span>
            <span className="role__title">{r.title}</span>
            <span className="role__people">
              {r.people.map((id) => (
                <button key={id} className="chip" onClick={() => onPerson(id)}>
                  <Avatar id={id} size={20} />
                  {personById[id].name}
                </button>
              ))}
            </span>
          </motion.div>
        ))}
        <div className="role">
          <span className="role__icon">
            <Icon name="team" size={20} />
          </span>
          <span className="role__title">Зал и уборка</span>
          <span className="role__people">
            <span className="all-pill">все</span>
          </span>
        </div>
      </div>
    </section>
  )
}
