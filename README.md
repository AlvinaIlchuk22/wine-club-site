# Marlow Vale Estate: winery concept

A portfolio concept for a (fictional) Barossa Valley winery, built to show a homepage, a wine-club landing page and a matching marketing email in one consistent style.

**This is a concept build.** Marlow Vale Estate is not a real business. All copy, people and images are placeholders, and the images were AI-generated.

## Pages
| File | What it is |
|---|---|
| `index.html` | Homepage: wine carousel hero, wine cards, story, counters, cellar door |
| `club.html` | "The Cellar Circle" wine club landing page: tiers, how it works, FAQ, join form |
| `edm.html` | HTML email (600px, table layout, inline styles) |
| `privacy.html`, `unsubscribe.html` | Supporting pages the email links to |

## Stack
Plain HTML, CSS and JavaScript. GSAP 3.12 and ScrollTrigger from cdnjs. No build step, deploys as a static site (Vercel, framework "Other").
Fonts: Cormorant Garamond and Jost (same on every page and in the email, with Georgia and Arial as email fallbacks).

## Run locally
```bash
python3 serve.py      # no-cache dev server
# open http://localhost:8783/index.html
```

## Notes
- The wine carousel transition (rotating scene, circular reveal, two glass discs, bottle and plinth tipping together) is built with GSAP timelines. Reduced-motion users get a plain cross-fade.
- Forms and "Add to cart" are front-end demos only. A live build needs a server endpoint with a unique-email rule, stored consents and a confirmation email.
- Email images use relative paths so the preview works. Before a real send, replace them with absolute URLs on the live domain.
- Mobile checked at 375px wide.
