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

export async function GET(request) {
  const url = new URL(request.url)
  const hwid = url.searchParams.get('hwid') || 'unknown'

  try {
    const sheets = await getSheets()

    const tokenRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Tokens!A:D',
    })

    const rows = tokenRes.data.values || []
    const today = new Date().toISOString().split('T')[0]

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === hwid && rows[i][2] && rows[i][2].startsWith(today)) {
        const existingToken = rows[i][0]
        const sr = await getWorkInkSr(`https://github-proxy-lime.vercel.app/getkey?token=${existingToken}`)
        const link = sr ? `${WORK_INK_LINK}?sr=${sr}` : `${WORK_INK_LINK}?subid=${existingToken}`
        return Response.json({ success: true, link, cached: true })
      }
    }

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
