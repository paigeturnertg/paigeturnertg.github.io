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
  // Smooth Scroll for Anchor Links
  // --------------------------------------------
  function initSmoothScroll() {
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
  // Review Rotation
  // --------------------------------------------
  function initReviewRotation() {
    const reviewCard = document.querySelector('.review-card');
    if (!reviewCard) return;

    const reviewContent = reviewCard.querySelector('.review-card__content');
    const quoteElement = reviewCard.querySelector('.review-card__quote');
    const reviewerElement = reviewCard.querySelector('.review-card__reviewer');
    const storyTitleElement = reviewCard.querySelector('.review-card__story-title');
    const indicators = reviewCard.querySelectorAll('.review-indicator');
    const pauseBtn = document.querySelector('.updates__pause-btn');

    let reviews = [];
    let currentIndex = 0;
    let rotationInterval = null;
    let isPaused = false;

    // Fetch reviews from JSON
    async function fetchReviews() {
      try {
        const response = await fetch('data/reviews.json');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        reviews = data.reviews;

        if (reviews.length > 0) {
          displayReview(0);
          startRotation();
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        quoteElement.textContent = 'Unable to load reviews at this time.';
      }
    }

    // Display a specific review
    function displayReview(index) {
      if (!reviews[index]) return;

      const review = reviews[index];

      // Fade out
      reviewContent.classList.add('is-fading');

      setTimeout(function() {
        // Update content
        quoteElement.textContent = `"${review.quote}"`;
        reviewerElement.textContent = `— ${review.reviewer}`;
        storyTitleElement.textContent = review.storyTitle;

        // Update indicators
        indicators.forEach(function(indicator, i) {
          indicator.classList.toggle('is-active', i === index);
        });

        // Fade in
        reviewContent.classList.remove('is-fading');
      }, 300);

      currentIndex = index;
    }

    // Start automatic rotation
    function startRotation() {
      if (isPaused || reviews.length <= 1) return;

      rotationInterval = setInterval(function() {
        const nextIndex = (currentIndex + 1) % reviews.length;
        displayReview(nextIndex);
      }, 12000); // 12 seconds
    }

    // Stop rotation
    function stopRotation() {
      if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
      }
    }

    // Toggle pause/play
    function togglePause() {
      isPaused = !isPaused;

      if (isPaused) {
        stopRotation();
        pauseBtn.classList.add('is-paused');
        pauseBtn.setAttribute('aria-label', 'Resume review rotation');

        // Update icon to play symbol
        pauseBtn.querySelector('svg').innerHTML = `
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8"></polygon>
        `;
      } else {
        startRotation();
        pauseBtn.classList.remove('is-paused');
        pauseBtn.setAttribute('aria-label', 'Pause review rotation');

        // Update icon back to pause symbol
        pauseBtn.querySelector('svg').innerHTML = `
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="10" y1="15" x2="10" y2="9"></line>
          <line x1="14" y1="15" x2="14" y2="9"></line>
        `;
      }
    }

    // Pause button click
    if (pauseBtn) {
      pauseBtn.addEventListener('click', togglePause);
    }

    // Indicator clicks for manual navigation
    indicators.forEach(function(indicator, index) {
      indicator.addEventListener('click', function() {
        stopRotation();
        displayReview(index);
        if (!isPaused) {
          startRotation();
        }
      });
    });

    // Pause on hover (accessibility & UX)
    reviewCard.addEventListener('mouseenter', function() {
      if (!isPaused) {
        stopRotation();
      }
    });

    reviewCard.addEventListener('mouseleave', function() {
      if (!isPaused) {
        startRotation();
      }
    });

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        stopRotation();
      } else if (!isPaused) {
        startRotation();
      }
    });

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      stopRotation();
      isPaused = true;
      if (pauseBtn) {
        pauseBtn.style.display = 'none';
      }
    }

    // Initialize
    fetchReviews();
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
    initReviewRotation();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
