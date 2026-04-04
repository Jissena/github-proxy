const GITHUB_RAW_BASE = process.env.GITHUB_RAW_BASE || ''

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (!file) {
    return new Response('File tidak ditemukan.', { status: 400 })
  }

  try {
    const res = await fetch(`${GITHUB_RAW_BASE}/${file}`)
    if (!res.ok) {
      return new Response(`File tidak ditemukan: ${file}`, { status: 404 })
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
    return new Response('Gagal mengambil file.', { status: 500 })
  }
}
