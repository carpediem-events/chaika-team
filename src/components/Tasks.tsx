import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { isAll, peopleOf, personById, roles, type PersonId, type Task } from '../plan'
import { Avatar, Stack } from './Avatar'
import { Icon } from './Icon'

export type Me = PersonId | 'all'

const ease = [0.22, 1, 0.36, 1] as const

const iconOf = (task: Task) => (isAll(task) ? 'team' : roles.find((r) => r.id === task.who[0])!.icon)

/** Задачи блока. Тап по задаче раскрывает её: кто именно, по именам */
export function TaskList({ tasks, me, compact }: { tasks: Task[]; me: Me; compact?: boolean }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <ul className={`tasks${compact ? ' tasks--compact' : ''}`}>
      {tasks.map((task, i) => {
        const ids = peopleOf(task)
        const personal = me !== 'all'
        const mine = personal && ids.includes(me)
        const isOpen = open === task.text
        return (
          <motion.li
            key={task.text}
            className={`task${personal && mine && !isAll(task) ? ' task--mine' : ''}${personal && !mine ? ' task--other' : ''}${isOpen ? ' is-open' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.45, ease }}
          >
            <button className="task__row" onClick={() => setOpen(isOpen ? null : task.text)} aria-expanded={isOpen}>
              <span className="task__icon">
                <Icon name={iconOf(task)} size={compact ? 16 : 18} />
              </span>
              <span className="task__text">{task.text}</span>
              <span className="task__stack">
                <Stack ids={ids} me={personal ? me : null} size={compact ? 20 : 24} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="task__names"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <div className="task__names-in">
                    {ids.map((id, k) => (
                      <motion.span
                        key={id}
                        className={`name${id === me ? ' name--me' : ''}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.03 * k, duration: 0.3, ease }}
                      >
                        <Avatar id={id} size={22} />
                        {personById[id].name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        )
      })}
    </ul>
  )
}
