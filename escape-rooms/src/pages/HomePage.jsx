import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Stars from '../components/Stars'

function OrbitalRing({ size, speed, opacity }) {
  return (
    <div style={{
      position:'absolute', width:`${size}px`, height:`${size}px`,
      border:`1px solid rgba(201,168,76,${opacity})`,
      borderRadius:'50%',
      top:'50%', left:'50%',
      transform:'translate(-50%,-50%)',
      animation:`spin-slow ${speed}s linear infinite`,
    }} />
  )
}

export default function HomePage() {
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{
        position:'relative', minHeight:'100vh',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        overflow:'hidden', textAlign:'center',
        background:'radial-gradient(ellipse at center, #0e0820 0%, #05040a 70%)',
      }}>
        <Stars count={150} />

        {/* Orbital rings */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }}>
          <OrbitalRing size={700} speed={60} opacity={0.06} />
          <OrbitalRing size={500} speed={40} opacity={0.08} />
          <OrbitalRing size={320} speed={25} opacity={0.12} />
          <OrbitalRing size={180} speed={15} opacity={0.18} />
        </div>

        {/* Central glyph */}
        <div style={{
          fontSize:'5rem', marginBottom:'2rem',
          animation:'float 4s ease-in-out infinite',
          filter:'drop-shadow(0 0 30px rgba(201,168,76,0.5))',
          position:'relative', zIndex:2,
        }}>⬡</div>

        <div style={{ position:'relative', zIndex:2, padding:'0 2rem' }}>
          <p style={{
            fontFamily:"'Cinzel', serif", fontSize:'0.75rem', letterSpacing:'0.4em',
            color:'var(--accent-gold)', textTransform:'uppercase', marginBottom:'1.5rem', opacity:0.8,
          }}>Przekrocz próg niepoznanego</p>

          <h1 className="display-font" style={{
            fontSize:'clamp(3rem, 8vw, 7rem)', lineHeight:1.1,
            color:'var(--text-primary)',
            textShadow:'0 0 60px rgba(201,168,76,0.2)',
            marginBottom:'1.5rem',
          }}>
            ENIGMA
          </h1>

          <p style={{
            fontSize:'clamp(1rem, 2vw, 1.3rem)', color:'var(--text-muted)',
            maxWidth:'550px', margin:'0 auto 3rem',
            fontStyle:'italic', lineHeight:1.8,
          }}>
            Immersyjne komnaty zagadek, gdzie każda odpowiedź otwiera nowe drzwi,
            a każde drzwi skrywają kolejną tajemnicę.
          </p>

          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/komnaty" style={{
              fontFamily:"'Cinzel', serif", fontSize:'0.85rem', letterSpacing:'0.15em',
              textTransform:'uppercase', padding:'1rem 2.5rem',
              background:'linear-gradient(135deg, var(--accent-gold-dim), var(--accent-gold))',
              color:'var(--bg-void)', borderRadius:'2px',
              boxShadow:'0 0 30px rgba(201,168,76,0.3)',
              transition:'all 0.3s', display:'block',
            }}
              onMouseEnter={e=>{ e.target.style.boxShadow='0 0 50px rgba(201,168,76,0.6)'; e.target.style.transform='translateY(-2px)' }}
              onMouseLeave={e=>{ e.target.style.boxShadow='0 0 30px rgba(201,168,76,0.3)'; e.target.style.transform='translateY(0)' }}>
              Wejdź do Komnat
            </Link>
            <a href="#jak-to-dziala" style={{
              fontFamily:"'Cinzel', serif", fontSize:'0.85rem', letterSpacing:'0.15em',
              textTransform:'uppercase', padding:'1rem 2.5rem',
              background:'transparent', color:'var(--text-muted)',
              border:'1px solid rgba(255,255,255,0.1)', borderRadius:'2px',
              transition:'all 0.3s', display:'block',
            }}
              onMouseEnter={e=>{ e.target.style.color='var(--text-primary)'; e.target.style.borderColor='rgba(255,255,255,0.3)' }}
              onMouseLeave={e=>{ e.target.style.color='var(--text-muted)'; e.target.style.borderColor='rgba(255,255,255,0.1)' }}>
              Jak to działa?
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem', opacity:0.4,
        }}>
          <span style={{ fontSize:'0.65rem', letterSpacing:'0.3em', fontFamily:"'Cinzel'", textTransform:'uppercase' }}>Przewiń</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, var(--accent-gold), transparent)', animation:'float 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="jak-to-dziala" style={{
        padding:'8rem 2rem',
        background:'linear-gradient(to bottom, var(--bg-void), var(--bg-deep))',
        textAlign:'center',
      }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <p style={{ fontFamily:"'Cinzel'", fontSize:'0.7rem', letterSpacing:'0.4em', color:'var(--accent-gold)', textTransform:'uppercase', marginBottom:'1rem', opacity:0.7 }}>Mechanika</p>
          <h2 style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)', marginBottom:'1rem', color:'var(--text-primary)' }}>Jak działają Komnaty?</h2>
          <p style={{ color:'var(--text-muted)', maxWidth:'550px', margin:'0 auto 5rem', fontStyle:'italic' }}>
            Każda komnata to oddzielny świat — inna atmosfera, inne zasady, inne sekrety.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'2rem' }}>
            {[
              { icon:'🕯', title:'Wejdź', desc:'Zanurzasz się w historię i atmosferę komnaty. Każdy detal ma znaczenie.' },
              { icon:'🔍', title:'Badaj', desc:'Obserwuj, czytaj, myśl. Zagadki ukryte są w słowach, symbolach i ciszy.' },
              { icon:'💡', title:'Rozwiązuj', desc:'Podajesz odpowiedzi tekstowo. Wskazówki dostępne gdy utkniesz.' },
              { icon:'🚪', title:'Ucieknij', desc:'Przejdź przez wszystkie zagadki i wydostań się z komnaty!' },
            ].map((item, i) => (
              <div key={i} className="reveal" style={{
                opacity:0, background:'var(--bg-surface)',
                border:'1px solid rgba(201,168,76,0.1)',
                padding:'2.5rem 1.5rem', borderRadius:'4px',
                transition:`all 0.6s ease ${i * 0.15}s`,
              }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(201,168,76,0.3)'; e.currentTarget.style.transform='translateY(-4px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(201,168,76,0.1)'; e.currentTarget.style.transform='translateY(0)' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize:'1.1rem', color:'var(--accent-gold)', marginBottom:'0.8rem' }}>{item.title}</h3>
                <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ROOM */}
      <section style={{
        padding:'5rem 2rem 8rem',
        background:'linear-gradient(to bottom, var(--bg-deep), var(--bg-void))',
        textAlign:'center',
      }}>
        <div style={{ maxWidth:'700px', margin:'0 auto' }}>
          <p style={{ fontFamily:"'Cinzel'", fontSize:'0.7rem', letterSpacing:'0.4em', color:'var(--accent-gold)', textTransform:'uppercase', marginBottom:'1rem', opacity:0.7 }}>Teraz dostępna</p>
          <h2 style={{ fontSize:'clamp(1.5rem, 3vw, 2.5rem)', marginBottom:'2rem' }}>Komnata Zapomnianych Snów</h2>
          
          <div style={{
            background:'radial-gradient(ellipse at top, #1a0d3a 0%, var(--bg-surface) 100%)',
            border:'1px solid rgba(123,79,166,0.3)',
            borderRadius:'8px', padding:'3rem 2rem', marginBottom:'2.5rem',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', top:0, left:0, right:0, height:'2px',
              background:'linear-gradient(to right, transparent, var(--accent-purple-bright), transparent)',
            }} />
            <div style={{ fontSize:'3rem', marginBottom:'1rem', animation:'float 3s ease-in-out infinite' }}>🌙</div>
            <p style={{ fontStyle:'italic', color:'var(--text-muted)', lineHeight:1.9, marginBottom:'1.5rem' }}>
              "Budzisz się w miejscu, którego nie pamiętasz. Powietrze pachnie starym pergaminem i dymem świec.
              Drzwi są zamknięte. Klucz ukryty jest w twoich snach."
            </p>
            <div style={{ display:'flex', justifyContent:'center', gap:'2rem', flexWrap:'wrap' }}>
              {[['⚡','Trudność','Tajemniczy'], ['🧩','Zagadki','3'], ['⏱','Czas','~30 min']].map(([icon, label, val]) => (
                <div key={label} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'1.2rem' }}>{icon}</div>
                  <div style={{ fontSize:'0.7rem', color:'var(--text-faint)', fontFamily:"'Cinzel'", textTransform:'uppercase', letterSpacing:'0.1em' }}>{label}</div>
                  <div style={{ color:'var(--accent-gold)', fontFamily:"'Cinzel'" }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/gra/komnata-snow" style={{
            fontFamily:"'Cinzel', serif", fontSize:'1rem', letterSpacing:'0.1em',
            padding:'1.1rem 3rem', display:'inline-block',
            background:'linear-gradient(135deg, #3d1f6e, #7b4fa6)',
            color:'white', borderRadius:'4px',
            boxShadow:'0 0 40px rgba(123,79,166,0.4)',
            transition:'all 0.3s',
          }}
            onMouseEnter={e=>{ e.target.style.boxShadow='0 0 60px rgba(123,79,166,0.7)'; e.target.style.transform='translateY(-2px)' }}
            onMouseLeave={e=>{ e.target.style.boxShadow='0 0 40px rgba(123,79,166,0.4)'; e.target.style.transform='translateY(0)' }}>
            Wejdź do komnaty →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding:'2rem', textAlign:'center', borderTop:'1px solid rgba(201,168,76,0.08)',
      }}>
        <p style={{ color:'var(--text-faint)', fontSize:'0.8rem', fontFamily:"'Cinzel'", letterSpacing:'0.15em' }}>
          ⬡ ENIGMA · Komnaty Zagadek · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
