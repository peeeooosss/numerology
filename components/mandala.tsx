export function Mandala({ reverse = false }: { reverse?: boolean }) {
  return <svg viewBox="0 0 400 400" className={`h-full w-full ${reverse ? "animate-[spin-slow_100s_linear_infinite_reverse]" : "animate-spin-slow"}`} aria-hidden="true">
    <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth=".6" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth=".6" />
    <g fill="currentColor" fontFamily="serif" fontSize="16" textAnchor="middle"><text x="200" y="34">1</text><text x="316" y="90">2</text><text x="360" y="205">3</text><text x="316" y="320">4</text><text x="200" y="376">5</text><text x="84" y="320">6</text><text x="40" y="205">7</text><text x="84" y="90">8</text></g>
  </svg>;
}
