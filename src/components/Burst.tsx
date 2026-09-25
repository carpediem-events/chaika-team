/** Фирменная «вспышка» с лендинга: четыре искры, наложенные друг на друга */
export function Burst({ size = 400, className = '' }: { size?: number; className?: string }) {
  const spark = (r: number, k = 0.05) => {
    const c = 100
    const p = r * k
    return [
      `M${c},${c - r}`,
      `C${c},${c - p} ${c + p},${c} ${c + r},${c}`,
      `C${c + p},${c} ${c},${c + p} ${c},${c + r}`,
      `C${c},${c + p} ${c - p},${c} ${c - r},${c}`,
      `C${c - p},${c} ${c},${c - p} ${c},${c - r}`,
      'Z',
    ].join(' ')
  }

  return (
    <svg className={`burst ${className}`} width={size} height={size} viewBox="0 0 200 200" fill="currentColor" aria-hidden>
      <path d={spark(100, 0.035)} />
      <path d={spark(84, 0.04)} transform="rotate(45 100 100)" />
      <path d={spark(58, 0.06)} transform="rotate(22.5 100 100)" />
      <path d={spark(58, 0.06)} transform="rotate(67.5 100 100)" />
    </svg>
  )
}
