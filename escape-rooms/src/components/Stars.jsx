import { useMemo } from 'react'

export default function Stars({ count = 120 }) {
  const stars = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  })), [count])

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position:'absolute', left:`${s.x}%`, top:`${s.y}%`,
          width:`${s.size}px`, height:`${s.size}px`,
          borderRadius:'50%', background:'white',
          animation:`starTwinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  )
}
