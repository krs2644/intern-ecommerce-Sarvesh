# Project Structure

## Backend

```
backend/
├── .env                                  # Environment variables (DATABASE_URL, JWT_SECRET)
├── .gitignore
├── .prettierrc
├── Dockerfile
├── README.md
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.build.json
│
├── prisma/
│   ├── schema.prisma                     # Database schema (User, Product, Cart, CartItem, Order, OrderItem)
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20260713140314_init/
│           └── migration.sql
│
├── test/
│   ├── app.e2e-spec.ts                   # End-to-end test
│   └── jest-e2e.json
│
└── src/
    ├── main.ts                           # App entry: CORS, ValidationPipe, Swagger setup
    ├── app.module.ts                     # Root module
    ├── app.controller.ts                 # Root controller (GET /)
    ├── app.controller.spec.ts
    ├── app.service.ts                    # Root service
    │
    ├── decorators/
    │   ├── index.ts                      # Barrel export
    │   ├── api-auth.decorator.ts         # @ApiAuth() — wraps @UseGuards(JwtAuthGuard)
    │   └── current-user.decorator.ts     # @CurrentUser() — extracts req.user
    │
    ├── prisma/
    │   ├── prisma.module.ts              # Global Prisma module
    │   ├── prisma.service.ts             # PrismaClient wrapper
    │   └── prisma.service.spec.ts
    │
    ├── auth/
    │   ├── auth.module.ts
    │   ├── auth.controller.ts            # POST /auth/signup, POST /auth/login
    │   ├── auth.controller.spec.ts
    │   ├── auth.service.ts               # signup(), login() with bcrypt + JWT
    │   ├── auth.service.spec.ts
    │   ├── jwt.strategy.ts               # Passport JWT strategy
    │   ├── jwt-auth.guard.ts             # AuthGuard('jwt')
    │   └── dto/
    │       ├── index.ts
    │       ├── signup.dto.ts             # SignupDto (name, email, password)
    │       ├── login.dto.ts              # LoginDto (email, password)
    │       └── auth-response.dto.ts      # SignupResponseDto, LoginResponseDto
    │
    ├── users/
    │   ├── users.module.ts
    │   ├── users.controller.ts           # GET/PATCH/DELETE /users/profile
    │   ├── users.controller.spec.ts
    │   ├── users.service.ts              # getProfile(), updateProfile(), deleteProfile()
    │   ├── users.service.spec.ts
    │   └── dto/
    │       ├── index.ts
    │       ├── update-profile.dto.ts     # UpdateProfileDto
    │       └── user-response.dto.ts      # UserProfileDto, DeleteProfileResponseDto
    │
    ├── products/
    │   ├── products.module.ts
    │   ├── products.controller.ts        # GET/POST /products, search, categories
    │   ├── products.controller.spec.ts
    │   ├── products.service.ts           # findAll(), findOne(), search(), getByCategory(), getCategories()
    │   ├── products.service.spec.ts
    │   ├── import-products.service.ts    # importProducts() — fetches from DummyJSON API
    │   └── dto/
    │       ├── index.ts
    │       ├── search-query.dto.ts       # SearchQueryDto (q)
    │       ├── import-products.dto.ts    # ImportProductsDto (empty)
    │       └── product-response.dto.ts   # ProductResponseDto, ImportProductsResponseDto
    │
    ├── carts/
    │   ├── carts.module.ts
    │   ├── carts.controller.ts           # GET/POST/DELETE /carts, increase/decrease quantity
    │   ├── carts.controller.spec.ts
    │   ├── carts.service.ts              # getCart(), addToCart(), increaseQuantity(), decreaseQuantity(), removeItem(), getTotal(), clearCart()
    │   ├── carts.service.spec.ts
    │   └── dto/
    │       ├── index.ts
    │       ├── add-to-cart.dto.ts        # AddToCartDto (productId, quantity?)
    │       └── cart-response.dto.ts      # CartResponseDto, CartItemResponseDto
    │
    └── orders/
        ├── orders.module.ts
        ├── orders.controller.ts          # POST /orders/place, GET /orders
        ├── orders.controller.spec.ts
        ├── orders.service.ts             # placeOrder(), getOrders()
        ├── orders.service.spec.ts
        └── dto/
            ├── index.ts
            └── order-response.dto.ts     # OrderResponseDto, OrderItemResponseDto, PlaceOrderResponseDto
```

---

## Frontend

```
frontend/
├── .env.local                            # NEXT_PUBLIC_API_URL=http://localhost:3001
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── Dockerfile
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts                        # Image domains for DummyJSON CDN
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
│
├── app/
│   ├── globals.css                       # Tailwind + glass-card/glass-input/primary-btn utilities
│   ├── favicon.ico
│   ├── layout.tsx                        # Root layout: AuthProvider > SearchProvider > Navbar > Footer
│   ├── page.tsx                          # Home page — hero section
│   │
│   ├── login/
│   │   └── page.tsx                      # Redirects if authenticated, wraps LoginForm
│   ├── signup/
│   │   └── page.tsx                      # Redirects if authenticated, wraps SignupForm
│   │
│   ├── products/
│   │   ├── page.tsx                      # Product listing with debounced search
│   │   └── [id]/
│   │       └── page.tsx                  # Product detail with images, price, add to cart
│   │
│   ├── cart/
│   │   └── page.tsx                      # Shopping cart with AuthGuard
│   ├── orders/
│   │   └── page.tsx                      # Order history with AuthGuard
│   └── profile/
│       └── page.tsx                      # User profile with AuthGuard
│
├── components/
│   ├── auth/
│   │   ├── AuthGuard.tsx                 # Redirects unauthenticated users to /login
│   │   ├── LoginForm.tsx                 # Email/password login form
│   │   └── SignupForm.tsx                # Name/email/password signup form
│   │
│   ├── layout/
│   │   ├── Navbar.tsx                    # Sticky navbar with SearchBar, auth links
│   │   ├── Sidebar.tsx                   # Slide-out navigation sidebar
│   │   └── Footer.tsx                    # Site footer
│   │
│   ├── product/
│   │   ├── ProductCard.tsx               # Single product card with add to cart
│   │   └── ProductGrid.tsx              # Responsive grid of ProductCards
│   │
│   ├── cart/
│   │   └── CartItemCard.tsx             # Cart item with quantity controls
│   ├── order/
│   │   └── OrderCard.tsx                # Order display with items and status
│   ├── profile/
│   │   └── ProfileForm.tsx              # Profile view/edit form
│   │
│   └── ui/
│       ├── Spinner.tsx                   # Loading spinner
│       ├── ErrorMessage.tsx              # Error display
│       ├── Toast.tsx                     # Toast notification
│       └── SearchBar.tsx                 # Search input connected to SearchContext
│
├── context/
│   ├── AuthContext.tsx                    # Auth state: token, isAuthenticated, login(), logout()
│   └── SearchContext.tsx                  # Global search string state
│
├── hooks/
│   ├── index.ts                          # Barrel export
│   ├── useProducts.ts                    # Fetch all products
│   ├── useProduct.ts                     # Fetch single product by id
│   ├── useCart.ts                        # Fetch cart + total, expose refresh()
│   ├── useOrders.ts                      # Fetch orders
│   └── useProfile.ts                     # Fetch profile, expose setProfile()
│
├── lib/
│   └── api.ts                            # fetchAPI<T>() helper + authHeaders()
│
├── services/
│   ├── auth.service.ts                   # signup(), login()
│   ├── product.service.ts                # getProducts(), getProduct(), searchProducts(), getCategories(), getProductsByCategory()
│   ├── cart.service.ts                   # getCart(), getCartTotal(), addToCart(), increaseQuantity(), decreaseQuantity(), removeItem(), clearCart()
│   ├── order.service.ts                  # placeOrder(), getOrders()
│   └── user.service.ts                   # getProfile(), updateProfile(), deleteProfile()
│
├── types/
│   ├── index.ts                          # Barrel export
│   ├── product.ts                        # Product interface
│   ├── user.ts                           # User interface
│   ├── cart.ts                           # Cart, CartItem interfaces
│   ├── order.ts                          # Order, OrderItem interfaces
│   └── auth.ts                           # SignupRequest, LoginRequest, AuthResponse, SignupResponse
│
└── public/
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

---

## Directory Summary

| Area | Directories | Files |
|---|---|---|
| Backend src | 8 modules + 6 dto subdirs + decorators | ~55 |
| Backend prisma | 1 migration | 3 |
| Backend test | 1 | 2 |
| Backend root | — | 10 |
| Frontend app | 6 page dirs + [id] | 11 |
| Frontend components | 7 groups | 15 |
| Frontend context | 1 | 2 |
| Frontend hooks | 1 | 6 |
| Frontend lib | 1 | 1 |
| Frontend services | 1 | 5 |
| Frontend types | 1 | 6 |
| Frontend root | — | 12 |
| **Total** | | **~129** |
