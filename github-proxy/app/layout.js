export const metadata = {
  title: 'GitHub Proxy',
  description: 'Protected GitHub Raw Proxy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
