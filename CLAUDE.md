# CLAUDE.md - AI Assistant Guide

## Project Overview

**Paige Turner Author Website** - A pure static HTML/CSS/JavaScript site for a transformation fiction author. Hosted on GitHub Pages at `https://paigeturnertg.github.io`. No build process, no frameworks, no package managers.

## Architecture

This is a **zero-build static site**. Files are served directly as-is. There is no transpilation, bundling, or server-side rendering.

### Technology Stack

- **HTML5** - Semantic markup with ARIA accessibility attributes
- **CSS3** - Single stylesheet with custom properties (design tokens), Grid, Flexbox
- **JavaScript ES6+** - Single file, vanilla JS in an IIFE, no dependencies
- **Python 3** - Sitemap generator script (stdlib only, no pip packages)
- **GitHub Actions** - One CI workflow for automatic sitemap regeneration
- **GoatCounter** - Privacy-friendly analytics (no cookies)
- **Google Fonts** - Libre Baskerville, Playfair Display, Source Sans 3

### Key Constraint

There are **zero external dependencies**. No npm, no pip packages, no Ruby gems. The Python sitemap script uses only stdlib modules. Do not introduce package managers or build tools.

## Directory Structure

```
/
├── index.html              # Homepage
├── about.html              # Author bio and contact
├── blog.html               # Blog listing page
├── library.html            # Story portfolio/grid
├── 404.html                # Custom error page
├── css/
│   └── style.css           # Single stylesheet (design system + all components)
├── js/
│   └── main.js             # Single JS file (all interactive behavior)
├── blog/
│   └── YYYY-MM-DD-slug.html  # Blog posts (8 posts currently)
├── works/
│   ├── <story-slug>/       # Each story gets a kebab-case folder
│   │   ├── index.html      # Story cover/landing page
│   │   └── chapter-N.html  # Individual chapters (or part-N.html)
│   ├── pdfs/               # PDF downloads
│   └── epubs/              # EPUB downloads
├── images/
│   ├── author-photo.jpg    # Site-wide author portrait
│   ├── works/              # Story cover images
│   └── posts/              # Blog post images
├── templates/
│   ├── blog-post.html      # Template for new blog posts
│   ├── chapter.html        # Template for new story chapters
│   └── work-index.html     # Template for new story landing pages
├── generate-sitemap.py     # Sitemap generator script
├── sitemap.xml             # Auto-generated (do not edit manually)
├── robots.txt              # SEO crawler config
├── .github/workflows/
│   └── update-sitemap.yml  # CI: auto-regenerate sitemap on push
├── README.md               # Quick start and content management guide
└── plan.md                 # Technical implementation documentation
```

## File Conventions

### Naming

| Content Type | Pattern | Example |
|---|---|---|
| Blog posts | `YYYY-MM-DD-slug.html` | `2026-01-27-tates-complete.html` |
| Story folders | kebab-case | `highway-to-elle/`, `tits-tates/` |
| Chapters | `chapter-N.html` or `part-N.html` | `chapter-1.html`, `part-3.html` |
| Images | kebab-case, descriptive | `highway-cover.jpg` |

### Relative Paths

All internal links use **relative paths** based on depth:

- **Root pages** (`index.html`, `about.html`): `href="library.html"`, `src="css/style.css"`
- **Blog posts** (`blog/*.html`): `href="../index.html"`, `src="../css/style.css"`
- **Story chapters** (`works/<story>/*.html`): `href="../../index.html"`, `src="../../css/style.css"`

Never use absolute paths for internal links.

## Design System (CSS)

All design tokens live in `:root` custom properties at the top of `css/style.css`.

### Color Palette

```
Primary:    --color-teal (#1D4B44), --color-teal-light, --color-teal-dark
Accent:     --color-auburn (#9B3D2B), --color-auburn-light, --color-auburn-dark
Secondary:  --color-rose (#C47D7D), --color-rose-light
Gold:       --color-gold (#C4A962), --color-gold-light, --color-gold-dark
Background: --color-cream (#FBF8F1), --color-cream-dark, --color-cream-pink
Text:       --color-charcoal (#2D2A26), --color-gray (#6B6561)
```

### Typography

- `--font-serif` (Libre Baskerville) - Body text, headings
- `--font-sans` (Source Sans 3) - UI elements, navigation
- `--font-script` (Playfair Display) - Decorative, script accents

### Responsive Breakpoints

- Mobile: 0-639px (single column, hamburger nav)
- Tablet: 640px+ (2-column grids)
- Large tablet: 768px+ (hero layout changes, font scale up)
- Desktop: 1024px+ (3-column grids, full nav bar)

### CSS Naming

BEM-like convention: `.block__element--modifier` (e.g., `.nav__menu`, `.btn--secondary`, `.blog-post__title`).

## JavaScript (`js/main.js`)

All JS is in a single IIFE with `'use strict'`. Features:

- **Mobile nav** - Hamburger toggle, slide-out menu, overlay, escape-key close
- **Chapter navigation** - Dropdown selector for jumping between chapters
- **Smooth scroll** - Anchor links within the same page
- **Scroll animations** - IntersectionObserver fade-in on `.card`, `.work-card`, `.blog-entry`
- **Dynamic header** - Nav brand fades in after scrolling past hero
- **Back-to-top button** - Appears after 400px scroll
- **Image lightbox** - Click-to-expand for linked images with caption support
- **Active nav state** - Highlights current page link
- **Throttle utility** - Rate-limits scroll/resize handlers

## Adding Content

### New Blog Post

1. Copy `templates/blog-post.html` to `blog/YYYY-MM-DD-slug.html`
2. Update `<title>`, `<meta name="description">`, datetime, and `<h1>`
3. Write content inside `<article class="blog-post__content">`
4. Add a link/excerpt entry in `blog.html`
5. Sitemap updates automatically via CI

### New Story

1. Create folder: `works/<story-slug>/`
2. Copy `templates/work-index.html` to `works/<story-slug>/index.html`
3. Update metadata, cover image, and synopsis
4. Add story card to `library.html`

### New Chapter

1. Copy `templates/chapter.html` to `works/<story-slug>/chapter-N.html`
2. Update `<title>`, meta description, chapter heading, and prev/next navigation links
3. Update the chapter dropdown `<select>` options in all chapters of that story
4. Update the story's `index.html` to link the new chapter

## CI/CD

### GitHub Actions: `update-sitemap.yml`

- **Triggers**: Push to `main` (HTML/Python changes), manual dispatch, weekly cron (Sundays 00:00 UTC)
- **What it does**: Runs `generate-sitemap.py`, commits updated `sitemap.xml` if changed
- **Concurrency**: Shares the `"pages"` group with GitHub Pages deployment; does not cancel in progress
- **Delay**: Waits 60 seconds before running to let the main Pages deployment finish
- **Commit tag**: Uses `[skip ci]` to avoid triggering a workflow loop

### Sitemap Generator (`generate-sitemap.py`)

- Scans all `.html` files recursively
- Excludes `templates/`, `.git/`, `.github/`, and `404.html`
- Assigns priorities: homepage 1.0, main pages 0.9, blog 0.7, work indexes 0.8, chapters 0.6
- Groups URLs by category in the output
- Run locally: `python3 generate-sitemap.py`

### Deployment

Push to `main` branch triggers automatic GitHub Pages deployment. No build step needed.

## Common Tasks

### Verifying changes locally

Open any HTML file directly in a browser. No local server required, though one can be used:
```bash
python3 -m http.server 8000
```

### Regenerating the sitemap locally

```bash
python3 generate-sitemap.py
```

### Checking for broken internal links

Search for `href=` and `src=` references and verify relative paths are correct for the file's depth level.

## Important Warnings

- **Do not edit `sitemap.xml` manually** - It is auto-generated by CI
- **Do not introduce build tools or package managers** - The zero-build architecture is intentional
- **Do not use absolute paths** for internal links (always relative)
- **Do not remove GoatCounter** script tags from pages - Analytics are included on every page
- **Match existing patterns** - New pages must include the same nav, footer, font links, favicon, and GoatCounter snippet present in the templates
- **Preserve the IIFE wrapper** in `main.js` - All JS must stay inside the existing function scope
- **Images go in `images/`** (site-wide) or alongside content in `works/` directories - keep the separation consistent
- **Templates are reference only** - Files in `templates/` are not deployed or served; they exist as copy-paste starting points

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, iOS Safari 14+.

## No Test Suite

There is no automated test infrastructure. Verification is manual: cross-browser testing, responsive breakpoint checks, and accessibility review (keyboard navigation, screen reader, ARIA labels).
