# Pecode Pet Project 

This is a learning-oriented pet project built to practice working with the Next.js App Router, TanStack Query / Table, Material UI, internal API routes, and integrations with multiple external APIs.

## 🚀 Tech Stack

- **Next.js** (App Router) + **TypeScript**
- **Material UI** (MUI)
- **TanStack Query** (React Query)
- **TanStack Table**
- **Zustand** (state store)
- **Fetch API**
- **Recharts** (data visualization)
- **Maplibre** (interactive maps)
- **React Hook Form**

## 🌐 External APIs Used

### 🟡 Products

```
https://api.escuelajs.co/api/v1
```

**Internal API routes** are used for:
- filtering
- sorting
- search
- data preprocessing on backend side

### 🟢 Weather

- **Open-Meteo Forecast API** (weather data)
- **Nominatim** (location search + reverse geocoding)
- Internal `/api/weather` route for generating **AI-based "weather advice"** based on current conditions

## 📂 Project Folder Structure

```
src/
 ├─ app/
 │   ├─ about/
 │   │   └─ page.tsx
 │   │
 │   ├─ products/
 │   │   ├─ page.tsx              # Products list (cards + table)
 │   │   └─ [id]/
 │   │       └─ page.tsx          # Dynamic product details route
 │   │
 │   ├─ weather/
 │   │   └─ page.tsx              # Weather dashboard
 │   │
 │   └─ api/
 │       ├─ products/
 │       │   └─ route.ts          # Filtering / sorting / searching
 │       └─ weather/
 │           └─ route.ts          # Weather advice generation
 │
 ├─ components/
 │   ├─ home-page/
 │   ├─ about-page/
 │   ├─ products-page/
 │   ├─ product-details-page/
 │   ├─ weather-page/
 │   └─ shared/
 │
 ├─ hooks/
 │   ├─ auth/
 │   ├─ products/
 │   ├─ categories/
 │   ├─ ui/
 │   ├─ tanstackTable/
 │   └─ weather/
 │
 ├─ lib/
 │   ├─ api/
 │   ├─ graphql/
 │   └─ utils/
 │
 ├─ providers/
 │   ├─ EmotionRegistry.tsx
 │   └─ TanstackProvider.tsx
 │
 ├─ store/
 │   ├─ products/
 │   │   ├─ alertSlice.ts
 │   │   ├─ filtersSlice.ts
 │   │   ├─ tableSlice.ts
 │   │   └─ uiSlice.ts
 │   └─ weather/
 │
 ├─ styles/
 │   └─ theme.ts
 │
 └─ types/
     ├─ product.ts
     ├─ weather.ts
     └─ api.ts
```

## 🗂 Pages Overview

### 🏠 Home (Auth)

- Login / registration form
- If the user is authenticated — Logout button is displayed
- Role-based functionality

### 🛍 Products Page

Supports two view modes:
- **Card view**
- **Table view** (TanStack Table)

**Features:**
- Filtering by price / rating / categories
- Global + table sorting
- Debounced search
- Sidebar filters panel
- Pinned columns
- Drag & drop column ordering
- Column visibility / resize
- Row selection

**CRUD:**
- Delete / Create / Update products or categories (only for admin role)

### 📦 Product Details

- Detailed info about the product
- Update button + form for updating the product (for admin)

### 🌤 Weather Page

**Current Weather:**
- Location autodetection
- UI for current weather
- AI weather advice

**Location Picker:**
- History of locations
- Map (Maplibre)
- Search location with Nominatim
- Country Dropdown (GraphQL)

**Weather Chart:**
- Metrics multi-select (hourly / daily)
- Chart (Recharts)

## 🧩 Providers

- **Emotion Registry** (MUI styles caching)
- **Theme Provider** (Material UI themes)
- **TanStack Query Provider** (server state management)
- **Global Layout wrapper**
- **Global Alerts component**

## 🧱 State Store / Slices (Zustand)

**Product Store:**
- `alertSlice` (global alert messages)
- `filtersSlice` (filters state)
- `tableSlice` (table state)
- `uiSlice` (sidebar, view mode)

**Weather Store:**
- Location state
- History of locations
- Country selection
- Weather metrics

## 🧰 Custom Hooks

- **Auth:** `useAuthForm`
- **Products / Categories:** queries + mutations
- **Filters ranges optimization**
- **Responsive UI / modal toggle**
- **Weather:** auto-location, search, queries
- **TanStack Table helpers:** drag, pinned, state management

## ▶️ Getting Started

**1. Install dependencies:**

```bash
npm install
# or
yarn install
```

**2. Run the development server:**

```bash
npm run dev
# or
yarn dev
```

**3. Open in browser:** http://localhost:3000
