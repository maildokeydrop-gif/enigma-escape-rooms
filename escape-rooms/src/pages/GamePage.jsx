import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { dreamRoom } from '../rooms/dreamRoom'
import { useProgress } from '../hooks/useProgress'
import Stars from '../components/Stars'

const rooms = { 'komnata-snow': dreamRoom }

function PuzzleCard({ puzzle, isSolved, onSolve, useHint, isHintUsed }) {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = () => {
    const clean = answer.trim().toLowerCase().replace(/[^a-ząćęłńóśźż]/g, '')
    if (clean === puzzle.answer) {
      setShowSuccess(true)
      onSolve(puzzle.id)
      setError('')
    } else {
      setError('Nie to... Spróbuj inaczej.')
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
    }
  }

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit() }

  if (isSolved) {
    return (
      <div style={{
        background:'linear-gradient(135deg, rgba(201,168,76,0.05), rgba(201,168,76,0.02))',
        border:'1px solid rgba(201,168,76,0.3)', borderRadius:'8px',
        padding:'2rem', marginBottom:'1.5rem',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
          <div style={{ fontSize:'1.5rem' }}>✓</div>
          <h3 style={{ color:'var(--accent-gold)', fontSize:'1.1rem' }}>{puzzle.title}</h3>
          <div style={{ marginLeft:'auto', fontSize:'0.75rem', color:'var(--accent-gold)', fontFamily:"'Cinzel'", opacity:0.6 }}>ROZWIĄZANA</div>
        </div>
        {puzzle.successText && (
          <p style={{ color:'var(--text-muted)', fontStyle:'italic', fontSize:'0.95rem', lineHeight:1.8 }}>
            {puzzle.successText}
          </p>
        )}
      </div>
    )
  }

  return (
    <div style={{
      background:'var(--bg-surface)', border:'1px solid rgba(123,79,166,0.2)',
      borderRadius:'8px', padding:'2rem', marginBottom:'1.5rem',
      animation: shaking ? 'shake 0.5s ease' : 'none',
      transition:'border-color 0.3s',
    }}>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }`}</style>

      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
        <div style={{
          width:'32px', height:'32px', borderRadius:'50%',
          border:'2px solid var(--accent-purple)', display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'0.8rem', fontFamily:"'Cinzel'", color:'var(--accent-purple)',
        }}>?</div>
        <h3 style={{ fontSize:'1.2rem', color:'var(--text-primary)' }}>{puzzle.title}</h3>
      </div>

      <div style={{
        background:'rgba(0,0,0,0.3)', border:'1px solid rgba(255,255,255,0.05)',
        borderRadius:'4px', padding:'1.5rem', marginBottom:'1.5rem',
        whiteSpace:'pre-line', fontSize:'1rem', lineHeight:2,
        color:'var(--text-muted)', fontStyle:'italic',
      }}>
        {puzzle.scene}
      </div>

      {/* Hints */}
      <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
        {[1, 2].map(hnum => (
          <div key={hnum}>
            {!isHintUsed(puzzle.id, hnum) ? (
              <button onClick={() => useHint(puzzle.id, hnum)} style={{
                fontFamily:"'Cinzel'", fontSize:'0.7rem', letterSpacing:'0.1em',
                padding:'0.4rem 1rem', background:'transparent',
                border:'1px solid rgba(201,168,76,0.3)', color:'var(--accent-gold-dim)',
                borderRadius:'2px', cursor:'pointer', textTransform:'uppercase',
                transition:'all 0.3s',
              }}
                onMouseEnter={e=>{ e.target.style.borderColor='rgba(201,168,76,0.6)'; e.target.style.color='var(--accent-gold)' }}
                onMouseLeave={e=>{ e.target.style.borderColor='rgba(201,168,76,0.3)'; e.target.style.color='var(--accent-gold-dim)' }}>
                💡 Wskazówka {hnum}
              </button>
            ) : (
              <div style={{
                padding:'0.6rem 1rem',
                background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.15)',
                borderRadius:'4px', fontSize:'0.9rem', color:'var(--text-muted)',
                fontStyle:'italic', maxWidth:'400px',
              }}>
                {hnum === 1 ? puzzle.hint1 : puzzle.hint2}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display:'flex', gap:'0.75rem' }}>
        <input
          ref={inputRef}
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Twoja odpowiedź..."
          style={{
            flex:1, background:'rgba(0,0,0,0.4)',
            border:'1px solid rgba(123,79,166,0.3)', borderRadius:'4px',
            padding:'0.8rem 1.2rem', color:'var(--text-primary)',
            fontSize:'1rem', fontFamily:"'EB Garamond', serif",
            outline:'none', transition:'border-color 0.3s',
          }}
          onFocus={e=>e.target.style.borderColor='rgba(123,79,166,0.7)'}
          onBlur={e=>e.target.style.borderColor='rgba(123,79,166,0.3)'}
        />
        <button onClick={handleSubmit} style={{
          fontFamily:"'Cinzel'", fontSize:'0.8rem', letterSpacing:'0.1em',
          padding:'0.8rem 1.5rem', background:'linear-gradient(135deg, #3d1f6e, #7b4fa6)',
          color:'white', borderRadius:'4px',
          boxShadow:'0 0 15px rgba(123,79,166,0.3)',
          transition:'all 0.3s', textTransform:'uppercase',
        }}
          onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 30px rgba(123,79,166,0.6)'}
          onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 15px rgba(123,79,166,0.3)'}>
          Potwierdź
        </button>
      </div>

      {error && (
        <p style={{ color:'var(--accent-crimson)', fontSize:'0.9rem', marginTop:'0.75rem', fontStyle:'italic' }}>
          ✗ {error}
        </p>
      )}
    </div>
  )
}

export default function GamePage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const room = rooms[roomId]
  const { progress, solvePuzzle, useHint, isHintUsed, isSolved, resetRoom, getElapsedMinutes } = useProgress(roomId)
  const [introVisible, setIntroVisible] = useState(true)
  const [time, setTime] = useState(getElapsedMinutes())

  useEffect(() => {
    const interval = setInterval(() => setTime(getElapsedMinutes()), 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (room && progress.solved.length === room.puzzles.length && progress.solved.length > 0) {
      setTimeout(() => navigate(`/zwyciestwo/${roomId}`), 1500)
    }
  }, [progress.solved, room, roomId, navigate])

  if (!room) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <p style={{ color:'var(--text-muted)', marginBottom:'1rem' }}>Komnata nie istnieje.</p>
        <Link to="/komnaty" style={{ color:'var(--accent-gold)' }}>Wróć do komnat</Link>
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight:'100vh',
      background:`radial-gradient(ellipse at top, ${room.colors.bg} 0%, var(--bg-void) 100%)`,
    }}>
      {/* Top bar */}
      <div style={{
        position:'sticky', top:0, zIndex:50,
        background:'rgba(5,4,10,0.9)', backdropFilter:'blur(10px)',
        borderBottom:'1px solid rgba(201,168,76,0.1)',
        padding:'0.8rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <Link to="/komnaty" style={{
          fontFamily:"'Cinzel'", fontSize:'0.7rem', letterSpacing:'0.1em',
          color:'var(--text-muted)', textTransform:'uppercase',
          transition:'color 0.3s',
        }}
          onMouseEnter={e=>e.target.style.color='var(--text-primary)'}
          onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>
          ← Komnaty
        </Link>

        <div style={{ fontFamily:"'Cinzel Decorative'", fontSize:'0.8rem', color:'var(--accent-gold)', letterSpacing:'0.2em' }}>ENIGMA</div>

        <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
          <div style={{ fontFamily:"'Cinzel'", fontSize:'0.7rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
            ⏱ {time} min
          </div>
          <div style={{ fontFamily:"'Cinzel'", fontSize:'0.7rem', color:'var(--accent-gold)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
            {progress.solved.length}/{room.puzzles.length} zagadek
          </div>
          <button onClick={resetRoom} style={{
            fontFamily:"'Cinzel'", fontSize:'0.65rem', letterSpacing:'0.1em',
            padding:'0.3rem 0.7rem', background:'transparent',
            border:'1px solid rgba(255,255,255,0.1)', color:'var(--text-faint)',
            borderRadius:'2px', cursor:'pointer', textTransform:'uppercase',
            transition:'all 0.3s',
          }}
            onMouseEnter={e=>{ e.target.style.borderColor='rgba(220,38,38,0.5)'; e.target.style.color='var(--accent-crimson)' }}
            onMouseLeave={e=>{ e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.color='var(--text-faint)' }}>
            Reset
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'800px', margin:'0 auto', padding:'3rem 1.5rem' }}>
        {/* Room header */}
        {introVisible && (
          <div style={{
            textAlign:'center', marginBottom:'4rem', padding:'3rem 1rem',
            position:'relative', overflow:'hidden',
          }}>
            <Stars count={40} />
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:'3.5rem', marginBottom:'1rem', animation:'float 3s ease-in-out infinite' }}>🌙</div>
              <h1 style={{ fontSize:'clamp(1.5rem, 4vw, 2.5rem)', marginBottom:'0.5rem', lineHeight:1.3 }}>{room.title}</h1>
              <p style={{ color:'var(--accent-gold)', fontFamily:"'Cinzel'", fontSize:'0.75rem', letterSpacing:'0.15em', marginBottom:'2rem', opacity:0.7 }}>{room.subtitle}</p>
              <div style={{
                background:'rgba(0,0,0,0.4)', border:'1px solid rgba(123,79,166,0.2)',
                borderRadius:'6px', padding:'2rem', maxWidth:'560px', margin:'0 auto 2rem',
                whiteSpace:'pre-line', fontStyle:'italic', color:'var(--text-muted)',
                lineHeight:2, fontSize:'1rem',
              }}>{room.intro}</div>
              <button onClick={() => setIntroVisible(false)} style={{
                fontFamily:"'Cinzel'", fontSize:'0.85rem', letterSpacing:'0.15em',
                padding:'0.9rem 2.5rem', background:'linear-gradient(135deg, #3d1f6e, #7b4fa6)',
                color:'white', borderRadius:'4px', cursor:'pointer',
                boxShadow:'0 0 30px rgba(123,79,166,0.4)', textTransform:'uppercase',
                border:'none', transition:'all 0.3s',
              }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 50px rgba(123,79,166,0.7)'}
                onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 30px rgba(123,79,166,0.4)'}>
                Wchodzę do komnaty
              </button>
            </div>
          </div>
        )}

        {/* Progress bar */}
        {!introVisible && (
          <div style={{ marginBottom:'2rem' }}>
            <div style={{
              display:'flex', justifyContent:'space-between', marginBottom:'0.5rem',
              fontFamily:"'Cinzel'", fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase',
              color:'var(--text-faint)',
            }}>
              <span>Postęp</span>
              <span style={{ color:'var(--accent-gold)' }}>{Math.round((progress.solved.length / room.puzzles.length) * 100)}%</span>
            </div>
            <div style={{ height:'2px', background:'rgba(255,255,255,0.05)', borderRadius:'1px' }}>
              <div style={{
                height:'100%', borderRadius:'1px',
                background:'linear-gradient(to right, var(--accent-purple), var(--accent-gold))',
                width:`${(progress.solved.length / room.puzzles.length) * 100}%`,
                transition:'width 0.5s ease',
              }} />
            </div>
          </div>
        )}

        {/* Puzzles */}
        {!introVisible && room.puzzles.map(puzzle => (
          <PuzzleCard
            key={puzzle.id}
            puzzle={puzzle}
            isSolved={isSolved(puzzle.id)}
            onSolve={solvePuzzle}
            useHint={useHint}
            isHintUsed={isHintUsed}
          />
        ))}

        {/* All solved message */}
        {!introVisible && progress.solved.length === room.puzzles.length && (
          <div style={{
            textAlign:'center', padding:'3rem',
            background:'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)',
          }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🚪</div>
            <h2 style={{ color:'var(--accent-gold)', marginBottom:'0.5rem' }}>Drzwi się otwierają...</h2>
            <p style={{ color:'var(--text-muted)', fontStyle:'italic' }}>Przenosisz się...</p>
          </div>
        )}
      </div>
    </div>
  )
}
