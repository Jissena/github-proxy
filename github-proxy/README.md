# 🔒 GitHub Raw Proxy - Dilindungi Vercel

Proxy untuk melindungi file raw GitHub kamu. Orang tidak bisa akses langsung ke raw GitHub — semua harus lewat Vercel dengan token.

---

## 🚀 Cara Deploy ke Vercel

### Langkah 1 - Install dependensi
```bash
npm install
```

### Langkah 2 - Set konfigurasi
Edit file `app/api/raw/route.js`, ganti bagian ini:
```js
const SECRET_TOKEN = process.env.SECRET_TOKEN || 'token-rahasia-kamu';
const GITHUB_RAW_BASE = process.env.GITHUB_RAW_BASE || 'https://raw.githubusercontent.com/USERNAME/REPO/BRANCH';
```

### Langkah 3 - Deploy ke Vercel
```bash
npx vercel
```

### Langkah 4 - Set Environment Variables di Vercel
Pergi ke: **Vercel Dashboard → Project → Settings → Environment Variables**

Tambahkan:
| Key | Value |
|-----|-------|
| `SECRET_TOKEN` | token-rahasia-kamu |
| `GITHUB_RAW_BASE` | https://raw.githubusercontent.com/USERNAME/REPO/main |

---

## 📖 Cara Pakai

### Akses file dengan token (berhasil):
```
https://domain-kamu.vercel.app/api/raw?file=script.js&token=token-rahasia-kamu
```

### Akses tanpa token (ditolak):
```
https://domain-kamu.vercel.app/api/raw?file=script.js
→ 🔒 AKSES DITOLAK
```

---

## 🔐 Tips Keamanan
- Gunakan token yang panjang dan acak, contoh: `xK9#mP2$vL8nQ5wR`
- Jangan share token di tempat publik
- Ganti token secara berkala
- Repo GitHub bisa tetap Public atau Private
