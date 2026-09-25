import { AnimatePresence, motion } from 'motion/react'

/** Цифры, которые перелистываются, как табло */
export function Ticker({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`ticker ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span className="ticker__cell" key={i} aria-hidden>
          <span className="ticker__ghost">{ch}</span>
          <AnimatePresence initial={false}>
            <motion.span
              key={ch}
              className="ticker__digit"
              initial={{ y: '70%', opacity: 0, filter: 'blur(3px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-70%', opacity: 0, filter: 'blur(3px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  )
}
