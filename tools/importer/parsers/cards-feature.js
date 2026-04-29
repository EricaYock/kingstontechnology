/**
 * Parser for cards-feature block.
 * Converts Kingston feature cards section into an EDS Cards block table.
 */
export default function parse(element, { document }) {
  const cells = [];
  cells.push(['Cards']);

  const features = element.querySelectorAll('[class*="feature"], [class*="card"], li');

  features.forEach((feature) => {
    const icon = feature.querySelector('img') || feature.querySelector('svg');
    const title = feature.querySelector('h3') || feature.querySelector('h4') || feature.querySelector('[class*="heading"]');
    const desc = feature.querySelector('p');

    const contentCell = document.createElement('div');

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentCell.append(h3);
    }

    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentCell.append(p);
    }

    if (icon && icon.src) {
      const imgEl = document.createElement('img');
      imgEl.src = icon.src;
      imgEl.alt = icon.alt || '';
      cells.push([imgEl, contentCell]);
    } else {
      cells.push([contentCell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
