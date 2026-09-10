# Mundo Exótico - Arquitectura Técnica

## Visión General

**Mundo Exótico** es un marketplace latinoamericano especializado en reptiles, animales exóticos, alimento vivo, terrarios y accesorios. La arquitectura está diseñada para ser escalable, segura, moderna y preparada para crecer de 5 a 20+ países con miles de vendedores.

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **UI Components**: Componentes custom + shadcn/ui
- **Estado**: React Context + TanStack Query (React Query)
- **Autenticación Cliente**: NextAuth.js
- **Validación**: Zod
- **Iconos**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes + middleware
- **Base de Datos**: PostgreSQL 15+
- **ORM**: Prisma
- **Autenticación**: NextAuth.js + JWT
- **Validación**: Zod
- **Seguridad**: bcryptjs, helmet, rate-limiting

### Infraestructura
- **Hosting**: Vercel (Frontend + Backend)
- **Database**: Supabase / AWS RDS (PostgreSQL)
- **Storage**: Supabase Storage / AWS S3 (imágenes)
- **Email**: Resend / SendGrid
- **Pagos**: Stripe Connect / Mercado Pago (estructura lista, no implementada)

## Estructura de Carpetas

```
mundo-exotico/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Rutas de autenticación (layout group)
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (marketplace)/            # Rutas del marketplace (layout group)
│   │   ├── page.tsx             # Página principal
│   │   ├── search/              # Búsqueda y filtros
│   │   ├── [country]/           # Rutas dinámicas por país
│   │   ├── listings/            # Detalle de publicaciones
│   │   ├── stores/              # Tiendas de vendedores
│   │   └── favorites/           # Favoritos del usuario
│   ├── (dashboard)/             # Dashboard del vendedor/admin
│   │   ├── seller/
│   │   ├── admin/
│   │   └── profile/
│   ├── api/                     # API Routes
│   │   ├── auth/
│   │   ├── users/
│   │   ├── sellers/
│   │   ├── listings/
│   │   ├── stores/
│   │   ├── search/
│   │   ├── favorites/
│   │   ├── reviews/
│   │   ├── messages/
│   │   ├── payments/
│   │   ├── admin/
│   │   └── reports/
│   ├── layout.tsx
│   └── globals.css
├── components/                  # Componentes React reutilizables
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── marketplace/
│   │   ├── ListingCard.tsx
│   │   ├── ListingGrid.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SearchBar.tsx
│   │   └── CategorySelector.tsx
│   ├── listing/
│   │   ├── ListingDetail.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── SellerInfo.tsx
│   │   └── ReviewsList.tsx
│   ├── store/
│   │   ├── StoreHeader.tsx
│   │   ├── StoreNav.tsx
│   │   └── StoreSettings.tsx
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx
│   │   ├── SellerStats.tsx
│   │   └── ListingForm.tsx
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── UserManagement.tsx
│   │   ├── ListingApproval.tsx
│   │   └── ReportManagement.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── Toast.tsx
├── lib/                         # Utilidades y helpers
│   ├── auth.ts                 # Configuración NextAuth
│   ├── db.ts                   # Cliente Prisma
│   ├── validation/             # Esquemas Zod
│   │   ├── user.ts
│   │   ├── listing.ts
│   │   ├── seller.ts
│   │   └── payment.ts
│   ├── api/                    # Helpers para API
│   │   ├── response.ts
│   │   └── error-handler.ts
│   ├── constants/              # Constantes de app
│   │   ├── countries.ts
│   │   ├── categories.ts
│   │   └── currencies.ts
│   └── utils/                  # Funciones útiles
│       ├── formatting.ts
│       ├── calculations.ts
│       └── search.ts
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   └── migrations/            # Migraciones de Prisma
├── public/                     # Archivos estáticos
│   ├── images/
│   ├── icons/
│   └── logos/
├── styles/                     # Estilos globales y config
│   └── globals.css
├── types/                      # Tipos TypeScript compartidos
│   ├── index.ts
│   ├── user.ts
│   ├── listing.ts
│   ├── seller.ts
│   └── api.ts
├── .env.example
├── .env.local                 # Variables de entorno (no versionar)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── README.md
└── ARCHITECTURE.md            # Este archivo

```

## Esquema de Base de Datos

### Entidades Principales

```
Users (Usuarios)
├── id (PK)
├── email (UNIQUE)
├── username (UNIQUE)
├── password (hashed)
├── firstName, lastName
├── profileImage
├── country (FK → Countries)
├── city
├── role (USER, SELLER, ADMIN)
├── createdAt, updatedAt
├── emailVerified
└── status (ACTIVE, SUSPENDED, DELETED)

Sellers (Vendedores)
├── id (PK)
├── userId (FK → Users, UNIQUE)
├── storeName
├── storeSlug (UNIQUE)
├── storeDescription
├── storeImage, storeBanner, storeLogo
├── country (FK → Countries)
├── city
├── state/department
├── status (ACTIVE, SUSPENDED, BANNED)
├── verificationStatus (UNVERIFIED, VERIFIED, REJECTED)
├── rating (DECIMAL)
├── totalSales
├── responseRate
├── customBranding (JSON)
├── socialLinks (JSON)
└── createdAt, updatedAt

Countries (Países)
├── id (PK)
├── code (MX, CO, VE, EC, PE, etc.)
├── name (México, Colombia, etc.)
├── currency (MXN, COP, USD, PEN)
├── isActive
└── orderIndex

Categories (Categorías)
├── id (PK)
├── name (Reptiles, Anfibios, etc.)
├── slug
├── icon
├── description
├── parentId (FK → Categories, nullable - para subcategorías)
└── isActive

Species (Especies)
├── id (PK)
├── categoryId (FK → Categories)
├── scientificName
├── commonName (en varios idiomas)
├── description
├── icon
└── isActive

SpeciesCountryRestrictions
├── id (PK)
├── speciesId (FK → Species)
├── countryId (FK → Countries)
├── status (ALLOWED, RESTRICTED, PROHIBITED)
└── notes

Listings (Publicaciones)
├── id (PK)
├── sellerId (FK → Sellers)
├── categoryId (FK → Categories)
├── speciesId (FK → Species, nullable - para productos)
├── title
├── description
├── price
├── currency (FK → Countries.currency)
├── country (FK → Countries)
├── city
├── status (ACTIVE, RESERVED, SOLD, WITHDRAWN, INACTIVE)
├── listingType (ANIMAL, PRODUCT, SERVICE)
├── createdAt, updatedAt
├── expiresAt
├── viewCount
└── isFeatured

ListingDetails (Detalles de Publicación)
├── id (PK)
├── listingId (FK → Listings)
├── fieldName (sex, morph, genetics, age, weight, size, etc.)
├── fieldValue (JSONB para flexibilidad)
└── displayOrder

ListingImages (Imágenes de Publicación)
├── id (PK)
├── listingId (FK → Listings)
├── imageUrl
├── thumbUrl
├── uploadedAt
├── orderIndex
└── isPrimary

Favorites (Favoritos)
├── id (PK)
├── userId (FK → Users)
├── listingId (FK → Listings, nullable)
├── sellerId (FK → Sellers, nullable)
├── favoriteType (LISTING, SELLER)
└── createdAt

Reviews (Reseñas)
├── id (PK)
├── orderId (FK → Orders)
├── buyerId (FK → Users)
├── sellerId (FK → Sellers)
├── rating (1-5)
├── comment
├── createdAt
├── status (ACTIVE, HIDDEN, REMOVED)
└── reportCount

Orders (Órdenes/Transacciones)
├── id (PK)
├── buyerId (FK → Users)
├── sellerId (FK → Sellers)
├── listingId (FK → Listings)
├── quantity
├── totalPrice
├── commission (5% por ejemplo)
├── sellerEarnings
├── status (PENDING, PAID, PROCESSING, DELIVERED, COMPLETED, CANCELLED)
├── paymentMethod (CARD, MERCADO_PAGO, etc.)
├── paymentStatus (PENDING, COMPLETED, FAILED, REFUNDED)
├── shippingAddress (JSONB)
├── trackingNumber
├── createdAt, updatedAt
└── completedAt

Messages (Mensajes)
├── id (PK)
├── conversationId (FK → Conversations)
├── senderId (FK → Users)
├── content
├── imageUrl (nullable)
├── relatedListingId (FK → Listings, nullable)
├── createdAt
└── isRead

Conversations (Conversaciones)
├── id (PK)
├── buyerId (FK → Users)
├── sellerId (FK → Users)
├── listingId (FK → Listings, nullable)
├── lastMessageAt
├── createdAt
└── status (ACTIVE, ARCHIVED, BLOCKED)

Reports (Reportes)
├── id (PK)
├── reporterId (FK → Users)
├── targetType (LISTING, USER, SELLER, MESSAGE, REVIEW)
├── targetId
├── reason (SCAM, ILLEGAL_ANIMAL, FALSE_INFO, INAPPROPRIATE, BANNED_PRODUCT, OTHER)
├── description
├── status (OPEN, IN_REVIEW, RESOLVED, REJECTED)
├── resolution
├── createdAt, updatedAt
└── reviewedById (FK → Users, nullable)

Notifications (Notificaciones)
├── id (PK)
├── userId (FK → Users)
├── type (MESSAGE, NEW_REVIEW, LISTING_SOLD, LISTING_EXPIRED, etc.)
├── title
├── message
├── relatedId (UUID - puede ser listingId, orderId, messageId, etc.)
├── isRead
├── createdAt
└── expiresAt

AdminSettings (Configuración del Sistema)
├── id (PK)
├── key (COMMISSION_RATE, PLATFORM_FEE, MIN_SELLER_RATING, etc.)
├── value (JSONB)
├── updatedAt
└── updatedBy (FK → Users)

```

## Flujos Principales

### 1. Registro y Autenticación
```
Usuario → Register → Email Verification → Login → JWT Session
```

### 2. Convertirse en Vendedor
```
Usuario → Solicitud de vendedor → Email de confirmación → Setup tienda → Verificación manual
```

### 3. Crear Publicación
```
Vendedor → Seleccionar categoría → Llenar detalles → Subir imágenes → Revisar → Publicar → (Esperar aprobación si es animal)
```

### 4. Comprar
```
Comprador → Buscar → Filtrar → Abrir publicación → Contactar → Pagar (estructura lista) → Entrega → Reseña
```

### 5. Moderación
```
Usuario reporta → Admin revisa → Toma acción → Notifica usuario
```

## Características de Seguridad

- ✅ Contraseñas hasheadas con bcryptjs
- ✅ Autenticación JWT con NextAuth.js
- ✅ Rate limiting en APIs
- ✅ CSRF protection
- ✅ SQL Injection prevention (Prisma ORM)
- ✅ XSS protection
- ✅ Validación en cliente y servidor (Zod)
- ✅ Permisos basados en roles (RBAC)
- ✅ No almacenar datos sensibles de tarjetas
- ✅ Auditoría de acciones administrativas

## Escalabilidad

- ✅ Base de datos normalizada
- ✅ Índices en campos de búsqueda frecuente
- ✅ Paginación en listados
- ✅ Caché con React Query
- ✅ Imágenes optimizadas (next/image)
- ✅ API responses paginadas
- ✅ Preparada para múltiples países
- ✅ Preparada para múltiples monedas
- ✅ Arquitectura modular

## Próximos Pasos

1. Crear `package.json` y dependencias
2. Configurar Next.js, Tailwind, TypeScript
3. Crear esquema Prisma
4. Configurar autenticación NextAuth.js
5. Crear componentes base
6. Implementar APIs
7. Integrar base de datos
8. Crear datos de demostración

