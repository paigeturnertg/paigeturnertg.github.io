# Paige Turner - Author Website

A fully-functional static website for transformation-focused TG fiction, designed with a "Library Jewel Tones" aesthetic featuring rich teals, warm auburn accents, and elegant typography.

## Site Overview

The site is built with vanilla HTML, CSS, and JavaScript - no frameworks, no build process. This makes it easy to maintain, fast to load, and simple to host on any static hosting platform.

**Current Status:** Production-ready ✨

## Live Features

- **Homepage** - Hero section, author bio, latest journal entry, and featured works
- **Fiction Library** - Complete grid of published works with cover art
- **Author's Journal** - Blog with multiple published posts
- **About Page** - Detailed author bio and contact information
- **404 Page** - Custom error page with helpful navigation
- **Individual Works** - Multiple complete stories with:
  - Cover pages with descriptions
  - Chapter-by-chapter reading
  - Table of contents
  - Chapter navigation
  - PDF/EPUB downloads where available
- **Fully Responsive** - Mobile, tablet, and desktop optimized

## File Structure

```
/
├── index.html              # Home page
├── about.html              # About the author
├── blog.html               # Journal listing page
├── library.html            # Story grid/portfolio
├── 404.html                # Custom error page
│
├── css/
│   └── style.css           # Complete design system (2100+ lines)
│
├── js/
│   └── main.js             # Navigation, scroll effects, lightbox
│
├── images/
│   ├── author-photo.jpg    # Hero portrait
│   ├── works/              # Story cover images
│   └── posts/              # Blog post images
│
├── blog/
│   ├── 2025-10-31-halloween-story.html
│   ├── 2025-11-20-tits-for-tates.html
│   ├── 2025-12-14-changes-for-christmas.html
│   ├── 2025-12-25-merry-hexmas.html
│   ├── 2025-12-27-authors-edition.html
│   ├── 2025-12-31-happy-new-year.html
│   └── 2026-01-20-site-redesign.html
│
├── works/
│   ├── highway-to-elle/        # 16 chapters + epilogue
│   ├── yvonne-girl/            # 15 chapters + epilogue
│   ├── missing-xmas/           # 4 parts
│   ├── hexed-holidays/         # 2 chapters
│   ├── effortless-beauty/      # 4 chapters
│   ├── bffs/                   # 2 chapters
│   ├── pdfs/                   # Author's Edition PDFs
│   └── epubs/                  # EPUB downloads
│
└── templates/              # Reference templates
    ├── blog-post.html      # Copy for new blog posts
    ├── work-index.html     # Copy for new story covers
    └── chapter.html        # Copy for new chapters
```

## Design System

### Colors
```css
/* Primary Palette */
--color-teal: #1D4B44;           /* Headers, primary UI */
--color-auburn: #9B3D2B;         /* Links, accents */
--color-rose: #C47D7D;           /* Decorative accents */
--color-gold: #C4A962;           /* Navigation embossing */

/* Backgrounds */
--color-cream: #FBF8F1;          /* Page background */
--color-cream-pink: #FDF6F6;     /* Alternating sections */
--color-white: #FFFFFF;          /* Content cards */

/* Text */
--color-charcoal: #2D2A26;       /* Body text */
--color-gray: #6B6561;           /* Secondary text */
```

### Typography
- **Headings:** Libre Baskerville (serif)
- **Script/Display:** Playfair Display (italic, decorative)
- **Body:** Source Sans 3 (clean, readable)

### Design Features
- Soft, rounded corners (`--radius-lg: 1.25rem`)
- Warm, subtle shadows
- Smooth transitions and hover effects
- Card-based layout with lift on hover
- Gold-embossed navigation text
- Responsive grid layouts
- Elegant flourish links

## Adding New Content

### New Blog Post

1. Copy `templates/blog-post.html` to `blog/YYYY-MM-DD-slug.html`
2. Update the following sections:
   - `<title>` and meta description
   - `.blog-post__date` - Update datetime and display date
   - `.blog-post__title` - Your post title
   - `.blog-post__content` - Your content
3. Add entry to `blog.html` at the top of `.blog-list`:
   ```html
   <article class="blog-entry">
     <time class="blog-entry__date" datetime="YYYY-MM-DD">Month DD, YYYY</time>
     <h2 class="blog-entry__title">
       <a href="blog/YYYY-MM-DD-slug.html">Your Title</a>
     </h2>
     <p class="blog-entry__excerpt">Brief preview text...</p>
     <a href="blog/YYYY-MM-DD-slug.html" class="blog-entry__link card__link">Read more</a>
   </article>
   ```
4. Update homepage journal section in `index.html` if this is the latest post

### New Story

1. Create folder: `works/your-story-name/`
2. Copy `templates/work-index.html` → `works/your-story-name/index.html`
3. Update cover page details (title, description, cover image)
4. Copy `templates/chapter.html` for each chapter
5. Update chapter navigation in each file
6. Add story card to `library.html`:
   ```html
   <a href="works/your-story-name/index.html" class="work-card">
     <div class="work-card__image">
       <img src="images/works/your-cover.jpg" alt="Cover" loading="lazy">
     </div>
     <div class="work-card__content">
       <span class="work-card__tag">Status</span>
       <h3 class="work-card__title">Your Story Title</h3>
       <p class="work-card__excerpt">Brief description...</p>
     </div>
   </a>
   ```
7. Optionally add to featured works on homepage (`index.html`)

### Adding Chapter Images

Chapter pages support inline images with lightbox functionality:

```html
<figure class="blog-post__figure">
  <a href="../../images/works/your-image.jpg">
    <img src="../../images/works/your-image.jpg"
         alt="Description"
         class="blog-post__image"
         loading="lazy">
  </a>
  <figcaption class="blog-post__caption">Optional caption text</figcaption>
</figure>
```

## Path Structure

The site uses relative paths throughout:

- **Root pages** (`index.html`, `blog.html`, etc.): `href="library.html"`, `src="css/style.css"`
- **Blog posts** (`blog/`): `href="../index.html"`, `src="../css/style.css"`
- **Work pages** (`works/story-name/`): `href="../../index.html"`, `src="../../css/style.css"`

**Important:** Never use absolute paths (`/css/style.css`) or references to `localhost` or `new-site` - always use relative paths.

## JavaScript Features

The site includes several interactive features in `js/main.js`:

- Mobile navigation toggle
- Scroll-triggered navigation bar
- Chapter dropdown navigation
- Image lightbox viewer
- Smooth scroll behavior
- Back-to-top button

## Analytics

The site uses GoatCounter for privacy-friendly analytics:
- Counter ID: `paigeturnertg.goatcounter.com`
- Script included in all pages

## Deployment

This site is ready for deployment to:
- **GitHub Pages** - Push to repository, enable Pages in settings
- **Netlify** - Drag and drop or connect repository
- **Vercel** - Import repository
- **Any static host** - Upload all files via FTP/SFTP

No build process required - just upload the files as-is.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement approach
- CSS Grid and Flexbox layouts
- No IE11 support needed

## Maintenance Notes

- All internal links use relative paths
- Images use lazy loading (`loading="lazy"`)
- Analytics script is async
- Navigation state is sticky
- Custom 404 page configured
- All external links use `rel="noopener noreferrer"` for security

## Content Inventory

### Published Works
1. **Highway to Elle** - 16 chapters + epilogue (PDF/EPUB available)
2. **Yvonne Girl** - 15 chapters + epilogue
3. **Missing Xmas** - 4 parts
4. **Hexed Holidays** - 2 chapters
5. **Effortless Beauty** - 4 chapters
6. **BFFs** - 2 chapters

### Published Blog Posts
- 7 posts from October 2025 - January 2026
- Topics include story announcements, site updates, and personal reflections

## Contact & Social

- Email: paigeturnertg@gmail.com
- Discord: https://discord.gg/w8ne2f7nX8
- Support: Transgender Law Center

## License

Content © 2026 Paige Turner. Site code may be adapted for personal use.
