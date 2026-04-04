export default function Home() {
  return (
    <div style={{
      margin:0,
      padding:'1rem',
      width:'100vw',
      height:'100vh',
      overflow:'hidden',
      backgroundImage:"url('https://raw.githubusercontent.com/Jissena/github-proxy/main/Pic.gif')",
      backgroundSize:'cover',
      backgroundPosition:'center center',
      backgroundRepeat:'no-repeat',
      backgroundAttachment:'fixed',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      fontFamily:"'DM Mono','Courier New',monospace",
      boxSizing:'border-box'
    }}>
      <div style={{width:'100%',maxWidth:340,background:'rgba(15,18,24,0.85)',borderRadius:10,overflow:'hidden',border:'1px solid rgba(26,111,232,0.2)',backdropFilter:'blur(6px)'}}>
        <div style={{background:'rgba(13,15,19,0.9)',height:34,display:'flex',alignItems:'center',padding:'0 12px',borderBottom:'1px solid rgba(26,111,232,0.1)'}}>
          <span style={{flex:1,fontSize:11,fontWeight:700,color:'rgb(200,210,226)',letterSpacing:'.12em'}}>
            JS SCRIPT <span style={{background:'rgba(26,111,232,0.15)',color:'rgb(80,140,220)',fontSize:8,padding:'1px 6px',borderRadius:4,marginLeft:6}}>PROTECTED</span>
          </span>
        </div>
        <div style={{padding:'18px 14px 20px'}}>
          <p style={{textAlign:'center',fontSize:10,color:'rgb(105,120,150)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:16}}>South Bronx The Trenches</p>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'16px 0 14px',background:'rgba(18,21,28,0.8)',borderRadius:8,border:'1px solid rgba(26,111,232,0.12)',marginBottom:12}}>
            <div style={{fontSize:28,marginBottom:8}}>🔒</div>
            <div style={{fontSize:12,fontWeight:500,color:'rgb(200,210,226)',letterSpacing:'.08em',marginBottom:4}}>FILE DILINDUNGI</div>
            <div style={{fontSize:9,color:'rgb(55,65,88)',letterSpacing:'.06em',textTransform:'uppercase'}}>Akses tidak diizinkan</div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'6px 10px',background:'rgba(18,21,28,0.8)',borderRadius:6,border:'1px solid rgba(26,111,232,0.08)',marginBottom:8}}>
            <span style={{fontSize:9,color:'rgb(55,65,88)',textTransform:'uppercase'}}>Status</span>
            <span style={{fontSize:9,color:'rgb(200,80,80)'}}>● Unauthorized</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'6px 10px',background:'rgba(18,21,28,0.8)',borderRadius:6,border:'1px solid rgba(26,111,232,0.08)',marginBottom:8}}>
            <span style={{fontSize:9,color:'rgb(55,65,88)',textTransform:'uppercase'}}>Protection</span>
            <span style={{fontSize:9,color:'rgb(105,120,150)'}}>Vercel Proxy</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'6px 10px',background:'rgba(18,21,28,0.8)',borderRadius:6,border:'1px solid rgba(26,111,232,0.08)'}}>
            <span style={{fontSize:9,color:'rgb(55,65,88)',textTransform:'uppercase'}}>Content</span>
            <span style={{fontSize:9,color:'rgb(105,120,150)'}}>Hidden</span>
          </div>
        </div>
      </div>
    </div>
  )
}
