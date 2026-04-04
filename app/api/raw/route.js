const PROTECTED_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>JS Script - Protected</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:rgb(13,15,19);display:flex;align-items:center;justify-content:center;font-family:'DM Mono','Courier New',monospace;padding:1rem;}
.card{width:100%;max-width:340px;background:rgb(15,18,24);border-radius:10px;overflow:hidden;border:1px solid rgba(26,111,232,0.2);}
.topbar{background:rgb(13,15,19);height:34px;display:flex;align-items:center;padding:0 12px;border-bottom:1px solid rgba(26,111,232,0.1);}
.title{flex:1;font-size:11px;font-weight:700;color:rgb(200,210,226);letter-spacing:.12em}
.badge{background:rgba(26,111,232,0.15);color:rgb(80,140,220);font-size:8px;padding:1px 6px;border-radius:4px;margin-left:6px;}
.body{padding:18px 14px 20px}
.subtitle{text-align:center;font-size:10px;color:rgb(105,120,150);letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;}
.lock-wrap{display:flex;flex-direction:column;align-items:center;padding:16px 0 14px;background:rgb(18,21,28);border-radius:8px;border:1px solid rgba(26,111,232,0.12);margin-bottom:12px;}
.lock-icon{font-size:28px;margin-bottom:8px;}
.lock-title{font-size:12px;font-weight:500;color:rgb(200,210,226);letter-spacing:.08em;margin-bottom:4px}
.lock-sub{font-size:9px;color:rgb(55,65,88);letter-spacing:.06em;text-transform:uppercase}
.info-row{display:flex;justify-content:space-between;padding:6px 10px;background:rgb(18,21,28);border-radius:6px;border:1px solid rgba(26,111,232,0.08);margin-bottom:8px;}
.info-key{font-size:9px;color:rgb(55,65,88);text-transform:uppercase}
.info-val{font-size:9px;color:rgb(105,120,150)}
.info-val.red{color:rgb(200,80,80)}
</style>
</head>
<body>
<div class="card">
  <div class="topbar">
    <span class="title">JS SCRIPT <span class="badge">PROTECTED</span></span>
  </div>
  <div class="body">
    <p class="subtitle">South Bronx The Trenches</p>
    <div class="lock-wrap">
      <div class="lock-icon">🔒</div>
      <div class="lock-title">FILE DILINDUNGI</div>
      <div class="lock-sub">Akses tidak diizinkan</div>
    </div>
    <div class="info-row">
      <span class="info-key">Status</span>
      <span class="info-val red">● Unauthorized</span>
    </div>
    <div class="info-row">
      <span class="info-key">Protection</span>
      <span class="info-val">Vercel Proxy</span>
    </div>
    <div class="info-row">
      <span class="info-key">Content</span>
      <span class="info-val">Hidden</span>
    </div>
  </div>
</div>
</body>
</html>`

export async function GET() {
  return new Response(PROTECTED_HTML, {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
