const SPREADSHEET_ID = process.env.SPREADSHEET_ID || ''
const WORK_INK_LINK = 'https://work.ink/2nwd/js-script-free-key'

function generateToken() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars[Math.floor(Math.random() * chars.length)]
  }
  return token
}

async function getSheets() {
  const { google } = await import('googleapis')
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}')
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

async function getWorkInkSr(destination) {
  try {
    const encoded = encodeURIComponent(destination)
    const res = await fetch(`https://work.ink/_api/v2/override?destination=${encoded}`)
    const data = await res.json()
    return data.sr || null
  } catch {
    return null
  }
}

function getToday() {
  const now = new Date()
  now.setHours(now.getHours() + 7)
  return now.toISOString().split('T')[0]
}

function getTomorrow() {
  const now = new Date()
  now.setHours(now.getHours() + 7)
  now.setDate(now.getDate() + 1)
  return now.toISOString().split('T')[0]
}

export async function GET(request) {
  const url = new URL(request.url)
  const hwid = url.searchParams.get('hwid') || 'unknown'

  try {
    const sheets = await getSheets()
    const today = getToday()
    const tomorrow = getTomorrow()

    // CEK 1: Apakah HWID sudah punya key aktif di tab Timed?
    const timedRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Timed!A:E',
    })

    const timedRows = timedRes.data.values || []
    for (let i = 1; i < timedRows.length; i++) {
      const row = timedRows[i]
      if (!row || row.length < 5) continue
      const note = String(row[4] || '')
      const expired = String(row[1] || '')
      if (note.includes(hwid) && expired === tomorrow) {
        return Response.json({
          success: false,
          error: 'You already have an active key today! Come back tomorrow.\nKamu sudah punya key aktif hari ini! Kembali besok.',
          already_active: true
        }, { status: 429 })
      }
    }

    // CEK 2: Apakah sudah ada token hari ini di tab Tokens?
    const tokenRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Tokens!A:D',
    })

    const tokenRows = tokenRes.data.values || []
    for (let i = 1; i < tokenRows.length; i++) {
      const row = tokenRows[i]
      if (!row) continue
      if (row[1] === hwid && row[2] && row[2].startsWith(today)) {
        const existingToken = row[0]
        const sr = await getWorkInkSr(`https://github-proxy-lime.vercel.app/getkey?token=${existingToken}`)
        const link = sr ? `${WORK_INK_LINK}?sr=${sr}` : `${WORK_INK_LINK}?subid=${existingToken}`
        return Response.json({ success: true, link, cached: true })
      }
    }

    // Buat token baru
    const token = generateToken()
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Tokens!A:D',
      valueInputOption: 'RAW',
      requestBody: { values: [[token, hwid, expiresAt.toISOString(), 'FALSE']] },
    })

    const sr = await getWorkInkSr(`https://github-proxy-lime.vercel.app/getkey?token=${token}`)
    const link = sr ? `${WORK_INK_LINK}?sr=${sr}` : `${WORK_INK_LINK}?subid=${token}`

    return Response.json({ success: true, link })
  } catch (e) {
    return Response.json({ error: `Server error: ${e.message}` }, { status: 500 })
  }
}
