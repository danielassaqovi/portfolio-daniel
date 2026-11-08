import { defineConfig } from 'astro/config';

/* Portfolio ini adalah situs satu halaman yang seluruh interaksinya
   ditulis di JavaScript vanilla (GSAP + Lenis). Build Astro tetap
   statis supaya hasilnya bisa disajikan sebagai file biasa. */
export default defineConfig({
  // Hasil build sepenuhnya statis: `astro build` -> folder `dist/`.
  output: 'static',

  // Aset (CSS, JS, gambar, font, vendor) disajikan apa adanya dari public/
  // sehingga tidak di-bundle dan perilakunya sama seperti sebelumnya.
  publicDir: './public',

  // Server lokal untuk `npm run dev`.
  server: {
    port: 4321,
    host: true,
  },

  devToolbar: {
    enabled: false,
  },
});
