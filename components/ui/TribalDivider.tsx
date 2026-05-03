export function TribalDivider({ flip = false }: { flip?: boolean }) {
  // Kene pattern: diamantes aninhados preto e branco inspirados nas tecelagens Huni Kuin
  const H = 64
  const borderH = 12
  const midH = 40     // altura da faixa central
  const tileW = 40    // largura do tile = diamante quadrado

  // Centro do diamante dentro do tile
  const cx = tileW / 2  // 32
  const cy = midH / 2   // 32
  const hw = tileW / 2  // meia largura = 32
  const hh = midH / 2   // meia altura = 32

  // Quantidade de triângulos nas bordas (1440 / 16 + 1)
  const numBorderTri = 92

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
        style={{ height: Math.round(H * 0.7) }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fundo totalmente preto */}
        <rect width="1440" height={H} fill="#0F1F0F" />

        {/* === Faixa central: diamantes kene aninhados === */}
        <defs>
          <pattern
            id="kene-bw"
            width={tileW}
            height={midH}
            patternUnits="userSpaceOnUse"
            x="0"
            y={borderH}
          >
            {/* Fundo do tile */}
            <rect width={tileW} height={midH} fill="#0F1F0F" />

            {/* Camada 1 — diamante externo: branco */}
            <polygon
              points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`}
              fill="#F5EDD6"
            />
            {/* Camada 2 — anel preto (75%) */}
            <polygon
              points={`${cx},${cy - hh * 0.75} ${cx + hw * 0.75},${cy} ${cx},${cy + hh * 0.75} ${cx - hw * 0.75},${cy}`}
              fill="#0F1F0F"
            />
            {/* Camada 3 — anel branco (52%) */}
            <polygon
              points={`${cx},${cy - hh * 0.52} ${cx + hw * 0.52},${cy} ${cx},${cy + hh * 0.52} ${cx - hw * 0.52},${cy}`}
              fill="#F5EDD6"
            />
            {/* Camada 4 — anel preto (32%) */}
            <polygon
              points={`${cx},${cy - hh * 0.32} ${cx + hw * 0.32},${cy} ${cx},${cy + hh * 0.32} ${cx - hw * 0.32},${cy}`}
              fill="#0F1F0F"
            />
            {/* Camada 5 — miolo branco (14%) */}
            <polygon
              points={`${cx},${cy - hh * 0.14} ${cx + hw * 0.14},${cy} ${cx},${cy + hh * 0.14} ${cx - hw * 0.14},${cy}`}
              fill="#F5EDD6"
            />
          </pattern>
        </defs>

        {/* Faixa central preenchida com o padrão kene */}
        <rect x="0" y={borderH} width="1440" height={midH} fill="url(#kene-bw)" />

        {/* Linha de detalhe acima e abaixo da faixa central */}
        <rect y={borderH - 2} width="1440" height="2" fill="#F5EDD6" opacity="0.3" />
        <rect y={borderH + midH} width="1440" height="2" fill="#F5EDD6" opacity="0.3" />

        {/* === Borda superior: triângulos brancos apontando para baixo === */}
        {Array.from({ length: numBorderTri }).map((_, i) => (
          <polygon
            key={`t-${i}`}
            points={`${i * 16},0 ${i * 16 + 8},${borderH} ${i * 16 + 16},0`}
            fill="#F5EDD6"
          />
        ))}

        {/* Detalhe: triângulos menores na borda superior (metade do tamanho) */}
        {Array.from({ length: numBorderTri }).map((_, i) => (
          <polygon
            key={`ts-${i}`}
            points={`${i * 16 + 8},0 ${i * 16 + 12},${borderH * 0.5} ${i * 16 + 16},0`}
            fill="#0F1F0F"
          />
        ))}

        {/* === Borda inferior: triângulos brancos apontando para cima === */}
        {Array.from({ length: numBorderTri }).map((_, i) => (
          <polygon
            key={`b-${i}`}
            points={`${i * 16},${H} ${i * 16 + 8},${H - borderH} ${i * 16 + 16},${H}`}
            fill="#F5EDD6"
          />
        ))}

        {/* Detalhe: triângulos menores na borda inferior */}
        {Array.from({ length: numBorderTri }).map((_, i) => (
          <polygon
            key={`bs-${i}`}
            points={`${i * 16 + 8},${H} ${i * 16 + 12},${H - borderH * 0.5} ${i * 16 + 16},${H}`}
            fill="#0F1F0F"
          />
        ))}
      </svg>
    </div>
  )
}
