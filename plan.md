# Author Website Build Plan

## Overview

A static website for a transgender fiction author, designed with a "Library Jewel Tones" aesthetic. The site will be hosted on GitHub Pages and built with vanilla HTML, CSS, and minimal JavaScript for maximum simplicity and author-maintainability.

---

## Technical Approach

### Stack Choice: Pure Static HTML/CSS/JS

**Why not a framework?**
- GitHub Pages works seamlessly with static files
- No build step required — author can edit HTML directly
- Easier for non-technical updates (add blog post = copy template, edit text)
- Faster load times, no JavaScript framework overhead
- The site's scope doesn't require React/Vue complexity

**JavaScript usage:**
- Mobile navigation toggle
- Chapter dropdown menu
- Smooth scroll behavior
- No libraries required

---

## Design System

### Color Tokens (CSS Custom Properties)

```css
:root {
  --color-emerald: #2C5F4F;      /* Primary: headers, nav, dividers */
  --color-auburn: #A0522D;        /* Accent: links, hover states */
  --color-cream: #FAF8F3;         /* Page background */
  --color-white: #FFFFFF;         /* Content cards */
  --color-charcoal: #2B2B2B;      /* Body text */
  --color-gray: #6B6B6B;          /* Secondary text */

  /* Derived colors */
  --color-emerald-light: #3A7A66; /* Hover states */
  --color-auburn-light: #B8643A;  /* Link hover */
  --color-cream-dark: #F0EDE6;    /* Subtle borders */
}
```

### Typography

```css
/* Headings: Libre Baskerville (Google Fonts) */
font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif;

/* Body: Source Sans 3 (Google Fonts) */
font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Spacing Scale

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

### Design Elements

- **Border radius:** `0.5rem` (8px) for cards, buttons; `0.25rem` for small elements
- **Shadows:** Soft, warm shadows using rgba with slight brown tint
- **Transitions:** 200-300ms ease for hover effects
- **Max content width:** 1200px (wide), 800px (reading)
- **Card style:** White background, subtle shadow, rounded corners

---

## File Structure

```
/
├── index.html              # Home page
├── blog.html               # Blog listing page
├── library.html            # Portfolio/stories grid
├── contact.html            # Contact information (optional, could be section)
│
├── css/
│   └── style.css           # All styles (single file for simplicity)
│
├── js/
│   └── main.js             # Navigation toggle, chapter dropdown
│
├── images/
│   ├── author-photo.jpg    # Hero portrait
│   ├── covers/             # Book/story cover images
│   │   └── [story-name].jpg
│   └── blog/               # Blog post images (if any)
│
├── blog/
│   ├── 2024-01-welcome.html
│   └── [date-slug].html    # Individual blog posts
│
├── works/
│   ├── [story-name]/
│   │   ├── index.html      # Cover + table of contents
│   │   ├── chapter-1.html
│   │   ├── chapter-2.html
│   │   └── ...
│   └── pdfs/               # "Author's edition" downloads
│       └── [story-name].pdf
│
├── templates/              # Reference templates for author
│   ├── blog-post.html      # Copy this to create new blog post
│   └── chapter.html        # Copy this to create new chapter
│
└── plan.md                 # This file
```

---

## Page Specifications

### Global Components

#### Navigation Bar
- Fixed/sticky on scroll (optional — will test)
- Logo/site name on left (text, not image)
- Menu items: **Stories** | **Blog** | **Contact**
- Mobile: hamburger menu with slide-out panel
- Emerald background with cream text

#### Footer
- Simple, minimal
- Copyright, social links (Discord icon)
- Optional: decorative flourish

---

### 1. Home Page (`index.html`)

**Sections:**

1. **Hero**
   - Large author portrait (illustrated style mentioned)
   - Author name as headline
   - Tagline/short descriptor
   - Subtle decorative elements (optional flourishes)

2. **Bio Section**
   - 2-3 paragraphs about the author
   - Warm, inviting tone
   - Card-style container

3. **What I Write**
   - Brief overview of genres/themes
   - Could include 2-3 featured works as cards
   - Links to Library page

4. **Connect**
   - Email link (styled button or link)
   - Discord link/button
   - Could be combined with footer

---

### 2. Blog Page (`blog.html`)

**Layout:**
- Single column, reading-width (800px max)
- Reverse chronological order

**Entry Preview Cards:**
- Date (subtle, secondary text)
- Title (h2, linked)
- Preview text (first ~150 chars or custom excerpt)
- "Read more →" link
- Divider between entries (subtle line or spacing)

**Individual Blog Post (`blog/[slug].html`):**
- Title
- Date
- Full content
- Back to blog link
- Previous/Next post navigation (optional)

---

### 3. Library Page (`library.html`)

**Layout:**
- Responsive grid: 3 columns desktop, 2 tablet, 1 mobile
- Cards with consistent aspect ratio

**Work Card:**
- Cover image (top)
- Title
- Brief description/tagline
- Genre/category tag (optional)
- Links: "Read online" → work page, "Download PDF" if available

---

### 4. Individual Work Pages (`works/[name]/index.html`)

**Cover Page:**
- Large cover image
- Title, subtitle if applicable
- Description/blurb
- Publication info (date, word count, status)
- Table of Contents
  - Chapter links in ordered list
  - Current chapter highlighted when on chapter page

**Chapter Pages (`works/[name]/chapter-X.html`):**
- Chapter number + title
- Chapter content (prose)
- Navigation:
  - Previous Chapter | Table of Contents | Next Chapter
  - Dropdown menu for direct chapter jump
- Reading-optimized width (65-75 characters per line)
- Comfortable line height (1.6-1.8)

---

## Responsive Breakpoints

```css
/* Mobile first approach */

/* Small tablets and up */
@media (min-width: 640px) { }

/* Tablets and up */
@media (min-width: 768px) { }

/* Laptops and up */
@media (min-width: 1024px) { }

/* Large screens */
@media (min-width: 1280px) { }
```

---

## Implementation Phases

### Phase 1: Foundation
1. Create CSS file with design tokens and reset
2. Build global layout (nav, footer, main structure)
3. Create index.html with all sections

### Phase 2: Content Pages
4. Build blog.html listing page
5. Create blog post template and one sample post
6. Build library.html grid

### Phase 3: Work Pages
7. Create work index template (cover + TOC)
8. Create chapter page template with navigation
9. Add JavaScript for chapter dropdown

### Phase 4: Polish
10. Add transitions and hover effects
11. Test responsive behavior
12. Optimize images (provide guidance)
13. Final review and cleanup

---

## Author Workflow (Post-Launch)

### Adding a New Blog Post
1. Copy `templates/blog-post.html`
2. Rename to `blog/YYYY-MM-slug.html`
3. Edit title, date, and content
4. Add entry to `blog.html` listing

### Adding a New Story
1. Create folder `works/story-name/`
2. Copy `templates/chapter.html` for each chapter
3. Create `index.html` with cover and TOC
4. Add card to `library.html`
5. (Optional) Add PDF to `works/pdfs/`

---

## Playful Design Touches

To reflect the author's clever, playful transformation fiction style:

- **Hover effects:** Links could have a subtle "transform" — slight scale, color shift
- **Decorative elements:** Small flourishes or book-related icons
- **Easter eggs:** Perhaps a subtle animation on the author photo
- **Typography:** Elegant drop caps on chapter openings
- **Card interactions:** Gentle lift on hover (transform + shadow)
- **Loading states:** Graceful fade-ins on page load

---

## Questions for Author (Before Final Implementation)

1. Do you have the author portrait image ready?
2. Any existing cover images for works?
3. Preferred contact email format (mailto: link or contact form)?
4. Discord invite link or server name?
5. Any existing content (bio text, blog posts, story chapters) to incorporate?
6. Preference for the site name/logo text?

---

## Notes

- All images should be optimized for web (WebP with JPG fallback ideal)
- Consider adding `loading="lazy"` to images below the fold
- Include proper meta tags for SEO and social sharing
- Add favicon (could be a simple book icon in emerald)
- Ensure all interactive elements are keyboard accessible
