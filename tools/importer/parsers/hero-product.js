/**
 * Parser for hero-product block.
 * Converts Kingston product hero section into an EDS Hero block table.
 */
export default function parse(element, { document }) {
  const cells = [];
  cells.push(['Hero']);

  const img = element.querySelector('img[src*="media.kingston"]') || element.querySelector('picture img') || element.querySelector('img');
  const h1 = element.querySelector('h1') || element.querySelector('.u-h1') || element.querySelector('[class*="title"]');
  const desc = element.querySelector('.c-headerClip__desc') || element.querySelector('p');
  const cta = element.querySelector('a.btn') || element.querySelector('a[class*="cta"]') || element.querySelector('a[href*="wheretobuy"]');

  const contentCell = document.createElement('div');

  if (h1) {
    const heading = document.createElement('h1');
    heading.textContent = h1.textContent.trim();
    contentCell.append(heading);
  }

  if (desc && desc.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    contentCell.append(p);
  }

  if (cta) {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim() || 'Learn more';
    const p = document.createElement('p');
    p.append(a);
    contentCell.append(p);
  }

  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    cells.push([imgEl, contentCell]);
  } else {
    cells.push([contentCell]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
