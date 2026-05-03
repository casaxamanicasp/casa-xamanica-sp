export function TribalDivider({ flip = false }: { flip?: boolean }) {
  const H = 64          // viewBox height
  const displayH = Math.round(H * 0.7) // altura renderizada (−30%)

  const borderH = 11    // altura das bordas de triângulos
  const midH = H - borderH * 2  // 42px — faixa central dos diamantes
  const tileW = 28      // tile mais estreito → mais diamantes (densidade maior)

  const cx = tileW / 2  // centro X do tile
  const cy = midH / 2   // centro Y do tile
  const hw = tileW / 2  // meia-largura do diamante
  const hh = midH / 2   // meia-altura do diamante

  // Triângulos de borda: 1 a cada 14px
  const numBorderTri = Math.ceil(1440 / 14) + 1

  const BG = '#0F1F0F'
  const FG = '#F5EDD6'

  return (
    <div
      className="w-full overflow-hidden"
      style={{ lineHeight: 0, transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1440 ${H}`}
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: displayH }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fundo */}
        <rect width="1440" height={H} fill={BG} />

        {/* Padrão kene: diamantes aninhados */}
        <defs>
          <pattern
            id="kene-hk"
            width={tileW}
            height={midH}
            patternUnits="userSpaceOnUse"
            x="0"
            y={borderH}
          >
            {/* Fundo do tile */}
            <rect width={tileW} height={midH} fill={BG} />

            {/* Anel 1 — diamante externo (bege) */}
            <polygon
              points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`}
              fill={FG}
            />
            {/* Anel 2 — corte escuro (80%) */}
            <polygon
              points={`${cx},${cy - hh * 0.8} ${cx + hw * 0.8},${cy} ${cx},${cy + hh * 0.8} ${cx - hw * 0.8},${cy}`}
              fill={BG}
            />
            {/* Anel 3 — bege (58%) */}
            <polygon
              points={`${cx},${cy - hh * 0.58} ${cx + hw * 0.58},${cy} ${cx},${cy + hh * 0.58} ${cx - hw * 0.58},${cy}`}
              fill={FG}
            />
            {/* Anel 4 — corte escuro (36%) */}
            <polygon
              points={`${cx},${cy - hh * 0.36} ${cx + hw * 0.36},${cy} ${cx},${cy + hh * 0.36} ${cx - hw * 0.36},${cy}`}
              fill={BG}
            />
            {/* Anel 5 — miolo bege (16%) */}
            <polygon
              points={`${cx},${cy - hh * 0.16} ${cx + hw * 0.16},${cy} ${cx},${cy + hh * 0.16} ${cx - hw * 0.16},${cy}`}
              fill={FG}
            />
          </pattern>
        </defs>

        {/* Faixa central */}
        <rect x="0" y={borderH} width="1440" height={midH} fill="url(#kene-hk)" />

        {/* Linha de separação superior e inferior */}
        <rect y={borderH - 1} width="1440" height="1" fill={FG} opacity="0.4" />
        <rect y={borderH + midH} width="1440" height="1" fill={FG} opacity="0.4" />

        {/* Borda superior — triângulos apontando para baixo */}
        {Array.from({ length: numBorderTri }).map((_, i) => (
          <polygon
            key={`t-${i}`}
            points={`${i * 14},0 ${i * 14 + 7},${borderH} ${i * 14 + 14},0`}
            fill={FG}
          />
        ))}
        {/* Detalhe interno superior */}
        {Array.from({ length: numBorderTri }).map((_, i) => (
          <polygon
            key={`ti-${i}`}
            points={`${i * 14 + 7},0 ${i * 14 + 10.5},${borderH * 0.5} ${i * 14 + 14},0`}
            fill={BG}
          />
        ))}

        {/* Borda inferior — triângulos apontando para cima */}
        {Array.from({ length: numBorderTri }).map((_, i) => (
          <polygon
            key={`b-${i}`}
            points={`${i * 14},${H} ${i * 14 + 7},${H - borderH} ${i * 14 + 14},${H}`}
            fill={FG}
          />
        ))}
        {/* Detalhe interno inferior */}
        {Array.from({ length: numBorderTri }).map((_, i) => (
          <polygon
            key={`bi-${i}`}
            points={`${i * 14 + 7},${H} ${i * 14 + 10.5},${H - borderH * 0.5} ${i * 14 + 14},${H}`}
            fill={BG}
          />
        ))}
      </svg>
    </div>
  )
}
