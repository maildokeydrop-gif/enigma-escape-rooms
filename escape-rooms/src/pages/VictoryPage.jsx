import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Stars from '../components/Stars'
import { useProgress } from '../hooks/useProgress'

export default function VictoryPage() {
  const { roomId } = useParams()
  const { getElapsedMinutes, progress } = useProgress(roomId)
  const [visible, setVisible] = useState(false)
  const hintsUsed = Object.keys(progress.hints).length
  const minutes = getElapsedMinutes()

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div style={{
      minHeight:'100vh',
      background:'radial-gradient(ellipse at center, #0e0820 0%, #05040a 100%)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      textAlign:'center', padding:'2rem', position:'relative', overflow:'hidden',
    }}>
      <Stars count={200} />

      <div style={{
        position:'relative', zIndex:1,
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition:'all 1.2s ease',
      }}>
        <div style={{ fontSize:'5rem', marginBottom:'1.5rem', animation:'float 3s ease-in-out infinite',
          filter:'drop-shadow(0 0 40px rgba(201,168,76,0.6))' }}>🏆</div>

        <p style={{ fontFamily:"'Cinzel'", fontSize:'0.7rem', letterSpacing:'0.4em', color:'var(--accent-gold)', textTransform:'uppercase', marginBottom:'1rem', opacity:0.7 }}>Gratulacje</p>

        <h1 className="display-font" style={{
          fontSize:'clamp(2rem, 6vw, 4rem)', marginBottom:'1rem',
          background:'linear-gradient(135deg, var(--accent-gold), #fff8e8, var(--accent-gold))',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundSize:'200%', animation:'shimmer 3s linear infinite',
        }}>Uciekłeś!</h1>

        <p style={{ color:'var(--text-muted)', maxWidth:'500px', margin:'0 auto 3rem', fontStyle:'italic', fontSize:'1.1rem', lineHeight:1.8 }}>
          Komnata Zapomnianych Snów nie zdołała cię zatrzymać.
          Tajemnica została rozwiązana.
        </p>

        <div style={{
          display:'flex', gap:'2rem', justifyContent:'center', marginBottom:'3rem', flexWrap:'wrap',
        }}>
          {[
            ['⏱', `${minutes} min`, 'Czas'],
            ['🧩', '3/3', 'Zagadki'],
            ['💡', `${hintsUsed}`, 'Wskazówki'],
          ].map(([icon, val, label]) => (
            <div key={label} style={{
              background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.2)',
              padding:'1.5rem 2rem', borderRadius:'4px', minWidth:'110px',
            }}>
              <div style={{ fontSize:'1.5rem', marginBottom:'0.3rem' }}>{icon}</div>
              <div style={{ fontFamily:"'Cinzel'", fontSize:'1.5rem', color:'var(--accent-gold)', marginBottom:'0.2rem' }}>{val}</div>
              <div style={{ fontSize:'0.7rem', color:'var(--text-faint)', fontFamily:"'Cinzel'", letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/komnaty" style={{
            fontFamily:"'Cinzel'", fontSize:'0.85rem', letterSpacing:'0.15em',
            padding:'1rem 2.5rem', background:'linear-gradient(135deg, var(--accent-gold-dim), var(--accent-gold))',
            color:'var(--bg-void)', borderRadius:'3px',
            boxShadow:'0 0 30px rgba(201,168,76,0.4)',
            transition:'all 0.3s', textTransform:'uppercase',
          }}
            onMouseEnter={e=>e.target.style.boxShadow='0 0 50px rgba(201,168,76,0.7)'}
            onMouseLeave={e=>e.target.style.boxShadow='0 0 30px rgba(201,168,76,0.4)'}>
            Więcej Komnat
          </Link>
          <Link to="/" style={{
            fontFamily:"'Cinzel'", fontSize:'0.85rem', letterSpacing:'0.15em',
            padding:'1rem 2.5rem', background:'transparent',
            color:'var(--text-muted)', borderRadius:'3px',
            border:'1px solid rgba(255,255,255,0.1)',
            transition:'all 0.3s', textTransform:'uppercase',
          }}
            onMouseEnter={e=>{ e.target.style.color='var(--text-primary)'; e.target.style.borderColor='rgba(255,255,255,0.3)' }}
            onMouseLeave={e=>{ e.target.style.color='var(--text-muted)'; e.target.style.borderColor='rgba(255,255,255,0.1)' }}>
            Strona Główna
          </Link>
        </div>
      </div>
    </div>
  )
}
