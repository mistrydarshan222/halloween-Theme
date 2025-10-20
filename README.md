# Halloween Theme - Production-Ready Showcase

A modern WordPress block theme demonstrating advanced full-site editing, custom Gutenberg blocks, and performance-optimized styling.

## Technical Decisions

**Full-Site Editing Template**: Created `front-page.html` using WordPress's HTML template format with dynamic date injection via PHP filters. This approach leverages native FSE capabilities while maintaining flexibility for custom data display.

**Styling Architecture**: Implemented SCSS with CSS custom properties for maintainability and theming. Used modern CSS features including container queries, fluid typography with `clamp()`, and preference-based media queries for dark mode and reduced motion accessibility.

**Custom Block Development**: Built a testimonial card block using React and WordPress's block editor APIs. Chose controlled components with `useState` for real-time preview updates. Implemented `InspectorControls` for rich customization options without relying on ACF, showcasing native Gutenberg capabilities.

**PHP Customizations**: Added multiple WordPress behavior modifications including custom REST endpoints, query modifications, schema.org markup for SEO, and performance optimizations. The date injection filter demonstrates dynamic content rendering within static FSE templates.

## Assumptions

- WordPress 6.0+ with full-site editing support
- Node.js/npm for block compilation
- Modern browser support (ES6+, CSS Grid, Custom Properties)

## Future Improvements

With more time, I would add:
- TypeScript for type safety in block development
- Unit tests using Jest and React Testing Library
- Webpack optimization with code splitting
- Internationalization (i18n) support
- Block variations and patterns library
- Performance monitoring and lazy loading for animations
