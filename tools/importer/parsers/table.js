/**
 * Parser for table block.
 * Converts Kingston specifications table into an EDS Table block.
 */
export default function parse(element, { document }) {
  const cells = [];
  cells.push(['Table']);

  const rows = element.querySelectorAll('tr');
  if (rows.length) {
    rows.forEach((row) => {
      const rowCells = [];
      row.querySelectorAll('th, td').forEach((cell) => {
        rowCells.push(cell.textContent.trim());
      });
      if (rowCells.length) cells.push(rowCells);
    });
  } else {
    const items = element.querySelectorAll('dl dt, dl dd, [class*="spec"] [class*="label"], [class*="spec"] [class*="value"]');
    for (let i = 0; i < items.length; i += 2) {
      const label = items[i] ? items[i].textContent.trim() : '';
      const value = items[i + 1] ? items[i + 1].textContent.trim() : '';
      if (label) cells.push([label, value]);
    }
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
