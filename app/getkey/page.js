'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function GetKeyContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || searchParams.get('r')
  const [status, setStatus] = useState('ready')
  const [key, setKey] = useState('')
  const [expired, setExpired] = useState('')
  const [script, setScript] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)

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
        setScript(data.script)
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

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          min-height: 100vh;
          background-image: url('https://raw.githubusercontent.com/Jissena/github-proxy/main/pic.gif');
          background-size: cover; background-position: center;
          background-repeat: no-repeat; background-attachment: fixed;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Mono', 'Courier New', monospace; padding: 1rem;
        }
        .card { width: 100%; max-width: 380px; background: rgba(15,18,24,0.92); border-radius: 12px; overflow: hidden; border: 1px solid rgba(26,111,232,0.25); backdrop-filter: blur(10px); }
        .topbar { background: rgba(13,15,19,0.95); height: 36px; display: flex; align-items: center; padding: 0 14px; border-bottom: 1px solid rgba(26,111,232,0.15); }
        .title { flex: 1; font-size: 11px; font-weight: 700; color: rgb(200,210,226); letter-spacing: .12em; }
        .badge { font-size: 8px; padding: 2px 7px; border-radius: 4px; margin-left: 6px; }
        .badge.blue { background: rgba(26,111,232,0.18); color: rgb(80,140,220); }
        .badge.green { background: rgba(46,204,113,0.18); color: rgb(46,204,113); }
        .badge.red { background: rgba(200,80,80,0.18); color: rgb(200,80,80); }
        .body { padding: 22px 16px 24px; }
        .subtitle { text-align: center; font-size: 10px; color: rgb(105,120,150); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 20px; }
        .spinner { display: flex; justify-content: center; padding: 30px 0; }
        .spin { width: 32px; height: 32px; border: 3px solid rgba(26,111,232,0.2); border-top-color: rgb(26,111,232); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .center-icon { font-size: 36px; text-align: center; margin-bottom: 12px; }
        .center-title { text-align: center; font-size: 13px; font-weight: 700; margin-bottom: 6px; }
        .center-sub { text-align: center; font-size: 9px; color: rgb(80,100,130); letter-spacing: .06em; margin-bottom: 20px; }
        .green-text { color: rgb(46,204,113); }
        .red-text { color: rgb(200,80,80); }
        .box { background: rgba(18,21,28,0.85); border-radius: 8px; border: 1px solid rgba(26,111,232,0.15); padding: 10px 12px; margin-bottom: 10px; }
        .box-label { font-size: 9px; color: rgb(55,65,88); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 6px; }
        .box-value { font-size: 11px; color: rgb(200,210,226); word-break: break-all; line-height: 1.6; }
        .btn { width: 100%; padding: 12px; border-radius: 8px; border: none; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 700; letter-spacing: .06em; cursor: pointer; margin-bottom: 8px; transition: all 0.2s; }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn-green { background: rgb(46,204,113); color: rgb(10,15,20); }
        .btn-blue { background: rgb(26,111,232); color: white; }
        .info-row { display: flex; justify-content: space-between; padding: 6px 10px; background: rgba(18,21,28,0.8); border-radius: 6px; border: 1px solid rgba(26,111,232,0.08); margin-bottom: 8px; }
        .info-key { font-size: 9px; color: rgb(55,65,88); text-transform: uppercase; }
        .info-val { font-size: 9px; color: rgb(105,120,150); }
        .info-val.green { color: rgb(46,204,113); }
        .error-msg { text-align: center; font-size: 10px; color: rgb(105,120,150); line-height: 1.6; }
        .hint { text-align: center; font-size: 9px; color: rgb(55,65,88); margin-top: 10px; line-height: 1.6; }
      `}</style>

      <div className="card">
        <div className="topbar">
          <span className="title">
            JS SCRIPT
            <span className={`badge ${status === 'success' ? 'green' : status === 'error' ? 'red' : 'blue'}`}>
              {status === 'loading' ? 'LOADING' : status === 'success' ? 'FREE KEY' : status === 'error' ? 'ERROR' : 'READY'}
            </span>
          </span>
        </div>
        <div className="body">
          <p className="subtitle">South Bronx The Trenches</p>

          {status === 'ready' && (
            <>
              <div className="center-icon">🎁</div>
              <div className="center-title" style={{color:'rgb(200,210,226)'}}>Siap Generate Key!</div>
              <div className="center-sub">Kamu sudah melewati iklan dengan sukses</div>
              <button className="btn btn-green" onClick={generateKey}>✨ Generate Key Gratis</button>
              <div className="hint">Key berlaku 1 hari • 1x per hari<br/>Setelah generate, redeem di Discord</div>
            </>
          )}

          {status === 'loading' && (
            <div className="spinner"><div className="spin" /></div>
          )}

          {status === 'success' && (
            <>
              <div className="center-icon">🎉</div>
              <div className="center-title green-text">Key Berhasil Dibuat!</div>
              <div className="center-sub">Key aktif 1 hari • Redeem di Discord</div>
              <div className="box">
                <div className="box-label">Key Kamu</div>
                <div className="box-value">{key}</div>
              </div>
              <button className="btn btn-green" onClick={() => copyText(key)}>
                {copied ? '✅ Tersalin!' : '📋 Copy Key'}
              </button>
              <div className="info-row"><span className="info-key">Status</span><span className="info-val green">● Aktif</span></div>
              <div className="info-row"><span className="info-key">Expired</span><span className="info-val">{expired}</span></div>
              <div className="info-row"><span className="info-key">Max Device</span><span className="info-val">1</span></div>
              <div className="box" style={{marginTop:'10px'}}>
                <div className="box-label">Script Loadstring</div>
                <div className="box-value" style={{fontSize:'9px'}}>{script}</div>
              </div>
              <button className="btn btn-blue" onClick={() => copyText(script)}>📜 Copy Script</button>
              <div className="hint">Buka Discord → klik Redeem Key → masukkan key</div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="center-icon">❌</div>
              <div className="center-title red-text">Gagal!</div>
              <div className="error-msg">{errorMsg}</div>
              <div className="hint" style={{marginTop:'16px'}}>Kembali ke Discord dan klik tombol Get Free Key lagi</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default function GetKeyPage() {
  return (
    <Suspense fallback={<div style={{color:'white',textAlign:'center',marginTop:'50px'}}>Loading...</div>}>
      <GetKeyContent />
    </Suspense>
  )
}
