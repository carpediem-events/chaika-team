import { useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { personById, type PersonId } from './plan'
import { useNow } from './time'
import { Avatar } from './components/Avatar'
import { DayView } from './components/DayView'
import { Icon } from './components/Icon'
import { PersonSheet } from './components/PersonSheet'
import { Picker } from './components/Picker'
import { PrintSheet } from './components/PrintSheet'
import { TeamView } from './components/TeamView'
import type { Me } from './components/Tasks'

type Tab = 'day' | 'team'

const KEY = 'chaika-team:me'

function loadMe(): Me | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'all' || (v && v in personById) ? (v as Me) : null
  } catch {
    return null
  }
}

const tabs: { id: Tab; label: string; icon: 'list' | 'team' }[] = [
  { id: 'day', label: 'План', icon: 'list' },
  { id: 'team', label: 'Команда', icon: 'team' },
]

export function App() {
  const now = useNow()
  const [me, setMe] = useState<Me | null>(loadMe)
  const [picking, setPicking] = useState(false)
  const [tab, setTab] = useState<Tab>('day')
  const [sheet, setSheet] = useState<PersonId | null>(null)

  const pick = (v: Me) => {
    setMe(v)
    setPicking(false)
    setSheet(null)
    try {
      localStorage.setItem(KEY, v)
    } catch {
      /* приватный режим — просто не запомним */
    }
  }

  const who = me ?? 'all'

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <main className="main">
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0 })}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === 'day' && <DayView now={now} me={who} />}
              {tab === 'team' && <TeamView now={now} me={who} onPerson={setSheet} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <nav className="tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`tabs__btn${tab === t.id ? ' is-on' : ''}`}
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="tabs__pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <Icon name={t.icon} size={19} />
              <span>{t.label}</span>
            </button>
          ))}
          <button className="tabs__me" onClick={() => setPicking(true)} aria-label="Сменить имя">
            {who === 'all' ? (
              <span className="tabs__all">
                <Icon name="team" size={18} />
              </span>
            ) : (
              <Avatar id={who} size={38} />
            )}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {sheet && (
          <PersonSheet
            key={sheet}
            id={sheet}
            now={now}
            isMe={sheet === me}
            onClose={() => setSheet(null)}
            onPick={() => pick(sheet)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{(me === null || picking) && <Picker me={me} onPick={pick} />}</AnimatePresence>
      <PrintSheet />
    </MotionConfig>
  )
}
