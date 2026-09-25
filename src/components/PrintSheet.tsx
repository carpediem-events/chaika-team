import { blocks, END, isAll, peopleOf, personById, roles, venue } from '../plan'

/** Лист A4 для стены. На экране скрыт, появляется только при печати */
export function PrintSheet() {
  const names = (ids: string[]) => ids.map((id) => personById[id as keyof typeof personById].name).join(', ')
  return (
    <div className="print">
      <header className="print__head">
        <div>
          <p className="print__kicker">Carpe Diem × The Chaika · команда</p>
          <h1>«Больше драмы» · план дня</h1>
        </div>
        <p className="print__meta">
          Суббота, 26.09
          <br />
          {venue.name}
        </p>
      </header>

      <table className="print__table">
        <tbody>
          {blocks.map((b) => (
            <tr key={b.id}>
              <td className="print__time">
                {b.start}
                <span>–{b.end}</span>
              </td>
              <td className="print__block">
                <b>{b.title}</b>
                {b.sub && <span>{b.sub}</span>}
              </td>
              <td>
                {b.tasks.map((t) => (
                  <div key={t.text} className="print__task">
                    <span>{t.text}</span>
                    <em>{isAll(t) ? 'все' : names(peopleOf(t))}</em>
                  </div>
                ))}
              </td>
            </tr>
          ))}
          <tr>
            <td className="print__time">{END}</td>
            <td className="print__block">
              <b>Покидаем зал</b>
            </td>
            <td />
          </tr>
        </tbody>
      </table>

      <div className="print__roles">
        {roles.map((r) => (
          <div key={r.id}>
            <b>{r.title}</b> {names(r.people)}
          </div>
        ))}
        <div>
          <b>Зал и уборка</b> все
        </div>
      </div>
    </div>
  )
}
