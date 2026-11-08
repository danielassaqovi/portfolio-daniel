/* ============================================================
   TECH STACK
   Satu sumber data untuk section "Tools & Languages".
   Tambah / hapus / ubah item di sini.

   - name  : label yang ditampilkan
   - icon  : nama file di assets/img/tech/ (tanpa .svg)
   - size  : 'half' (kartu setengah baris) atau 'full' (selebar grid)
   ============================================================ */

window.TECH_STACK = {
  categories: [
    {
      title: 'Frontend Development',
      size: 'half',
      items: [
        { name: 'HTML', icon: 'html5' },
        { name: 'CSS', icon: 'css' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'Tailwind CSS', icon: 'tailwindcss' },
      ],
    },
    {
      title: 'Backend Development',
      size: 'half',
      items: [
        { name: 'PHP', icon: 'php' },
        { name: 'Laravel', icon: 'laravel' },
        { name: 'Node.js', icon: 'nodedotjs' },
      ],
    },
    {
      title: 'Programming Languages',
      size: 'half',
      items: [
        { name: 'PHP', icon: 'php' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'Python', icon: 'python' },
        { name: 'Dart', icon: 'dart' },
      ],
    },
    {
      title: 'Database',
      size: 'half',
      items: [
        { name: 'MySQL', icon: 'mysql' },
        { name: 'PostgreSQL', icon: 'postgresql' },
      ],
    },
    {
      title: 'Mobile Development',
      size: 'half',
      items: [{ name: 'Flutter', icon: 'flutter' }],
    },
    {
      title: 'Software Testing & QA',
      size: 'half',
      items: [
        { name: 'Playwright', icon: 'playwright' },
        { name: 'Cypress', icon: 'cypress' },
        { name: 'Postman', icon: 'postman' },
      ],
    },
    {
      title: 'Development Tools',
      size: 'full',
      items: [
        { name: 'Git', icon: 'git' },
        { name: 'GitHub', icon: 'github' },
        { name: 'Visual Studio Code', icon: 'visualstudiocode' },
        { name: 'Docker', icon: 'docker' },
        { name: 'Docker Compose', icon: 'docker' },
        { name: 'Linux', icon: 'linux' },
        { name: 'Vercel', icon: 'vercel' },
      ],
    },
  ],
};
