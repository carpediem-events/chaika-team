import type { IconName } from '../plan'

type Name = IconName | 'now' | 'list' | 'team' | 'print' | 'pin' | 'arrow' | 'close' | 'check'

const paths: Record<Name, string> = {
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z',
  mic: 'M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm-6-3a6 6 0 0 0 12 0M12 18v3m-3 0h6',
  star: 'M12 3c.4 4.6 1.9 7.6 9 9-7.1 1.4-8.6 4.4-9 9-.4-4.6-1.9-7.6-9-9 7.1-1.4 8.6-4.4 9-9Z',
  camera: 'M4 8h3l1.5-2.5h7L17 8h3v11H4V8Zm8 8.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  video: 'M3 7h12v10H3V7Zm12 3.5L21 7v10l-6-3.5',
  card: 'M3 6h18v12H3V6Zm0 4h18M7 15h4',
  hand: 'M8 13V6.5a1.5 1.5 0 0 1 3 0V12m0-6.5V5a1.5 1.5 0 0 1 3 0v7m0-5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7c-2.6 0-4-1.2-5.5-3.4L4 14.8a1.5 1.5 0 0 1 2.4-1.8L8 15',
  plate: 'M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM3 4v5a2 2 0 0 0 2 2v9M21 4c-1.5 1-2 3-2 5s.5 2 2 2v9',
  cup: 'M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Zm11 1.5h1.5a2.5 2.5 0 0 1 0 5H16M9 3.5c-.6.8-.6 1.7 0 2.5m3-2.5c-.6.8-.6 1.7 0 2.5',
  bulb: 'M9 17h6m-5 3.5h4M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.8.5 1.3V17h6v-1.8c0-.5.2-1 .5-1.3A6 6 0 0 0 12 3Z',
  broom: 'M14.5 3.5 11 11m-4.5 1.5 6 3-1.5 5.5c-3.5-.5-6.5-2.5-8-5.5l3.5-3Z',
  now: 'M12 3c.4 4.6 1.9 7.6 9 9-7.1 1.4-8.6 4.4-9 9-.4-4.6-1.9-7.6-9-9 7.1-1.4 8.6-4.4 9-9Z',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  team: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9c0-3.3 2.7-6 6-6s6 2.7 6 6m1-9a3 3 0 1 0 0-6m2.5 15c0-2.5-1.3-4.7-3.3-5.8',
  print: 'M7 9V3h10v6M7 17H4v-8h16v8h-3M7 14h10v7H7v-7Z',
  pin: 'M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M5 12.5l4.5 4.5L19 7',
}

export function Icon({ name, size = 22, className }: { name: Name; size?: number; className?: string }) {
  const filled = name === 'now' || name === 'star'
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={paths[name]} />
    </svg>
  )
}
