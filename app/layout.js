export const metadata = { title: 'JS Script - Protected' }

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{margin:0,padding:0,overflow:'hidden'}}>
        {children}
      </body>
    </html>
  )
}
