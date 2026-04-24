'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function GetKeyContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || searchParams.get('r') || searchParams.get('subid')
  const [status, setStatus] = useState('ready')
  const [key, setKey] = useState('')
  const [expired, setExpired] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [copiedKey, setCopiedKey] = useState(false)

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorMsg('Token tidak ditemukan. Kembali ke Discord dan klik tombol Free Key.')
    }
  }, [token])

  const generateKey = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/getkey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      const data = await res.json()
      if (data.success) {
        setKey(data.key)
        setExpired(data.expired)
        setStatus('success')
      } else {
        setErrorMsg(data.error || 'Terjadi kesalahan')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Gagal konek ke server')
      setStatus('error')
    }
  }

  const copyKey = () => {
    navigator.clipboard.writeText(key)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;900&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 40%, #080810 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Share Tech Mono', monospace; padding: 1rem;
        }
        .bg-grid {
          position: fixed; inset: 0;
          background-image: linear-gradient(rgba(26,111,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,111,232,0.03) 1px, transparent 1px);
          background-size: 40px 40px; z-index: 0;
        }
        .bg-glow {
          position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(26,111,232,0.08) 0%, transparent 70%);
          z-index: 0; pointer-events: none;
        }
        .wrapper { position: relative; z-index: 1; width: 100%; max-width: 420px; }
        .card {
          background: rgba(10,10,20,0.95); border: 1px solid rgba(26,111,232,0.3);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 0 40px rgba(26,111,232,0.1), 0 20px 60px rgba(0,0,0,0.5);
        }
        .topbar {
          background: rgba(26,111,232,0.08); border-bottom: 1px solid rgba(26,111,232,0.2);
          padding: 14px 20px; display: flex; align-items: center; gap: 10px;
        }
        .logo-dot { width: 8px; height: 8px; border-radius: 50%; background: rgb(26,111,232); box-shadow: 0 0 8px rgb(26,111,232); animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .topbar-title { font-family: 'Orbitron', monospace; font-size: 11px; font-weight: 900; color: rgb(200,215,255); letter-spacing: 0.2em; flex: 1; }
        .badge { font-size: 9px; padding: 3px 8px; border-radius: 20px; font-family: 'Share Tech Mono', monospace; letter-spacing: 0.1em; }
        .badge-blue { background: rgba(26,111,232,0.2); color: rgb(100,160,255); border: 1px solid rgba(26,111,232,0.3); }
        .badge-green { background: rgba(46,204,113,0.15); color: rgb(46,204,113); border: 1px solid rgba(46,204,113,0.3); }
        .badge-red { background: rgba(255,80,80,0.15); color: rgb(255,100,100); border: 1px solid rgba(255,80,80,0.3); }
        .body { padding: 28px 22px 26px; }
        .subtitle { text-align: center; font-size: 9px; color: rgba(100,120,180,0.7); letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 24px; }
        .ready-icon { text-align: center; font-size: 48px; margin-bottom: 14px; animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .ready-title { font-family: 'Orbitron', monospace; font-size: 14px; font-weight: 900; color: rgb(200,215,255); text-align: center; margin-bottom: 6px; letter-spacing: 0.1em; }
        .ready-sub { text-align: center; font-size: 10px; color: rgba(100,130,200,0.6); margin-bottom: 28px; }
        .spinner-wrap { display: flex; justify-content: center; padding: 40px 0; }
        .spinner { width: 40px; height: 40px; border: 3px solid rgba(26,111,232,0.15); border-top-color: rgb(26,111,232); border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .success-icon { text-align: center; font-size: 44px; margin-bottom: 12px; }
        .success-title { font-family: 'Orbitron', monospace; font-size: 13px; font-weight: 900; color: rgb(46,204,113); text-align: center; letter-spacing: 0.1em; margin-bottom: 4px; }
        .success-sub { text-align: center; font-size: 9px; color: rgba(46,204,113,0.5); margin-bottom: 20px; letter-spacing: 0.1em; }
        .key-box { background: rgba(26,111,232,0.06); border: 1px solid rgba(26,111,232,0.25); border-radius: 10px; padding: 14px 16px; margin-bottom: 12px; }
        .key-label { font-size: 8px; color: rgba(26,111,232,0.7); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 8px; }
        .key-value { font-size: 13px; color: rgb(200,225,255); word-break: break-all; line-height: 1.6; letter-spacing: 0.05em; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
        .info-cell { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 8px 10px; text-align: center; }
        .info-cell-label { font-size: 8px; color: rgba(100,120,180,0.6); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
        .info-cell-val { font-size: 10px; color: rgb(180,200,255); }
        .info-cell-val.green { color: rgb(46,204,113); }
        .btn { width: 100%; padding: 13px; border-radius: 10px; border: none; font-family: 'Orbitron', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; cursor: pointer; margin-bottom: 10px; transition: all 0.2s; }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn:active { transform: translateY(0); }
        .btn-green { background: linear-gradient(135deg, rgb(46,204,113), rgb(39,174,96)); color: rgb(10,15,20); }
        .error-icon { font-size: 44px; text-align: center; margin-bottom: 12px; }
        .error-title { font-family: 'Orbitron', monospace; font-size: 13px; font-weight: 900; color: rgb(255,100,100); text-align: center; letter-spacing: 0.1em; margin-bottom: 8px; }
        .error-msg { text-align: center; font-size: 10px; color: rgba(180,200,255,0.5); line-height: 1.7; }
        .hint { text-align: center; font-size: 9px; color: rgba(100,120,180,0.5); margin-top: 12px; line-height: 1.7; }
      `}</style>

      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="wrapper">
        <div className="card">
          <div className="topbar">
            <div className="logo-dot" />
            <span className="topbar-title">JS SCRIPT</span>
            <span className={`badge ${status === 'success' ? 'badge-green' : status === 'error' ? 'badge-red' : 'badge-blue'}`}>
              {status === 'loading' ? 'LOADING...' : status === 'success' ? 'KEY READY' : status === 'error' ? 'ERROR' : 'READY'}
            </span>
          </div>
          <div className="body">
            <p className="subtitle">South Bronx The Trenches</p>

            {status === 'ready' && (
              <>
                <div className="ready-icon">🎁</div>
                <div className="ready-title">Siap Generate Key!</div>
                <div className="ready-sub">Kamu sudah melewati iklan dengan sukses</div>
                <button className="btn btn-green" onClick={generateKey}>✨ GENERATE KEY GRATIS</button>
                <div className="hint">Key berlaku 1 hari • 1x per hari<br/>Gunakan key langsung di script Roblox</div>
              </>
            )}

            {status === 'loading' && (
              <div className="spinner-wrap"><div className="spinner" /></div>
            )}

            {status === 'success' && (
              <>
                <div className="success-icon">🎉</div>
                <div className="success-title">KEY BERHASIL!</div>
                <div className="success-sub">AKTIF 1 HARI • GUNAKAN DI SCRIPT</div>
                <div className="key-box">
                  <div className="key-label">🔑 Key Kamu</div>
                  <div className="key-value">{key}</div>
                </div>
                <button className="btn btn-green" onClick={copyKey}>
                  {copiedKey ? '✅ TERSALIN!' : '📋 COPY KEY'}
                </button>
                <div className="info-grid">
                  <div className="info-cell">
                    <div className="info-cell-label">Status</div>
                    <div className="info-cell-val green">● Aktif</div>
                  </div>
                  <div className="info-cell">
                    <div className="info-cell-label">Expired</div>
                    <div className="info-cell-val">{expired}</div>
                  </div>
                  <div className="info-cell">
                    <div className="info-cell-label">Device</div>
                    <div className="info-cell-val">1</div>
                  </div>
                </div>
                <div className="hint">Key sudah aktif • Masukkan key di script Roblox kamu</div>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="error-icon">❌</div>
                <div className="error-title">GAGAL!</div>
                <div className="error-msg">{errorMsg}</div>
                <div className="hint" style={{marginTop:'16px'}}>Kembali ke Discord dan klik tombol Get Free Key lagi</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function GetKeyPage() {
  return (
    <Suspense fallback={<div style={{color:'white',textAlign:'center',marginTop:'50px',fontFamily:'monospace'}}>Loading...</div>}>
      <GetKeyContent />
    </Suspense>
  )
}
