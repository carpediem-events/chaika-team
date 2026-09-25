import { motion } from 'motion/react'
import { people, personById, type PersonId } from '../plan'

export function Avatar({ id, size = 32, ring, layoutId }: { id: PersonId; size?: number; ring?: boolean; layoutId?: string }) {
  const p = personById[id]
  return (
    <motion.span
      layoutId={layoutId}
      className={`avatar${ring ? ' avatar--ring' : ''}`}
      style={{ width: size, height: size, fontSize: size * 0.46, background: p.color }}
      title={p.name}
    >
      {p.name[0]}
    </motion.span>
  )
}

/** Стопка аватаров; вся команда — одной плашкой «все» */
export function Stack({ ids, me, size = 26 }: { ids: PersonId[]; me?: PersonId | null; size?: number }) {
  if (ids.length === people.length) return <span className="all-pill">все</span>
  return (
    <span className="stack">
      {ids.map((id) => (
        <Avatar key={id} id={id} size={size} ring={id === me} />
      ))}
    </span>
  )
}
