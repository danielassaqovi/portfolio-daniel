/* ============================================================
   SITE CONTENT
   Semua teks, tautan, dan data CV ada di file ini.
   Cukup edit file ini saat CV final sudah tersedia.
   ============================================================ */

window.SITE = {
  // ----------------------------------------------------------
  // Identitas
  // ----------------------------------------------------------
  name: 'Muhammad Daniel Assaqovi',
  heroLines: ['MUHAMMAD DANIEL', '"ASSAQOVI"'],
  role: 'Full Stack Developer & QA Engineer',
  tagline:
    'Membangun aplikasi web dan mobile, lalu memastikan kualitasnya lewat pengujian yang terukur.',
  location: 'Indonesia',
  email: 'hpdaniel828@gmail.com',

  // Toggle di hero membuka "mode" kedua: pita diagonal bergerak.
  heroStripes: ['LARAVEL', 'NODE.JS', 'FLUTTER', 'PLAYWRIGHT', 'DOCKER'],

  // Kumpulan gambar abstrak bertema IT di dalam pita. Setiap kali halaman
  // dimuat, gambar dipilih acak dari daftar ini agar tidak selalu sama.
  heroStripeImages: [
    'assets/img/stripe-code.svg',
    'assets/img/stripe-circuit.svg',
    'assets/img/stripe-network.svg',
    'assets/img/stripe-wireframe.svg',
    'assets/img/stripe-server.svg',
    'assets/img/stripe-data.svg',
  ],

  // Opsional: override manual per pita (urutan sama dengan heroStripes).
  // null = pakai gambar acak dari heroStripeImages.
  // kind: 'photo' atau 'cards'.
  heroStripeMedia: [null, null, null, null, null],

  // ----------------------------------------------------------
  // Tautan
  // ----------------------------------------------------------
  cvUrl: 'cv.pdf', // File CV final di root project, dibuka di viewer PDF browser

  socials: [
    {
      label: 'GitHub',
      handle: '@danielassaqovi',
      href: 'https://github.com/danielassaqovi',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      handle: 'Muhammad Daniel Assaqovi',
      href: 'https://www.linkedin.com/in/muhammad-daniel-assaqovi-4b78b0337',
      icon: 'linkedin',
    },
    {
      label: 'Email',
      handle: 'hpdaniel828@gmail.com',
      href: 'mailto:hpdaniel828@gmail.com',
      icon: 'mail',
    },
  ],

  // ----------------------------------------------------------
  // About
  // ----------------------------------------------------------
  about: {
    photo: 'assets/img/profile.jpeg',
    photoAlt: 'Foto profil Muhammad Daniel Assaqovi',
    heading: 'Muhammad Daniel Assaqovi',
    subheading: 'Full Stack Developer & QA Engineer',
    // Boleh memakai <strong> dan <em> untuk penekanan.
    paragraphs: [
      'Saya seorang <strong>full stack developer dan QA engineer</strong> yang bekerja dengan <strong>PHP/Laravel</strong>, <strong>JavaScript/Node.js</strong>, dan <strong>Flutter</strong> untuk membangun aplikasi web serta mobile.',
      'Di sisi kualitas, saya menggunakan <strong>Playwright</strong>, <strong>Cypress</strong>, dan <strong>Postman</strong> untuk menguji fungsionalitas dan API. Terbiasa memakai Git, Docker, dan Linux dalam alur kerja sehari-hari.',
    ],
  },

  // ----------------------------------------------------------
  // Project Experience & Education
  // ----------------------------------------------------------
  experience: [
    {
      number: '01',
      title: 'Universal Website Testing',
      org: 'Personal Project',
      date: '2026 — Sekarang',
      summary:
        'Membangun toolkit pengujian website universal untuk membantu proses quality assurance secara terstruktur.',
      points: [
        'Menyusun <span class="hl">Playwright</span> end-to-end test yang berjalan di pipeline <span class="hl">Docker</span>.',
        'Mengurangi regresi manual dengan laporan hasil yang dapat ditelusuri dan screenshot otomatis.',
        'Berkolaborasi dengan tim produk untuk menerjemahkan kebutuhan menjadi test case yang terukur.',
      ],
    },
    {
      number: '02',
      title: 'Universal Mobile QA',
      org: 'Personal Project',
      date: '2026 — Sekarang',
      summary:
        'Mengembangkan project pengujian kualitas aplikasi mobile dengan pendekatan automation dan dokumentasi yang dapat digunakan ulang.',
      points: [
        'Menyusun skenario pengujian untuk alur dan perilaku aplikasi mobile.',
        'Menerapkan proses QA yang konsisten untuk berbagai skenario penggunaan.',
        'Mendokumentasikan hasil pengujian agar mudah ditinjau dan dikembangkan.',
      ],
    },
    {
      number: '03',
      title: 'Mahasiswa Sarjana Terapan Teknik Informatika',
      org: 'Politeknik Negeri Malang',
      date: '2024 — Sekarang',
      summary:
        'Menempuh pendidikan Sarjana Terapan Teknik Informatika dengan fokus pada rekayasa perangkat lunak dan pengujian perangkat lunak.',
      points: [
        'Mengembangkan kemampuan pemrograman, pengembangan web, dan quality assurance.',
        'Mengerjakan proyek kolaboratif dan membangun portofolio di bidang pengembangan web serta quality assurance.',
      ],
    },
  ],

  // ----------------------------------------------------------
  // Projects
  // ----------------------------------------------------------
  projects: [
    {
      title: 'Universal Website Testing',
      subtitle: 'Automated QA Toolkit',
      status: 'COMPLETED',
      statusType: 'completed',
      role: 'QA Automation',
      year: '2026',
      image: 'assets/img/mockup-dermaga-qa.svg',
      description:
        'Tools pengujian website universal berbasis Playwright, JavaScript, dan Docker. Laporan terakhir pada DERMAGA JTI: 19 test, 15 PASS, 3 FAIL, 1 SKIP.',
      tech: ['Playwright', 'Docker', 'JavaScript', 'HTML Report'],
      details: {
        overview:
          'Alat pengujian read-only yang dapat diarahkan ke URL mana pun untuk memeriksa status HTTP, judul, navigasi, tautan, gambar, form, dan tampilan responsif. Hasil ditulis sebagai laporan HTML dengan screenshot kegagalan.',
        challenges: [
          'Menjaga hasil tetap jujur: elemen yang tidak ada dicatat SKIP, bukan PASS palsu.',
          'Membatasi crawling agar website target tidak terbebani.',
          'Mendeteksi overflow horizontal per breakpoint, bukan hanya pada satu ukuran layar.',
        ],
        outcomes: [
          'Uji pada https://jti.polinema.ac.id/dermaga: 15 dari 19 test PASS (83.3%).',
          'Tiga kegagalan nyata terdeteksi: overflow 360px di desktop, 203px di tablet, dan 98px di mobile.',
          'Laporan HTML, JSON, dan screenshot tersedia untuk setiap proses pengujian.',
        ],
        highlights: ['URL Crawling', 'Link & Form Checks', 'HTML Report', 'Screenshot on Fail'],
      },
      links: {
        details: '#',
        code: 'https://github.com/danielassaqovi/automation-website-testing-DERMAGAJTI',
      },
    },
    {
      title: 'Universal Mobile QA',
      subtitle: 'Mobile Quality Assurance Toolkit',
      status: 'COMPLETED',
      statusType: 'completed',
      role: 'QA Automation',
      year: '2026',
      image: 'assets/img/mockup-mobile-qa.svg',
      description:
        'Framework Dart modular untuk otomasi QA Android berbasis konfigurasi YAML, dengan transport ADB, suite generik, dan laporan JSON/HTML.',
      tech: ['Dart', 'ADB', 'Docker', 'Patrol'],
      details: {
        overview:
          'Framework CLI yang memisahkan konfigurasi aplikasi (YAML), suite pengujian yang dapat dipakai ulang, dan pelaporan. Adapter Patrol dipakai untuk aplikasi Flutter, sedangkan aplikasi native memerlukan adapter sendiri.',
        challenges: [
          'ADB harus tetap di host, sehingga container diarahkan ke host.docker.internal:5037.',
          'Status perangkat tidak selalu "authorized"; dialog RSA dan kondisi offline harus ditangani.',
          'Menolak hasil palsu: tanpa perangkat authorized, eksekusi dicatat sebagai skipped.',
        ],
        outcomes: [
          'Alur CLI lengkap: device-check, list-apps, test, dan report.',
          'Aplikasi baru cukup menambah YAML dan suite tanpa mengubah core.',
          'Artefak laporan JSON, HTML, dan screenshot dihasilkan per eksekusi.',
        ],
        highlights: ['Config Driven', 'ADB Transport', 'Reusable Suite', 'Docker Ready'],
      },
      links: { details: '#', code: 'https://github.com/danielassaqovi/universal-mobile-qa' },
    },
    {
      title: 'SIAKAD QA Automation',
      subtitle: 'Automated Testing Suite',
      status: 'SOURCE AVAILABLE',
      statusType: 'progress',
      role: 'QA Automation',
      year: '2026',
      image: 'assets/img/mockup-siakad-qa.svg',
      description:
        'Suite pengujian otomatis berbasis Playwright untuk SIAKAD Politeknik Negeri Malang: halaman publik, validasi login, aksesibilitas, responsif, hingga crawl seluruh menu setelah login.',
      tech: ['Playwright', 'JavaScript', 'Docker', 'GitHub Actions'],
      details: {
        overview:
          'Membangun kerangka pengujian read-only untuk SIAKAD Polinema. Pengujian publik berjalan tanpa akun, sedangkan fitur akademik diuji dengan kredensial melalui environment variable sehingga tidak ada data sensitif yang masuk repository.',
        challenges: [
          'Seluruh fitur akademik berada di balik login, jadi pengujian harus memisahkan halaman publik dan area terautentikasi.',
          'Selectors harus tahan terhadap layout SIAKAD yang memakai Metronic dan jQuery.',
          'Menghindari PASS palsu: menu yang tidak tersedia pada akun ditandai skipped, bukan lulus.',
        ],
        outcomes: [
          '18 pengujian halaman publik lulus terhadap situs produksi.',
          'Crawl menu sidebar dan peta fitur siap dijalankan setelah kredensial diisi.',
          'Laporan HTML/JSON, Docker, dan workflow GitHub Actions tersedia di repository.',
        ],
        highlights: ['Login Flow', 'Menu Crawl', 'Feature Map', 'CI Ready'],
      },
      links: {
        details: '#',
        code: 'https://github.com/danielassaqovi/siakad-qa-automation',
      },
    },
    {
      title: 'PBL InLET',
      subtitle: 'Live Web Project',
      status: 'LIVE',
      statusType: 'active',
      role: 'Web Development',
      year: '2026',
      image: 'assets/img/mockup-pbl-inlet.svg',
      description:
        'Website laboratorium InLET Politeknik Negeri Malang: profil riset, anggota, berita, produk, dan layanan laboratorium.',
      tech: ['PHP', 'Bootstrap', 'MySQL', 'Vercel'],
      details: {
        overview:
          'Membangun website PBL InLET sebagai pusat informasi laboratorium: empat pilar riset, profil anggota, produk, mitra, serta layanan peminjaman alat, absensi, dan buku tamu.',
        challenges: [
          'Menata empat pilar riset dalam matriks yang tetap terbaca di layar kecil.',
          'Menyatukan banyak konten dinamis (riset, produk, mitra, anggota) dalam satu navigasi yang konsisten.',
          'Menjaga halaman tetap ringan meski memuat banyak gambar dan slider.',
        ],
        outcomes: [
          'Website live dan dapat diakses publik melalui Vercel.',
          'Struktur konten riset dan layanan laboratorium tersaji dalam satu situs.',
          'Source code tersedia terbuka di GitHub untuk kolaborasi.',
        ],
        highlights: [
          'Research Pillars',
          'Member Directory',
          'Lab Services',
          'Responsive Layout',
        ],
      },
      links: {
        details: '#',
        code: 'https://github.com/FALAA-1285/PBL-InLET',
        live: 'https://pblinlet.vercel.app/',
      },
    },
    {
      title: 'PBL JTify',
      subtitle: 'Web Project',
      status: 'SOURCE AVAILABLE',
      statusType: 'progress',
      role: 'Web Development',
      year: '2026',
      image: 'assets/img/project-1.svg',
      description:
        'Project web PBL JTify dengan source code tersedia di GitHub.',
      tech: ['Web', 'GitHub'],
      details: {
        overview: 'Project PBL JTify yang source code-nya tersedia di GitHub, tanpa deployment live saat ini.',
        challenges: ['Mengembangkan fitur project sesuai kebutuhan pengguna.'],
        outcomes: ['Source code project tersedia untuk ditinjau di GitHub.'],
        highlights: ['Web App', 'Responsive UI', 'GitHub Source', 'Team Project'],
      },
      links: {
        details: '#',
        code: 'https://github.com/RizkyFirdiansyah/pbl_jtify.git',
      },
    },
  ],

  // ----------------------------------------------------------
  // Tools & skills
  // Data teknologi ada di assets/js/tech.js (terpisah agar mudah
  // ditambah, dihapus, atau diedit).
  // ----------------------------------------------------------

  // ----------------------------------------------------------
  // Certificates
  // ----------------------------------------------------------
  certificates: [
    {
      year: '2026',
      type: 'QA — Introduction',
      title: 'Quality Assurance Fundamental',
      issuer: 'MySkill',
      credential: 'MS-20261108-LHrO8ysh8p7zNmUaJiJc',
      description:
        'Dasar-dasar quality assurance: peran QA dalam tim produk, jenis pengujian, penyusunan test case, dan pelaporan bug.',
      image: 'assets/img/cert-myskill-qa-fundamental.webp',
      wide: true,
    },
    {
      year: '2026',
      type: 'QA — Test Technique',
      title: 'Automation Testing',
      issuer: 'MySkill',
      credential: 'MS-20261108-nE31QeE7N2TUD2X72p7K',
      description:
        'Kelas QA Test Technique: strategi otomasi pengujian, pemilihan tool, penulisan skrip uji yang dapat diulang, serta pembacaan hasil eksekusi.',
      image: 'assets/img/cert-myskill-automation.webp',
      wide: true,
    },
    {
      year: '2026',
      type: 'QA — Introduction',
      title: 'Quality Assurance in Software Development Life Cycle (SDLC)',
      issuer: 'MySkill',
      credential: 'MS-20261108-2X6RMg2e9mg7UbhpAyIq',
      description:
        'Posisi QA di setiap fase SDLC: requirement, desain, implementasi, pengujian, hingga rilis dan pemeliharaan.',
      image: 'assets/img/cert-myskill-qa-sdlc.webp',
      wide: true,
    },
    {
      year: '2026',
      type: 'Coding Certification',
      title: 'Dasar Pemrograman Web',
      issuer: 'Dicoding Indonesia',
      credential: 'L4PQWRW77PO1',
      description:
        'Sertifikasi dasar pengembangan web: struktur HTML, styling CSS, dasar JavaScript, serta penerapan logika pemrograman pada halaman web.',
      image: 'assets/img/cert-dicoding-web.svg',
    },
    {
      year: '2026',
      type: 'Financial Literacy',
      title: 'Introduction to Financial Literacy',
      issuer: 'Dicoding Indonesia',
      credential: 'EYX4O1O5JXDL',
      description:
        'Program literasi keuangan dasar: penyusunan anggaran, pemahaman instrumen tabungan dan investasi, serta perencanaan keuangan pribadi.',
      image: 'assets/img/cert-dicoding-financial.svg',
    },
  ],

  // ----------------------------------------------------------
  // Closing statement
  // ----------------------------------------------------------
  quote: 'SETIAP DETAIL KECIL MENENTUKAN KUALITAS AKHIR',

  footer: {
    paragraphs: [
      'Full stack developer dan QA engineer yang membangun aplikasi web serta mobile, lalu menjaga kualitasnya melalui pengujian yang dapat diulang.',
      'Terbuka untuk berdiskusi soal pengembangan web, mobile, maupun pengujian perangkat lunak. Mari terhubung.',
    ],
    note: 'Dibangun dengan GSAP & Lenis.',
  },
};
