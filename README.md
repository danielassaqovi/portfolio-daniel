# Portfolio — Web Developer & QA Engineer

Website portofolio satu halaman bergaya **editorial brutalist**: tipografi condensed besar, aksen garis tebal, kartu bertumpuk, dan marquee berjalan. Palet dibuat **gelap elegan** (charcoal, ivory, champagne gold) sebagai pembeda dari referensi, sementara struktur, layout, dan pola animasinya mengikuti referensi tersebut.

Dibangun dengan **Astro** (output statis) untuk struktur halaman dan proses build, sementara seluruh interaksi tetap memakai **JavaScript vanilla + GSAP + ScrollTrigger** untuk animasi serta **Lenis** untuk smooth scroll. Semua library dan font disimpan lokal, jadi situs tetap berjalan tanpa koneksi ke CDN.

---

## 1. Menjalankan

### Opsi A — Docker (disarankan)

```bash
cd portfolio
docker compose up -d --build
```

Buka <http://localhost:8080>.

Hentikan dengan:

```bash
docker compose down
```

### Opsi B — Node.js lokal

```bash
cd portfolio
npm install       # sekali saja
npm run dev       # http://localhost:4321, hot reload
```

Untuk melihat hasil build produksi:

```bash
npm run build     # menghasilkan folder dist/
npm run preview   # menyajikan dist/ secara lokal
```

### Opsi C — Docker mode pengembangan (hot reload)

```bash
docker compose --profile dev up dev
```

Buka <http://localhost:4321>. Folder proyek di-mount langsung ke container, jadi perubahan file langsung tampil.

---

## 2. Mengisi data CV (langkah penting)

Seluruh konten ada di **dua file**:

- `public/assets/js/content.js` — identitas, tentang, pengalaman, proyek, sertifikat, kutipan, footer.
- `public/assets/js/tech.js` — daftar teknologi per kategori (section Tools & Languages).

Saat CV final sudah tersedia, cukup edit kedua file itu:

| Bagian | Field |
| --- | --- |
| Identitas | `name`, `heroLines`, `role`, `tagline`, `email` |
| Pita hero (toggle) | `heroStripes`, `heroStripeImages`, `heroStripeMedia` |

`heroStripeImages` berisi daftar gambar abstrak bertema IT. Setiap kali halaman dimuat, urutannya diacak dan gambar dipakai bergiliran di pita. `heroStripeMedia` hanya perlu diisi jika ingin mengunci gambar tertentu per pita (`null` = acak).
| Sosial & kontak | `socials` (label, handle, href, icon) |
| Tentang | `about.photo`, `about.photoAlt`, `about.heading`, `about.subheading`, `about.paragraphs` |
| Pengalaman & pendidikan | `experience` |
| Proyek | `projects` (termasuk `details` untuk modal) |
| Teknologi | `public/assets/js/tech.js` → `categories[].items[]` |
| Sertifikat | `certificates` (`year`, `type`, `title`, `issuer`, `description`, `image`) |
| Kutipan | `quote` |
| Footer | `footer.paragraphs`, `footer.note` |

### Menambah teknologi

Edit `public/assets/js/tech.js`. Setiap kategori berisi `title` dan `items`:

```js
{
  title: 'Frontend Development',
  items: [
    { name: 'HTML', icon: 'html5' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' },
  ],
}
```

`icon` adalah nama file di `public/assets/img/tech/` tanpa `.svg`. Untuk teknologi baru, unduh logonya (mis. dari [Simple Icons](https://simpleicons.org/)) lalu simpan dengan nama yang sesuai. Tidak ada data level atau persentase kemampuan di struktur ini.

Beberapa hal yang perlu diganti secara manual:

1. **Foto profil** — foto About saat ini memakai `public/assets/img/profile.jpeg`. Untuk menggantinya, timpa file tersebut atau arahkan `about.photo` ke nama file baru. Rasio yang disarankan 3:4 (foto akan di-crop dengan `object-fit: cover`).
2. **CV** — ganti file `public/cv.pdf` dengan CV final (nama file tetap `cv.pdf`, atau sesuaikan `cvUrl`).
3. **Gambar proyek** — ganti `public/assets/img/project-1.svg` dst., atau arahkan `projects[].image` ke gambar baru.
4. **Logo teknologi** — ganti file di `public/assets/img/tech/` bila ingin versi/logo lain.

Semua teks memakai HTML sederhana; pada `about.paragraphs`, `experience[].points`, dan field serupa Anda boleh memakai `<strong>`, `<em>`, atau `<span class="hl">` untuk penekanan.

---

## 3. Struktur

```
portfolio/
├── public/                      # disajikan apa adanya, tanpa diproses Astro
│   ├── assets/
│   │   ├── css/style.css        # seluruh styling + responsive + reduced motion
│   │   ├── js/content.js        # konten utama (profil, proyek, dll)
│   │   ├── js/tech.js           # data teknologi per kategori
│   │   ├── js/main.js           # render konten + animasi & interaksi
│   │   ├── fonts/               # Anton + Work Sans (lokal)
│   │   └── img/
│   │       ├── tech/            # logo teknologi (SVG lokal)
│   │       └── ...              # portrait, gambar proyek, favicon
│   ├── vendor/                  # GSAP, ScrollTrigger, Lenis (lokal)
│   ├── cv.pdf                   # CV untuk tombol "Unduh CV"
│   └── cv-daniel-assaqovi.docx  # versi Word yang bisa diedit
├── src/
│   ├── layouts/BaseLayout.astro # <head>, meta, preload font, stylesheet
│   └── pages/index.astro        # seluruh markup halaman
├── astro.config.mjs
├── package.json
├── Dockerfile                   # multi-stage: build Astro -> nginx
├── docker-compose.yml
├── nginx.conf
└── README.md
```

Catatan migrasi: markup halaman dipindahkan **apa adanya** dari `index.html` versi statis ke `src/pages/index.astro`, dan semua aset (CSS, JS, gambar, font, vendor) tetap berupa file statis di `public/`. Skrip dimuat dengan `is:inline` sehingga urutan eksekusi dan semantiknya (script klasik, bukan module) identik dengan sebelumnya — tidak ada perilaku yang berubah.

---

## 4. Bagian halaman & animasi

| Bagian | Isi | Animasi / interaksi |
| --- | --- | --- |
| Hero | Nama besar, role, tagline, tombol | Intro toggle raksasa yang berputar 360° lalu mengecil ke posisi asli, reveal per huruf, toggle yang membuka pita diagonal bergerak, toggle membesar saat di-hover, teks CTA bergulir saat di-hover |
| About | Ticker "About Me", judul raksasa, kartu profil | Section dipin 400svh: huruf judul muncul dari skala 0, kartu naik sambil membuka clip-path, isi kartu zoom-out dari 2.8×, lalu social icon masuk terakhir |
| Experience | Rail navigasi + kartu bertumpuk | Kartu sticky bertumpuk, rail aktif otomatis, klik rail untuk melompat |
| Quote | Kutipan besar | Warna kata terisi mengikuti scroll |
| Project teaser | Dua pita "PROJECT" diagonal dengan ilustrasi objek (tomat & kaus kaki) | Pita bergerak berlawanan arah mengikuti scroll, latar gradasi lembut tanpa garis potong |
| Projects | Grid kartu + modal detail | Reveal bertahap, hover angkat, modal dengan focus trap + Esc |
| Tools | Grid kategori + logo teknologi | Reveal bertahap, kartu hover, marquee nama tools |
| Certificates | Slider horizontal dengan kartu teks + gambar sertifikat | Reveal bertahap, tombol prev/next, dot indicator, progress bar, carousel melingkar |
| Contact | Marquee nama, email + tombol salin, kartu sosial | Salin email dengan toast, hover geser pada kartu tautan |

Detail teknis:

- **Smooth scroll**: Lenis, disinkronkan dengan GSAP ticker dan ScrollTrigger.
- **Intro halaman**: saat pertama dibuka atau refresh, toggle hero tampil dalam skala besar, berputar 360° sambil mengecil ke posisi akhir; judul, tagline, tombol, dan navigasi menyusul. Tidak ada layar loader terpisah, jadi animasi langsung terlihat.
- **Toggle hero**: membuka layer pita diagonal (sudut acak, masuk dari kiri/kanan, judul keluar per huruf). Tutup dengan toggle itu sendiri atau Esc; fokus tetap pada toggle. Saat di-hover, toggle membesar 1.1× dan bola 1.05× seperti referensi.
- **CTA hero**: saat kursor diarahkan, latar dan bayangan bergeser, lalu teks “Scroll untuk selengkapnya” bergulir ke atas per huruf dan digantikan baris kedua — mengikuti animasi tombol “Scroll for more awesomeness” di referensi.
- **Navigasi**: pill nav yang menyembunyikan diri saat scroll ke bawah dan muncul saat scroll ke atas; link aktif mengikuti section.
- **Aksesibilitas**: skip link, fokus terlihat, `aria-*` pada toggle/modal/slider, dan `prefers-reduced-motion` mematikan animasi berat. Jika GSAP gagal dimuat, halaman tetap dirender tanpa animasi (ada fallback toggle sederhana).
- **Responsif**: diuji pada 1440px dan 390px; layout experience berubah dari sticky-stack menjadi daftar biasa di layar kecil.

---

## 5. Kustomisasi warna

Palet ada di blok `:root` pada `public/assets/css/style.css`:

```css
--ink: #0a0a0c;        /* latar utama */
--ink-2: #101014;      /* latar section alternatif */
--bone: #f2ece1;       /* teks utama */
--bone-dim: #c9c3b8;   /* teks sekunder */
--gold: #c9a45c;       /* aksen */
--gold-soft: #e6cf9c;  /* aksen terang */
```

Mengubah dua variabel `--gold` dan `--gold-soft` sudah cukup untuk mengganti karakter aksen tanpa merusak kontras.

---

## 6. Perubahan tidak muncul?

Kalau setelah edit file tampilan masih terlihat lama:

1. **Pastikan alamatnya benar** — <http://localhost:8080> untuk Docker produksi, atau <http://localhost:4321> untuk `npm run dev`.
2. **Hard refresh** sekali: `Ctrl + Shift + R` (Linux/Windows) atau `Cmd + Shift + R` (macOS).
3. **Pastikan server/container jalan**:

   ```bash
   docker compose ps
   ```

   Kalau kosong atau `Exited`, jalankan `docker compose up -d --build`.

4. **Edit di folder yang benar** — file harus diubah di `/home/ell/portfolio`.

Image Docker produksi berisi hasil build, jadi setelah mengubah kode jalankan ulang `docker compose up -d --build`. Untuk pengembangan sehari-hari tanpa rebuild, gunakan `npm run dev` atau `docker compose --profile dev up dev`.

Kalau ingin memastikan container menyajikan file yang sama dengan hasil build di disk:

```bash
docker compose exec web md5sum /usr/share/nginx/html/assets/js/content.js
npm run build && md5sum dist/assets/js/content.js
```

Kedua hash harus sama.

---

## 7. Catatan

- Konten saat ini adalah **placeholder** karena CV menyusul. Tidak ada klaim pengalaman/klien nyata di dalamnya.
- Situs tidak memuat tracker atau request eksternal; seluruh aset lokal.
- Untuk validasi cepat (link, gambar, console error, responsif), project ini bisa diuji dengan tools QA yang ada di `../universal-website-testing`:

  ```bash
  cd ../universal-website-testing
  TARGET_URL=http://host.docker.internal:8080 docker compose run --rm playwright
  ```
