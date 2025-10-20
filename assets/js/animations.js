/**
 * Base Theme Animations
 * General animation utilities for the entire theme
 */

(function() {
    'use strict';

    // ========================================
    // Smooth Scroll Polyfill for older browsers
    // ========================================
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
        document.head.appendChild(script);
    }

    // ========================================
    // Add loaded class to body when page is ready
    // ========================================
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });

    // ========================================
    // Accessibility: Skip to main content
    // ========================================
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ========================================
    // Basic fade-in for images
    // ========================================
    function fadeInImages() {
        const images = document.querySelectorAll('img:not([data-fade-loaded])');
        images.forEach(img => {
            if (img.complete) {
                img.style.opacity = '1';
                img.setAttribute('data-fade-loaded', 'true');
            } else {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                    this.setAttribute('data-fade-loaded', 'true');
                });
            }
        });
    }

    // ========================================
    // Initialize
    // ========================================
    function init() {
        fadeInImages();
        console.log('Base theme animations initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
