const SECRET_TOKEN = process.env.SECRET_TOKEN || ''
const GITHUB_RAW_BASE = process.env.GITHUB_RAW_BASE || ''

const PROTECTED_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>JS Script - Protected</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{
  min-height:100vh;background:rgb(13,15,19);
  display:flex;align-items:center;justify-content:center;
  font-family:'DM Mono','Courier New',monospace;
  padding:1rem;position:relative;overflow:hidden;
}
.grid{
  position:fixed;inset:0;
  background-image:linear-gradient(rgba(26,111,232,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,111,232,0.04) 1px,transparent 1px);
  background-size:40px 40px;pointer-events:none;
}
.glow{
  position:fixed;inset:0;
  background:radial-gradient(ellipse 60% 40% at 50% 45%,rgba(26,111,232,0.08) 0%,transparent 70%);
  pointer-events:none;
}
.card{
  width:100%;max-width:340px;background:rgb(15,18,24);
  border-radius:10px;overflow:hidden;
  border:1px solid rgba(26,111,232,0.2);
  position:relative;z-index:1;
}
.shimmer{
  position:absolute;top:0;left:-100%;width:60%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(26,111,232,0.06),transparent);
  animation:shimmer 3s infinite;pointer-events:none;
}
@keyframes shimmer{to{left:150%}}
.topbar{
  background:rgb(13,15,19);height:34px;
  display:flex;align-items:center;padding:0 12px;gap:8px;
  border-bottom:1px solid rgba(26,111,232,0.1);
}
.dots{display:flex;gap:5px}
.dot{width:9px;height:9px;border-radius:50%}
.title{flex:1;font-size:11px;font-weight:700;color:rgb(200,210,226);letter-spacing:.12em}
.badge{
  display:inline-block;background:rgba(26,111,232,0.15);color:rgb(80,140,220);
  font-size:8px;padding:1px 6px;border-radius:4px;letter-spacing:.06em;margin-left:6px;vertical-align:middle;
}
.online{width:6px;height:6px;border-radius:50%;background:rgb(47,183,117);position:relative}
.online::after{
  content:'';position:absolute;inset:-3px;border-radius:50%;
  border:1px solid rgb(47,183,117);animation:pulse 2s infinite;opacity:0;
}
@keyframes pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.5);opacity:0}}
.body{padding:18px 14px 20px}
.subtitle{
  text-align:center;font-size:10px;color:rgb(105,120,150);
  letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;
}
.lock-wrap{
  display:flex;flex-direction:column;align-items:center;
  padding:16px 0 14px;background:rgb(18,21,28);
  border-radius:8px;border:1px solid rgba(26,111,232,0.12);
  margin-bottom:12px;position:relative;overflow:hidden;
}
.lock-icon{font-size:28px;margin-bottom:8px;filter:drop-shadow(0 0 8px rgba(26,111,232,0.4))}
.lock-title{font-size:12px;font-weight:500;color:rgb(200,210,226);letter-spacing:.08em;margin-bottom:4px}
.lock-sub{font-size:9px;color:rgb(55,65,88);letter-spacing:.06em;text-transform:uppercase}
.scan-line{
  position:absolute;top:0;left:0;width:100%;height:2px;
  background:linear-gradient(90deg,transparent,rgba(26,111,232,0.6),transparent);
  animation:scan 2.5s linear infinite;
}
@keyframes scan{0%{top:0%}100%{top:100%}}
.info-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:6px 10px;background:rgb(18,21,28);border-radius:6px;
  border:1px solid rgba(26,111,232,0.08);margin-bottom:8px;
}
.info-key{font-size:9px;color:rgb(55,65,88);letter-spacing:.05em;text-transform:uppercase}
.info-val{font-size:9px;color:rgb(105,120,150);letter-spacing:.05em}
.info-val.red{color:rgb(200,80,80)}
hr{border:none;border-top:1px solid rgba(26,111,232,0.08);margin:10px 0}
.footer{display:flex;justify-content:center;gap:12px}
.foot-link{font-size:9px;color:rgb(55,65,88);letter-spacing:.05em;text-transform:uppercase;text-decoration:none}
.foot-link:hover{color:rgb(26,111,232)}
</style>
</head>
<body>
<div class="grid"></div>
<div class="glow"></div>
<div class="card">
  <div class="shimmer"></div>
  <div class="topbar">
    <div class="dots">
      <div class="dot" style="background:rgb(200,80,80);opacity:.8"></div>
      <div class="dot" style="background:rgb(230,180,50);opacity:.8"></div>
      <div class="dot" style="background:rgb(47,183,117);opacity:.8"></div>
    </div>
    <span class="title">JS SCRIPT <span class="badge">PROTECTED</span></span>
    <div class="online"></div>
  </div>
  <div class="body">
    <p class="subtitle">South Bronx The Trenches</p>
    <div class="lock-wrap">
      <div class="scan-line"></div>
      <div class="lock-icon">🔒</div>
      <div class="lock-title">FILE DILINDUNGI</div>
      <div class="lock-sub">Akses tidak diizinkan</div>
    </div>
    <div class="info-row">
      <span class="info-key">Status</span>
      <span class="info-val red">&#9679; Unauthorized</span>
    </div>
    <div class="info-row">
      <span class="info-key">Protection</span>
      <span class="info-val">Vercel Proxy</span>
    </div>
    <div class="info-row">
      <span class="info-key">Content</span>
      <span class="info-val">Hidden</span>
    </div>
    <hr/>
    <div class="footer">
      <a class="foot-link" href="#">Get Key</a>
      <span class="foot-link">Discord</span>
      <span class="foot-link">v3.1</span>
    </div>
  </div>
</div>
</body>
</html>`

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const file = searchParams.get('file')

  if (!token || token !== SECRET_TOKEN) {
    return new Response(PROTECTED_HTML, {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  if (!file) {
    return new Response(PROTECTED_HTML, {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  try {
    const res = await fetch(`${GITHUB_RAW_BASE}/${file}`)
    if (!res.ok) {
      return new Response(`File tidak ditemukan: ${file}`, {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      })
    }
    const content = await res.text()
    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    return new Response('Gagal mengambil file.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}
