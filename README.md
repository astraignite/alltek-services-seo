# Alltek Services Website

This is the official website for Alltek Services, a heating and air conditioning service provider in Belton, TX.

## Performance Optimizations

This website has been optimized for performance with the following improvements:

1. **Optimized Images**
   - All images are converted to WebP format for better compression
   - Images are properly sized based on their usage
   - Explicit width and height attributes are added to prevent layout shifts

2. **Critical CSS**
   - Critical CSS is inlined in the head for faster rendering
   - Non-critical CSS is loaded asynchronously

3. **Deferred Resource Loading**
   - Google Fonts are loaded with optimized techniques
   - Non-critical resources are deferred

4. **Largest Contentful Paint (LCP) Optimization**
   - Hero image is preloaded with high priority
   - Critical rendering path is optimized

## Development

To start the development server:

```bash
npm run dev
```

## Building for Production

### Standard Build

```bash
npm run build
```

### Optimized Build (with image optimization)

This will automatically optimize all images before building the site:

```bash
npm run build:optimized
```

### Image Optimization Only

If you want to optimize images without building the site:

```bash
npm run optimize-images
```

## Preview

To preview the production build:

```bash
npm run preview
```

## Project Structure

- `public/` - Static assets
  - `images/` - Original images
  - `images-optimized/` - WebP optimized images (generated)
- `src/` - Source code
  - `components/` - Reusable components
  - `pages/` - Page components
  - `styles/` - CSS styles
- `scripts/` - Build and optimization scripts

## Performance Best Practices

When adding new content to the site, follow these best practices:

1. **Images**
   - Always include width and height attributes on images
   - Use the optimized WebP images from `/images-optimized/` directory
   - Add `loading="lazy"` to images below the fold
   - Add `fetchpriority="high"` only to the most important images

2. **CSS and JavaScript**
   - Keep critical CSS minimal
   - Defer non-critical JavaScript
   - Avoid render-blocking resources

3. **Fonts**
   - Use the preloading technique for fonts
   - Consider using system fonts when possible
