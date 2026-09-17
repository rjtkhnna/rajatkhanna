/* Rajat Khanna — site behaviour. No dependencies. */
(function () {
  'use strict';

  var doc = document.documentElement;

  /* ── current year ─────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ── theme toggle ─────────────────────────────────────── */
  var toggle = document.getElementById('themeToggle');
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function currentTheme() {
    var set = doc.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return systemPrefersDark() ? 'dark' : 'light';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      toggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  /* ── sticky nav hairline ──────────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── reveal on scroll ─────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduced) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(siblings, 5) * 55 + 'ms';
        el.classList.add('is-in');
        seen.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { seen.observe(el); });
  }

  /* ── scroll-spy on nav links ──────────────────────────── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = new Map();
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible.set(e.target.id, e.intersectionRatio); });

      var bestId = null, best = 0;
      visible.forEach(function (ratio, id) {
        if (ratio > best) { best = ratio; bestId = id; }
      });

      links.forEach(function (a) {
        a.classList.toggle('is-active', bestId !== null && a.getAttribute('href') === '#' + bestId);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();
