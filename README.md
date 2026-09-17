# rajatkhanna

Personal site and product portfolio — **[rjtkhnna.github.io/rajatkhanna](https://rjtkhnna.github.io/rajatkhanna/)**

Product leadership, AI and enterprise SaaS. Fourteen years across engineering,
product management and product leadership; currently Associate Director of
Product at Cialfo (Manifest Global).

## Stack

Static HTML, CSS and vanilla JavaScript. No framework, no build step, no
dependencies. Fonts are self-hosted (latin subsets only), images are served as
WebP with JPEG fallbacks. Deployed straight from `main` via GitHub Pages.

## Structure

```
index.html              single page
assets/css/style.css    design system + layout
assets/js/main.js       theme toggle, scroll reveal, scroll-spy
assets/fonts/           Instrument Serif · Inter · JetBrains Mono (woff2)
assets/img/             portrait, avatar, OG card, favicon
assets/resume/          three résumé variants (PDF)
```

## Local preview

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Editing

Content lives in `index.html` — there is no CMS and no templating, so a section
is edited where it is written. Colours, type scale and spacing are CSS custom
properties at the top of `style.css`; changing `--accent` there restyles the
whole site, and the dark palette is defined twice (once under
`[data-theme="dark"]`, once under the `prefers-color-scheme` query) so both
blocks need the same edit.

## Licence

Code is MIT (see `LICENSE`). Written content, résumés and photography are not.
