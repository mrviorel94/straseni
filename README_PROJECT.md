# Imobiliare Strășeni - Real Estate Portal

A modern, premium, SEO-friendly real estate website focused on Strășeni municipality and Strășeni district, Moldova.

## Overview

**Positioning:** "Ghidul imobiliar al municipiului și raionului Strășeni."
**Tagline:** "Case, apartamente și terenuri din Strășeni, explicate simplu."

This is a Next.js-based local real estate portal designed as a scalable foundation that can evolve from a hobby project into a full-featured platform.

## Features

### Core Functionality
- **Property Listings:** Browse houses, apartments, land, and commercial properties
- **Detailed Property Pages:** Full specifications, amenities, utilities, contact info
- **Locality Guides:** Information about each locality with advantages, pricing, FAQ
- **Blog:** SEO-focused editorial content about real estate topics
- **Services:** Description of consultancy and promotional services offered
- **Lead Generation:** Valuation form, contact form, property submission form
- **Responsive Design:** Mobile-first, fully responsive on all devices

### Pages
1. **Homepage** - Hero, featured properties, localities, services, valuation form, blog preview
2. **Properties Listing** (/proprietati) - Searchable, filterable property grid
3. **Property Detail** (/proprietati/[slug]) - Full property info, gallery, contact options
4. **Localities** (/localitati) - All localities overview
5. **Locality Guide** (/localitati/[slug]) - Detailed guide for each locality
6. **Blog** (/blog) - Article listings by category
7. **Blog Article** (/blog/[slug]) - Full article with related posts
8. **Services** (/servicii) - Service description, process, FAQ
9. **About** (/despre) - Mission, values, team, why choose us
10. **Contact** (/contact) - Contact form, info, hours
11. **Add Property** (/adauga-proprietate) - Property submission form

## Design System

### Colors
- **Primary:** Dark Forest Green (#1d5c3f) - represents land, nature, stability
- **Secondary:** Warm White (#faf9f7) - clean, approachable background
- **Tertiary:** Neutral Beige (#d4b5a0) - warmth, local materials
- **Text:** Charcoal (#2d2d2d) - professional, readable
- **Accents:** Warm Orange (#c17545) - terracotta, earth tones

### Typography
- **Display:** System font stack with -apple-system, BlinkMacSystemFont
- **Body:** Same system font stack for consistency
- **Spacing:** 16px, 24px, 32px, 48px units
- **Border Radius:** 6-8px for soft, approachable feel

### Brand Feel
- Local and trustworthy
- Useful and informative
- Modern but not overly luxurious
- NOT a generic international real estate template
- Connected to houses, land, nature, villages, local life

## Project Structure

```
D:\CLAUDE\Straseni/
├── app/                          # Next.js App Router
│   ├── proprietati/             # Property listings
│   │   ├── page.tsx            # Property grid with filters
│   │   └── [slug]/
│   │       └── page.tsx        # Individual property detail
│   ├── localitati/             # Localities
│   │   ├── page.tsx            # All localities
│   │   └── [slug]/
│   │       └── page.tsx        # Individual locality guide
│   ├── blog/                   # Blog
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual article
│   ├── servicii/               # Services page
│   │   └── page.tsx
│   ├── despre/                 # About page
│   │   └── page.tsx
│   ├── contact/                # Contact page
│   │   └── page.tsx
│   ├── adauga-proprietate/    # Add property form
│   │   └── page.tsx
│   ├── layout.tsx              # Root layout with Header & Footer
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles & design tokens
│
├── components/                  # Reusable React components
│   ├── Header.tsx              # Navigation & logo
│   ├── Footer.tsx              # Footer with links
│   ├── PropertyCard.tsx         # Property listing card
│   ├── LocalityCard.tsx         # Locality card
│   ├── ArticleCard.tsx          # Blog article card
│   ├── ServiceCard.tsx          # Service card
│   ├── SearchBar.tsx            # Property search & filters
│   ├── ValuationForm.tsx        # Valuation request form
│   └── Breadcrumbs.tsx          # Navigation breadcrumbs
│
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   └── mockData.ts              # Mock properties, articles, localities
│
├── public/                       # Static assets
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts          # (If needed)
├── next.config.ts
└── postcss.config.mjs

```

## Tech Stack

- **Framework:** Next.js 16.2 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **React:** 19.2.4
- **Build Tool:** Next.js built-in

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd D:\CLAUDE\Straseni

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Mock Data

All property listings, blog articles, and locality information are currently **stored in `lib/mockData.ts`**. 

When you're ready to connect a real backend:

1. Replace mock imports in pages with API calls
2. Create API routes in `app/api/`
3. Integrate with Supabase or your chosen CMS

## Future Integrations

### Analytics
- Add Google Analytics 4 to `layout.tsx`
- Track events: property views, form submissions, searches

### SEO
- Install `next-seo` package for better metadata control
- Add structured data (JSON-LD) for properties and articles
- Create XML sitemap generator

### Database & CMS
- **Supabase:** Properties table, blog posts table, localities table, leads table
- **Strapi:** Self-hosted headless CMS
- **Contentful:** Cloud-based CMS
- Connection code should go in `lib/api.ts`

### Forms
- Replace mock form submissions with:
  - EmailJS for email forwarding
  - Supabase for database storage
  - Resend for transactional emails

### Images
- Replace Unsplash URLs with:
  - Local image uploads
  - Cloudinary for image hosting and optimization
  - Next.js `Image` component optimization

### Authentication (Future)
- Admin panel for managing listings
- User accounts for saved properties
- Implement with NextAuth.js or Supabase Auth

### Advertising
- Banner ads system for local businesses
- Featured listing placement (premium)
- Sponsored articles section

### Monetization
- Featured listing bumps (pay to promote)
- Sponsored articles by local businesses
- Premium agent profile listings
- Banner advertising space

## Color Tokens (CSS Variables)

All colors are defined as CSS variables in `app/globals.css`:

```css
--color-forest-green: #1d5c3f
--color-warm-white: #faf9f7
--color-beige: #d4b5a0
--color-charcoal: #2d2d2d
--color-accent-warm: #c17545
```

Use with Tailwind classes like `bg-forest-green`, `text-charcoal`, etc.

## Performance Tips

- Images use `unsplash.com` URLs - replace with local/optimized images in production
- Add caching headers to static pages
- Use Next.js Image component for optimization
- Consider CDN for static assets

## SEO Considerations

Currently implemented:
- Semantic HTML structure
- Breadcrumb navigation
- Descriptive page titles & meta descriptions
- Open Graph tags in layout
- Clean URL structure (no diacritics in slugs)
- Heading hierarchy

To improve:
- Add XML sitemap
- Add robots.txt
- Implement structured data (Schema.org)
- Add internal linking strategy
- Optimize for local search (Moldova, Strășeni)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)
- No IE11 support (not needed for modern Next.js)

## Accessibility

- Semantic HTML elements
- Focus states on interactive elements
- Alt text on images
- Proper color contrast (WCAG AA)
- Responsive text sizing
- Keyboard navigation support
- Reduced motion support

## File Naming & Slug Convention

- URLs use lowercase with hyphens (e.g., `/proprietati/casa-spatiosa-teren-straseni`)
- Slugs are in English-friendly format (no diacritics) for better URLs
- Display text uses Romanian with diacritics
- Categories remain in Romanian

## Contributing

To add new features:
1. Create components in `components/`
2. Add types to `lib/types.ts`
3. Add mock data to `lib/mockData.ts`
4. Create pages in `app/`
5. Update navigation in `Header.tsx`

## License

This project is a demonstration/prototype. Customize as needed.

## Contact

For questions about this template or project structure, refer to the code comments and component documentation.

---

**Last Updated:** August 1, 2026  
**Status:** Frontend Prototype - Ready for Backend Integration
