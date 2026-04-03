import { useState, useEffect } from 'react'
import './App.css'

const COLORS = ['#FFD89B', '#FF9A9E', '#A18CD1', '#84FAB0', '#FFF', '#FDB99B', '#A1C4FD']

function App() {
  const [stars, setStars] = useState([])
  const [confetti, setConfetti] = useState([])
  const [bursts, setBursts] = useState([])

  // Generate stars
  useEffect(() => {
    const newStars = Array.from({ length: 80 }, () => ({
      id: Math.random(),
      size: Math.random() * 2.5 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 1.5 + Math.random() * 3,
      delay: Math.random() * 4,
    }))
    setStars(newStars)
  }, [])

  // Generate confetti
  const generateConfetti = () => {
    const newConfetti = Array.from({ length: 60 }, (_, i) => ({
      id: Math.random(),
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 6,
      size: 5 + Math.random() * 7,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
    }))
    setConfetti(newConfetti)
  }

  useEffect(() => {
    generateConfetti()
    const interval = setInterval(generateConfetti, 7000)
    return () => clearInterval(interval)
  }, [])

  // Fireworks effect
  const createFireworks = () => {
    for (let b = 0; b < 5; b++) {
      setTimeout(() => {
        const burst = {
          id: Math.random(),
          left: 20 + Math.random() * 60,
          top: 10 + Math.random() * 50,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          sparks: Array.from({ length: 16 }, (_, i) => {
            const ang = (i / 16) * Math.PI * 2
            const dist = 50 + Math.random() * 60
            return {
              id: i,
              tx: Math.cos(ang) * dist,
              ty: Math.sin(ang) * dist,
              delay: Math.random() * 0.2,
            }
          }),
        }
        setBursts((prev) => [...prev, burst])
        setTimeout(() => {
          setBursts((prev) => prev.filter((b) => b.id !== burst.id))
        }, 1200)
      }, b * 220)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(createFireworks, 1200)
    const interval = setInterval(createFireworks, 5000)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              '--dur': `${star.duration}s`,
              '--delay': `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="confetti-wrap">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="cf"
            style={{
              left: `${c.left}%`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              background: c.color,
              '--dur': `${c.duration}s`,
              '--delay': `${c.delay}s`,
              borderRadius: c.borderRadius,
            }}
          />
        ))}
      </div>

      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="burst"
          style={{
            left: `${burst.left}%`,
            top: `${burst.top}%`,
          }}
        >
          {burst.sparks.map((spark) => (
            <div
              key={spark.id}
              className="spark"
              style={{
                background: burst.color,
                '--tx': `${spark.tx}px`,
                '--ty': `${spark.ty}px`,
                '--sparkDelay': `${spark.delay}s`,
              }}
            />
          ))}
        </div>
      ))}

      <div className="scene">
        <div className="card">
          <div className="balloons">
            <span className="balloon" style={{ '--f': '2.8s' }}>
              🎈
            </span>
            <span
              className="balloon"
              style={{ '--f': '3.3s', '--delay': '0.4s' }}
            >
              🎈
            </span>
            <span
              className="balloon"
              style={{ '--f': '2.6s', '--delay': '0.8s' }}
            >
              🎈
            </span>
          </div>

          <div className="name-wrap">
            <span className="dear">Happy Birthday</span>
            <div className="name">Clare</div>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-icon">✨</span>
            <div className="divider-line"></div>
          </div>

          <p className="hb-text">
            May today be as magical
            <br />
            as you make every day feel
          </p>

          <p className="message">
            The world is so much brighter because <span>you're in it</span>.
            <br />
            Wishing you a day filled with love, laughter,
            <br />
            and everything your heart desires. 🍀
          </p>

          <div className="emoji-row">
            <span className="em" style={{ '--p': '2.1s' }}>
              🎂
            </span>
            <span className="em" style={{ '--p': '2.5s', '--delay': '0.2s' }}>
              🌟
            </span>
            <span className="em" style={{ '--p': '1.9s', '--delay': '0.4s' }}>
              💝
            </span>
            <span className="em" style={{ '--p': '2.3s', '--delay': '0.6s' }}>
              🎁
            </span>
            <span className="em" style={{ '--p': '2.7s', '--delay': '0.8s' }}>
              🦋
            </span>
          </div>

          <p className="signature">~ @wilfred ~</p>
        </div>
      </div>
    </>
  )
}

export default App
