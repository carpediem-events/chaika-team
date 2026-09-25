/**
 * Весь план дня — здесь. Поменялся человек в роли — правится одна строка в `roles`,
 * задачи подтянутся сами: они привязаны к ролям, а не к именам.
 */

export const EVENT = { y: 2026, m: 9, d: 26 } // 26 сентября, суббота

export const venue = {
  name: 'Kulturzentrum GOROD',
  map: 'https://maps.app.goo.gl/9KK73kS2ksNDq4Br6',
}

export type PersonId = 'stas' | 'lera' | 'liza' | 'nastya' | 'sasha' | 'masha' | 'vlad' | 'eduard'

export type Person = { id: PersonId; name: string; color: string }

export const people: Person[] = [
  { id: 'stas', name: 'Стас', color: '#4f6f96' },
  { id: 'lera', name: 'Лера', color: '#b36f62' },
  { id: 'liza', name: 'Лиза', color: '#7d9152' },
  { id: 'nastya', name: 'Настя', color: '#8e6f9c' },
  { id: 'masha', name: 'Маша', color: '#b8697f' },
  { id: 'eduard', name: 'Эдуард', color: '#7b6553' },
  { id: 'sasha', name: 'Саша', color: '#b88b33' },
  { id: 'vlad', name: 'Влад', color: '#3f7f7a' },
]

export type RoleId =
  | 'coord' | 'host' | 'meet' | 'photo' | 'video' | 'pay' | 'hostess' | 'buffet' | 'bar' | 'tech'

export type Role = { id: RoleId; title: string; icon: IconName; people: PersonId[] }

export const roles: Role[] = [
  { id: 'coord', title: 'Координаторы', icon: 'compass', people: ['stas', 'lera'] },
  { id: 'host', title: 'Ведущие', icon: 'mic', people: ['lera', 'stas'] },
  { id: 'meet', title: 'Встреча Чайки', icon: 'star', people: ['stas'] },
  { id: 'photo', title: 'Фото', icon: 'camera', people: ['liza'] },
  { id: 'video', title: 'Видео и рилсы', icon: 'video', people: ['nastya', 'stas', 'lera', 'sasha', 'liza'] },
  { id: 'pay', title: 'Оплата', icon: 'card', people: ['sasha'] },
  { id: 'hostess', title: 'Хостес', icon: 'hand', people: ['masha', 'eduard'] },
  { id: 'buffet', title: 'Буфет', icon: 'plate', people: ['masha', 'vlad', 'eduard'] },
  { id: 'bar', title: 'Бар · чай, кофе', icon: 'cup', people: ['vlad'] },
  { id: 'tech', title: 'Техника и свет', icon: 'bulb', people: ['vlad'] },
]

export type IconName =
  | 'compass' | 'mic' | 'star' | 'camera' | 'video' | 'card' | 'hand' | 'plate' | 'cup' | 'bulb' | 'broom'

/** 'all' — вся команда */
export type Who = RoleId | 'all'

export type Task = { text: string; who: Who[] }

export type Kind = 'prep' | 'chaika' | 'guests' | 'class' | 'pause' | 'final'

/** цвет блока: подсветка «сейчас» и точки на таймлайне */
export const accent: Record<Kind, string> = {
  prep: '#8ca5c4',
  chaika: '#d6ad5c',
  guests: '#d08e6e',
  class: '#a78bc0',
  pause: '#8fb07e',
  final: '#d98ba0',
}

export type Block = {
  id: string
  start: string
  end: string
  title: string
  sub?: string
  kind: Kind
  tasks: Task[]
}

// на мастер-классе команда на подхвате — одно и то же каждый раз
const standby: Task[] = [
  { text: 'Снимаем фото и видео', who: ['photo', 'video'] },
  { text: 'Готовим кухню', who: ['buffet'] },
]

export const blocks: Block[] = [
  {
    id: 'team',
    start: '11:00',
    end: '12:00',
    title: 'Сбор команды',
    sub: 'Готовим зал',
    kind: 'prep',
    tasks: [
      { text: 'Стулья и столы', who: ['all'] },
      { text: 'Фотозона', who: ['all'] },
      { text: 'Свет', who: ['tech'] },
      { text: 'Закуски', who: ['buffet'] },
      { text: 'Снимаем команду за работой', who: ['photo', 'video'] },
    ],
  },
  {
    id: 'chaika',
    start: '12:00',
    end: '12:30',
    title: 'Приезжает Чайка',
    sub: 'Алексей и Егор',
    kind: 'chaika',
    tasks: [
      { text: 'Встретить и показать, где что', who: ['meet'] },
      { text: 'Познакомиться', who: ['all'] },
    ],
  },
  {
    id: 'guests',
    start: '12:30',
    end: '13:00',
    title: 'Приходят гости',
    kind: 'guests',
    tasks: [
      { text: 'Встречать, показывать, где что', who: ['hostess'] },
      { text: 'Принимать оплату', who: ['pay'] },
      { text: 'Интервью на камеру', who: ['video'] },
      { text: 'Знакомиться с гостями', who: ['all'] },
    ],
  },
  {
    id: 'mk1',
    start: '13:00',
    end: '14:15',
    title: 'Мастер-класс',
    sub: 'Разогрев · внимание',
    kind: 'class',
    tasks: [
      { text: 'Приветственное слово', who: ['host'] },
      { text: 'Представить Чайку', who: ['host'] },
      ...standby,
    ],
  },
  {
    id: 'p1',
    start: '14:15',
    end: '14:30',
    title: 'Пауза',
    kind: 'pause',
    tasks: [
      { text: 'Закуски', who: ['buffet'] },
      { text: 'Напитки', who: ['bar'] },
      { text: 'Орг. моменты', who: ['coord'] },
    ],
  },
  {
    id: 'mk2',
    start: '14:30',
    end: '16:00',
    title: 'Мастер-класс',
    sub: 'Тело · партнёр',
    kind: 'class',
    tasks: standby,
  },
  {
    id: 'p2',
    start: '16:00',
    end: '16:30',
    title: 'Большая пауза',
    kind: 'pause',
    tasks: [{ text: 'Основные закуски', who: ['buffet'] }],
  },
  {
    id: 'mk3',
    start: '16:30',
    end: '17:45',
    title: 'Мастер-класс',
    sub: 'Импровизация · голос',
    kind: 'class',
    tasks: standby,
  },
  {
    id: 'p3',
    start: '17:45',
    end: '18:00',
    title: 'Пауза',
    kind: 'pause',
    tasks: [
      { text: 'Закуски', who: ['buffet'] },
      { text: 'Напитки', who: ['bar'] },
      { text: 'Орг. моменты', who: ['coord'] },
    ],
  },
  {
    id: 'mk4',
    start: '18:00',
    end: '19:00',
    title: 'Мастер-класс',
    sub: 'Этюды · текст',
    kind: 'class',
    tasks: standby,
  },
  {
    id: 'final',
    start: '19:00',
    end: '20:00',
    title: 'Финал',
    sub: 'Автографы и общение',
    kind: 'final',
    tasks: [
      { text: 'Последнее слово: спасибо Чайке, упомянуть Елену Гресикову', who: ['host'] },
      { text: 'Общее фото', who: ['photo'] },
      { text: 'Видео-отзывы гостей', who: ['video'] },
      { text: 'Убрать зал', who: ['all'] },
    ],
  },
]

/** 20:00 — зал освобождаем */
export const END = '20:00'

/* ---------- выборки ---------- */

export const personById = Object.fromEntries(people.map((p) => [p.id, p])) as Record<PersonId, Person>

export function peopleOf(task: Task): PersonId[] {
  if (task.who.includes('all')) return people.map((p) => p.id)
  const ids = new Set<PersonId>()
  for (const w of task.who) roles.find((r) => r.id === w)?.people.forEach((id) => ids.add(id))
  return people.map((p) => p.id).filter((id) => ids.has(id))
}

export const isAll = (task: Task) => task.who.includes('all')

/** Задачи человека в блоке: сначала личные, потом общие */
export function tasksOf(block: Block, me: PersonId): Task[] {
  const mine = block.tasks.filter((t) => !isAll(t) && peopleOf(t).includes(me))
  const all = block.tasks.filter(isAll)
  return [...mine, ...all]
}

export const rolesOf = (me: PersonId) => roles.filter((r) => r.people.includes(me))
