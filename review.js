(() => {
  'use strict';
  const options = {
    '01': {
      title: 'Título grande sobre la imagen',
      description: 'Mantiene la escala del título original, elimina las fechas y baja el conjunto hasta igualar el margen inferior con los laterales.',
      observation: 'Retirar las fechas y equilibrar los márgenes aligera la composición, pero el título sigue dominando la pintura y falta la información práctica.',
      variants: [{ id: '01-gran-titulo', font: 'solea', background: 'imagen', label: 'Soleá · Sobre la imagen · Sin fechas' }],
      alt: 'Título grande en Soleá blanca sobre la pintura, sin fechas y con márgenes laterales e inferior iguales.'
    },
    '02': {
      title: 'Título más pequeño y centrado',
      description: 'Reduce el título un 20 % y centra el conjunto en la imagen, tanto en horizontal como en vertical. Las fechas salen de la pintura.',
      observation: 'Reducir el título deja más espacio alrededor, pero mantiene el texto sobre la parte central de la obra. Sigue pendiente recuperar las fechas y presentar la bienal.',
      variants: [{ id: '02-titulo-centrado', font: 'solea', background: 'imagen', label: 'Soleá · Sobre la imagen · Sin fechas' }],
      alt: 'Título en Soleá blanca al 80 % de su tamaño original, centrado sobre la pintura y sin fechas.'
    },
    '03': {
      title: 'Franja horizontal de ancho completo',
      description: 'Reúne la presentación de la bienal, el título y las fechas en una banda inferior que ocupa todo el ancho. El título se lee en una sola línea.',
      observation: 'Esta es la composición que recomendamos junto con la 03b. El gris delimita con claridad el bloque de título y datos; preferimos ligeramente el blanco con línea de la 03b por su ligereza e integración con la página.',
      variants: [
        { id: '03-solea-claro', font: 'solea', background: 'claro', label: 'Soleá · Superficie clara · Letras carbón' },
        { id: '03-solea-carbon', font: 'solea', background: 'carbon', label: 'Soleá · Carbón al 70 % · Letras blancas' },
        { id: '03-futura-claro', font: 'futura', background: 'claro', label: 'Futura · Superficie clara · Letras oscuras' },
        { id: '03-futura-carbon', font: 'futura', background: 'carbon', label: 'Futura · Carbón al 70 % · Letras blancas' }
      ],
      alt: 'Franja inferior de ancho completo, con la presentación de la bienal a la izquierda, el título en el centro y las fechas a la derecha.'
    },
    '03b': {
      title: 'Franja blanca con línea inferior',
      description: 'Conserva la composición de la 03 con Soleá y letras en carbón suave, pero cambia el fondo gris por blanco y añade una línea sutil debajo.',
      observation: 'Es nuestra variante preferida: el blanco aligera la franja y la integra con la página. La línea marca la separación con el contenido sin añadir el peso visual de un panel gris. La 03 sigue siendo una buena alternativa.',
      variants: [{ id: '03b-solea-blanco', font: 'solea', background: 'blanco', label: 'Soleá · Fondo blanco · Línea inferior · Preferida' }],
      alt: 'Franja horizontal de ancho completo sobre blanco, con título Soleá en carbón suave, presentación a la izquierda, fechas a la derecha y una línea fina debajo.'
    },
    '04': {
      title: 'Franja vertical a la izquierda',
      description: 'Gira el título y lo sitúa en una banda lateral, con la presentación de la bienal y las fechas debajo. Recuerda a una banderola de exposición.',
      observation: 'La franja lateral da una identidad reconocible y reúne la información, aunque el título girado exige más esfuerzo de lectura y la banda cubre parte del lado izquierdo de la obra.',
      variants: [
        { id: '04-solea-claro', font: 'solea', background: 'claro', label: 'Soleá · Superficie clara · Letras carbón' },
        { id: '04-solea-carbon', font: 'solea', background: 'carbon', label: 'Soleá · Carbón al 70 % · Letras blancas', note: 'Esta captura anterior está en inglés. Se conserva tal cual para valorar la composición y el fondo; también varían los textos de navegación y las fechas.' }
      ],
      alt: 'Banda a la izquierda con el título en Soleá girado, y la presentación de la bienal y las fechas al pie.'
    },
    '05': {
      title: 'Franja horizontal compacta',
      description: 'Agrupa el título en dos líneas y los datos de la bienal en un bloque que ocupa solo la parte inferior izquierda de la imagen.',
      observation: 'El bloque reúne el título y la información, y deja libre la parte derecha de la pintura. Su anchura parcial produce una composición más asimétrica que la franja completa.',
      variants: [{ id: '05-solea-claro', font: 'solea', background: 'claro', label: 'Soleá · Superficie clara · Letras carbón' }],
      alt: 'Bloque compacto en la esquina inferior izquierda: título en Soleá en dos líneas, etiqueta y fechas a su lado, sobre superficie clara.'
    }
  };
  const $ = id => document.getElementById(id);
  const order = Object.keys(options).sort();
  const remembered = Object.fromEntries(order.map(id => [id, options[id].variants[0].id]));
  let current = '01';
  let selected = options[current].variants[0];
  let revision = 0;
  const viewer = $('viewer');
  const compositionButtons = [...document.querySelectorAll('[data-option]')];
  const fontInputs = [...document.querySelectorAll('[name="display-font"]')];
  const backgroundInputs = [...document.querySelectorAll('[name="display-background"]')];

  async function render(id, variantId) {
    const request = ++revision;
    const option = options[id];
    const variant = option.variants.find(v => v.id === variantId) || option.variants[0];
    viewer.setAttribute('aria-busy', 'true');
    $('viewer-status').textContent = 'Cargando la propuesta ' + id + '…';
    try {
      const image = new Image();
      const version = variant.id === '03b-solea-blanco' ? '?v=brightness90' : '';
      image.src = 'assets/previews/' + variant.id + '.webp' + version;
      await image.decode();
      if (request !== revision) return;
      current = id;
      selected = variant;
      remembered[id] = variant.id;
      $('option-title').textContent = option.title;
      $('option-counter').textContent = 'Propuesta ' + id + ' · ' + (order.indexOf(id) + 1) + ' de ' + order.length;
      $('option-description').textContent = option.description;
      $('option-observation').replaceChildren();
      const lead = document.createElement('strong');
      lead.textContent = 'Aspecto clave: ';
      $('option-observation').append(lead, option.observation);
      document.querySelectorAll('[data-analysis]').forEach(section => {
        section.hidden = section.dataset.analysis !== id;
      });
      $('variant-image').src = image.src;
      $('variant-image').alt = 'Propuesta ' + id + ': ' + option.alt + ' ' + variant.label + '.';
      $('variant-caption').textContent = id + ' · ' + variant.label;
      const full = 'assets/screenshots/' + variant.id + '.png' + version;
      $('variant-full').href = full;
      $('variant-image-link').href = full;
      $('variant-image-link').setAttribute('aria-label', 'Abrir captura de la propuesta ' + id + ' a resolución completa, en una pestaña nueva');
      $('variant-note').textContent = variant.note || '';
      $('variant-note').hidden = !variant.note;
      compositionButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.option === id)));
      fontInputs.forEach(input => {
        input.disabled = !option.variants.some(v => v.font === input.value);
        input.checked = input.value === variant.font;
      });
      $('background-controls').hidden = variant.background === 'imagen' || id === '03b';
      backgroundInputs.forEach(input => {
        input.disabled = !option.variants.some(v => v.background === input.value && v.font === variant.font);
        input.checked = input.value === variant.background;
      });
      $('variant-availability').textContent = id === '03' ? 'Dos tipografías y dos fondos. Las letras sobre la superficie clara son oscuras.' : id === '03b' ? 'Soleá sobre blanco, con línea inferior. Nuestra variante preferida.' : id === '04' ? 'Disponible en Soleá, con dos fondos.' : id === '05' ? 'La versión final disponible es Soleá sobre superficie clara.' : 'Esta composición está disponible en Soleá, sin franja de fondo.';
      $('previous').disabled = id === order[0];
      $('next').disabled = id === order[order.length - 1];
      $('viewer-status').textContent = 'Propuesta ' + id + '. ' + option.title + '. ' + variant.label;
    } catch (_) {
      if (request === revision) $('viewer-status').textContent = 'No se ha podido cargar la imagen. Puedes abrirla desde la lista de capturas.';
    } finally {
      if (request === revision) {
        viewer.removeAttribute('aria-busy');
      }
    }
  }
  compositionButtons.forEach(button => button.addEventListener('click', () => render(button.dataset.option, remembered[button.dataset.option])));
  const move = direction => {
    const id = order[order.indexOf(current) + direction];
    if (id) render(id, remembered[id]);
  };
  $('previous').addEventListener('click', () => move(-1));
  $('next').addEventListener('click', () => move(1));
  fontInputs.forEach(input => input.addEventListener('change', () => {
    const variant = options[current].variants.find(v => v.font === input.value && v.background === selected.background);
    if (variant) render(current, variant.id);
  }));
  backgroundInputs.forEach(input => input.addEventListener('change', () => {
    const variant = options[current].variants.find(v => v.background === input.value && v.font === selected.font);
    if (variant) render(current, variant.id);
  }));
  $('show-recommended').addEventListener('click', async () => {
    await render('03b', '03b-solea-blanco');
    $('viewer').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    $('option-title').setAttribute('tabindex', '-1');
    $('option-title').focus({ preventScroll: true });
  });

})();
