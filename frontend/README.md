# NovaStore - Modern Ecommerce Frontend

A high-performance, aesthetically pleasing full-stack ecommerce frontend built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**, integrated with a 37-route Laravel Sanctum backend API.

---

## ⚡ Tech Stack

- **Framework**: Next.js 15 (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: Zustand (`auth.store`, `cart.store`, `notification.store`, `ui.store`)
- **Data Fetching & Cache**: TanStack React Query (`@tanstack/react-query`)
- **HTTP Client**: Axios with Bearer token interceptor and Sanctum CSRF support
- **Icons**: Lucide React

---

## 📁 Project Structure

```
ecommerce-frontend/
├── public/
│   ├── images/
│   │   ├── logo/logo.svg
│   │   ├── banners/hero-1.jpg, hero-2.jpg
│   │   ├── products/placeholder.png
│   │   └── icons/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx, globals.css
│   │   ├── (shop)/
│   │   │   ├── products/page.tsx, products/[slug]/page.tsx
│   │   │   ├── categories/page.tsx, categories/[id]/page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── notifications/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── admin/
│   │       ├── layout.tsx, page.tsx, dashboard/page.tsx
│   │       ├── products/page.tsx, products/create/page.tsx, products/[id]/edit/page.tsx
│   │       └── orders/page.tsx
│   ├── components/
│   │   ├── ui/ (button, input, modal, dialog, dropdown, badge, table, textarea, select, skeleton, loader)
│   │   ├── layout/ (Navbar, Footer, MobileMenu, Container, AppShell)
│   │   ├── products/ (ProductCard, ProductGrid, ProductDetails, ProductGallery, ProductPrice, ProductFilter, ProductSearch)
│   │   ├── categories/ (CategoryCard, CategoryGrid)
│   │   ├── cart/ (CartItem, CartList, CartSummary, QuantitySelector)
│   │   ├── checkout/ (CheckoutForm, ShippingForm, PaymentMethod, OrderSummary)
│   │   ├── orders/ (OrderCard, OrderList, OrderStatus)
│   │   ├── reviews/ (ReviewList, ReviewCard, ReviewForm)
│   │   ├── notifications/ (NotificationItem, NotificationDropdown)
│   │   ├── auth/ (LoginForm, RegisterForm)
│   │   └── admin/
│   │       ├── layout/ (AdminSidebar, AdminNavbar, AdminHeader)
│   │       ├── dashboard/ (StatsCard, RevenueChart, RecentOrders)
│   │       ├── products/ (ProductTable, ProductForm, CreateProductModal, DeleteProductDialog)
│   │       └── orders/ (AdminOrderTable, OrderStatusUpdate)
│   ├── services/
│   │   ├── api.ts, auth.service.ts, product.service.ts, category.service.ts
│   │   ├── cart.service.ts, order.service.ts, review.service.ts, notification.service.ts
│   │   └── admin/ (dashboard.service.ts, product.service.ts, order.service.ts)
│   ├── hooks/
│   │   ├── useAuth.ts, useProducts.ts, useProduct.ts, useCategories.ts
│   │   ├── useCart.ts, useOrders.ts, useNotifications.ts
│   │   └── admin/ (useDashboard.ts, useAdminProducts.ts, useAdminOrders.ts)
│   ├── store/
│   │   ├── auth.store.ts, cart.store.ts, notification.store.ts, ui.store.ts
│   ├── types/
│   ├── lib/
│   ├── providers/
│   └── middleware.ts
```

---

## 🔌 Laravel Backend API Integration (37 Endpoints)

| Endpoint | Method | Service Method | Description |
| :--- | :--- | :--- | :--- |
| `/api/login` | POST | `authService.login()` | Sanctum user authentication |
| `/api/register` | POST | `authService.register()` | Customer registration |
| `/api/logout` | POST | `authService.logout()` | Token revocation & logout |
| `/api/user` | GET | `authService.getUser()` | Authenticated user profile |
| `/sanctum/csrf-cookie` | GET | `initCsrfCookie()` | CSRF token initialization |
| `/api/products` | GET | `productService.getProducts()` | Catalog with filtering/search |
| `/api/products/{slug}` | GET | `productService.getProductBySlug()` | Product details by slug |
| `/api/products/{id}/summary` | GET | `productService.getProductSummary()` | Review rating breakdown |
| `/api/products/{id}/summary_v2` | GET | `productService.getProductSummaryV2()` | Enhanced metrics summary |
| `/api/categories` | GET | `categoryService.getCategories()` | Category list |
| `/api/categories/{id}` | GET | `categoryService.getCategory()` | Category details & products |
| `/api/cart` | GET | `cartService.getCart()` | Retrieve customer cart items |
| `/api/cart` | POST | `cartService.addToCart()` | Add product to cart |
| `/api/cart-items/{id}` | PUT | `cartService.updateCartItem()` | Update item quantity |
| `/api/cart-items/{id}` | DELETE | `cartService.removeCartItem()` | Remove cart item |
| `/api/checkout` | POST | `orderService.checkout()` | Create order & place checkout |
| `/api/orders` | GET | `orderService.getOrders()` | Customer order history |
| `/api/reviews` | POST | `reviewService.createReview()` | Submit product review & rating |
| `/api/notifications` | GET | `notificationService.getNotifications()`| User notifications stream |
| `/api/notifications/{id}/read` | POST | `notificationService.markAsRead()` | Mark individual notification read |
| `/api/notifications/mark-all-read`| POST | `notificationService.markAllAsRead()` | Mark all notifications read |
| `/api/notifications/{id}` | DELETE | `notificationService.deleteNotification()`| Delete notification |
| `/api/notifications/test` | POST | `notificationService.testNotification()` | Trigger test alert |
| `/api/admin/dashboard` | GET | `adminDashboardService.getDashboardStats()`| Admin metrics & revenue chart |
| `/api/admin/orders` | GET | `adminOrderService.getOrders()` | Admin order management |
| `/api/admin/orders/{id}` | PUT | `adminOrderService.updateOrderStatus()` | Change fulfillment status |
| `/api/admin/products` | GET | `adminProductService.getProducts()` | Admin product inventory table |
| `/api/admin/products` | POST | `adminProductService.createProduct()` | Create catalog product |
| `/api/admin/products/{id}` | GET | `adminProductService.getProduct()` | Single admin product detail |
| `/api/admin/products/{id}` | POST | `adminProductService.updateProduct()` | Multipart product update |
| `/api/admin/products/{id}` | DELETE | `adminProductService.deleteProduct()` | Delete product item |
| `/api/admin/products/{id}/toggle-status` | PATCH | `adminProductService.toggleProductStatus()`| Toggle active status |
| `/api/admin/debug/categories` | GET | `adminProductService.getDebugCategories()`| Debug category mapping |

---

## 🚀 Getting Started

### 1. Installation

```bash
cd ecommerce-frontend
npm install
```

### 2. Configure Environment

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_MOCK_FALLBACK=true
```

> **Zero-Config Resiliency**: If your Laravel backend is not running or has no seed data, `NEXT_PUBLIC_ENABLE_MOCK_FALLBACK=true` allows all cart, checkout, filter, review, and admin flows to function seamlessly with rich mock data!

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

- **Store**: `http://localhost:3000`
- **Catalog**: `http://localhost:3000/products`
- **Cart**: `http://localhost:3000/cart`
- **Checkout**: `http://localhost:3000/checkout`
- **Orders**: `http://localhost:3000/orders`
- **Notifications**: `http://localhost:3000/notifications`
- **Admin Hub**: `http://localhost:3000/admin`
