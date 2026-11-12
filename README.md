# Aangan — Kitchen & Café (React restaurant template)

A five-page premium restaurant / café website built with React, Vite, Tailwind CSS, React Router, Framer Motion, React Hook Form and Lucide icons.

## Run

```bash
npm install
npm run dev      # development server
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Pages

| Route      | Contents |
|------------|----------|
| `/`        | Hero, introduction, signature dishes, experience, why choose us, gallery preview with lightbox, testimonial carousel, reservation CTA |
| `/about`   | Story and timeline, philosophy, culinary approach, chef, values, interiors |
| `/menu`    | Category tabs, veg / non-veg filter, Bestseller and Chef's Special labels, prices in ₹ (category and filter are kept in the URL) |
| `/gallery` | Category filters, masonry grid, lightbox (keyboard, swipe, previous / next) |
| `/contact` | Contact details, opening hours, Google Map, validated reservation form, general enquiry form |

## Customising for another restaurant

- **Brand, contact details, hours, reservation times:** `src/data/site.js`
- **Menu:** `src/data/menuItems.js` (items marked `signature: true` appear on the homepage)
- **Gallery:** `src/data/galleryImages.js`
- **Reviews:** `src/data/testimonials.js`
- **Colours and fonts:** `tailwind.config.js`
- **Images:** `public/images/` (Unsplash, free to use under the [Unsplash License](https://unsplash.com/license))

## Note on the forms

The reservation and enquiry forms are a frontend demo. Submitting one fakes a network request in the browser and sends nothing anywhere. The confirmation screen says plainly that the table is **not yet confirmed**. To take real bookings, replace `fakeRequest` in `src/utils/format.js` with a call to your booking API or form service.

## Deployment

The site is a single-page app, so the host must send every route to `index.html`. Fallback rules are included: `public/_redirects` for Netlify and `vercel.json` for Vercel.
