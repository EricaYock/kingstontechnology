/**
 * Parser for carousel-hero block.
 * Converts Kingston hero carousel (.s-carousel) into an EDS Carousel block table.
 */
export default function parse(element, { document }) {
  const cells = [];
  cells.push(['Carousel']);

  const panels = element.querySelectorAll('.s-carousel__slides__panel');

  panels.forEach((panel) => {
    const img = panel.querySelector('img.s-carousel__slides__panel__img')
      || panel.querySelector('picture img')
      || panel.querySelector('img[src*="media.kingston"]');

    const title = panel.querySelector('.c-headerClip__title');
    const desc = panel.querySelector('.c-headerClip__desc');
    const cta = panel.querySelector('.c-headerClip__cta__link');

    const contentParts = [];

    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent.trim();
      contentParts.push(h2);
    }

    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentParts.push(p);
    }

    if (cta) {
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim().replace(/\s+/g, ' ');
      const p = document.createElement('p');
      p.append(a);
      contentParts.push(p);
    }

    const contentCell = document.createElement('div');
    contentParts.forEach((part) => contentCell.append(part));

    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      cells.push([imgEl, contentCell]);
    } else {
      cells.push([contentCell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
