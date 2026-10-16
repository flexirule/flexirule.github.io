# FlexiRule Design Summary: Reference Website Alignment

## Reference Target
- **URL**: `https://frappe.io/erpnext/version-16`

## Overview
The goal of this refactoring was to align FlexiRule's marketing website design language closely with the reference site (ERPNext Version 16 page on Frappe.io) while preserving FlexiRule's brand identity, product messaging, routes, and dark/light theme functionality.

## Key Design Refactorings

### 1. Header & Text Breadcrumb Navigation
- **Text Breadcrumb Bar**: Header breadcrumb displays text-style path (`flexirule > home`, `flexirule > comparisons > ...`) matching the reference website header breadcrumb layout.
- **Sticky Header**: Translucent frosted blur effect (`backdrop-filter: blur(18px)`), subtle bottom border (`#e7e7e4`), and sticky positioning (`top: 0`).
- **Brand & Navigation**: Compact 36px mark logo with bold product title, dropdown summaries, active link indicator bars (`border-bottom: 2px solid var(--brand-accent)`), GitHub link, and prominent primary CTA.

### 2. Sticky Side Menu (Desktop & Mobile)
- **Side Menu Component**: Reusable `StickySideMenu.astro` component displaying section links (`1. Visual Features`, `2. How It Works`, `3. Built for Frappe`, `4. Comparisons`, `5. FAQ`).
- **Collapsible Toggle**: Toggle button allowing instant collapse and expansion of the side menu on both desktop and mobile screens.
- **Intersection Highlight**: Highlights active section in the side menu automatically as the user scrolls.

### 3. Typography & Hierarchy
- **Typeface**: Utilizes clean, high-legibility Inter sans-serif typeface matching Frappe's clean editorial presentation.
- **Headings & Scale**: Implemented negative letter-spacing (`letter-spacing: -0.065em`) and tight line-heights (`1.02` to `1.08`) on major display headings (`h1`, `h2`), matching the prominent headline styling of the reference site.
- **Section Kickers**: Retained uppercase kicker tags (`letter-spacing: .12em`, `font-size: 10px`) in subtle grey above primary section headings.

### 4. Layout, Cards & Section Rhythm
- **Container**: Increased container width to `1240px` with responsive clamp padding (`clamp(36px, 7vw, 96px)`).
- **Hero Grid**: Balanced two-column hero layout featuring pill badges, bold primary heading, action CTA buttons, and interactive visual workflow builder preview.
- **Feature Cards**: Clean, single-pixel subtle borders (`#e7e7e4`), subtle background elevation on hover (`translateY(-3px)`), and card grid layouts.
- **Process Steps**: Numbered vertical step list with sticky left copy column and step icon badges.

### 5. Interactive Components
- **FAQ Accordions**: Native details/summary accordion items matching Frappe's FAQ styling, with smooth rotational chevron indicators and subtle borders.
- **Dark/Light Theme Toggle**: Full light and dark mode palette support with custom design tokens (`--page-bg`, `--surface`, `--surface-soft`, `--text-primary`, `--text-secondary`, `--border-subtle`).
- **Mobile Navigation Drawer**: Responsive slide-down navigation drawer with full backdrop overlay for viewports `< 1024px`.

### 6. Footer & CTA
- **Final CTA**: High-contrast dark CTA banner (`background: #171717`) with bold headline, clean description, and light CTA buttons.
- **Footer**: Multi-column structure with brand summary, resource links, copyright, and ecosystem references.
