# Page Workflows

## 1. Home Page (`/`)

**Route:** `/`
**File:** `app/page.tsx`
**Type:** Server Component

```
User visits /
    └── Renders hero section with "Shop Now" and "Login" buttons
        ├── Click "Shop Now" → navigates to /products
        └── Click "Login" → navigates to /login
```

**No API calls.** Static landing page.

---

## 2. Login Page (`/login`)

**Route:** `/login`
**Files:** `app/login/page.tsx` → `components/auth/LoginForm.tsx`
**Type:** Client Component

```
User visits /login
    ├── Check: isAuthenticated?
    │   └── Yes → redirect to /products
    └── No → render LoginForm
        ├── User fills email + password
        ├── Click "Login" → POST /auth/login
        │   ├── auth.service.ts → lib/api.ts → fetch("http://localhost:3001/auth/login")
        │   ├── Backend: AuthController.login() → AuthService.login()
        │   │   ├── Finds user by email (Prisma)
        │   │   ├── Compares password (bcrypt)
        │   │   ├── Signs JWT (JwtService)
        │   │   └── Returns { message, access_token, user }
        │   └── Frontend receives AuthResponse
        │       ├── authLogin(result.access_token) → stores token in localStorage + sets AuthContext
        │       └── router.push("/products")
        └── On error → alert(error.message)
```

**Backend endpoints:**
- `POST /auth/login` → `LoginDto` → `LoginResponseDto`

---

## 3. Signup Page (`/signup`)

**Route:** `/signup`
**Files:** `app/signup/page.tsx` → `components/auth/SignupForm.tsx`
**Type:** Client Component

```
User visits /signup
    ├── Check: isAuthenticated?
    │   └── Yes → redirect to /products
    └── No → render SignupForm
        ├── User fills name, email, password, confirmPassword
        ├── Click "Sign Up" → validates password match
        │   ├── POST /auth/signup
        │   │   ├── auth.service.ts → lib/api.ts → fetch("http://localhost:3001/auth/signup")
        │   │   ├── Backend: AuthController.signup() → AuthService.signup()
        │   │   │   ├── Checks if email exists (Prisma)
        │   │   │   ├── Hashes password (bcrypt)
        │   │   │   ├── Creates user (Prisma)
        │   │   │   └── Returns { message, user }
        │   │   └── Frontend receives SignupResponse
        │   └── alert("Account created successfully! Please login.")
        │       └── router.push("/login")
        └── On error → alert(error.message)
```

**Backend endpoints:**
- `POST /auth/signup` → `SignupDto` → `SignupResponseDto`

---

## 4. Products Page (`/products`)

**Route:** `/products`
**File:** `app/products/page.tsx`
**Type:** Client Component

```
User visits /products
    └── useProducts() hook
        ├── useEffect → GET /products
        │   ├── product.service.ts → lib/api.ts → fetch("http://localhost:3001/products")
        │   ├── Backend: ProductsController.findAll() → ProductsService.findAll()
        │   │   └── Returns Product[] (Prisma)
        │   └── Frontend receives Product[]
        ├── useSearch() → debounced search (500ms)
        │   └── filters products by title matching search string
        └── Render:
            ├── Spinner while loading
            ├── ErrorMessage if error
            └── ProductGrid with filtered products
                └── ProductCard for each product
                    ├── Click "View Details" → /products/:id
                    └── Click "Add To Cart" → POST /carts/add
```

**Backend endpoints:**
- `GET /products` → `Product[]`
- `GET /products/search?q=...` → `Product[]`

---

## 5. Product Detail Page (`/products/[id]`)

**Route:** `/products/:id`
**File:** `app/products/[id]/page.tsx`
**Type:** Client Component

```
User visits /products/:id
    └── useProduct(id) hook
        ├── useEffect → GET /products/:id
        │   ├── product.service.ts → lib/api.ts → fetch("http://localhost:3001/products/:id")
        │   ├── Backend: ProductsController.findOne() → ProductsService.findOne()
        │   │   └── Returns Product (Prisma, throws NotFoundException if not found)
        │   └── Frontend receives Product
        └── Render:
            ├── Spinner while loading
            ├── ErrorMessage if error
            └── Product detail
                ├── Thumbnail + images gallery
                ├── Brand, title, category
                ├── Price, discount percentage, rating
                ├── Description
                ├── Stock info
                └── "Add To Cart" button → POST /carts/add
```

**Backend endpoints:**
- `GET /products/:id` → `Product`

---

## 6. Cart Page (`/cart`)

**Route:** `/cart`
**Files:** `app/cart/page.tsx` → `components/cart/CartItemCard.tsx`
**Type:** Client Component (AuthGuard)

```
User visits /cart
    └── AuthGuard checks isAuthenticated
        ├── No → redirect to /login
        └── Yes → useCart() hook
            ├── GET /carts (parallel with GET /carts/total)
            │   ├── cart.service.ts → lib/api.ts → fetch("http://localhost:3001/carts")
            │   ├── Backend: CartsController.getCart() → CartsService.getCart()
            │   │   └── Returns Cart with items + products (Prisma, includes product)
            │   └── Frontend receives Cart
            └── Render:
                ├── Spinner while loading
                ├── Empty cart message if no items
                ├── CartItemCard for each item
                │   ├── Click "-" → PATCH /carts/decrease/:id → refresh()
                │   ├── Click "+" → PATCH /carts/increase/:id → refresh()
                │   └── Click "Remove" → DELETE /carts/:id → refresh()
                ├── Total display
                └── "Place Order" button → POST /orders/place
                    ├── Backend: OrdersController.placeOrder() → OrdersService.placeOrder()
                    │   ├── Gets cart with items
                    │   ├── Calculates total
                    │   ├── Creates Order (Prisma)
                    │   ├── Creates OrderItems (Prisma)
                    │   ├── Clears cart items (Prisma)
                    │   └── Returns { message, order }
                    └── router.push("/orders")
```

**Backend endpoints:**
- `GET /carts` → `Cart` (with items + products)
- `GET /carts/total` → `number`
- `POST /carts/add` → `CartItem`
- `PATCH /carts/increase/:id` → `CartItem`
- `PATCH /carts/decrease/:id` → `CartItem`
- `DELETE /carts/:id` → `CartItem`
- `DELETE /carts` → clears cart
- `POST /orders/place` → `PlaceOrderResponse`

---

## 7. Orders Page (`/orders`)

**Route:** `/orders`
**Files:** `app/orders/page.tsx` → `components/order/OrderCard.tsx`
**Type:** Client Component (AuthGuard)

```
User visits /orders
    └── AuthGuard checks isAuthenticated
        ├── No → redirect to /login
        └── Yes → useOrders() hook
            ├── useEffect → GET /orders
            │   ├── order.service.ts → lib/api.ts → fetch("http://localhost:3001/orders")
            │   ├── Backend: OrdersController.getOrders() → OrdersService.getOrders()
            │   │   └── Returns Order[] with orderItems + products (Prisma, includes product)
            │   └── Frontend receives Order[]
            └── Render:
                ├── Spinner while loading
                ├── ErrorMessage if error
                ├── Empty state if no orders
                └── OrderCard for each order
                    ├── Order header (id, date, status badge, total)
                    └── Order items (thumbnail, title, qty × price, line total)
```

**Backend endpoints:**
- `GET /orders` → `Order[]` (with orderItems + products)

---

## 8. Profile Page (`/profile`)

**Route:** `/profile`
**Files:** `app/profile/page.tsx` → `components/profile/ProfileForm.tsx`
**Type:** Client Component (AuthGuard)

```
User visits /profile
    └── AuthGuard checks isAuthenticated
        ├── No → redirect to /login
        └── Yes → useProfile() hook
            ├── useEffect → GET /users/profile
            │   ├── user.service.ts → lib/api.ts → fetch("http://localhost:3001/users/profile")
            │   ├── Backend: UsersController.getProfile() → UsersService.getProfile()
            │   │   └── Returns User (Prisma, selects id/name/email/createdAt/updatedAt)
            │   └── Frontend receives User
            └── Render:
                ├── Spinner while loading
                ├── ErrorMessage if error
                └── ProfileForm
                    ├── View mode: avatar, name, email, member since, edit/delete buttons
                    └── Edit mode:
                        ├── Change name, email, password
                        ├── Click "Save Changes" → PATCH /users/profile
                        │   ├── Backend: UsersController.updateProfile() → UsersService.updateProfile()
                        │   │   └── Returns updated User
                        │   └── onProfileUpdate(updated) → updates local state
                        └── Click "Delete Account" → DELETE /users/profile
                            ├── Backend: UsersController.deleteProfile() → UsersService.deleteProfile()
                            │   └── Returns { message }
                            └── logout() → router.push("/")
```

**Backend endpoints:**
- `GET /users/profile` → `UserProfileDto`
- `PATCH /users/profile` → `UserProfileDto`
- `DELETE /users/profile` → `DeleteProfileResponseDto`

---

## 9. Layout (All Pages)

**File:** `app/layout.tsx`
**Type:** Server Component

```
Root Layout
    ├── Geist fonts loaded
    ├── Metadata: title "ShopEase", description
    └── Body
        ├── AuthProvider
        │   └── AuthContext: token, isAuthenticated, login(), logout()
        ├── SearchProvider
        │   └── SearchContext: search, setSearch()
        ├── Navbar (sticky)
        │   ├── Hamburger → opens Sidebar
        │   ├── Brand "ShopEase" → /
        │   ├── SearchBar → SearchContext
        │   └── Links: Products, Cart, Orders, Profile/Logout or Login
        ├── {children} → page content
        └── Footer
```

---

## API Flow Summary

```
Frontend                          Backend                         Database
───────                           ───────                         ────────
auth.service.ts ──────► /auth/* ──────► AuthService ──────► Prisma ──────► PostgreSQL
product.service.ts ────► /products/* ──► ProductsService ──► Prisma ──────► PostgreSQL
cart.service.ts ───────► /carts/* ─────► CartsService ─────► Prisma ──────► PostgreSQL
order.service.ts ──────► /orders/* ────► OrdersService ────► Prisma ──────► PostgreSQL
user.service.ts ───────► /users/* ─────► UsersService ─────► Prisma ──────► PostgreSQL
```

All frontend requests go through `lib/api.ts` `fetchAPI<T>()` which:
1. Prepends `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`)
2. Adds `Authorization: Bearer <token>` header from localStorage
3. Parses JSON response
4. Throws error if `response.ok` is false
