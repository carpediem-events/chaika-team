import { motion } from 'motion/react'
import { accent, blocks, isAll, personById, rolesOf, tasksOf, type PersonId } from '../plan'
import { at } from '../time'
import { Avatar } from './Avatar'
import { Icon } from './Icon'

export function PersonSheet({
  id,
  now,
  isMe,
  onClose,
  onPick,
}: {
  id: PersonId
  now: number
  isMe: boolean
  onClose: () => void
  onPick: () => void
}) {
  const p = personById[id]
  return (
    <>
      <motion.div
        className="backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="sheet"
        role="dialog"
        aria-label={p.name}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) onClose()
        }}
      >
        <div className="sheet__grip" />
        <button className="sheet__close" onClick={onClose} aria-label="Закрыть">
          <Icon name="close" size={20} />
        </button>

        <div className="sheet__head">
          <Avatar id={id} size={64} />
          <div>
            <h2 className="sheet__name">{p.name}</h2>
            <p className="sheet__roles">{rolesOf(id).map((r) => r.title).join(' · ')}</p>
          </div>
        </div>

        {!isMe && (
          <button className="btn" onClick={onPick}>
            Это я
          </button>
        )}

        <ol className="day">
          {blocks.map((b) => {
            const tasks = tasksOf(b, id)
            const s = at(b.start)
            const e = at(b.end)
            const state = now >= e ? 'is-past' : now >= s ? 'is-now' : ''
            return (
              <li key={b.id} className={`day__row ${state}`}>
                <span className="day__time">{b.start}</span>
                <i className="dot" style={{ background: accent[b.kind] }} />
                <span className="day__body">
                  <span className="day__block">{b.title}</span>
                  <span className="day__tasks">
                    {tasks.length
                      ? tasks.map((t) => (
                          <span key={t.text} className={isAll(t) ? 'is-all' : ''}>
                            {t.text}
                          </span>
                        ))
                      : <span className="is-all">на подхвате</span>}
                  </span>
                </span>
              </li>
            )
          })}
        </ol>
      </motion.div>
    </>
  )
}
