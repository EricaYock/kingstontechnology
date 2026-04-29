/**
 * Parser for columns-search block.
 * Converts Kingston search configurator (.s-searchConfigurator__body) into an EDS Columns block table.
 */
export default function parse(element, { document }) {
  const cells = [];
  cells.push(['Columns']);

  const searchCards = element.querySelectorAll('.c-searchCard');
  const row = [];

  searchCards.forEach((card) => {
    const heading = card.querySelector('.c-searchCard__heading');
    const desc = card.querySelector('.c-searchCard__body p');

    const contentCell = document.createElement('div');

    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      contentCell.append(h3);
    }

    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentCell.append(p);
    }

    const a = document.createElement('a');
    a.href = 'https://www.kingston.com/en/memory/search';
    a.textContent = 'Search';
    const p = document.createElement('p');
    p.append(a);
    contentCell.append(p);

    row.push(contentCell);
  });

  if (row.length) {
    cells.push(row);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
