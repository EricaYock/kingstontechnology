/**
 * Parser for cards-banner block.
 * Converts Kingston banner cards (.s-banners .l-gridFlex) into an EDS Cards block table.
 */
export default function parse(element, { document }) {
  const cells = [];
  cells.push(['Cards']);

  const cards = element.querySelectorAll('.s-banners-card, li');

  cards.forEach((card) => {
    const link = card.querySelector('a');
    const img = card.querySelector('.c-card__img img') || card.querySelector('img');
    const title = card.querySelector('.c-card__details h3') || card.querySelector('h3');

    const imgEl = document.createElement('img');
    if (img) {
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
    }

    const contentCell = document.createElement('div');
    if (title) {
      const a = document.createElement('a');
      a.href = link ? link.href : '#';
      a.textContent = title.textContent.trim();
      const p = document.createElement('p');
      p.append(a);
      contentCell.append(p);
    }

    cells.push([imgEl, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
