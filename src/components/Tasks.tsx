import { motion } from 'motion/react'
import { isAll, peopleOf, roles, type PersonId, type Task } from '../plan'
import { Stack } from './Avatar'
import { Icon } from './Icon'

export type Me = PersonId | 'all'

const iconOf = (task: Task) => (isAll(task) ? 'team' : roles.find((r) => r.id === task.who[0])!.icon)

export function TaskList({ tasks, me, compact }: { tasks: Task[]; me: Me; compact?: boolean }) {
  return (
    <ul className={`tasks${compact ? ' tasks--compact' : ''}`}>
      {tasks.map((task, i) => {
        const ids = peopleOf(task)
        const personal = me !== 'all'
        const mine = personal && ids.includes(me)
        return (
          <motion.li
            key={task.text}
            className={`task${personal && mine && !isAll(task) ? ' task--mine' : ''}${personal && !mine ? ' task--other' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="task__icon">
              <Icon name={iconOf(task)} size={compact ? 16 : 18} />
            </span>
            <span className="task__text">{task.text}</span>
            <Stack ids={ids} me={personal ? me : null} size={compact ? 20 : 24} />
          </motion.li>
        )
      })}
    </ul>
  )
}
