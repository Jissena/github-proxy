'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function GetKeyPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState('loading')
  const [key, setKey] = useState('')
  const [expired, setExpired] = useState('')
  const [script, setScript] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorMsg('Token tidak ditemukan. Kembali ke Discord dan klik tombol Free Key.')
      return
    }
    fetch(`/api/getkey?token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setKey(data.key)
          setExpired(data.expired)
          setScript(data.script)
          setStatus('success')
        } else {
          setErrorMsg(data.error || 'Terjadi kesalahan')
          setStatus('error')
        }
      })
      .catch(() => {
        setErrorMsg('Gagal konek ke server')
        setStatus('error')
      })
  }, [token])

  const copyKey = () => {
    navigator.clipboard.writeText(key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyScript = () => {
    navigator.clipboard.writeText(script)
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
        .card { width: 100%; max-width: 380px; background: rgba(15,18,24,0.90); border-radius: 10px; overflow: hidden; border: 1px solid rgba(26,111,232,0.25); backdrop-filter: blur(8px); }
        .topbar { background: rgba(13,15,19,0.95); height: 36px; display: flex; align-items: center; padding: 0 14px; border-bottom: 1px solid rgba(26,111,232,0.15); }
        .title { flex: 1; font-size: 11px; font-weight: 700; color: rgb(200,210,226); letter-spacing: .12em; }
        .badge { background: rgba(26,111,232,0.18); color: rgb(80,140,220); font-size: 8px; padding: 2px 7px; border-radius: 4px; margin-left: 6px; }
        .badge.green { background: rgba(46,204,113,0.18); color: rgb(46,204,113); }
        .body { padding: 20px 16px 22px; }
        .subtitle { text-align: center; font-size: 10px; color: rgb(105,120,150); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 18px; }
        .spinner { display: flex; justify-content: center; padding: 30px 0; }
        .spin { width: 32px; height: 32px; border: 3px solid rgba(26,111,232,0.2); border-top-color: rgb(26,111,232); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .success-icon { font-size: 32px; text-align: center; margin-bottom: 10px; }
        .success-title { text-align: center; font-size: 13px; font-weight: 700; color: rgb(46,204,113); margin-bottom: 4px; }
        .success-sub { text-align: center; font-size: 9px; color: rgb(80,100,130); letter-spacing: .06em; margin-bottom: 18px; }
        .box { background: rgba(18,21,28,0.85); border-radius: 8px; border: 1px solid rgba(26,111,232,0.15); padding: 10px 12px; margin-bottom: 10px; }
        .box-label { font-size: 9px; color: rgb(55,65,88); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 6px; }
        .box-value { font-size: 12px; color: rgb(200,210,226); word-break: break-all; line-height: 1.5; }
        .btn { width: 100%; padding: 10px; border-radius: 7px; border: none; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: .06em; cursor: pointer; margin-bottom: 8px; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.85; }
        .btn-green { background: rgb(46,204,113); color: rgb(10,15,20); }
        .btn-blue { background: rgb(26,111,232); color: white; }
        .info-row { display: flex; justify-content: space-between; padding: 6px 10px; background: rgba(18,21,28,0.8); border-radius: 6px; border: 1px solid rgba(26,111,232,0.08); margin-bottom: 8px; }
        .info-key { font-size: 9px; color: rgb(55,65,88); text-transform: uppercase; }
        .info-val { font-size: 9px; color: rgb(105,120,150); }
        .info-val.green { color: rgb(46,204,113); }
        .error-icon { font-size: 32px; text-align: center; margin-bottom: 10px; }
        .error-title { text-align: center; font-size: 13px; font-weight: 700; color: rgb(200,80,80); margin-bottom: 8px; }
        .error-msg { text-align: center; font-size: 10px; color: rgb(105,120,150); line-height: 1.6; }
      `}</style>

      <div className="card">
        <div className="topbar">
          <span className="title">
            JS SCRIPT
            <span className={`badge ${status === 'success' ? 'green' : ''}`}>
              {status === 'loading' ? 'LOADING' : status === 'success' ? 'FREE KEY' : 'ERROR'}
            </span>
          </span>
        </div>
        <div className="body">
          <p className="subtitle">South Bronx The Trenches</p>

          {status === 'loading' && (
            <div className="spinner"><div className="spin" /></div>
          )}

          {status === 'success' && (
            <>
              <div className="success-icon">🎉</div>
              <div className="success-title">Key Berhasil Dibuat!</div>
              <div className="success-sub">Key aktif 1 hari • Redeem di Discord</div>
              <div className="box">
                <div className="box-label">Key Kamu</div>
                <div className="box-value">{key}</div>
              </div>
              <button className="btn btn-green" onClick={copyKey}>
                {copied ? '✅ Tersalin!' : '📋 Copy Key'}
              </button>
              <div className="info-row"><span className="info-key">Status</span><span className="info-val green">● Aktif</span></div>
              <div className="info-row"><span className="info-key">Expired</span><span className="info-val">{expired}</span></div>
              <div className="info-row"><span className="info-key">Max Device</span><span className="info-val">1</span></div>
              <div style={{marginTop:'10px'}}>
                <div className="box">
                  <div className="box-label">Script Loadstring</div>
                  <div className="box-value" style={{fontSize:'9px'}}>{script}</div>
                </div>
                <button className="btn btn-blue" onClick={copyScript}>📜 Copy Script</button>
              </div>
              <div style={{textAlign:'center',fontSize:'9px',color:'rgb(55,65,88)',marginTop:'8px'}}>
                Setelah copy key, buka Discord dan klik Redeem Key
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="error-icon">❌</div>
              <div className="error-title">Gagal!</div>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
