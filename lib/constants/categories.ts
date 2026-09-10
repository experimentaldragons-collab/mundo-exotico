export interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'reptiles',
    name: '🦎 Reptiles',
    slug: 'reptiles',
    icon: '🦎',
    description: 'Reptiles vivos: geckos, serpientes, lagartos, tortugas y más',
    subcategories: [
      { id: 'geckos', name: 'Geckos', slug: 'geckos' },
      { id: 'serpientes', name: 'Serpientes', slug: 'serpientes' },
      { id: 'lagartos', name: 'Lagartos', slug: 'lagartos' },
      { id: 'tortugas', name: 'Tortugas', slug: 'tortugas' },
      { id: 'camaleones', name: 'Camaleones', slug: 'camaleones' },
      { id: 'iguanas', name: 'Iguanas', slug: 'iguanas' },
      { id: 'otros-reptiles', name: 'Otros Reptiles', slug: 'otros-reptiles' },
    ],
  },
  {
    id: 'anfibios',
    name: '🐸 Anfibios',
    slug: 'anfibios',
    icon: '🐸',
    description: 'Anfibios vivos: ranas, sapos, salamandras y más',
    subcategories: [
      { id: 'ranas', name: 'Ranas', slug: 'ranas' },
      { id: 'sapos', name: 'Sapos', slug: 'sapos' },
      { id: 'salamandras', name: 'Salamandras', slug: 'salamandras' },
      { id: 'otros-anfibios', name: 'Otros Anfibios', slug: 'otros-anfibios' },
    ],
  },
  {
    id: 'invertebrados',
    name: '🕷️ Invertebrados',
    slug: 'invertebrados',
    icon: '🕷️',
    description: 'Invertebrados vivos: arañas, escorpiones, insectos y más',
    subcategories: [
      { id: 'tarantulas', name: 'Tarantulas', slug: 'tarantulas' },
      { id: 'escorpiones', name: 'Escorpiones', slug: 'escorpiones' },
      { id: 'insectos', name: 'Insectos', slug: 'insectos' },
      { id: 'otros-invertebrados', name: 'Otros Invertebrados', slug: 'otros-invertebrados' },
    ],
  },
  {
    id: 'alimento-vivo',
    name: '🪳 Alimento Vivo',
    slug: 'alimento-vivo',
    icon: '🪳',
    description: 'Alimento vivo: dubia, tenebrios, grillos, gusanos y más',
    subcategories: [
      { id: 'dubia', name: 'Blaptica Dubia', slug: 'dubia' },
      { id: 'tenebrios', name: 'Tenebrios', slug: 'tenebrios' },
      { id: 'zophobas', name: 'Zophobas', slug: 'zophobas' },
      { id: 'grillos', name: 'Grillos', slug: 'grillos' },
      { id: 'cucarachas', name: 'Cucarachas', slug: 'cucarachas' },
      { id: 'gusanos', name: 'Gusanos', slug: 'gusanos' },
      { id: 'otros-alimentos', name: 'Otros Alimentos', slug: 'otros-alimentos' },
    ],
  },
  {
    id: 'terrarios',
    name: '🏠 Terrarios',
    slug: 'terrarios',
    icon: '🏠',
    description: 'Terrarios y recintos: vidrio, PVC, madera, bioactivos y kits',
    subcategories: [
      { id: 'terrarios-vidrio', name: 'Terrarios de Vidrio', slug: 'terrarios-vidrio' },
      { id: 'terrarios-pvc', name: 'Terrarios PVC', slug: 'terrarios-pvc' },
      { id: 'terrarios-madera', name: 'Terrarios de Madera', slug: 'terrarios-madera' },
      { id: 'bioactivos', name: 'Bioactivos', slug: 'bioactivos' },
      { id: 'kits', name: 'Kits Completos', slug: 'kits' },
    ],
  },
  {
    id: 'iluminacion',
    name: '💡 Iluminación',
    slug: 'iluminacion',
    icon: '💡',
    description: 'Iluminación: UVB, bombillos, lámparas y calefacción',
    subcategories: [
      { id: 'uvb', name: 'UVB', slug: 'uvb' },
      { id: 'bombillos', name: 'Bombillos', slug: 'bombillos' },
      { id: 'lamparas', name: 'Lámparas', slug: 'lamparas' },
      { id: 'portalamparas', name: 'Portalámparas', slug: 'portalamparas' },
      { id: 'calefaccion', name: 'Calefacción', slug: 'calefaccion' },
    ],
  },
  {
    id: 'suplementos',
    name: '🧪 Suplementos y Alimentación',
    slug: 'suplementos',
    icon: '🧪',
    description: 'Suplementos: calcio, vitaminas y alimentos preparados',
    subcategories: [
      { id: 'calcio', name: 'Calcio', slug: 'calcio' },
      { id: 'vitaminas', name: 'Vitaminas', slug: 'vitaminas' },
      { id: 'alimentos-preparados', name: 'Alimentos Preparados', slug: 'alimentos-preparados' },
      { id: 'accesorios-alimentacion', name: 'Accesorios de Alimentación', slug: 'accesorios-alimentacion' },
    ],
  },
  {
    id: 'accesorios',
    name: '🛠️ Accesorios',
    slug: 'accesorios',
    icon: '🛠️',
    description: 'Accesorios: hides, decoración, termómetros y más',
    subcategories: [
      { id: 'hides', name: 'Hides', slug: 'hides' },
      { id: 'cuevas', name: 'Cuevas', slug: 'cuevas' },
      { id: 'decoracion', name: 'Decoración', slug: 'decoracion' },
      { id: 'pinzas', name: 'Pinzas', slug: 'pinzas' },
      { id: 'termometros', name: 'Termómetros', slug: 'termometros' },
      { id: 'termostatos', name: 'Termostatos', slug: 'termostatos' },
      { id: 'bebederos', name: 'Bebederos', slug: 'bebederos' },
      { id: 'comederos', name: 'Comederos', slug: 'comederos' },
      { id: 'otros-accesorios', name: 'Otros Accesorios', slug: 'otros-accesorios' },
    ],
  },
  {
    id: 'otros-animales',
    name: '🐾 Otros Animales Exóticos',
    slug: 'otros-animales',
    icon: '🐾',
    description: 'Otros animales exóticos permitidos y productos relacionados',
    subcategories: [
      { id: 'aves', name: 'Aves', slug: 'aves' },
      { id: 'mamiferos', name: 'Mamíferos', slug: 'mamiferos' },
      { id: 'otros', name: 'Otros', slug: 'otros' },
    ],
  },
];

export const getCategoryBySlug = (slug: string): CategoryConfig | undefined => {
  return CATEGORIES.find((category) => category.slug === slug);
};
