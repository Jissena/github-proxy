# github-proxy

Proxy ringan berbasis **Next.js**, di-deploy langsung melalui **Vercel**.  
Berfungsi sebagai jembatan ke sumber private — sumber aslinya tetap tersembunyi, namun tetap bisa diakses publik.

---

## Cara Kerja

```
Request → Vercel (github-proxy) → Sumber Private
```

Tidak ada akses langsung ke sumber asli. Semua request melewati proxy.

---

## Stack

| Teknologi | Fungsi |
|---|---|
| Next.js | Framework |
| Vercel | Deploy & hosting |
| GitHub | Source control |

---

## Deploy

Repo ini terhubung langsung ke Vercel.  
Setiap push ke branch `main` otomatis memicu deployment baru.

---

> Repo ini bersifat public. Sumber asli yang di-proxy bersifat private dan tidak diekspos di sini.
