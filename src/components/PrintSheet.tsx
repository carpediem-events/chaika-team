import { accent, blocks, END, isAll, peopleOf, personById, roles, venue } from '../plan'
import type { PersonId } from '../plan'
import { Burst } from './Burst'
import { Icon } from './Icon'

function Names({ ids }: { ids: PersonId[] }) {
  return (
    <>
      {ids.map((id) => (
        <span key={id} className="pn">
          <i style={{ background: personById[id].color }} />
          {personById[id].name}
        </span>
      ))}
    </>
  )
}

/** Лист A4 для стены. На экране скрыт, появляется только при печати */
export function PrintSheet() {
  return (
    <div className="print">
      <Burst size={330} className="print__burst" />

      <header className="print__head">
        <div>
          <p className="print__mark">
            CARPE DIEM <span>× the chaika</span>
          </p>
          <h1>Больше драмы</h1>
          <p className="print__sub">
            План команды · суббота, 26 сентября · {venue.name}
          </p>
        </div>
        <div className="print__qr">
          <img src="qr.svg" alt="" />
          <span>
            Живой план
            <br />
            на телефоне
          </span>
        </div>
      </header>

      <ol className="print__day">
        {blocks.map((b) => (
          <li key={b.id} className={`pr pr--${b.kind}`} style={{ '--accent': accent[b.kind] } as React.CSSProperties}>
            <div className="pr__time">
              <b>{b.start}</b>
              <span>{b.end}</span>
            </div>
            <div className="pr__rail">
              <i />
            </div>
            <div className="pr__head">
              <h2>{b.title}</h2>
              {b.sub && <p>{b.sub}</p>}
            </div>
            <ul className="pr__tasks">
              {b.tasks.map((t) => (
                <li key={t.text}>
                  <span className="pr__text">{t.text}</span>
                  <span className="pr__who">{isAll(t) ? <em>все</em> : <Names ids={peopleOf(t)} />}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li className="pr pr--end">
          <div className="pr__time">
            <b>{END}</b>
          </div>
          <div className="pr__rail">
            <i />
          </div>
          <div className="pr__head">
            <h2>Покидаем зал</h2>
          </div>
        </li>
      </ol>

      <footer className="print__roles">
        <h3>Кто за что</h3>
        <div className="print__grid">
          {roles.map((r) => (
            <div key={r.id} className={`prr${r.people.length > 3 ? ' prr--wide' : ''}`}>
              <Icon name={r.icon} size={13} />
              <b>{r.title}</b>
              <span className="pr__who">
                <Names ids={r.people} />
              </span>
            </div>
          ))}
          <div className="prr">
            <Icon name="team" size={13} />
            <b>Зал и уборка</b>
            <span className="pr__who">
              <em>все</em>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
