# Mundo Exótico - Contributing Guide

## Código de Conducta

Este proyecto y todos los participantes están bajo nuestro [Código de Conducta](CODE_OF_CONDUCT.md).

## Cómo Contribuir

### Reportar Bugs

Antes de crear un reporte de bug, por favor verifica los issues existentes.

Cuando reportes un bug, incluye:
- **Título descriptivo**
- **Descripción precisa del problema**
- **Pasos para reproducir**
- **Comportamiento esperado vs actual**
- **Capturas de pantalla**
- **Tu entorno** (OS, navegador, versión de Node, etc.)

### Sugerir Mejoras

- Usa un título claro y descriptivo
- Proporciona una descripción detallada de la sugerencia
- Ejemplos con casos de uso
- Por qué crees que sería útil

### Pull Requests

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Sigue la guía de estilo del proyecto
4. Commit cambios con mensajes descriptivos
5. Push a tu rama
6. Abre un Pull Request

## Guía de Estilo

### TypeScript
- Usa tipos explícitos siempre que sea posible
- Evita `any`
- Usa interfaces para contratos públicos
- Usa tipos para estructuras internas

### Archivos y Carpetas
- Components en PascalCase: `Button.tsx`
- Funciones y hooks en camelCase: `useListings.ts`
- Archivos de configuración en lowercase: `.env.local`

### Commits
```
feat: add new feature
fix: resolve issue
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

### Formato de Código
- Prettier para formatteo
- ESLint para linting
```bash
npm run format
npm run lint
```

## Desarrollo Local

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Setup database
npx prisma migrate dev

# Start development
npm run dev
```

## Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Proceso de Review

1. Mínimo una revisión de código
2. Tests pasando
3. Sin conflictos de merge
4. Documentación actualizada

## Comunidad

- Discussions: Preguntas generales
- Issues: Bugs y features
- Discussions: Chat general

Gracias por contribuir! 🎉
