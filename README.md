# Be Art — Presentación de propuestas de portada

Presentación estática en español. Contiene diez capturas de escritorio: el diseño publicado y nueve variantes, agrupadas en cinco composiciones. No necesita instalación, compilación, base de datos ni servicios externos.

## Abrir en local

Abre `index.html` directamente, o ejecuta lo siguiente desde esta carpeta:

```sh
python3 -m http.server 5502 --bind 127.0.0.1
```

Después abre `http://127.0.0.1:5502/`. Si el puerto está ocupado, usa otro. Para detener el servidor, pulsa Ctrl+C en su terminal.

Los controles funcionan sin conexión. La página presenta y compara los diseños; no contiene encuestas ni formularios de opinión. La numeración se mantiene: 01 es el título grande, 02 el título centrado y 03 la franja horizontal de ancho completo. Los comentarios son valoraciones de diseño y legibilidad, no una auditoría formal de accesibilidad.

## GitHub Pages

Repositorio: https://github.com/borso271/test-layouts

URL pública: https://borso271.github.io/test-layouts/

GitHub Pages publica la raíz de la rama `main`. El archivo `.nojekyll` permite servir los archivos estáticos directamente. Para actualizar la presentación, modifica estos archivos y sube los cambios a `main`; GitHub Pages vuelve a desplegar automáticamente.

La presentación es independiente de la web de producción de Be Art.

## Contenido y procedencia

- `index.html`: diseño actual, motivos para retirar las fechas de la imagen, diez observaciones para cada uno de los ensayos 01 y 02, selector de propuestas y recomendación de partir de la 03 con Soleá sobre superficie clara.
- `styles.css` y `review.js`: estilos e interacciones sin dependencias.
- `assets/screenshots/`: diez PNG originales a 2880 × 2100 px, sin recortar ni retocar.
- `assets/previews/`: copias WebP reducidas para cargar la presentación con rapidez; los enlaces de ampliación abren los PNG originales.
- `fuentes.json`: procedencia y huella SHA-256 de cada captura.

La captura 00 procede directamente de `https://beartgroup.com/`, tomada el 25 de septiembre de 2026 a las 12:56 UTC. No se alteraron el contenido ni los estilos de producción.

Las propuestas 01, 02 y 04 (Soleá y superficie clara) coinciden exactamente con la selección final de cuatro capturas. La 01 incorpora el último ajuste: margen inferior igual a los laterales.

La propuesta 03 con Soleá y superficie clara se ha actualizado con letras de carbón más suave (#34372f), datos en #4b4f47 y fondo gris neutro ligeramente más claro (#ededed). Conserva la composición y la imagen en escala de grises. La captura procede de `03-solea-neutral-gray/`; los originales anteriores se conservan fuera de esta presentación.

Se han excluido las capturas intermedias con esquinas redondeadas, las versiones de superficie con Soleá en negro puro sustituidas por carbón y los duplicados. La composición compacta se muestra en su versión final disponible. No se han fabricado combinaciones adicionales.

La captura de la propuesta 04 con fondo carbón es una versión anterior en inglés. Se identifica en la presentación y se conserva sin editar. Esta comparación se centra en escritorio; las capturas móviles históricas no se incluyen.

## Antes de compartir

Comprueba que cargan las imágenes y que los botones cambian la captura, el pie y el enlace de ampliación. Las imágenes comparadas son exclusivamente capturas de escritorio.

La presentación solicita que los buscadores no la indexen. Esa indicación no restringe el acceso: al publicarla, cualquier persona con la URL podrá verla.
