# Shipfex Web 🎨

Modern React + TypeScript frontend for Shipfex Logistics Management System. Built with Vite, Tailwind CSS, and React Router.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Make sure backend is running (http://localhost:3000)

# 3. Start dev server
npm run dev
```

✅ Expected output:
```
  VITE v7.2.4  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

Then open http://localhost:5173 in your browser.

### Default Login
- **Email**: admin@shipfex.com
- **Password**: admin123

Notes:
- The backend seeds this SUPERADMIN automatically in debug/dev runs.
- Override with `DEV_SUPERADMIN_EMAIL` / `DEV_SUPERADMIN_PASSWORD`.
- Disable with `DEV_SEED_SUPERADMIN=0`.

## Available Scripts

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run lint     # Check code with ESLint
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── main.tsx              → React entry point
├── App.tsx               → Router configuration
├── index.css             → Global styles
├── App.css               → App-specific styles
│
├── pages/
│   ├── Login.tsx         → Authentication page
│   ├── Inventory.tsx     → Product management
│   ├── Orders.tsx        → Order management
│   └── Tracking.tsx      → Order tracking
│
├── layouts/
│   └── DashboardLayout.tsx → Main layout with sidebar
│
├── components/
│   └── Sidebar.tsx       → Navigation sidebar
│
└── services/
    └── api.ts            → Centralized API client
```

## Key Features

✨ **Authentication**
- Simple login/logout
- localStorage persistence
- Protected routes

📦 **Inventory Management**
- CRUD operations for products
- Inline stock editing
- SKU management
- Delete with cascade

📋 **Order Management**
- Create orders with stock validation
- Cancel orders with automatic stock refund
- Real-time order status
- Customer tracking

🎯 **Tracking**
- Dynamic order lookup by ID
- Order status visualization

## Tech Stack

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite 7**: Fast build tool
- **React Router 7**: Client-side routing
- **Tailwind CSS 3**: Utility-first styling
- **Lucide React**: Icon library
- **ESLint**: Code quality

## Environment Setup

Create `.env.local`:
```
VITE_API_URL=http://localhost:3000
```

For production, update to your backend URL.

## Component Patterns

### Using the API Service

```typescript
import { api } from '@/services/api';

// Products
const products = await api.getProducts();
await api.createProduct({ name, sku, stock });
await api.deleteProduct(id);
await api.updateStock(id, amount);

// Orders
const orders = await api.getOrders();
await api.createOrder({ customer, product_id, quantity });
await api.deleteOrder(id);
```

### Error Handling

```typescript
try {
  const result = await api.someAction();
} catch (err) {
  const error = err as ApiError;
  console.error(error.message);
}
```

## Styling

Uses Tailwind CSS utilities. Key classes:
- `container mx-auto p-4` → Centered content
- `bg-blue-500 text-white` → Colors
- `flex justify-between items-center` → Layout
- `hover:bg-blue-600 transition` → Interactions

## Common Issues

**"Failed to fetch from backend"**
→ Make sure backend is running on http://localhost:3000

**"Module not found"**
→ Run `npm install` and restart dev server

**"Types not working correctly"**
→ Run `npm run lint` to check TypeScript errors

**".env.local not being read"**
→ Restart dev server after creating/modifying `.env.local`

## Performance Tips

- Components are code-split by route (automatic with Vite)
- Use lazy loading for images
- Memoize expensive computations with `useMemo`
- Debounce API calls if needed

## Development Workflow

1. **Create component** in pages/ or components/
2. **Add types** at the top of component file
3. **Use API service** from services/api.ts
4. **Style** with Tailwind CSS
5. **Test** in browser with devtools

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Debugging

### React DevTools
Install Chrome extension: React Developer Tools

### Network Debugging
- Open DevTools (F12)
- Go to Network tab
- Make API calls to see requests/responses

### LocalStorage
```javascript
// In console
localStorage.getItem('isAuthenticated')
localStorage.removeItem('isAuthenticated')
```

## Deployment

### Production Build
```bash
npm run build    # Creates dist/ folder
npm run preview  # Test production build locally
```

### Environment for Deployment
```env
VITE_API_URL=https://your-api.com
```

Then deploy `dist/` folder to any static hosting (Vercel, Netlify, etc).

## Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Update types when changing data structures
4. Test all features in browser

## License

MIT

---

**Built with ❤️ in React + TypeScript**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
