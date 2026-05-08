/**
 * KeneDivider — divisória mobile-only com padrão Kene Huni Kuin (pele da jiboia)
 * Geométrico, preto e branco, discreto.
 *
 * variant="light" → fundo creme, padrão escuro (páginas com header escuro → conteúdo claro)
 * variant="dark"  → fundo preto, padrão dourado suave (home page entre seções escuras)
 */
export function KeneDivider({
  variant = 'light',
  className,
}: {
  variant?: 'light' | 'dark'
  className?: string
}) {
  const isDark = variant === 'dark'

  // Cores do padrão
  const stroke = isDark ? '#C9A84C' : '#1a1a1a'
  const fill   = isDark ? '#C9A84C' : '#1a1a1a'
  const bg     = isDark ? '#0D0D0D' : '#F5EDD6'

  // Opacidades — mantidas baixas para discrição
  const oCorner = isDark ? 0.10 : 0.13
  const oOuter  = isDark ? 0.18 : 0.22
  const oMiddle = isDark ? 0.12 : 0.15
  const oCenter = isDark ? 0.10 : 0.13

  /*
   * Tile 18×18 — padrão jiboia:
   *   • 4 triângulos nos cantos: quando os tiles são justapostos, os triângulos
   *     de tiles vizinhos se encaixam formando losangos sólidos entre os losangos
   *     delineados — exatamente o kene jiboia Huni Kuin.
   *   • Losango externo delineado (stroke)
   *   • Losango interno delineado (stroke mais fino)
   *   • Losango central preenchido (pequeno "olho" da escama)
   */
  const tile = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">`,
    // Triângulos nos cantos
    `<polygon points="0,0 9,0 0,9" fill="${fill}" opacity="${oCorner}"/>`,
    `<polygon points="18,0 9,0 18,9" fill="${fill}" opacity="${oCorner}"/>`,
    `<polygon points="0,18 9,18 0,9" fill="${fill}" opacity="${oCorner}"/>`,
    `<polygon points="18,18 9,18 18,9" fill="${fill}" opacity="${oCorner}"/>`,
    // Losango externo
    `<polygon points="9,1 17,9 9,17 1,9" fill="none" stroke="${stroke}" stroke-width="0.75" opacity="${oOuter}"/>`,
    // Losango intermediário
    `<polygon points="9,5 13,9 9,13 5,9" fill="none" stroke="${stroke}" stroke-width="0.5" opacity="${oMiddle}"/>`,
    // Losango central preenchido ("olho")
    `<polygon points="9,7 11,9 9,11 7,9" fill="${fill}" opacity="${oCenter}"/>`,
    `</svg>`,
  ].join('')

  return (
    <div
      className={`block md:hidden w-full${className ? ' ' + className : ''}`}
      aria-hidden="true"
      style={{
        height: 36,
        lineHeight: 0,
        backgroundColor: bg,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(tile)}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '18px 18px',
      }}
    />
  )
}
