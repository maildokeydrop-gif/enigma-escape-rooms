import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isGame = location.pathname.startsWith('/gra/')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (isGame) return null

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem 3rem',
      background: scrolled ? 'rgba(5,4,10,0.95)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.7rem', textDecoration:'none' }}>
        <span style={{ fontSize:'1.4rem', color:'var(--accent-gold)' }}>⬡</span>
        <span style={{ fontFamily:"'Cinzel Decorative', serif", fontSize:'1rem', color:'var(--accent-gold)', letterSpacing:'0.2em' }}>ENIGMA</span>
      </Link>
      <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
        <Link to="/" style={{ fontFamily:"'Cinzel', serif", fontSize:'0.8rem', color:'var(--text-muted)', letterSpacing:'0.1em', textTransform:'uppercase', transition:'color 0.3s' }}
          onMouseEnter={e=>e.target.style.color='var(--text-primary)'}
          onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>Główna</Link>
        <Link to="/komnaty" style={{ fontFamily:"'Cinzel', serif", fontSize:'0.8rem', color:'var(--text-muted)', letterSpacing:'0.1em', textTransform:'uppercase', transition:'color 0.3s' }}
          onMouseEnter={e=>e.target.style.color='var(--text-primary)'}
          onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>Komnaty</Link>
        <Link to="/komnaty" style={{
          fontFamily:"'Cinzel', serif", fontSize:'0.75rem', letterSpacing:'0.15em', textTransform:'uppercase',
          padding:'0.5rem 1.2rem', background:'transparent',
          border:'1px solid var(--accent-gold)', color:'var(--accent-gold)',
          borderRadius:'2px', transition:'all 0.3s',
        }}
          onMouseEnter={e=>{ e.target.style.background='var(--accent-gold)'; e.target.style.color='var(--bg-void)' }}
          onMouseLeave={e=>{ e.target.style.background='transparent'; e.target.style.color='var(--accent-gold)' }}>Zagraj</Link>
      </div>
    </nav>
  )
}
