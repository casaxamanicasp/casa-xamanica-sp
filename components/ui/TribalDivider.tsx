export function TribalDivider({ flip = false }: { flip?: boolean }) {
  const diamonds = Array.from({ length: 73 })
  const trianglesTop = Array.from({ length: 61 })
  const trianglesBottom = Array.from({ length: 61 })

  return (
    <div
      className="w-full overflow-hidden"
      style={{ lineHeight: 0, transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: 64 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Terracotta top band */}
        <rect width="1440" height="14" fill="#7A2E2E" />

        {/* Cream triangles pointing down at top edge */}
        {trianglesTop.map((_, i) => (
          <polygon
            key={`tt-${i}`}
            points={`${i * 24},0 ${i * 24 + 12},14 ${i * 24 + 24},0`}
            fill="#F5EDD6"
          />
        ))}

        {/* Black middle band */}
        <rect y="14" width="1440" height="36" fill="#111111" />

        {/* Gold diamonds in middle band */}
        {diamonds.map((_, i) => (
          <polygon
            key={`d-${i}`}
            points={`${i * 20 + 10},14 ${i * 20 + 20},32 ${i * 20 + 10},50 ${i * 20},32`}
            fill="#C9A84C"
          />
        ))}

        {/* Small black center of each diamond */}
        {diamonds.map((_, i) => (
          <polygon
            key={`dc-${i}`}
            points={`${i * 20 + 10},22 ${i * 20 + 16},32 ${i * 20 + 10},42 ${i * 20 + 4},32`}
            fill="#111111"
          />
        ))}

        {/* Forest green bottom band */}
        <rect y="50" width="1440" height="14" fill="#2D4A2D" />

        {/* Cream triangles pointing up at bottom edge */}
        {trianglesBottom.map((_, i) => (
          <polygon
            key={`tb-${i}`}
            points={`${i * 24},64 ${i * 24 + 12},50 ${i * 24 + 24},64`}
            fill="#F5EDD6"
          />
        ))}
      </svg>
    </div>
  )
}
