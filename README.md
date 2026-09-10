# Mundo Exótico - Marketplace de Animales Exóticos

![Mundo Exótico](https://img.shields.io/badge/status-in%20development-yellow) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Prisma](https://img.shields.io/badge/Prisma-5-black)

## 📖 Descripción

Mundo Exótico es un marketplace seguro y confiable para comprar y vender animales exóticos en Latinoamérica. Conecta a apasionados por los animales con los mejores ejemplares del mundo, garantizando transacciones seguras y verificadas.

### Características Principales

- ✅ **Autenticación Segura**: NextAuth.js con credentials provider
- ✅ **Gestión de Usuarios**: Perfiles completos y tiendas de vendedores
- ✅ **Anuncios de Productos**: Crear, editar y publicar anuncios de animales
- ✅ **Sistema de Mensajería**: Comunicación directa entre compradores y vendedores
- ✅ **Panel de Control**: Dashboard intuitivo para usuarios y vendedores
- ✅ **Verificación de Vendedores**: Sistema de verificación de tiendas
- ✅ **Responsivo**: Diseño mobile-first con Tailwind CSS
- ✅ **SEO Optimizado**: Meta tags y Open Graph configurados

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: Framework React con SSR/SSG
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Gestión eficiente de formularios
- **TanStack Query**: Manejo de estado del servidor
- **NextAuth.js**: Autenticación moderna

### Backend
- **Next.js API Routes**: Endpoints RESTful
- **Prisma ORM**: Acceso a base de datos type-safe
- **bcryptjs**: Hash seguro de contraseñas
- **Zod**: Validación de esquemas

### Base de Datos
- **PostgreSQL**: Base de datos principal (configurable)
- **Prisma**: ORM y migraciones

## 📦 Instalación

### Requisitos Previos
- Node.js 18+
- npm o yarn
- PostgreSQL 12+

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/experimentaldragons-collab/mundo-exotico.git
cd mundo-exotico
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mundo_exotico"

# NextAuth
NEXTAUTH_SECRET="tu-secret-muy-seguro"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (opcional)
GITHUB_ID=""
GITHUB_SECRET=""
```

4. **Configurar base de datos**
```bash
# Ejecutar migraciones de Prisma
npx prisma migrate dev

# (Opcional) Generar datos de prueba
npx prisma db seed
```

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
mundo-exotico/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth].ts
│   │   │   └── register.ts
│   │   ├── listings/
│   │   ├── sellers/
│   │   ├── messages/
│   │   ├── conversations/
│   │   └── users/
│   ├── auth/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── dashboard/
│   ├── listings/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── components/
│   ├── layouts/
│   │   └── Layout.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Alert.tsx
│   │   └── Textarea.tsx
│   └── common/
├── hooks/
│   ├── useListings.ts
│   ├── useMessages.ts
│   ├── useProfile.ts
│   └── useSeller.ts
├── lib/
│   ├── db.ts
│   ├── validation/
│   │   ├── user.ts
│   │   ├── listing.ts
│   │   └── seller.ts
│   └── api/
│       ├── middleware.ts
│       └── response.ts
├── styles/
│   └── globals.css
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── manifest.json
│   └── icons/
├── .env.local
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🔐 Autenticación

### Flujo de Autenticación
1. Usuario se registra con email, usuario y contraseña
2. Contraseña se hashea con bcrypt
3. Usuario confirma email (futuro)
4. Login con credentials provider de NextAuth
5. Token JWT se genera y almacena en sesión

### Roles de Usuario
- **USER**: Usuario regular (comprador)
- **SELLER**: Vendedor verificado
- **ADMIN**: Administrador del sistema

## 📝 Validaciones

Usamos **Zod** para validaciones schema-based:

```typescript
// Ejemplo: Registración
const RegisterSchema = z.object({
  email: z.string().email('Email inválido'),
  username: z.string().min(3).max(20),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  acceptTerms: z.boolean().refine(val => val === true),
});
```

## 🗄️ Base de Datos

### Modelos Principales

**User**
- id, email, username, password
- firstName, lastName, profileImage
- role, status, createdAt

**Seller**
- id, userId, storeName, storeSlug
- description, logo, isVerified
- verificationStatus, listings

**Listing**
- id, title, description, price
- categoryId, sellerId, countryId
- status, images, createdAt

**Message**
- id, conversationId, senderId
- content, attachments, createdAt

**Conversation**
- id, buyerId, sellerId, listingId
- lastMessageAt, messages

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Configura variables de entorno en Vercel dashboard.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t mundo-exotico .
docker run -p 3000:3000 mundo-exotico
```

## 📊 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Usuarios
- `GET /api/users/profile` - Obtener perfil
- `PUT /api/users/profile` - Actualizar perfil

### Anuncios
- `GET /api/listings` - Listar anuncios
- `POST /api/listings` - Crear anuncio
- `GET /api/listings/[id]` - Obtener anuncio
- `PUT /api/listings/[id]` - Actualizar anuncio
- `DELETE /api/listings/[id]` - Eliminar anuncio

### Vendedores
- `GET /api/sellers` - Obtener tienda del usuario
- `POST /api/sellers` - Crear tienda

### Mensajes
- `GET /api/messages` - Listar mensajes de conversación
- `POST /api/messages` - Enviar mensaje
- `GET /api/conversations` - Listar conversaciones

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📝 Scripts Disponibles

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit",
  "format": "prettier --write \"**/*.{ts,tsx,md}\"",
  "db:push": "prisma db push",
  "db:studio": "prisma studio",
  "db:seed": "prisma db seed"
}
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Código de Conducta
Este proyecto adhiere al Contributor Covenant.

## 📋 Roadmap

- [ ] Sistema de pagos (Stripe/PayPal)
- [ ] Reseñas y valoraciones
- [ ] Sistema de notificaciones
- [ ] Búsqueda avanzada con filtros
- [ ] Subasta de animales
- [ ] Blog integrado
- [ ] App móvil (React Native)
- [ ] Internacionalización (i18n)
- [ ] Dark mode

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

## 🙋 Soporte

Para soporte, envía un email a support@mundoexotico.com o abre un issue en GitHub.

## 👥 Autores

- **Experimental Dragons** - Equipo de desarrollo inicial

## 🙏 Agradecimientos

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth.js](https://next-auth.js.org)

---

**Hecho con ❤️ por Experimental Dragons**
