/**
 * Paige Turner - Author Website
 * Main JavaScript
 */

(function() {
  'use strict';

  // --------------------------------------------
  // Utility: Throttle Function
  // --------------------------------------------
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // --------------------------------------------
  // Mobile Navigation Toggle
  // --------------------------------------------
  function initMobileNav() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navOverlay = document.querySelector('.nav__overlay');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!navToggle || !navMenu) return;

    function openMenu() {
      navToggle.classList.add('is-active');
      navMenu.classList.add('is-open');
      if (navOverlay) navOverlay.classList.add('is-visible');
      document.body.classList.add('no-scroll');
      navToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      navToggle.classList.remove('is-active');
      navMenu.classList.remove('is-open');
      if (navOverlay) navOverlay.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
      navToggle.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      if (navMenu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    navToggle.addEventListener('click', toggleMenu);

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking a link
    navLinks.forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Close menu on resize if open (throttled to prevent excessive calls)
    window.addEventListener('resize', throttle(function() {
      if (window.innerWidth >= 1024 && navMenu.classList.contains('is-open')) {
        closeMenu();
      }
    }, 200));
  }

  // --------------------------------------------
  // Chapter Dropdown Navigation
  // --------------------------------------------
  function initChapterNav() {
    const chapterSelect = document.querySelector('.chapter-nav__select');

    if (!chapterSelect) return;

    chapterSelect.addEventListener('change', function() {
      const url = this.value;
      if (url) {
        window.location.href = url;
      }
    });
  }

  // --------------------------------------------
  // Smooth Scroll for Anchor Links (Same-Page Only)
  // --------------------------------------------
  function initSmoothScroll() {
    // Only handle same-page anchor links
    // Cross-page hash navigation handled by handleHashOnPageLoad()
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        // Skip if it's just "#" or empty
        if (targetId === '#' || targetId === '') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // --------------------------------------------
  // Handle Hash Navigation on Page Load
  // --------------------------------------------
  function handleHashOnPageLoad() {
    if (!window.location.hash) return;

    // Prevent browser's automatic scroll to hash
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Start at top to prevent mid-page landing
    window.scrollTo(0, 0);

    // Wait for page load and animation to complete
    // Page has 0.4s transition animation, so wait for that plus buffer
    window.addEventListener('load', function() {
      setTimeout(function() {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'instant',
            block: 'start'
          });
        }
      }, 500); // Wait 500ms for 400ms animation + buffer
    });
  }

  // --------------------------------------------
  // Active Navigation State
  // --------------------------------------------
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');

      // Handle home page
      if ((currentPath === '/' || currentPath.endsWith('index.html')) &&
          (href === '/' || href === 'index.html' || href === './index.html')) {
        link.classList.add('nav__link--active');
      }
      // Handle other pages
      else if (href && currentPath.includes(href.replace('./', '').replace('.html', ''))) {
        link.classList.add('nav__link--active');
      }
    });
  }

  // --------------------------------------------
  // Fade-in Animation on Scroll
  // --------------------------------------------
  function initScrollAnimations() {
    // Only run if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const animatedElements = document.querySelectorAll('.card, .work-card, .blog-entry');

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el) {
      el.classList.add('scroll-animate');
      observer.observe(el);
    });
  }

  // --------------------------------------------
  // Dynamic Header Show/Hide on Scroll
  // --------------------------------------------
  function initDynamicHeader() {
    const nav = document.querySelector('.nav');
    const heroTitle = document.querySelector('.hero__title');

    // Only run on pages with a hero title (main page)
    if (!nav || !heroTitle) {
      // On other pages, always show the nav brand
      if (nav) nav.classList.add('nav--scrolled');
      return;
    }

    // Use IntersectionObserver to detect when "Paige Turner" title leaves viewport
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Title is visible - hide nav brand
          nav.classList.remove('nav--scrolled');
        } else {
          // Title is not visible - show nav brand
          nav.classList.add('nav--scrolled');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-50px 0px 0px 0px' // Account for nav height
    });

    observer.observe(heroTitle);
  }

  // --------------------------------------------
  // Back to Top Button
  // --------------------------------------------
  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    if (!backToTop) return;

    const btn = backToTop.querySelector('.back-to-top__btn');

    // Show/hide based on scroll position
    function toggleVisibility() {
      if (window.scrollY > 400) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }

    // Scroll to top on click
    if (btn) {
      btn.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Check on scroll
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    // Initial check
    toggleVisibility();
  }

  // --------------------------------------------
  // Lightbox for Images
  // --------------------------------------------
  function initLightbox() {
    // Create lightbox element if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
        <div class="lightbox__content">
          <img class="lightbox__image" src="" alt="">
          <div class="lightbox__caption"></div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('.lightbox__image');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    // Find all images that should open in lightbox
    const lightboxLinks = document.querySelectorAll('figure a[href$=".jpg"], figure a[href$=".jpeg"], figure a[href$=".png"], figure a[href$=".gif"]');

    lightboxLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const imgSrc = this.getAttribute('href');
        const figure = this.closest('figure');
        const caption = figure ? figure.querySelector('figcaption') : null;

        lightboxImg.src = imgSrc;
        lightboxImg.alt = this.querySelector('img')?.alt || '';
        lightboxCaption.textContent = caption ? caption.textContent : '';

        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
      });
    });

    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --------------------------------------------
  // Reading Progress Bar (Chapter Pages)
  // --------------------------------------------
  function initReadingProgress() {
    if (!document.querySelector('.chapter__content')) return;

    var bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.prepend(bar);

    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // --------------------------------------------
  // Scroll Position Persistence (Chapter Pages)
  // --------------------------------------------
  function initScrollPersistence() {
    if (!document.querySelector('.chapter__content')) return;

    var key = 'scroll:' + window.location.pathname;

    // Restore saved position after page animation settles
    var saved = localStorage.getItem(key);
    if (saved) {
      window.addEventListener('load', function() {
        setTimeout(function() {
          window.scrollTo(0, parseInt(saved, 10));
        }, 500);
      });
    }

    // Save position on scroll (throttled)
    window.addEventListener('scroll', throttle(function() {
      localStorage.setItem(key, window.scrollY);
    }, 500), { passive: true });
  }

  // --------------------------------------------
  // Initialize Everything
  // --------------------------------------------
  function init() {
    initMobileNav();
    initChapterNav();
    initSmoothScroll();
    setActiveNavLink();
    initScrollAnimations();
    initDynamicHeader();
    initBackToTop();
    initLightbox();
    initReadingProgress();
    initScrollPersistence();
  }

  // Handle hash navigation early (before page fully loads)
  handleHashOnPageLoad();

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
