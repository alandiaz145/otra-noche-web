# OTRA NOCHE — sitio oficial (primera versión)

Proyecto independiente de Otra Noche, Buenos Aires. Diseño editorial negro/rojo/blanco inspirado en las referencias visuales compartidas por el organizador; estructura propia y adaptable a móviles.

## Qué incluye

- Barra roja informativa y navegación negra, menú responsive.
- Inicio con portada de dos bloques: identidad + próxima edición.
- Espacio horizontal para marcas y colaboradores.
- Presentación editorial, próximas ediciones, postulaciones RRPP/DJ, slider de fiestas amigas, archivo, WhatsApp.
- Páginas internas: Entradas, Ediciones, Galería, Colaboraciones, Trabajá con nosotros y Tienda / Merch.
- Formulario para RRPP y DJs con validación de campos y endpoint opcional Cloudflare Pages Functions + D1.
- Esquema D1 para postulaciones, códigos RRPP y futuras órdenes verificadas.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

## Editar contenidos antes de publicar

Archivo único: `src/content.ts`. Ahí están la fecha tentativa, imágenes temporales, nombres de marcas de ejemplo y enlaces aún vacíos. Las fotografías externas son **ilustrativas**, no representan ediciones reales de Otra Noche. Sustituirlas por fotografías propias autorizadas. No anunciar la fecha de octubre sin confirmarla. Los logotipos de sponsors y fiestas amigas son **placeholders**, no acuerdos declarados.

## Cloudflare Pages

- Build command: `npm run build`.
- Output directory: `dist`.
- Framework preset: Vite.
- Para recibir formularios, crear D1, ejecutar `db/schema.sql` en D1 y agregar binding `DB` a Cloudflare Pages. Tras desplegar, verificar con una postulación de prueba.
- El backend **guarda las postulaciones en D1**, pero **no envía emails** todavía: configurar proveedor transaccional y alertas antes de promover el formulario.
- No colocar credenciales en `VITE_` ni en este repositorio público. Configurarlas como secretos del proveedor de despliegue.

## Qué no está activo aún

- Venta/cobro real de entradas, generación y control de QR, integración de pasarela de pago.
- Asignación administrativa de códigos RRPP, atribución de ventas verificadas y cálculo/pago de comisiones. La estructura de BD está reservada, pero no registra ventas reales hasta integrar checkout con verificación de pagos.
- Notificación automática de postulaciones, panel privado de administración y publicación automática de eventos.
- Fotografías propias, marcas autorizadas, links reales de WhatsApp e Instagram, catálogo de merch.

**Importante:** No habilitar `salesEnabled` ni incorporar formularios públicos hasta configurar y probar el backend correspondiente. Las pantallas públicas informan cuando una función aún no está disponible.
