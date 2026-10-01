// Editable site content: replace sample media, venues and dates before publishing.
export const SITE = {
  brand: 'OTRA NOCHE',
  location: 'BUENOS AIRES · ARGENTINA',
  edition: {
    label: 'PRÓXIMA EDICIÓN',
    day: '17',
    month: 'OCT',
    year: '2026',
    editionNumber: '02',
    name: 'LA PRÓXIMA NOCHE',
    subtitle: 'Nuestra próxima edición está tomando forma.',
    venue: 'UBICACIÓN POR ANUNCIAR',
    time: 'HORARIO POR ANUNCIAR',
    salesEnabled: false,
    salesUrl: '',
    // Fecha basada en los planes compartidos. Verificar antes de publicar.
    dateNeedsConfirmation: true,
  },
  // Fotos de muestra: sustituir por fotos autorizadas de Otra Noche.
  media: {
    main: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=85',
    crowd: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1100&q=85',
    dj: 'https://images.unsplash.com/photo-1571266028243-d220c9b3b157?w=900&q=85',
  },
  whatsapp: {
    announcements: '', // Pegar URL de invitación https://chat.whatsapp.com/...
    community: '',
  },
  instagramUrl: '',
  collaborations: [
    { name: 'TU MARCA ACÁ', category: 'COLABORACIÓN' },
    { name: 'PRODUCTORA 02', category: 'PRODUCTORA' },
    { name: 'ARTISTA 03', category: 'ARTISTA' },
    { name: 'MARCA 04', category: 'SPONSOR' },
    { name: 'TU MARCA ACÁ', category: 'COLABORACIÓN' },
  ],
  friendlyParties: [
    { name: 'PSYTRANCE', category: 'FIESTAS AMIGAS', text: 'Conectamos diferentes escenas.', image: '' },
    { name: 'BASS / DUBSTEP', category: 'FIESTAS AMIGAS', text: 'El sonido que nos mueve.', image: '' },
    { name: 'TECHNO', category: 'FIESTAS AMIGAS', text: 'Más noches, más comunidad.', image: '' },
    { name: 'TU FIESTA AQUÍ', category: 'PRÓXIMAMENTE', text: 'Un espacio para nuevas colaboraciones.', image: '' },
  ],
};

export type View = 'inicio' | 'ediciones' | 'colaboraciones' | 'sumate' | 'tienda' | 'entradas' | 'galeria';
