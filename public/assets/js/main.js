/* ============================================================
   MAIN — rendering + animation
   Semua konten berasal dari assets/js/content.js
   ============================================================ */
(function () {
  'use strict';

  var SITE = window.SITE || {};
  var $ = function (selector, root) {
    return (root || document).querySelector(selector);
  };
  var $$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ICONS = {
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.4c0-1.3-.02-2.97-1.8-2.97-1.82 0-2.1 1.42-2.1 2.88V21H9V9Z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 6.5h18v11H3v-11Zm0 0 9 6.5 9-6.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  };

  var ICONS_EXPERIENCE = {
    work: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h18v11H3zM9 8V5h6v3M3 12h18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    education:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Zm4 3v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  };

  function getPath(object, path) {
    return String(path)
      .split('.')
      .reduce(function (value, key) {
        return value === undefined || value === null ? undefined : value[key];
      }, object);
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ----------------------------------------------------------
     Text bindings
     ---------------------------------------------------------- */
  function bindContent() {
    $$('[data-bind]').forEach(function (node) {
      var value = getPath(SITE, node.getAttribute('data-bind'));
      if (value !== undefined && value !== null) node.textContent = value;
    });

    $$('[data-bind-html]').forEach(function (node) {
      var value = getPath(SITE, node.getAttribute('data-bind-html'));
      if (value !== undefined && value !== null) node.innerHTML = value;
    });

    $$('[data-bind-href]').forEach(function (node) {
      var value = getPath(SITE, node.getAttribute('data-bind-href'));
      if (value) node.setAttribute('href', value);
    });

    $$('[data-bind-src]').forEach(function (node) {
      var value = getPath(SITE, node.getAttribute('data-bind-src'));
      if (value) node.setAttribute('src', value);
    });

    $$('[data-bind-alt]').forEach(function (node) {
      var value = getPath(SITE, node.getAttribute('data-bind-alt'));
      if (value) node.setAttribute('alt', value);
    });

    $$('[data-bind-href-email]').forEach(function (node) {
      if (SITE.email) node.setAttribute('href', 'mailto:' + SITE.email);
    });

    var email = $('[data-bind-email]');
    if (email && SITE.email) email.setAttribute('href', 'mailto:' + SITE.email);
  }

  /* ----------------------------------------------------------
     Social links
     ---------------------------------------------------------- */
  function renderSocials(container, withLabels) {
    if (!container || !Array.isArray(SITE.socials)) return;

    container.innerHTML = SITE.socials
      .map(function (social) {
        var icon = ICONS[social.icon] || ICONS.mail;
        var href = social.href || '#';
        var external = /^https?:/i.test(href);

        if (!withLabels) {
          return (
            '<li><a href="' +
            escapeHtml(href) +
            '" target="_blank" rel="noreferrer" aria-label="' +
            escapeHtml(social.label) +
            '">' +
            icon +
            '</a></li>'
          );
        }

        return (
          '<li><a class="contact-link" href="' +
          escapeHtml(href) +
          '"' +
          (external ? ' target="_blank" rel="noreferrer"' : '') +
          ' aria-label="' +
          escapeHtml(social.label + ' — ' + (social.handle || social.label)) +
          '">' +
          '<span class="contact-link-icon">' +
          icon +
          '</span>' +
          '<span class="contact-link-text"><strong>' +
          escapeHtml(social.label) +
          '</strong><small>' +
          escapeHtml(social.handle || social.label) +
          '</small></span>' +
          '<span class="contact-link-arrow" aria-hidden="true">↗</span>' +
          '</a></li>'
        );
      })
      .join('');
  }

  /* ----------------------------------------------------------
     Marquee helpers
     ---------------------------------------------------------- */
  function marqueeItem(text, star) {
    return '<span class="marquee-item">' + escapeHtml(text) + (star ? '<span class="sr-only"> </span>' : '') + '</span>';
  }

  function fillMarquee(track, items, repeat) {
    if (!track) return;
    var html = '';
    for (var i = 0; i < repeat; i += 1) {
      html += items.map(function (item) { return marqueeItem(item, true); }).join('');
    }
    track.innerHTML = html;
  }

  function renderMarquees() {
    var about = $('#about-marquee');
    if (about) {
      var label = 'About Me';
      about.innerHTML = new Array(28)
        .fill('<span>' + label + '</span>')
        .join('');
    }

    fillMarquee($('#contact-marquee'), [SITE.name || 'Portfolio'], 6);
  }

  /* ----------------------------------------------------------
     Tech stack (data: assets/js/tech.js)
     ---------------------------------------------------------- */
  function techCategories() {
    var stack = window.TECH_STACK;
    return stack && Array.isArray(stack.categories) ? stack.categories : [];
  }

  function renderTechGrid() {
    var grid = $('#tech-grid');
    var categories = techCategories();
    if (!grid || !categories.length) return;

    grid.innerHTML = categories
      .map(function (category, index) {
        var items = Array.isArray(category.items) ? category.items : [];

        return (
          '<article class="tech-card" data-tech-card>' +
          '<header class="tech-card-head">' +
          '<span class="tech-index" aria-hidden="true">' +
          String(index + 1).padStart(2, '0') +
          '</span>' +
          '<h3 class="tech-title">' +
          escapeHtml(category.title) +
          '</h3>' +
          '<span class="tech-count" aria-hidden="true">' +
          items.length +
          '</span>' +
          '</header>' +
          '<ul class="tech-list">' +
          items
            .map(function (item) {
              return (
                '<li class="tech-item">' +
                '<span class="tech-logo" aria-hidden="true"><img src="assets/img/tech/' +
                escapeHtml(item.icon) +
                '.svg" alt="" width="24" height="24" loading="lazy"></span>' +
                '<span class="tech-name">' +
                escapeHtml(item.name) +
                '</span>' +
                '</li>'
              );
            })
            .join('') +
          '</ul>' +
          '</article>'
        );
      })
      .join('');

    var names = [];
    categories.forEach(function (category) {
      (category.items || []).forEach(function (item) {
        if (names.indexOf(item.name) === -1) names.push(item.name);
      });
    });

    if (names.length) fillMarquee($('#tech-marquee'), names, 3);
  }

  /* ----------------------------------------------------------
     Copy email
     ---------------------------------------------------------- */
  function setupCopyEmail() {
    var button = $('#copy-email');
    var toast = $('#toast');
    if (!button || !SITE.email) return;

    var label = button.querySelector('span');
    var defaultLabel = label ? label.textContent : 'Salin';
    var timer;

    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('is-visible');
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 2600);
    }

    function fallbackCopy(text) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (error) {
        ok = false;
      }
      document.body.removeChild(area);
      return ok;
    }

    button.addEventListener('click', function () {
      var email = SITE.email;

      function done(ok) {
        if (label) label.textContent = ok ? 'Tersalin' : 'Gagal';
        showToast(ok ? 'Email disalin: ' + email : 'Tidak bisa menyalin. Email: ' + email);
        window.setTimeout(function () {
          if (label) label.textContent = defaultLabel;
        }, 2200);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(email)
          .then(function () { done(true); })
          .catch(function () { done(fallbackCopy(email)); });
      } else {
        done(fallbackCopy(email));
      }
    });
  }

  /* ----------------------------------------------------------
     Hero stripes
     ---------------------------------------------------------- */
  function renderHeroStripes() {
    var holder = $('#hero-stripes');
    if (!holder) return;

    var words = Array.isArray(SITE.heroStripes) && SITE.heroStripes.length
      ? SITE.heroStripes
      : ['DESIGN', 'BUILD', 'TEST'];
    var media = Array.isArray(SITE.heroStripeMedia) ? SITE.heroStripeMedia : [];
    var imagePool = Array.isArray(SITE.heroStripeImages)
      ? SITE.heroStripeImages.filter(function (src) {
          return typeof src === 'string' && src;
        })
      : [];

    // Acak urutan gambar sekali per load, lalu pakai bergiliran.
    for (var i = imagePool.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = imagePool[i];
      imagePool[i] = imagePool[j];
      imagePool[j] = tmp;
    }

    var poolCursor = 0;
    function nextImage() {
      if (!imagePool.length) return null;
      var src = imagePool[poolCursor % imagePool.length];
      poolCursor += 1;
      return src;
    }

    var patterns = [
      ['w', 'w', 'w', 'w'],
      ['w', 'm', 'w', 'w'],
      ['w', 'w', 'm', 'w', 'w'],
      ['w', 'm', 'w', 'w'],
      ['w', 'w', 'w', 'w'],
    ];

    holder.innerHTML = words
      .map(function (word, index) {
        var pattern = patterns[index % patterns.length];
        var item = media[index] || null;

        // Tanpa override manual: pilih gambar IT/abstrak secara acak.
        if (!item && imagePool.length) {
          if (index === 2) {
            item = {
              kind: 'cards',
              items: [nextImage(), nextImage(), nextImage()].filter(Boolean),
            };
          } else {
            item = { kind: 'photo', src: nextImage() };
          }
        }

        var inner = pattern
          .map(function (slot) {
            if (slot === 'm' && item) {
              if (item.kind === 'cards' && Array.isArray(item.items)) {
                return (
                  '<span class="hero-stripe-media hero-stripe-media--cards">' +
                  item.items
                    .map(function (src) {
                      return (
                        '<span class="hero-stripe-card"><img src="' +
                        escapeHtml(src) +
                        '" alt="" width="400" height="250" loading="eager"></span>'
                      );
                    })
                    .join('') +
                  '</span>'
                );
              }

              return (
                '<span class="hero-stripe-media"><img src="' +
                escapeHtml(item.src) +
                '" alt="" width="400" height="400" loading="eager"></span>'
              );
            }

            return '<span class="hero-stripe-text">' + escapeHtml(word) + '</span>';
          })
          .join('');

        return (
          '<div class="hero-stripe-wrap">' +
          '<div class="hero-stripe" data-stripe="' +
          index +
          '">' +
          inner +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  /* ----------------------------------------------------------
     Split hero title into characters (animasi per huruf)
     ---------------------------------------------------------- */
  function splitHeroTitle() {
    var title = $('.hero-text');
    if (!title) return;

    var lines = $$('[data-hero-line]', title);
    if (!lines.length) return;

    title.setAttribute(
      'aria-label',
      lines
        .map(function (line) { return line.textContent.trim(); })
        .join(' ')
    );

    lines.forEach(function (line) {
      var text = line.textContent;
      var html = '';

      for (var i = 0; i < text.length; i += 1) {
        var char = text.charAt(i);

        if (char === ' ') {
          html += '<span class="hero-char hero-char--space" aria-hidden="true">&nbsp;</span>';
        } else {
          html += '<span class="hero-char" aria-hidden="true">' + escapeHtml(char) + '</span>';
        }
      }

      line.innerHTML = html;
      line.setAttribute('aria-hidden', 'true');
    });
  }

  /* ----------------------------------------------------------
     About copy
     ---------------------------------------------------------- */
  function renderAboutCopy() {
    var holder = $('.about-copy');
    if (!holder || !SITE.about || !Array.isArray(SITE.about.paragraphs)) return;
    holder.innerHTML = SITE.about.paragraphs
      .map(function (paragraph) { return '<p>' + paragraph + '</p>'; })
      .join('');
  }

  function renderContactCopy() {
    var holder = $('#contact-paragraphs');
    if (!holder || !SITE.footer || !Array.isArray(SITE.footer.paragraphs)) return;
    holder.innerHTML = SITE.footer.paragraphs
      .map(function (paragraph) { return '<p>' + paragraph + '</p>'; })
      .join('');
  }

  /* ----------------------------------------------------------
     Experience
     ---------------------------------------------------------- */
  function renderExperience() {
    var list = $('#xp-list');
    var rail = $('#xp-rail');
    if (!list || !Array.isArray(SITE.experience)) return;

    list.innerHTML = SITE.experience
      .map(function (item, index) {
        var icon = /univers|sekolah|sarjana|education|pendidikan/i.test(item.title)
          ? ICONS_EXPERIENCE.education
          : ICONS_EXPERIENCE.work;

        return (
          '<article class="xp-card" data-xp-card data-index="' + index + '" aria-labelledby="xp-title-' + index + '" style="top: calc(124px + ' + index * 14 + 'px); z-index: ' + (index + 1) + '">' +
          '<span class="xp-num" aria-hidden="true">' + escapeHtml(item.number) + '</span>' +
          '<span class="xp-icon" aria-hidden="true">' + icon + '</span>' +
          '<h3 class="xp-title" id="xp-title-' + index + '">' + escapeHtml(item.title) + '</h3>' +
          '<p class="xp-org">' + escapeHtml(item.org) + '</p>' +
          '<span class="xp-date">' + escapeHtml(item.date) + '</span>' +
          '<p class="xp-summary">' + escapeHtml(item.summary) + '</p>' +
          '<ul class="xp-points">' +
          (item.points || []).map(function (point) { return '<li>' + point + '</li>'; }).join('') +
          '</ul>' +
          '</article>'
        );
      })
      .join('');

    if (rail) {
      rail.innerHTML = SITE.experience
        .map(function (item, index) {
          return (
            '<button type="button" data-xp-nav="' + index + '"' + (index === 0 ? ' class="is-active"' : '') + '>' +
            '<span class="xp-rail-num">' + escapeHtml(item.number) + '</span>' +
            '<span class="xp-rail-label">' + escapeHtml(item.title) + '</span>' +
            '</button>'
          );
        })
        .join('');
    }
  }

  /* ----------------------------------------------------------
     Projects
     ---------------------------------------------------------- */
  function renderProjects() {
    var grid = $('#projects-grid');
    if (!grid || !Array.isArray(SITE.projects)) return;
    var pageSize = 3;
    var page = Number(grid.getAttribute('data-page') || 0);
    var totalPages = Math.max(1, Math.ceil(SITE.projects.length / pageSize));
    page = Math.min(page, totalPages - 1);
    grid.setAttribute('data-page', page);

    grid.innerHTML = SITE.projects
       .slice(page * pageSize, page * pageSize + pageSize)
       .map(function (project, localIndex) {
         var index = page * pageSize + localIndex;
        var tags = (project.tech || [])
         .map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; })
          .join('');
        var codeLink = project.links && project.links.code;
        var liveLink = project.links && project.links.live;
        var codeButton = codeLink ? '<a class="btn btn--ghost" href="' + escapeHtml(codeLink) + '" target="_blank" rel="noreferrer">Code</a>' : '';
        var liveButton = liveLink
          ? '<a class="btn btn--live" href="' + escapeHtml(liveLink) + '" target="_blank" rel="noreferrer"><span aria-hidden="true">◎</span> Live</a>'
          : '<span class="btn btn--unavailable" aria-label="Live project belum tersedia"><span aria-hidden="true">×</span> Live</span>';

        return (
          '<article class="project-card" data-project-card>' +
          '<div class="project-media">' +
          '<img src="' + escapeHtml(project.image) + '" alt="Pratinjau proyek ' + escapeHtml(project.title) + '" width="800" height="450" loading="lazy">' +
          '<span class="project-status project-status--' + escapeHtml(project.statusType || 'active') + '">' + escapeHtml(project.status) + '</span>' +
          '</div>' +
          '<div class="project-body">' +
          '<div class="project-meta"><span>' + escapeHtml(project.role) + '</span><span>' + escapeHtml(project.year) + '</span></div>' +
          '<h3 class="project-title">' + escapeHtml(project.title) + '</h3>' +
          '<p class="project-subtitle">' + escapeHtml(project.subtitle) + '</p>' +
          '<p class="project-desc">' + escapeHtml(project.description) + '</p>' +
          '<div class="project-tags">' + tags + '</div>' +
          '<div class="project-actions">' +
          '<button class="btn btn--details" type="button" data-project-open="' + index + '">Lihat Detail</button>' +
           codeButton +
           liveButton +
          '</div>' +
          '</div>' +
          '</article>'
        );
      })
       .join('');

    var label = $('#projects-page-label');
    var previous = $('#projects-prev');
    var next = $('#projects-next');
    if (label) label.textContent = 'PAGE ' + (page + 1) + ' OF ' + totalPages;
    if (previous) {
      previous.disabled = page === 0;
      previous.onclick = function () {
        if (page > 0) goToProjectsPage(page - 1);
      };
    }
    if (next) {
      next.disabled = page === totalPages - 1;
      next.onclick = function () {
        if (page < totalPages - 1) goToProjectsPage(page + 1);
      };
    }
  }

  // Ganti halaman project. Halaman bisa berisi jumlah kartu berbeda, jadi
  // tinggi dokumen berubah dan tombol pagination seolah "melompat". Setelah
  // render, tampilan digulir halus ke awal daftar kartu agar halaman baru
  // selalu terbaca dari atas dan posisinya konsisten.
  function goToProjectsPage(target) {
    var grid = $('#projects-grid');
    if (!grid) return;
    grid.setAttribute('data-page', target);
    renderProjects();

    window.requestAnimationFrame(function () {
      var top = grid.getBoundingClientRect().top + window.scrollY - 88;
      if (window.__lenis && window.__lenis.scrollTo) {
        window.__lenis.scrollTo(top, { immediate: false });
      } else {
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

  /* ----------------------------------------------------------
     Certificates
     ---------------------------------------------------------- */
  function renderCertificates() {
    var track = $('#certs-track');
    var dots = $('#certs-dots');
    if (!track || !Array.isArray(SITE.certificates)) return;

    track.innerHTML = SITE.certificates
      .map(function (cert) {
        var image = cert.image || 'assets/img/cert-dicoding-web.svg';
        return (
          '<article class="cert-card' + (cert.wide ? ' cert-card--wide' : '') + '" data-cert-card>' +
          '<span class="cert-year" aria-hidden="true">' + escapeHtml(cert.year) + '</span>' +
          '<div class="cert-slide">' +
          '<div class="cert-copy">' +
          '<span class="cert-type">' + escapeHtml(cert.type) + '</span>' +
          '<h3 class="cert-title">' + escapeHtml(cert.title) + '</h3>' +
          '<p class="cert-desc">' + escapeHtml(cert.description) + '</p>' +
          '<p class="cert-issuer">' + escapeHtml(cert.issuer) + ' · ' + escapeHtml(cert.year) +
            (cert.credential
              ? ' · <span class="cert-cred">ID ' + escapeHtml(cert.credential) + '</span>'
              : '') +
            '</p>' +
          '</div>' +
          '<div class="cert-media' + (cert.wide ? ' cert-media--wide' : '') + '">' +
          '<img src="' + escapeHtml(image) + '" alt="Sertifikat ' + escapeHtml(cert.title) + '" loading="lazy" width="' + (cert.wide ? '1400' : '600') + '" height="' + (cert.wide ? '788' : '450') + '">' +
          '</div>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    if (dots) {
      dots.innerHTML = SITE.certificates
        .map(function (cert, index) {
          return (
            '<button type="button" role="tab" aria-label="Sertifikat ' +
            (index + 1) +
            ': ' +
            escapeHtml(cert.title) +
            '" data-cert-dot="' +
            index +
            '"></button>'
          );
        })
        .join('');
    }
  }

  /* ----------------------------------------------------------
     Interaction: certificates slider
     ---------------------------------------------------------- */
  function setupCerts() {
    var track = $('#certs-track');
    if (!track) return;

    var prev = $('#certs-prev');
    var next = $('#certs-next');
    var progress = $('#certs-progress-bar');
    var dots = $$('#certs-dots [data-cert-dot]');
    var real = $$('.cert-card', track);
    var n = real.length;
    if (!n) return;

    /* Satu blok kartu dikloning ke kiri dan ke kanan. Blok tengah berisi
       kartu asli. Dengan begitu kartu di kiri/kanan selalu terisi (tidak ada
       ruang kosong) dan navigasi bisa berputar tanpa henti. */
    var leftFrag = document.createDocumentFragment();
    var rightFrag = document.createDocumentFragment();
    real.forEach(function (card) {
      [leftFrag, rightFrag].forEach(function (frag) {
        var clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('data-clone', 'true');
        frag.appendChild(clone);
      });
    });
    track.insertBefore(leftFrag, track.firstChild);
    track.appendChild(rightFrag);

    var cards = $$('.cert-card', track); // 3 blok: kloning kiri, asli, kloning kanan

    /* Kartu yang ditampilkan di tengah saat halaman pertama dibuka.
       Automation Testing berada di urutan kedua, jadi posisi awal = 1. */
    var START_INDEX = 1;
    var current = START_INDEX;
    var animating = false;
    var settleTimer = null;
    var idleTimer = null;
    var ready = false;

    function centerOf(el) {
      var trackRect = track.getBoundingClientRect();
      var rect = el.getBoundingClientRect();
      return (
        track.scrollLeft + (rect.left - trackRect.left) + rect.width / 2 -
        track.clientWidth / 2
      );
    }

    /* Jarak satu blok penuh. Blok identik, jadi menggeser scroll sebesar
       kelipatan nilai ini tidak terlihat sama sekali. */
    function period() {
      return centerOf(cards[n]) - centerOf(cards[0]);
    }

    /* Lompat tanpa animasi. */
    function jumpTo(left) {
      var previous = track.style.scrollBehavior;
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = left;
      track.style.scrollBehavior = previous;
    }

    /* Kembalikan posisi scroll ke blok tengah (aman karena isi blok sama). */
    function recenter() {
      var p = period();
      if (!p) return;
      var guard = 0;
      while (track.scrollLeft > p * 1.5 && guard++ < 6) jumpTo(track.scrollLeft - p);
      while (track.scrollLeft < p * 0.5 && guard++ < 6) jumpTo(track.scrollLeft + p);
    }

    function nearestDomIndex() {
      var center = track.scrollLeft + track.clientWidth / 2;
      var best = 0;
      var bestDistance = Infinity;
      cards.forEach(function (card, i) {
        var distance = Math.abs(centerOf(card) + track.clientWidth / 2 - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      return best;
    }

    function realIndexOf(domIndex) {
      return ((domIndex - n) % n + n) % n;
    }

    function paint() {
      // Selama animasi tombol berjalan, `current` adalah sumber kebenaran
      // (posisi scroll masih di tengah jalan), jadi jangan ditimpa.
      if (!animating) current = realIndexOf(nearestDomIndex());

      dots.forEach(function (dot, i) {
        var active = i === current;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      if (progress) {
        var ratio = n > 1 ? current / (n - 1) : 1;
        progress.style.width = (12 + ratio * 88).toFixed(2) + '%';
      }
    }

    /* Titik scroll untuk kartu ke-index. Selalu dipilih salinan yang arah
       geraknya sesuai (dir 1 = maju, -1 = mundur) agar animasi terlihat
       bergeser satu kartu, bukan melompat jauh. */
    function targetFor(index, dir, from) {
      var base = centerOf(cards[n + index]);
      var p = period();
      if (!p) return base;

      // `from` adalah posisi logis terakhir. Saat pengguna menekan tombol
      // beruntun, animasi sebelumnya belum selesai sehingga scrollLeft
      // masih di tempat lama; tanpa ini sebagian klik jadi hilang.
      var start = typeof from === 'number' ? from : track.scrollLeft;
      var target = base + Math.round((start - base) / p) * p;
      if (dir > 0 && target < start + 1) target += p;
      if (dir < 0 && target > start - 1) target -= p;
      return target;
    }

    var pendingLeft = null;

    function markAnimating() {
      animating = true;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(function () {
        animating = false;
        recenter();
        pendingLeft = track.scrollLeft;
        paint();
      }, 640);
    }

    function goTo(index, dir) {
      markAnimating();
      var from = pendingLeft != null ? pendingLeft : track.scrollLeft;
      var left = targetFor(index, dir, from);
      var p = period();
      var max = track.scrollWidth - track.clientWidth;

      // Di ujung rel, geser satu blok kloning (isinya identik, jadi tidak
      // terlihat) agar animasi tetap punya ruang untuk bergerak.
      if (p && left > max - 4) {
        left = Math.max(0, left - p);
        jumpTo(left);
      } else if (p && left < 4) {
        left = left + p;
        jumpTo(left);
      }

      pendingLeft = left;
      track.scrollTo({ left: left, behavior: 'smooth' });
      current = index;
      paint();
    }

    if (prev) {
      prev.disabled = false;
      prev.addEventListener('click', function () {
        goTo((current - 1 + n) % n, -1);
      });
    }
    if (next) {
      next.disabled = false;
      next.addEventListener('click', function () {
        goTo((current + 1) % n, 1);
      });
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () { goTo(index, 0); });
    });

    track.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo((current - 1 + n) % n, -1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo((current + 1) % n, 1);
      }
    });

    var ticking = false;
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        paint();
        ticking = false;
      });

      if (!animating && ready) {
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(function () {
          recenter();
          pendingLeft = track.scrollLeft;
        }, 180);
      }
    }, { passive: true });

    window.addEventListener('resize', function () {
      jumpTo(centerOf(cards[n + current]));
      paint();
    });

    function place() {
      jumpTo(centerOf(cards[n + START_INDEX]));
      ready = true;
      paint();
    }

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(place);
    });
  }

  /* ----------------------------------------------------------
     Interaction: project modal
     ---------------------------------------------------------- */
  function setupModal() {
    var modal = $('#project-modal');
    if (!modal) return;

    var logo = $('#modal-logo');
    var title = $('#modal-title');
    var sub = $('#modal-sub');
    var role = $('#modal-role');
    var date = $('#modal-date');
    var status = $('#modal-status');
    var image = $('#modal-image');
    var shot1 = $('#modal-shot-1');
    var shot2 = $('#modal-shot-2');
    var previewUrl = $('#modal-preview-url');
    var overview = $('#modal-overview');
    var challenges = $('#modal-challenges');
    var outcomes = $('#modal-outcomes');
    var pills = $('#modal-pills');
    var tags = $('#modal-tags');
    var code = $('#modal-code');
    var live = $('#modal-live');
    var architecture = $('#modal-architecture');
    var closeButtons = $$('[data-modal-close]', modal);
    var lastFocus = null;

    function open(index) {
      var project = SITE.projects[index];
      if (!project) return;

      lastFocus = document.activeElement;
      var words = String(project.title || '').split(/\s+/);
      if (logo) {
        logo.textContent = words.slice(0, 2).map(function (word) {
          return word.charAt(0);
        }).join('').toUpperCase();
      }
      title.textContent = project.title;
      sub.textContent = project.subtitle;
      if (role) role.textContent = project.role || '';
      if (date) date.textContent = project.year || '';
      if (status) {
        status.textContent = project.status || '';
        status.className = 'modal-status modal-status--' + (project.statusType || 'active');
      }
      image.setAttribute('src', project.image);
      image.setAttribute('alt', 'Mockup proyek ' + project.title);
      if (shot1) {
        shot1.setAttribute('src', project.image);
        shot1.setAttribute('alt', 'Cuplikan proyek ' + project.title);
      }
      if (shot2) {
        shot2.setAttribute('src', project.image);
        shot2.setAttribute('alt', 'Cuplikan proyek ' + project.title);
      }
      if (previewUrl) {
        var liveUrl = project.links && project.links.live;
        previewUrl.textContent = liveUrl || String(project.title || 'project preview').toLowerCase().replace(/\s+/g, '-');
      }
      overview.textContent = (project.details && project.details.overview) || project.description || '';
      challenges.innerHTML = ((project.details && project.details.challenges) || [])
        .map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; })
        .join('');
      outcomes.innerHTML = ((project.details && project.details.outcomes) || [])
        .map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; })
        .join('');
      if (pills) {
        pills.innerHTML = ((project.details && project.details.highlights) || project.tech || [])
          .slice(0, 4)
          .map(function (item) { return '<span>' + escapeHtml(item) + '</span>'; })
          .join('');
      }
      tags.innerHTML = (project.tech || [])
        .map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; })
        .join('');
      code.setAttribute('href', (project.links && project.links.code) || '#');
      live.setAttribute('href', (project.links && project.links.live) || '#');
      if (architecture) architecture.setAttribute('href', (project.links && project.links.code) || '#');
      live.hidden = !(project.links && project.links.live);

      modal.hidden = false;
      document.body.classList.add('is-locked');
      if (window.__lenis && window.__lenis.stop) window.__lenis.stop();

      var closeBtn = $('.modal-close', modal);
      if (closeBtn) {
        window.setTimeout(function () { closeBtn.focus(); }, 60);
      }
    }

    function close() {
      modal.hidden = true;
      document.body.classList.remove('is-locked');
      if (window.__lenis && window.__lenis.start) window.__lenis.start();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // Delegasi event: kartu project dirender ulang setiap pagination,
    // sehingga listener harus dipasang di kontainer, bukan per tombol.
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest && event.target.closest('[data-project-open]');
      if (!trigger) return;
      event.preventDefault();
      open(Number(trigger.getAttribute('data-project-open')));
    });

    closeButtons.forEach(function (button) {
      button.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) close();
    });

    modal.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      // Hanya elemen yang benar-benar tampil boleh jadi tujuan fokus;
      // kalau tidak, Tab bisa keluar dari modal lewat elemen tersembunyi.
      var focusable = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', modal)
        .filter(function (el) {
          if (el.hasAttribute('hidden') || el.closest('[hidden]')) return false;
          return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
        });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  /* ----------------------------------------------------------
     Navigation
     ---------------------------------------------------------- */
  function setupNav() {
    var nav = $('#nav');
    var links = $$('[data-nav]');
    var sections = ['home', 'about', 'experience', 'projects', 'contact']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    function setActive(id) {
      links.forEach(function (link) {
        var active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('current', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }

    function onScroll(position, direction) {
      if (!nav) return;
      if (position > 220 && direction === 1) nav.classList.add('nav-hidden');
      else nav.classList.remove('nav-hidden');
    }

    if (window.ScrollTrigger) {
      sections.forEach(function (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: function (self) {
            if (self.isActive) setActive(section.id);
          },
        });
      });
    }

    return { onScroll: onScroll, setActive: setActive };
  }

  /* ----------------------------------------------------------
     Anchor scrolling + progress
     ---------------------------------------------------------- */
  function setupScrolling(nav) {
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var hash = link.getAttribute('href');
        if (!hash || hash === '#') return;
        var target = document.querySelector(hash);
        if (!target) return;

        event.preventDefault();

        if (window.__lenis) {
          window.__lenis.scrollTo(target, { offset: hash === '#home' ? 0 : -76 });
        } else {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
      });
    });

    var bar = $('#scroll-progress-bar');
    function progress(y) {
      var height = document.documentElement.scrollHeight - window.innerHeight;
      var value = height > 0 ? Math.min(1, Math.max(0, y / height)) : 0;
      if (bar) bar.style.width = (value * 100).toFixed(2) + '%';
    }

    function direction() {
      return 1;
    }

    if (window.__lenis) {      window.__lenis.on('scroll', function (event) {
        progress(event.scroll);
        var dir = event.direction === -1 ? -1 : 1;
        if (nav) nav.onScroll(event.scroll, dir);
      });
    } else {
      var lastY = window.scrollY;
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        progress(y);
        if (nav) nav.onScroll(y, y > lastY ? direction() : -1);
        lastY = y;
      }, { passive: true });
    }
  }

  /* ----------------------------------------------------------
     Fallback toggle (tanpa GSAP / reduced motion)
     ---------------------------------------------------------- */
  function setupSimpleToggle() {
    var input = $('#hero-toggle');
    var alt = $('.hero-alt');
    if (!input || !alt) return;

    var bars = $$('.hero-stripe', alt);
    var status = $('#hero-mode-status');
    var pieces = [
      $('.hero-kicker'),
      $('.hero-text'),
      $('.hero-tagline'),
      $('.hero-actions'),
      $('.hero-scroll-hint'),
    ].filter(Boolean);

    function apply() {
      var on = input.checked;

      alt.classList.toggle('is-on', on);
      var heroEl = $('.hero');
      if (heroEl) heroEl.classList.toggle('is-alt', on);

      pieces.forEach(function (piece) {
        piece.style.opacity = on ? '0' : '';
        piece.inert = on;
        if (on) piece.setAttribute('aria-hidden', 'true');
        else piece.removeAttribute('aria-hidden');
      });

      bars.forEach(function (bar, index) {
        if (on) {
          bar.style.visibility = 'visible';
          bar.style.opacity = '1';
          bar.style.transform =
            'translateY(' +
            ((bars.length / 2 - index) * 80) +
            '%) rotate(' +
            (6 + index * 6) +
            'deg)';
        } else {
          bar.style.visibility = 'hidden';
          bar.style.opacity = '0';
          bar.style.transform = '';
        }
      });

      if (status) {
        status.textContent = on
          ? 'Mode pita keahlian aktif'
          : 'Mode pita keahlian nonaktif';
      }
    }

    input.addEventListener('change', apply);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && input.checked) {
        input.checked = false;
        apply();
      }
    });
  }

  /* ----------------------------------------------------------
     CTA text roll — hover seperti referensi
     ---------------------------------------------------------- */
  function setupButtonRoll() {
    var btn = $('.btn--roll');
    if (!btn || !window.gsap || reduceMotion) return;

    var lines = $$('[data-roll-line]', btn);
    if (lines.length < 2) return;

    lines.forEach(function (line) {
      var text = line.textContent;
      line.textContent = '';
      Array.prototype.forEach.call(text, function (char) {
        var span = document.createElement('span');
        span.className = 'btn-roll-char';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = char === ' ' ? '\u00a0' : char;
        line.appendChild(span);
      });
    });

    var topChars = $$('.btn-roll-char', lines[0]);
    var bottomChars = $$('.btn-roll-char', lines[1]);

    gsap.set(bottomChars, { yPercent: 100 });

    var roll;
    function play(entering) {
      if (roll) roll.kill();
      roll = gsap.timeline();
      roll
        .to(topChars, {
          yPercent: entering ? -100 : 0,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.015,
        }, 0)
        .to(bottomChars, {
          yPercent: entering ? -100 : 100,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.015,
        }, 0);
    }

    btn.addEventListener('mouseenter', function () { play(true); });
    btn.addEventListener('mouseleave', function () { play(false); });
  }

  /* ----------------------------------------------------------
     GSAP animations
     ---------------------------------------------------------- */
  function setupAnimations(nav) {
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
      document.documentElement.classList.add('is-ready');
      document.body.classList.add('is-ready');
      hideLoader();
      setupSimpleToggle();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (window.Lenis) {
      var lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    var heroToggle = $('.toggle');
    var toggleGrow = 3;
    if (heroToggle) {
      var toggleWidth = heroToggle.getBoundingClientRect().width || 1;
      toggleGrow = Math.min(3, (window.innerWidth * 0.92) / toggleWidth);
    }

    gsap.set('.hero-toggle-wrap', { scale: toggleGrow, rotation: 0, transformOrigin: '50% 50%' });
    gsap.set('.hero-text', { opacity: 0 });
    gsap.set('.hero-char', { yPercent: -110 });
    gsap.set('.hero-kicker', { y: 16, opacity: 0 });
    gsap.set('.hero-tagline, .hero-actions', { y: 20, opacity: 0 });
    gsap.set('.hero-scroll-hint', { opacity: 0 });
    gsap.set('.sub-nav-links', { y: -30, opacity: 0 });

    var intro = gsap.timeline({ paused: true, onComplete: finishLoader });
    intro
      .to('.hero-toggle-wrap', { scale: 1, rotation: -360, duration: 1.1, ease: 'power3.inOut' }, 0)
      .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.45)
      .to('.hero-text', { opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.6)
      .to(
        '.hero-char',
        {
          yPercent: 0,
          duration: 0.95,
          stagger: { each: 0.01, from: 'end' },
          ease: 'expo.out',
        },
        0.6
      )
      .to('.hero-tagline, .hero-actions', { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out' }, 0.85)
      .to('.hero-scroll-hint', { opacity: 1, duration: 0.5 }, 1.15)
      .to('.sub-nav-links', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 1.2);

    function playIntro() {
      intro.play(0);
    }

    /* About — pinned scroll sequence (same choreography as the reference) */
    var aboutTicker = $('#about-marquee');
    var aboutSky = $('[data-about-sky]');
    var aboutScaler = $('[data-about-scaler]');
    var aboutChars = $$('.about-word-char');

    // Animasi pin About hanya untuk layar lebar. Di layar kecil tinggi
    // kartu melebihi viewport sehingga isinya terpotong, jadi section
    // dirender statis (lihat aturan CSS max-width: 900px).
    var aboutPinEnabled =
      window.matchMedia('(min-width: 901px)').matches && !reduceMotion;

    function aboutFinalScale() {
      if (!aboutSky) return 0.9;
      var contentHeight = aboutSky.offsetHeight;
      var available = window.innerHeight - 96;
      return Math.min(0.9, Math.max(0.42, available / Math.max(contentHeight, 1)));
    }

    if (aboutPinEnabled && aboutSky && aboutScaler) {
      gsap.set(aboutChars, {
        scale: 0,
        rotation: function () {
          return gsap.utils.random(-150, 150);
        },
        transformOrigin: '50% 50%',
      });

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '.about-scroll',
            start: 'top center',
            end: 'bottom bottom+=100%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(
          aboutChars,
          {
            scale: 1,
            rotation: 0,
            duration: 0.2,
            ease: 'expo.out',
            stagger: { each: 0.05, from: 'random' },
          },
          0
        )
        .fromTo(
          aboutSky,
          { yPercent: 100, clipPath: 'inset(10% 50% 10% 50%)' },
          { yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.out' },
          0.3
        )
        .fromTo(
          aboutSky,
          { scale: 0.5 },
          { scale: 1, duration: 0.8, ease: 'back.inOut(0.2)' },
          0.3
        )
        .to(
          '[data-about-card]',
          { filter: 'drop-shadow(0 26px 40px rgba(0, 0, 0, 0.42))', duration: 0.6, ease: 'power2.out' },
          0.5
        )
        .fromTo(
          aboutScaler,
          { scale: 2.8, yPercent: 40 },
          { scale: 1.2, yPercent: 0, duration: 0.8, ease: 'power2.out' },
          0.7
        )
        .to(
          aboutSky,
          {
            scale: function () {
              return aboutFinalScale();
            },
            duration: 0.5,
          },
          1.5
        )
        .to(aboutScaler, { scale: 1, duration: 0.5 }, 1.5)
        .to(
          '[data-about-card]',
          { filter: 'drop-shadow(0 14px 24px rgba(0, 0, 0, 0.32))', duration: 0.4, ease: 'power2.out' },
          1.5
        )
        .fromTo(
          '.about-socials li',
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.1,
          },
          1.7
        );
    }

    if (aboutTicker && aboutPinEnabled) {
      gsap.fromTo(
        aboutTicker,
        { xPercent: 0 },
        {
          xPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-scroll',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    /* Generic reveals */
    [
      '.section-head > *',
      '.projects-head > *',
      '.tools-head > *',
    ].forEach(function (selector) {
      gsap.from(selector, {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: selector, start: 'top 88%', once: true },
      });
    });

    /* Experience cards */
    var cards = $$('[data-xp-card]');
    // Efek kartu bertumpuk (sticky + scale) hanya untuk layar lebar.
    // Di ponsel kartu mengalir normal agar tidak ada celah/geser.
    var xpStackEnabled = window.matchMedia('(min-width: 901px)').matches && !reduceMotion;
    cards.forEach(function (card, index) {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      });

      if (xpStackEnabled && index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.965,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 88%',
            end: 'top 30%',
            scrub: true,
          },
        });
      }

      ScrollTrigger.create({
        trigger: card,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: function () { setRailActive(index); },
        onEnterBack: function () { setRailActive(index); },
      });
    });

    function setRailActive(index) {
      $$('[data-xp-nav]').forEach(function (button) {
        button.classList.toggle('is-active', Number(button.getAttribute('data-xp-nav')) === index);
      });
    }

    $$('[data-xp-nav]').forEach(function (button) {
      button.addEventListener('click', function () {
        var card = cards[Number(button.getAttribute('data-xp-nav'))];
        if (!card) return;
        if (window.__lenis) window.__lenis.scrollTo(card, { offset: -110 });
        else card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    /* Projects reveal — tanpa offset vertikal agar kartu tetap sejajar */
    gsap.from('[data-project-card]', {
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.projects-grid', start: 'top 88%', once: true },
    });

    /* Tech stack reveal */
    gsap.from('[data-tech-card]', {
      y: 34,
      opacity: 0,
      duration: 0.7,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.tech-grid', start: 'top 88%', once: true },
    });

    gsap.from('.tech-note', {
      y: 18,
      opacity: 0,
      duration: 0.6,
      delay: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.tech-note', start: 'top 95%', once: true },
    });

    /* Quote — word by word */
    var quote = $('#quote-text');
    if (quote) {
      var words = quote.textContent.trim().split(/\s+/);
      quote.innerHTML = words
        .map(function (word) { return '<span class="quote-word">' + escapeHtml(word) + '</span>'; })
        .join(' ');

      gsap.to('.quote-word', {
        color: '#c9a45c',
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: quote,
          start: 'top 78%',
          end: 'bottom 55%',
          scrub: true,
        },
      });
    }

    /* Project teaser — pita diagonal bergerak saat scroll */
    var teaser = $('.project-teaser');
    var teaserLines = $$('[data-project-line]');
    if (teaser && teaserLines.length) {
      teaserLines.forEach(function (line, index) {
        var rotation = index === 0 ? -8 : 8;
        // Gerakkan pita secukupnya agar seluruh bidang dan teks tetap terbaca
        // selama scroll, tanpa membuat pita keluar dari viewport.
        var fromX = index === 0 ? -80 : 80;
        var toX = index === 0 ? 80 : -80;

        gsap.set(line, { xPercent: -50, x: 0, rotation: rotation });
        gsap.fromTo(
          line,
          { x: fromX, xPercent: -50, rotation: rotation },
          {
            x: toX,
            xPercent: -50,
            rotation: rotation,
            ease: 'none',
            scrollTrigger: {
              trigger: teaser,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.25,
            },
          }
        );
      });
    }

    /* Certificates */
    gsap.from('[data-certs-head] > *', {
      y: 26,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '[data-certs-head]', start: 'top 88%', once: true },
    });

    gsap.from('#certs-progress-bar', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.certs-track', start: 'top 88%', once: true },
    });

    gsap.from('[data-cert-card]', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.certs-track', start: 'top 88%', once: true },
    });

    /* Hero toggle — pita diagonal */
    var toggleInput = $('#hero-toggle');
    var heroSection = $('.hero');
    var alt = $('.hero-alt');
    var stripes = $$('.hero-stripe', alt);
    var chars = $$('.hero-char');
    var status = $('#hero-mode-status');
    var heroPieces = [
      $('.hero-kicker'),
      $('.hero-text'),
      $('.hero-tagline'),
      $('.hero-actions'),
      $('.hero-scroll-hint'),
    ].filter(Boolean);

    gsap.set(stripes, { autoAlpha: 0 });

    function setPieces(hidden) {
      heroPieces.forEach(function (piece) {
        piece.inert = hidden;
        if (hidden) piece.setAttribute('aria-hidden', 'true');
        else piece.removeAttribute('aria-hidden');
      });
    }

    function stripeX(bar, index) {
      return index % 2 === 0 ? -bar.scrollWidth : bar.scrollWidth;
    }

    function animateStripesIn() {
      gsap.killTweensOf(stripes);

      gsap.set(stripes, {
        autoAlpha: 1,
        x: function (i) { return stripeX(stripes[i], i); },
        y: function (i) {
          return (stripes.length / 2 - i) * 0.8 * stripes[i].offsetHeight;
        },
        rotation: function () { return Math.random() * 30; },
      });

      gsap.to(stripes, {
        x: 0,
        delay: 0.2,
        duration: function () { return 1.2 + Math.random(); },
        ease: 'expo.out',
      });
    }

    function animateStripesOut() {
      gsap.killTweensOf(stripes);
      gsap.to(stripes, {
        x: function (i) { return stripeX(stripes[i], i); },
        duration: 0.8,
        ease: 'expo.out',
      });
    }

    function openLayer() {
      setPieces(true);
      if (heroSection) heroSection.classList.add('is-alt');
      if (status) status.textContent = 'Mode pita keahlian aktif';

      gsap.killTweensOf(chars);
      gsap.killTweensOf('.hero-text');
      gsap.killTweensOf('.hero-kicker, .hero-tagline');
      gsap.killTweensOf('.hero-scroll-hint');
      gsap.set('.hero-text', { autoAlpha: 1 });

      animateStripesIn();

      gsap.to(chars, {
        yPercent: 110,
        duration: 0.8,
        delay: 0.1,
        ease: 'expo.out',
        stagger: { each: 0.01, from: 'center' },
      });
      gsap.to('.hero-text', {
        autoAlpha: 0,
        duration: 0.25,
        delay: 0.92,
        ease: 'power2.out',
      });
      gsap.to('.hero-kicker, .hero-tagline, .hero-actions', {
        autoAlpha: 0,
        yPercent: 100,
        duration: 0.8,
        ease: 'expo.out',
        stagger: { each: 0.08 },
      });
      gsap.to('.hero-scroll-hint', {
        autoAlpha: 0,
        scale: 0.7,
        duration: 0.6,
        ease: 'expo.out',
      });
    }

    function closeLayer() {
      setPieces(false);
      if (heroSection) heroSection.classList.remove('is-alt');
      if (status) status.textContent = 'Mode pita keahlian nonaktif';

      gsap.killTweensOf(chars);
      gsap.killTweensOf('.hero-text');
      gsap.killTweensOf('.hero-kicker, .hero-tagline');
      gsap.killTweensOf('.hero-scroll-hint');

      animateStripesOut();
      gsap.set('.hero-text', { autoAlpha: 1 });

      gsap.to(chars, {
        yPercent: 0,
        duration: 1.1,
        delay: 0.1,
        ease: 'expo.out',
        stagger: { each: 0.01, from: 'end' },
      });
      gsap.to('.hero-kicker, .hero-tagline, .hero-actions', {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.8,
        delay: 0.65,
        ease: 'expo.out',
        stagger: { each: 0.08 },
      });
      gsap.to('.hero-scroll-hint', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.9,
        ease: 'expo.out',
      });
    }

    if (toggleInput) {
      toggleInput.addEventListener('change', function () {
        if (toggleInput.checked) openLayer();
        else closeLayer();
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggleInput && toggleInput.checked) {
        toggleInput.checked = false;
        toggleInput.dispatchEvent(new Event('change'));
      }
    });

    /* Refresh after fonts load */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }

    function begin() {
      playIntro();
    }

    window.__playIntro = begin;
  }

  /* ----------------------------------------------------------
     Loader
     ---------------------------------------------------------- */
  var loaderHidden = false;
  var loaderFinished = false;

  function finishLoader() {
    if (loaderFinished) return;
    loaderFinished = true;
    document.body.classList.add('is-ready');
    document.documentElement.classList.add('is-ready');
    var loader = $('#loader');
    if (loader) loader.style.display = 'none';
  }

  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;
    document.body.classList.add('is-ready');
    document.documentElement.classList.add('is-ready');

    // Jangan paksa kembali ke atas: kalau pengguna me-refresh di tengah
    // halaman, posisi terakhirnya dipulihkan (lihat restoreScroll).
    restoreScroll();

    var loader = $('#loader');
    if (loader) loader.style.display = 'none';

    if (window.__playIntro) window.__playIntro();
    else finishLoader();
  }

  /* ----------------------------------------------------------
     Scroll restoration
     Browser modern memulihkan posisi scroll saat refresh, tetapi Lenis
     mengambil alih dan mereset ke 0. Posisi disimpan sendiri supaya
     refresh tidak melompat ke atas.
     ---------------------------------------------------------- */
  var SCROLL_KEY = 'portfolio:scrollY';

  function saveScroll() {
    try {
      window.sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
    } catch (error) {
      /* sessionStorage bisa diblokir; abaikan. */
    }
  }

  function readSavedScroll() {
    try {
      var value = Number(window.sessionStorage.getItem(SCROLL_KEY));
      return Number.isFinite(value) && value > 0 ? value : 0;
    } catch (error) {
      return 0;
    }
  }

  function restoreScroll() {
    // Deep link (mis. /#projects) harus menang atas posisi tersimpan.
    if (window.location.hash) return;
    var target = readSavedScroll();
    if (!target) return;

    // Tunggu satu frame supaya tinggi dokumen sudah final (font & kartu
    // sudah ter-render) sebelum posisinya dipulihkan.
    window.requestAnimationFrame(function () {
      if (window.__lenis && window.__lenis.scrollTo) {
        window.__lenis.scrollTo(target, { immediate: true, force: true });
      } else {
        window.scrollTo(0, target);
      }
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  }

  function scheduleLoader() {
    window.requestAnimationFrame(function () {
      window.setTimeout(hideLoader, 60);
    });

    // Safety net: never leave the page hidden.
    window.setTimeout(finishLoader, 6500);
  }

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  function init() {
    var year = new Date().getFullYear();
    $$('#year').forEach(function (node) {
      node.textContent = String(year);
    });

    // Simpan posisi scroll agar refresh tidak melompat ke atas.
    window.addEventListener('pagehide', saveScroll);
    window.addEventListener('beforeunload', saveScroll);

    bindContent();
    renderSocials($('#about-socials'), false);
    renderSocials($('#contact-socials'), true);
    renderAboutCopy();
    renderContactCopy();
    renderMarquees();
    renderTechGrid();
    splitHeroTitle();
    renderHeroStripes();
    renderExperience();
    renderProjects();
    renderCertificates();
    setupCerts();
    setupModal();
    setupCopyEmail();

    var nav = setupNav();
    setupScrolling(nav);
    setupButtonRoll();
    setupAnimations(nav);
    scheduleLoader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
