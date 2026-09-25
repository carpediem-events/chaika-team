import { motion } from 'motion/react'
import { people } from '../plan'
import { Avatar } from './Avatar'
import { Burst } from './Burst'
import type { Me } from './Tasks'

const ease = [0.22, 1, 0.36, 1] as const

/** «Кто ты?» — первый экран; потом открывается по тапу на своё имя в шапке */
export function Picker({ me, onPick }: { me: Me | null; onPick: (me: Me) => void }) {
  return (
    <motion.div
      className="picker"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <Burst size={560} className="picker__burst" />
      <div className="picker__inner">
        <motion.p
          className="mark"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="mark__name">CARPE DIEM</span>
          <span className="mark__sub">× the chaika</span>
        </motion.p>
        <motion.h1
          className="picker__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease }}
        >
          Кто ты?
        </motion.h1>
        <motion.p
          className="picker__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Покажем твой день
        </motion.p>

        <div className="picker__grid">
          {people.map((p, i) => (
            <motion.button
              key={p.id}
              className={`picker__btn${me === p.id ? ' is-on' : ''}`}
              onClick={() => onPick(p.id)}
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35 + 0.05 * i, duration: 0.55, ease }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar id={p.id} size={40} />
              {p.name}
            </motion.button>
          ))}
        </div>

        <motion.button
          className={`picker__all${me === 'all' ? ' is-on' : ''}`}
          onClick={() => onPick('all')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Я просто смотрю
        </motion.button>
      </div>
    </motion.div>
  )
}
