# Paige Turner - Author Website

A static website for transformation-focused TG fiction, designed with a "Library Jewel Tones" aesthetic.

## Quick Start

1. Add your author photo to `images/author-photo.jpg`
2. Add story cover images to `images/covers/`
3. Edit the content in the HTML files
4. Deploy to GitHub Pages

## File Structure

```
/
├── index.html              # Home page
├── blog.html               # Blog listing
├── library.html            # Story portfolio
├── css/style.css           # All styles
├── js/main.js              # Navigation & interactions
├── images/
│   ├── author-photo.jpg    # Your portrait
│   └── covers/             # Story cover images
├── blog/                   # Individual blog posts
├── works/                  # Story folders
│   └── [story-name]/
│       ├── index.html      # Cover + table of contents
│       └── chapter-X.html  # Chapter pages
└── templates/              # Copy these to create new content
    ├── blog-post.html
    ├── work-index.html
    └── chapter.html
```

## Adding New Content

### New Blog Post
1. Copy `templates/blog-post.html` to `blog/YYYY-MM-slug.html`
2. Update title, date, and content
3. Add entry to `blog.html`

### New Story
1. Create folder `works/your-story-name/`
2. Copy `templates/work-index.html` as `index.html`
3. Copy `templates/chapter.html` for each chapter
4. Add card to `library.html`

## Design System

- **Colors:** Emerald (#2C5F4F), Auburn (#A0522D), Cream (#FAF8F3)
- **Fonts:** Libre Baskerville (headings), Source Sans 3 (body)
- **Aesthetic:** Library jewel tones, classical book design, elegant simplicity

## Deployment

This site is designed for GitHub Pages. Push to your repository and enable Pages in settings.
