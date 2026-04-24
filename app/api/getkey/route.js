import { google } from 'googleapis'

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || ''
const FREE_SCRIPT = 'loadstring(game:HttpGet("https://github-proxy-lime.vercel.app/api/raw?file=AUTO_MS_AUTO_POTATO_AUTO_BOX"))()'

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const parts = ['JSKEY']
  for (let i = 0; i < 3; i++) {
    let part = ''
    for (let j = 0; j < 6; j++) {
      part += chars[Math.floor(Math.random() * chars.length)]
    }
    parts.push(part)
  }
  return parts.join('-')
}

async function getSheets() {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}')
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('token')
  if (!token) return Response.json({ error: 'Token tidak ada' }, { status: 400 })

  try {
    const sheets = await getSheets()
    const tokenRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Tokens!A:D',
    })

    const rows = tokenRes.data.values || []
    let tokenRow = null
    let tokenRowIndex = -1

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === token) {
        tokenRow = rows[i]
        tokenRowIndex = i + 1
        break
      }
    }

    if (!tokenRow) return Response.json({ error: 'Token tidak valid atau sudah kedaluwarsa' }, { status: 400 })
    if (tokenRow[3] === 'TRUE') return Response.json({ error: 'Token sudah digunakan sebelumnya' }, { status: 400 })
    if (new Date() > new Date(tokenRow[2])) return Response.json({ error: 'Token sudah expired, minta lagi di Discord' }, { status: 400 })

    const key = generateKey()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const expired = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth()+1).padStart(2,'0')}-${String(tomorrow.getDate()).padStart(2,'0')}`

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Timed!A:E',
      valueInputOption: 'RAW',
      requestBody: { values: [[key, expired, '', 1, `FREE|ID:${tokenRow[1]}`]] },
    })

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `Tokens!D${tokenRowIndex}`,
      valueInputOption: 'RAW',
      requestBody: { values: [['TRUE']] },
    })

    return Response.json({ success: true, key, expired, script: FREE_SCRIPT })
  } catch (e) {
    return Response.json({ error: `Server error: ${e.message}` }, { status: 500 })
  }
}
