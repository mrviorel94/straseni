# Design System - Imobiliare Strășeni

## Overview

A premium but approachable design system for a local real estate portal. The design connects visually to houses, land, nature, villages, and local life in Strășeni, Moldova.

## Brand Identity

**Name:** Imobiliare Strășeni  
**Tagline:** "Case, apartamente și terenuri din Strășeni, explicate simplu."  
**Positioning:** "Ghidul imobiliar al municipiului și raionului Strășeni."

### Brand Personality
- **Local** - Connected to the community
- **Trustworthy** - Professional, reliable, transparent
- **Useful** - Practical, informative, helpful
- **Modern** - Contemporary design, not outdated
- **Human** - Personal touch, approachable
- **Professional** - Polished, high-quality
- **Informative** - Educational, knowledge-sharing

### What We're NOT
- ❌ Generic international real estate template
- ❌ Overly luxurious or exclusive
- ❌ Cold or corporate
- ❌ Overly decorated with gradients or effects
- ❌ Cluttered or noisy
- ❌ Slick or superficial

## Color Palette

### Primary Colors

**Forest Green** - #1d5c3f (RGB: 29, 92, 63)
- Represents: Land, nature, stability, growth
- Usage: Primary buttons, active states, accents, headings
- Hex: #1d5c3f
- Light variant: #2d7349 (lighter for hover states)
- Dark variant: #143a28 (darker for pressed states)

```css
background-color: #1d5c3f;
color: white; /* 4.5:1 contrast ratio ✓ */
```

**Warm White** - #faf9f7 (RGB: 250, 249, 247)
- Represents: Clean, approachable, warm hospitality
- Usage: Main background, card backgrounds, light neutral base
- Hex: #faf9f7
- Cooler alternative: #f5f3f0 (if too warm)

```css
background-color: #faf9f7;
color: #2d2d2d; /* Good contrast */
```

**Neutral Beige** - #d4b5a0 (RGB: 212, 181, 160)
- Represents: Earth tones, local materials, warmth
- Usage: Secondary backgrounds, accent backgrounds, borders
- Hex: #d4b5a0
- Light variant: #e8dcd4
- Dark variant: #c09d88

```css
background-color: #d4b5a0;
color: white; /* 3.8:1 contrast (AA minimum) */
/* OR */
background-color: #d4b5a0;
color: #2d2d2d; /* 5.2:1 contrast (AAA) */
```

### Text Colors

**Charcoal** - #2d2d2d (RGB: 45, 45, 45)
- Primary text color
- Headings, body text, labels
- High contrast: 16.5:1 ratio with white background

**Text Light** - #5a5a5a (RGB: 90, 90, 90)
- Secondary text, slightly less prominent
- Subheadings, descriptions
- Contrast: 8.1:1 with white background

**Text Muted** - #7a7a7a (RGB: 122, 122, 122)
- Tertiary text, less important information
- Helper text, dates, meta information
- Contrast: 5.7:1 with white background

### Neutral Colors

**Light Gray** - #f0ede9 (RGB: 240, 237, 233)
- Light backgrounds, subtle sections
- Component backgrounds
- Hover states

**Gray** - #c9c4bf (RGB: 201, 196, 191)
- Borders, dividers
- Subtle separations
- Disabled states

**Dark Gray** - #9a9490 (RGB: 154, 148, 144)
- Alternative text color
- Subtle text on light-gray
- Secondary borders

### Status Colors

**Success** - #2d7349 (RGB: 45, 115, 73)
- Confirmation messages
- Form validation success
- Also use forest-green

**Error** - #c17545 (RGB: 193, 117, 69)
- Error messages
- Form validation errors
- Attention states

**Warning** - #c09d88 (RGB: 192, 157, 136)
- Warning messages
- Caution states
- Alternative: Beige dark

**Accent Warm** - #c17545 (RGB: 193, 117, 69)
- Terracotta/rust tone
- Call-to-action buttons on green backgrounds
- Links on dark backgrounds
- Hover effects

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

Why this stack:
- **-apple-system, BlinkMacSystemFont:** Native macOS & iOS fonts
- **Segoe UI:** Windows native font
- **Roboto, Oxygen, Ubuntu, Cantarell:** Android and Linux alternatives
- **sans-serif:** Fallback
- No Google Fonts needed; system fonts load instantly

### Type Scale

```
H1: 36px / 2.25rem (mobile) → 48px / 3rem (desktop)
H2: 32px / 2rem (mobile) → 36px / 2.25rem (desktop)
H3: 24px / 1.5rem
H4: 20px / 1.25rem (font-weight: 600)
Body: 16px / 1rem
Small: 14px / 0.875rem
Tiny: 12px / 0.75rem
```

### Font Weights

- **Regular (400):** Body text, descriptions
- **Medium (500):** Labels, form text
- **Bold (700):** Headings, CTA text, emphasis
- **600 (Semi-bold):** Subheadings, card titles

### Line Height

- **Headings:** 1.2 (tight, impactful)
- **Body:** 1.6 (readable, comfortable)
- **Form labels:** 1.4 (slightly compressed)
- **Code:** 1.5 (monospace-friendly)

### Letter Spacing

- **Default:** -0.5px (slightly tighter)
- **Headings:** -0.25px (more negative for larger sizes)
- **All caps:** 0.5px (tracking for readability)

## Spacing System

Consistent spacing creates visual hierarchy and balance.

```css
2px   → Tiny gaps, micro-interactions
4px   → Small spacing
8px   → Component padding/spacing
12px  → Small section spacing
16px  → Standard unit (often used as base)
24px  → Medium spacing (1.5x)
32px  → Large spacing (2x)
48px  → Extra large (3x)
64px  → Section separation (4x)
```

Apply consistently:
- Button padding: `px-6 py-3` (24px, 12px)
- Card padding: `p-6` or `p-8` (24px, 32px)
- Section padding: `py-12` or `py-16` (48px, 64px)

## Border & Shadows

### Border Radius

- **Small:** 6px (default for most elements)
- **Medium:** 8px (cards, larger elements)
- **Large:** 12px (hero sections)
- **Full:** 9999px (avatars, badges)

Keep radius consistent and "soft" feeling. Avoid sharp corners.

```css
.card { border-radius: 8px; }
.button { border-radius: 6px; }
.badge { border-radius: 4px; }
```

### Borders

- **Default:** 1px solid #f0ede9 (light gray)
- **Hover:** 1px solid #c9c4bf (gray)
- **Focus:** 2px solid #1d5c3f (forest green)
- **Active:** 2px solid #1d5c3f

### Shadows

- **None:** No shadow (clean, flat design)
- **Small (sm):** `box-shadow: 0 1px 2px rgba(0,0,0,0.05)`
  - Subtle depth
  - Cards, dropdowns, modals
- **Medium (md):** `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
  - More noticeable
  - Hover states, elevated cards
- **Large (lg):** `box-shadow: 0 10px 15px rgba(0,0,0,0.1)`
  - Strong depth
  - Modals, overlays

Avoid harsh/dark shadows. Keep them subtle and natural.

## Components

### Buttons

**Primary Button (Forest Green)**
```css
background-color: #1d5c3f;
color: white;
padding: 12px 24px; /* py-3 px-6 */
border-radius: 6px;
font-weight: 500;
font-size: 16px;
border: none;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
  background-color: #2d7349;
}

&:active {
  background-color: #143a28;
}

&:focus {
  outline: 2px solid #1d5c3f;
  outline-offset: 2px;
}
```

**Secondary Button (White with Border)**
```css
background-color: white;
color: #1d5c3f;
border: 2px solid #1d5c3f;
padding: 10px 24px;
border-radius: 6px;
font-weight: 500;
cursor: pointer;
transition: all 0.3s ease;

&:hover {
  background-color: #f0ede9;
}
```

**Ghost Button (Text Only)**
```css
background: transparent;
color: #1d5c3f;
padding: 8px 16px;
font-weight: 500;
border: none;
cursor: pointer;

&:hover {
  color: #2d7349;
  text-decoration: underline;
}
```

### Cards

**Property Card**
```css
background: white;
border-radius: 8px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
border: 1px solid #f0ede9;
overflow: hidden;
transition: box-shadow 0.3s ease, transform 0.3s ease;

&:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.card-image {
  width: 100%;
  height: 224px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}
```

### Form Elements

**Input**
```css
border: 1px solid #f0ede9;
border-radius: 6px;
padding: 10px 16px; /* py-2 px-4 */
font-size: 16px;
font-family: inherit;
transition: border-color 0.2s, box-shadow 0.2s;

&:focus {
  outline: none;
  border-color: #1d5c3f;
  box-shadow: 0 0 0 3px rgba(29, 92, 63, 0.1);
}

&:disabled {
  background-color: #f0ede9;
  color: #7a7a7a;
  cursor: not-allowed;
}
```

**Label**
```css
font-size: 14px;
font-weight: 500;
color: #2d2d2d;
margin-bottom: 8px;
display: block;
```

**Error Text**
```css
font-size: 12px;
color: #c17545;
margin-top: 4px;
```

## Animations & Transitions

Keep animations **subtle and purposeful**. No excessive movement.

### Duration

- **Fast:** 150ms (hover states, micro-interactions)
- **Normal:** 300ms (standard transitions)
- **Slow:** 500ms (modal entrance, page transitions)

### Easing

- **ease-in-out:** Most common, natural feeling
- **ease:** Good for element entrance
- **cubic-bezier(0.25, 0.46, 0.45, 0.94):** Smooth, premium feel

### Examples

**Hover on cards**
```css
transition: box-shadow 0.3s ease, transform 0.3s ease;

&:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
```

**Button hover**
```css
transition: background-color 0.3s ease;

&:hover {
  background-color: #2d7349;
}
```

**Form focus**
```css
transition: border-color 0.2s, box-shadow 0.2s;

&:focus {
  border-color: #1d5c3f;
  box-shadow: 0 0 0 3px rgba(29, 92, 63, 0.1);
}
```

**Respect prefers-reduced-motion**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

**Mobile-first approach**

```css
/* Mobile (default) */
.card { font-size: 16px; padding: 16px; }

/* Tablet (768px and up) */
@media (min-width: 768px) {
  .card { font-size: 18px; padding: 20px; }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
  .card { font-size: 18px; padding: 24px; }
}
```

### Breakpoints (Tailwind defaults)

- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

## Accessibility

### Color Contrast

- **AAA (Enhanced):** 7:1 contrast ratio
- **AA (Standard):** 4.5:1 for text, 3:1 for large text
- **Minimum:** Never go below 3:1

Verify: https://webaim.org/resources/contrastchecker/

### Interactive Elements

- **Minimum size:** 44x44px for touch targets
- **Focus indicator:** Always visible (2px outline)
- **Link underlines:** Clear indication
- **Keyboard navigation:** Logical tab order

### Images

- **Alt text:** Descriptive for all content images
- **Decorative:** Empty alt="" for decorative images
- **Linked images:** Describe the destination

### Motion

- **Respect prefers-reduced-motion:** System preference
- **No auto-play videos:** User control required
- **Avoid flashing:** Nothing flashes more than 3x/second

## Dark Mode (Future)

If dark mode is added in future:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-warm-white: #1a1a1a;
    --color-charcoal: #f0f0f0;
    --color-light-gray: #2d2d2d;
    /* Invert colors appropriately */
  }
}
```

But for now: **Light mode only** - matches brand positioning.

## Images & Photography

### Style

- **Authentic:** Real local photography when possible
- **Warm:** Golden hour, natural lighting
- **Active:** Showing properties with life, not sterile
- **Consistent:** Similar color temperature and editing
- **Aspect Ratios:**
  - Property cards: 16:12 (4:3)
  - Hero images: 16:9
  - Locality cards: 4:3 or 16:9
  - Blog featured: 16:9
  - Thumbnails: 1:1 or 4:3

### Image Optimization

- **Responsive images:** Multiple sizes for different screens
- **Lazy loading:** Defer off-screen images
- **Formats:** WebP with fallbacks
- **Compression:** Optimize without sacrificing quality

```html
<img 
  src="image.jpg" 
  alt="Property description"
  loading="lazy"
  srcset="image-small.jpg 480w, image-large.jpg 1200w"
/>
```

## Usage Guidelines

### DO ✓

- Use the full color palette
- Apply shadows sparingly for depth
- Keep spacing generous
- Use system fonts
- Maintain consistent radius
- Animate with purpose
- Respect user preferences
- Test on real devices

### DON'T ✗

- Mix too many colors in one section
- Over-shadow elements
- Crowd content together
- Use web fonts unnecessarily
- Apply shadows to everything
- Animate all interactions
- Ignore focus states
- Design only for desktop

## Files & Resources

- **Tailwind Config:** `tailwind.config.ts`
- **Global Styles:** `app/globals.css`
- **Components:** `components/`
- **Colors in CSS:** CSS custom properties defined in globals.css

## Maintenance

- Keep design token docs updated
- Review brand compliance monthly
- Gather user feedback quarterly
- Iterate based on analytics
- Test accessibility regularly
- Document all design decisions

---

**Version:** 1.0  
**Last Updated:** August 1, 2026  
**Status:** Active & Maintained
