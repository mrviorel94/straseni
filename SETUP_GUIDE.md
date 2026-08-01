# Setup Guide - Imobiliare Strășeni

## 🔐 1. Google OAuth Setup (NEW!)

### Step 1: Enable Google Provider in Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication → Providers**
4. Find **Google** and click **Enable**

### Step 2: Set up Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Go to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client IDs**
5. Choose **Web Application**
6. Add these **Authorized redirect URIs**:
   - `https://YOUR_SUPABASE_URL.supabase.co/auth/v1/callback?provider=google`
   - `http://localhost:3000/auth/v1/callback?provider=google` (for local testing)

7. Copy the **Client ID** and **Client Secret**

### Step 3: Add to Supabase
1. In Supabase → Authentication → Providers → Google
2. Paste **Client ID** and **Client Secret**
3. Click **Save**

### Step 4: Update Environment Variables
Add to your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 5: Deploy to Vercel
1. Go to Vercel project settings
2. Add same environment variables to **Settings → Environment Variables**
3. Also add Google OAuth redirect URI to Supabase allowed domains

---

## 👤 2. Admin Email Configuration

### Set Admin Emails
Add to your `.env.local`:
```
ADMIN_EMAILS=viorel.popa8@gmail.com,another@email.com
```

This ensures only specified users can access the admin panel.

---

## 📸 3. Add Background Images & Property Images

### Recommended Image Sources:
- **Unsplash** (free, high quality)
- **Pexels** (free)
- **Local storage** (upload to Supabase Storage)

### Replace Images in Code:
Search and replace the Unsplash URLs with your own:

**For Hero Background:**
- Current: `https://images.unsplash.com/photo-1570129477492-45c003d96918`
- Where: `app/page.tsx`, `app/admin/page.tsx`

**For Property Cards:**
- Default image in admin: `app/admin/page.tsx` line 43

### Upload to Supabase Storage:
1. Create bucket: **Storage → Create Bucket → "property-images"**
2. Upload images
3. Copy public URL and use in code

---

## 🎨 4. Mobile Admin Panel Improvements ✅

**Completed in this update:**
- ✅ Responsive header (stacks on mobile)
- ✅ Scrollable tabs on small screens
- ✅ Property cards with flexible buttons
- ✅ Mobile-optimized modals
- ✅ Better touch targets for mobile
- ✅ Improved form inputs (text-base for better mobile rendering)

---

## 🎯 5. Sold Properties Visibility

Sold properties now display with:
- ✅ **Gray color overlay** on card image
- ✅ **Reduced opacity** (60%) for the entire card
- ✅ **Grayscale filter** on image
- ✅ **"VÂNDUT" badge** overlay
- ✅ **Gray styling** for text and badges

In admin panel:
- ✅ **Gray border** instead of green
- ✅ **Grayscale thumbnail**
- ✅ **Reduced opacity**
- ✅ Toggle button to mark as sold/available

---

## 🚀 6. UX/UI Improvements Made

### Admin Panel Enhancements:
- ✅ **Google OAuth login** with visual separator
- ✅ **Google icon** button for OAuth
- ✅ **Improved login form** with better spacing
- ✅ **Mobile-responsive** admin dashboard
- ✅ **Better button styling** with active states
- ✅ **Scrollable tabs** on mobile
- ✅ **Stacked property cards** on mobile
- ✅ **Empty state** for leads section
- ✅ **Better visual hierarchy** in forms

### Website Enhancements:
- ✅ **Sold property indicators** (gray + overlay)
- ✅ **Property video support** in detail view
- ✅ **Image carousel** for multiple photos
- ✅ **Responsive design** for all screens

---

## 📝 7. Environment Variables Checklist

Create `.env.local`:
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Admin
ADMIN_EMAILS=viorel.popa8@gmail.com

# Vercel (if needed)
VERCEL_URL=your-domain.vercel.app
```

---

## ✅ 8. Testing Checklist

- [ ] Google login works on admin panel
- [ ] Email/password login still works
- [ ] Mobile admin panel is responsive
- [ ] Sold properties show gray overlay
- [ ] Admin can add new properties
- [ ] Admin can edit properties
- [ ] Admin can approve/reject leads
- [ ] Lead email notifications work
- [ ] Property detail page shows video (if available)
- [ ] Images load correctly

---

## 🛠️ 9. Troubleshooting

### Google Login Not Working
1. Check Supabase Google provider is enabled
2. Verify Client ID & Secret are correct
3. Check redirect URIs are whitelisted
4. Check browser console for errors

### Images Not Loading
1. Verify image URLs are correct
2. Check image exists at URL
3. Check CORS settings if using custom storage
4. Use HTTPS URLs only

### Admin Panel Not Mobile-Friendly
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check if CSS is loading

---

## 📱 10. Deploy to Vercel

```bash
git add .
git commit -m "Add Google OAuth and mobile improvements"
git push
```

Vercel will auto-deploy. Check environment variables are set!

---

## 🎁 What's Next?

Consider adding:
- [ ] Image upload directly in admin
- [ ] Email notifications for new leads
- [ ] Analytics dashboard
- [ ] Property comparison feature
- [ ] Saved favorites for users
- [ ] WhatsApp integration for inquiries
