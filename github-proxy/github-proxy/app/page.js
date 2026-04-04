'use client'
import { useState, useRef } from 'react'

export default function Home() {
  const [keyVal, setKeyVal] = useState('')
  const [status, setStatus] = useState({ msg: '', color: '#697896' })
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const COLORS = {
    bg:       'rgb(13,15,19)',
    surface:  'rgb(15,18,24)',
    surfaceL: 'rgb(18,21,28)',
    primary:  'rgb(26,111,232)',
    success:  'rgb(47,183,117)',
    error:    'rgb(200,80,80)',
    txtMain:  'rgb(200,210,226)',
    txtSub:   'rgb(105,120,150)',
    txtMuted: 'rgb(55,65,88)',
  }

  const doShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  const setMsg = (msg, color, clear) => {
    setStatus({ msg, color })
    if (clear) setTimeout(() => setStatus({ msg: '', color: COLORS.txtSub }), clear * 1000)
  }

  const handleVerify = async () => {
    const key = keyVal.trim()
    if (!key) {
      setMsg('! Masukkan key terlebih dahulu!', COLORS.error, 3)
      doShake(); return
    }
    setLoading(true)
    setMsg('Memverifikasi...', COLORS.primary, 0)

    try {
      const res = await fetch(`/api/raw?file=check&token=${encodeURIComponent(key)}`)
      if (res.status === 200) {
        setMsg('✓ Key valid! Redirecting...', COLORS.success, 0)
        setTimeout(() => {
          window.location.href = `/api/raw?token=${encodeURIComponent(key)}&file=script.lua`
        }, 1000)
      } else {
        setMsg('✗ Key tidak valid!', COLORS.error, 3)
        doShake()
      }
    } catch {
      setMsg('✗ Gagal konek server!', COLORS.error, 3)
      doShake()
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: COLORS.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"DM Mono", "Courier New", monospace',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(26,111,232,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(26,111,232,0.04) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 45%, rgba(26,111,232,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '340px',
        background: COLORS.surface,
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid rgba(26,111,232,0.18)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          background: COLORS.bg,
          height: '34px',
          display: 'flex', alignItems: 'center',
          padding: '0 12px',
          borderBottom: '1px solid rgba(26,111,232,0.1)',
        }}>
          <div style={{ display: 'flex', gap: '5px', marginRight: '10px' }}>
            {['rgb(200,80,80)', 'rgb(230,180,50)', 'rgb(47,183,117)'].map((c, i) => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </div>
          <span style={{ flex: 1, fontSize: '11px', fontWeight: 700, color: COLORS.txtMain, letterSpacing: '0.12em' }}>
            JS SCRIPT{' '}
            <span style={{
              display: 'inline-block', background: 'rgba(26,111,232,0.15)',
              color: 'rgb(80,140,220)', fontSize: '8px',
              padding: '1px 6px', borderRadius: '4px', letterSpacing: '0.06em',
            }}>PROTECTED</span>
          </span>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.success }} />
        </div>

        <div style={{ padding: '16px 14px 18px' }}>
          <p style={{
            textAlign: 'center', fontSize: '10px', color: COLORS.txtSub,
            letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 14px',
          }}>South Bronx The Trenches</p>

          <div style={{
            background: COLORS.surfaceL,
            borderRadius: '7px',
            border: `1px solid rgba(26,111,232,${shake ? '0.6' : '0.15'})`,
            display: 'flex', alignItems: 'center',
            height: '36px', padding: '0 10px',
            marginBottom: '10px',
            transition: 'border-color 0.2s, transform 0.05s',
            transform: shake ? 'translateX(4px)' : 'none',
          }}>
            <span style={{ fontSize: '13px', marginRight: '8px', opacity: 0.5 }}>🔑</span>
            <input
              value={keyVal}
              onChange={e => setKeyVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleVerify()}
              placeholder="Masukkan key..."
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: COLORS.txtMain, fontFamily: 'inherit', fontSize: '12px',
              }}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            style={{
              width: '100%', height: '34px',
              background: loading ? 'rgb(20,80,170)' : COLORS.primary,
              border: 'none', borderRadius: '7px',
              color: '#fff', fontFamily: 'inherit',
              fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.1em', cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '10px', transition: 'background 0.15s',
            }}
          >
            {loading ? 'Checking...' : 'CONTINUE >'}
          </button>

          <p style={{
            textAlign: 'center', fontSize: '10px',
            minHeight: '14px', letterSpacing: '0.05em',
            margin: '0 0 12px', color: status.color,
          }}>{status.msg}</p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(26,111,232,0.08)', margin: '0 0 10px' }} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            {['Get Key', 'Discord', 'v3.1'].map((t, i) => (
              <span key={i} style={{
                fontSize: '9px', color: COLORS.txtMuted,
                letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgb(55,65,88); }
      `}</style>
    </main>
  )
}
