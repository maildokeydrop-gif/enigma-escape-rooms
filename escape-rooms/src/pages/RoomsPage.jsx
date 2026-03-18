import { Link } from 'react-router-dom'
import Stars from '../components/Stars'

const rooms = [
  {
    id: 'komnata-snow',
    title: 'Komnata Zapomnianych Snów',
    desc: 'Obudź się w świecie, który nie jest twój. Trzy zagadki stoją między tobą a przebudzeniem.',
    difficulty: 2,
    difficultyLabel: 'Tajemniczy',
    puzzles: 3,
    time: '~30 min',
    theme: 'dream',
    icon: '🌙',
    color: '#7b4fa6',
    available: true,
  },
  {
    id: 'katakumby',
    title: 'Katakumby Zapomnianych',
    desc: 'Głęboko pod ziemią. Cisza, która oddycha. Wyjście istnieje — jeśli wiesz, czego szukać.',
    difficulty: 3,
    difficultyLabel: 'Mroczny',
    puzzles: 5,
    time: '~45 min',
    theme: 'horror',
    icon: '💀',
    color: '#dc2626',
    available: false,
  },
  {
    id: 'obserwatorium',
    title: 'Obserwatorium Końca',
    desc: 'Gwiazdy umierają. Astronom zostawił wiadomość. Czas ma znaczenie.',
    difficulty: 4,
    difficultyLabel: 'Kosmiczny',
    puzzles: 4,
    time: '~40 min',
    theme: 'scifi',
    icon: '🔭',
    color: '#2dd4bf',
    available: false,
  },
]

function DifficultyDots({ level }) {
  return (
    <div style={{ display:'flex', gap:'4px' }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width:'8px', height:'8px', borderRadius:'50%',
          background: i <= level ? 'var(--accent-gold)' : 'rgba(201,168,76,0.2)',
        }} />
      ))}
    </div>
  )
}

export default function RoomsPage() {
  return (
    <div style={{ minHeight:'100vh', paddingTop:'5rem' }}>
      <div style={{
        position:'relative',
        background:'radial-gradient(ellipse at top, #0e0820 0%, var(--bg-void) 60%)',
        padding:'5rem 2rem 4rem', textAlign:'center', overflow:'hidden',
      }}>
        <Stars count={80} />
        <div style={{ position:'relative', zIndex:1 }}>
          <p style={{ fontFamily:"'Cinzel'", fontSize:'0.7rem', letterSpacing:'0.4em', color:'var(--accent-gold)', textTransform:'uppercase', marginBottom:'1rem', opacity:0.7 }}>Wybierz swoje przeznaczenie</p>
          <h1 style={{ fontSize:'clamp(2rem, 5vw, 4rem)', marginBottom:'1rem' }}>Komnaty</h1>
          <p style={{ color:'var(--text-muted)', maxWidth:'500px', margin:'0 auto', fontStyle:'italic' }}>
            Każda komnata to osobny świat. Żadna nie jest taka sama.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'4rem 2rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'1.5rem' }}>
          {rooms.map(room => (
            <div key={room.id} style={{
              background:`linear-gradient(160deg, ${room.color}15 0%, var(--bg-surface) 100%)`,
              border:`1px solid ${room.color}30`,
              borderRadius:'8px', overflow:'hidden',
              transition:'all 0.3s',
              opacity: room.available ? 1 : 0.6,
              position:'relative',
            }}
              onMouseEnter={e=>{ if(room.available) { e.currentTarget.style.borderColor=`${room.color}60`; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 20px 40px ${room.color}20` }}}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${room.color}30`; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>

              <div style={{
                height:'4px',
                background:`linear-gradient(to right, transparent, ${room.color}, transparent)`,
              }} />

              {!room.available && (
                <div style={{
                  position:'absolute', top:'1rem', right:'1rem',
                  background:'rgba(0,0,0,0.6)', border:'1px solid rgba(255,255,255,0.1)',
                  padding:'0.2rem 0.7rem', borderRadius:'2px',
                  fontSize:'0.65rem', fontFamily:"'Cinzel'", letterSpacing:'0.1em', color:'var(--text-muted)',
                  textTransform:'uppercase',
                }}>Wkrótce</div>
              )}

              <div style={{ padding:'2rem' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>{room.icon}</div>
                <h2 style={{ fontSize:'1.2rem', marginBottom:'0.5rem', lineHeight:1.3 }}>{room.title}</h2>
                <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', marginBottom:'1.5rem', lineHeight:1.7 }}>{room.desc}</p>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'0.5rem' }}>
                  <div>
                    <div style={{ fontSize:'0.65rem', fontFamily:"'Cinzel'", letterSpacing:'0.1em', color:'var(--text-faint)', textTransform:'uppercase', marginBottom:'0.3rem' }}>Trudność</div>
                    <DifficultyDots level={room.difficulty} />
                    <div style={{ fontSize:'0.75rem', color:`${room.color}`, fontFamily:"'Cinzel'", marginTop:'0.2rem' }}>{room.difficultyLabel}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:'0.7rem', color:'var(--text-faint)', fontFamily:"'Cinzel'", textTransform:'uppercase', letterSpacing:'0.1em' }}>🧩 {room.puzzles} zagadki · ⏱ {room.time}</div>
                  </div>
                </div>

                {room.available ? (
                  <Link to={`/gra/${room.id}`} style={{
                    display:'block', width:'100%', textAlign:'center',
                    fontFamily:"'Cinzel'", fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase',
                    padding:'0.9rem', background:`linear-gradient(135deg, ${room.color}80, ${room.color})`,
                    color:'white', borderRadius:'3px',
                    boxShadow:`0 0 20px ${room.color}40`,
                    transition:'all 0.3s',
                  }}
                    onMouseEnter={e=>{ e.target.style.boxShadow=`0 0 40px ${room.color}70` }}
                    onMouseLeave={e=>{ e.target.style.boxShadow=`0 0 20px ${room.color}40` }}>
                    Wejdź →
                  </Link>
                ) : (
                  <div style={{
                    display:'block', width:'100%', textAlign:'center',
                    fontFamily:"'Cinzel'", fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase',
                    padding:'0.9rem', background:'rgba(255,255,255,0.03)',
                    color:'var(--text-faint)', borderRadius:'3px',
                    border:'1px solid rgba(255,255,255,0.08)',
                  }}>Niedostępna</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
