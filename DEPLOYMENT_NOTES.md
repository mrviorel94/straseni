# Deployment & Integration Notes

This document provides guidance for connecting real data sources and preparing for production.

## Current State

- ✅ Full frontend prototype with all pages and components
- ✅ Mock data in `lib/mockData.ts` 
- ✅ Responsive design, mobile-optimized
- ✅ Basic SEO structure
- ⏳ No database, all data is static/local
- ⏳ Forms submit but don't save data
- ⏳ No authentication or admin panel

## Phase 1: Data Management (Weeks 1-2)

### Option A: Supabase (Recommended for Rapid Development)

1. **Create Supabase Project**
   ```bash
   # Install Supabase client
   npm install @supabase/supabase-js
   ```

2. **Create Tables**
   - `properties` (id, title, type, locality, address, price, area, rooms, landArea, description, images, utilities, contact_name, contact_phone, contact_email, status, featured, created_at)
   - `blog_articles` (id, slug, title, excerpt, content, category, author, date, image, reading_time, tags, created_at)
   - `localities` (id, slug, name, image, description, advantages, disadvantages, indicative_prices)
   - `form_submissions` (id, form_type, data, created_at, status) - for contact/valuation forms
   - `property_submissions` (id, owner_info, property_info, status, created_at)

3. **Update Code**
   - Create `lib/api.ts` with Supabase client
   - Replace mock data imports with API calls
   - Example:
   ```typescript
   // lib/api.ts
   import { createClient } from '@supabase/supabase-js';
   
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_KEY!
   );
   
   export async function getProperties() {
     const { data, error } = await supabase
       .from('properties')
       .select('*');
     return data;
   }
   ```

4. **Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_KEY=your_key
   ```

### Option B: Strapi Headless CMS

1. **Deploy Strapi**
   - Self-hosted: `npm create strapi-app@latest my-project`
   - Or use Strapi Cloud

2. **Create Content Types**
   - Property
   - BlogArticle
   - Locality

3. **Install Strapi SDK**
   ```bash
   npm install qs
   ```

4. **API Calls**
   ```typescript
   // lib/api.ts
   const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
   
   export async function getProperties() {
     const response = await fetch(`${API_URL}/api/properties`);
     return response.json();
   }
   ```

## Phase 2: Form Data & Leads (Week 2-3)

### Contact Form & Valuation Form

**Option 1: Supabase + Email (Recommended)**
```typescript
// Save to Supabase + send email
async function submitContactForm(data) {
  // 1. Save to database
  await supabase.from('form_submissions').insert([{
    form_type: 'contact',
    data: data
  }]);
  
  // 2. Send email via Resend or SendGrid
  await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
```

**Option 2: EmailJS (No Backend)**
```typescript
// Install emailjs-com
npm install @emailjs/browser

// Use directly from frontend
import emailjs from '@emailjs/browser';

async function submitForm(data) {
  await emailjs.send(
    'service_id',
    'template_id',
    data
  );
}
```

### Property Submission Form

1. **Save to Database**
   ```typescript
   await supabase.from('property_submissions').insert([{
     owner_info: { name, phone, email },
     property_info: { type, locality, address, price, ... },
     status: 'pending_review'
   }]);
   ```

2. **Image Upload**
   - Use Supabase Storage for free image hosting
   - Or Cloudinary for more features
   ```typescript
   const { data, error } = await supabase.storage
     .from('property-images')
     .upload(`properties/${id}/${file.name}`, file);
   ```

## Phase 3: Admin Panel (Week 3-4)

### Option 1: Supabase + Admin Panel UI

Build a simple admin page:
- `/admin/properties` - Manage listings
- `/admin/submissions` - Review property submissions
- `/admin/articles` - Manage blog posts

```typescript
// app/admin/page.tsx
'use client';
import { useAuth } from '@/lib/useAuth'; // Implement auth

export default function AdminDashboard() {
  const { user } = useAuth();
  
  if (!user) return <div>Not authenticated</div>;
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin UI here */}
    </div>
  );
}
```

### Option 2: Vercel + Supabase Dashboard

- Use Supabase's built-in dashboard for data management
- Implement auth with Supabase Auth (email/password or social login)

## Phase 4: SEO & Analytics (Week 4)

### Google Analytics 4

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout() {
  return (
    <html>
      <body>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        {/* Rest of layout */}
      </body>
    </html>
  );
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getProperties, getBlogArticles, getLocalities } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://imobiliare-straseni.com';
  
  const properties = await getProperties();
  const articles = await getBlogArticles();
  const localities = await getLocalities();
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...properties.map((p) => ({
      url: `${baseUrl}/proprietati/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(a.updated_at),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];
}
```

### Structured Data

Add Schema.org markup for properties:
```typescript
// components/PropertySchema.tsx
export function PropertySchema({ property }) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'RealEstateAgent',
    name: 'Imobiliare Strășeni',
    url: 'https://imobiliare-straseni.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '42'
    },
    listingsCount: property.listingsCount
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## Phase 5: Monetization (Week 5+)

### Featured Listings

1. Add `featured_until` timestamp to properties
2. Create payment page with Stripe
3. Admin can mark listings as featured (paid)

```typescript
// app/checkout/page.tsx
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutPage() {
  const handleCheckout = async (propertyId: string) => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ propertyId, priceInCents: 5000 }) // $50
    });
    
    const { sessionId } = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId });
  };
  
  return <button onClick={() => handleCheckout(id)}>Promote for $50</button>;
}
```

### Advertising Space

1. Create `advertisements` table with:
   - business_name
   - logo/image
   - link
   - position (top, sidebar, footer)
   - active_until
   - price_per_month

2. Add ad slots to homepage and properties pages

## Deployment Checklist

- [ ] Database set up (Supabase/Strapi/other)
- [ ] Environment variables configured
- [ ] Form submissions saving to database
- [ ] Email notifications working
- [ ] Image uploads working
- [ ] Admin panel created
- [ ] Authentication implemented
- [ ] Google Analytics added
- [ ] Sitemap generated
- [ ] Robots.txt created
- [ ] Meta tags verified
- [ ] Domain name purchased
- [ ] SSL certificate installed
- [ ] CDN configured (Vercel, Cloudflare)
- [ ] Backups configured
- [ ] Error logging set up (Sentry)

## Deployment Platforms

### Option 1: Vercel (Recommended)
- Free tier includes DB serverless functions
- Automatic deployments from GitHub
- Built-in analytics and monitoring
- Connect Supabase for data

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
- Static hosting + serverless functions
- Good for Strapi + Netlify combo
- Deploy from GitHub

```bash
npm run build
# Push to GitHub, connect Netlify
```

### Option 3: Self-Hosted
- VPS (DigitalOcean, Linode, Hetzner)
- Docker setup
- Full control but more maintenance

## Performance Optimization

```typescript
// app/layout.tsx
export const metadata = {
  metadataBase: new URL('https://imobiliare-straseni.com'),
  title: 'Imobiliare Strășeni',
  description: '...',
  openGraph: {
    images: ['/og-image.png'], // Pre-generated image
  },
};

// Use Next.js Image for all images
import Image from 'next/image';

export function PropertyCard({ property }) {
  return (
    <Image
      src={property.image}
      alt={property.title}
      width={400}
      height={300}
      priority={false}
      placeholder="blur"
      blurDataURL="..."
    />
  );
}
```

## Security Checklist

- [ ] HTTPS only
- [ ] Rate limiting on forms
- [ ] CSRF protection
- [ ] Input validation
- [ ] SQL injection prevention (using ORM)
- [ ] XSS protection (React default)
- [ ] Sensitive data in env vars
- [ ] API key rotation
- [ ] Database backups
- [ ] DDoS protection (Cloudflare)

## Monitoring & Support

1. **Error Tracking:** Sentry.io
2. **Uptime Monitoring:** StatusPage.io
3. **Performance:** Vercel Analytics or New Relic
4. **User Support:** Intercom or Zendesk
5. **Email Service:** SendGrid or Resend

## Next Steps

1. Choose tech stack (recommend: Vercel + Supabase)
2. Set up database
3. Replace mock data with real API calls
4. Implement authentication
5. Build admin panel
6. Add payment processing
7. Deploy to production
8. Monitor performance
9. Iterate based on feedback

---

**Estimated Timeline:** 4-6 weeks for full production setup
**Budget:** $0-100/month (depending on scale and choices)
