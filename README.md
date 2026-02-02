# 🛒 Product Listing Dashboard (React + Zustand)

A modern, responsive product listing dashboard built with **React 18**, **TypeScript**, **Zustand**, and **Tailwind CSS v4**.  
The application demonstrates clean architecture, scalable state management, and real-world UX patterns aligned with the assignment requirements.

---

## ✨ Features

### Core Functionality
- Product listing with **Grid / List** views
- **Search** with debounce
- **Sorting** (price, rating, title)
- **Pagination**
- Fully **responsive** layout (mobile, tablet, desktop)

### Filters
- Category (checkbox-based)
- Brand (checkbox-based)
- Price range
- Rating
- Stock status
- Clear all filters

> Category and Brand filters show the **top N most frequent options**, derived dynamically from product data to improve usability and avoid clutter.

### Advanced UX
- **Sticky filter sidebar** on desktop
- **Slide-in filter panel** on mobile
- Fixed filter header and footer with **conditional inner scrolling**
- **Skeleton loaders** during data fetch
- **Lazy-loaded images** using `IntersectionObserver`
- **Product detail modal**
- **Comparison drawer** (up to 3 products)
- Favorites support

### Accessibility & Polish
- Keyboard navigation (ESC to close modals/drawers)
- Focus-visible styles for interactive elements
- Subtle hover and focus effects for all CTAs
- No layout shift or double-scroll issues

---

## 🧱 Architecture

The project follows a **modular, feature-based component structure** to ensure scalability and maintainability.

components/
├── Header/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── ViewToggle.tsx
│   └── CompareButton.tsx
├── FilterPanel/
│   ├── FilterPanel.tsx
│   ├── CategoryFilter.tsx
│   ├── BrandFilter.tsx
│   ├── PriceRangeFilter.tsx
│   ├── RatingFilter.tsx
│   └── StockFilter.tsx
├── ProductGrid/
│   ├── ProductGrid.tsx
│   ├── ProductCard.tsx
│   └── ResultsHeader.tsx
├── ProductModal/
│   └── ProductModal.tsx
└── ComparisonDrawer/
    └── ComparisonDrawer.tsx

### Key Architectural Decisions
- **Zustand** is used for global state (products, filters, favorites, compare list)
- UI state (drawer open/close, view mode) is kept **local**, not in the store
- Components are split by **single responsibility**
- Derived data (filters, top brands/categories) is computed using `useMemo`
- No routing is used, as per assignment scope

---

## 🎨 Styling

- **Tailwind CSS v4**
- Design tokens implemented using **CSS variables**
- No hardcoded colors
- Consistent spacing, typography, and interaction states

---

## ⚙️ Tech Stack

- **React 18**
- **TypeScript**
- **Zustand**
- **Tailwind CSS v4**
- Vite
- DummyJSON API (for product data)

---

## 🚀 Getting Started

Install dependencies:

npm install

Run development server:

npm run dev

The app will be available at http://localhost:5173.

---

## 🧠 Notable UX Decisions

- **Top brands/categories only**: Improves scanability and avoids overwhelming users.
- **Comparison as a drawer** instead of a modal: Better usability and continuity.
- **Conditional scrolling** in filter panel: Scroll appears only when content overflows.
- **Checkbox-based filters**: Matches assignment documentation and common e-commerce patterns.

---

## ✅ Assignment Alignment

- Matches all functional requirements
- Follows documented UI expectations
- Clean, scalable architecture
- Production-grade UX and accessibility considerations

---

## 📌 Possible Enhancements (Out of Scope)

- Dark mode
- Persisted filters/favorites
- Server-side pagination
- Routing for product detail pages

---

## 👤 Author

Yash Maheshwari
