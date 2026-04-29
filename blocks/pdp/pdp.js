export default function decorate(block) {
  const rows = [...block.children];
  block.classList.add('pdp-block');

  const wrapper = document.createElement('div');
  wrapper.className = 'pdp-wrapper';

  const gallery = document.createElement('div');
  gallery.className = 'pdp-gallery';

  const details = document.createElement('div');
  details.className = 'pdp-details';

  if (rows.length >= 1) {
    const firstRow = rows[0];
    const cols = [...firstRow.children];

    if (cols[0]) {
      const img = cols[0].querySelector('picture') || cols[0].querySelector('img');
      if (img) gallery.append(img);
    }

    if (cols[1]) {
      details.innerHTML = cols[1].innerHTML;
    }
  }

  // Process capacity options if present
  const capacityList = details.querySelector('ul');
  if (capacityList) {
    const items = [...capacityList.querySelectorAll('li')];
    const isCapacity = items.some((li) => /\d+\s*(GB|TB)/i.test(li.textContent));
    if (isCapacity) {
      capacityList.className = 'pdp-capacities';
      items.forEach((li, i) => {
        const btn = document.createElement('button');
        btn.className = 'pdp-capacity-btn';
        btn.textContent = li.textContent.trim();
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', () => {
          capacityList.querySelectorAll('.pdp-capacity-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        });
        li.replaceWith(btn);
      });
    }
  }

  // Style CTA buttons
  details.querySelectorAll('a').forEach((link) => {
    if (link.textContent.trim().toLowerCase().includes('buy') || link.textContent.trim().toLowerCase().includes('cart')) {
      link.className = 'pdp-cta button';
    }
  });

  wrapper.append(gallery, details);
  block.textContent = '';
  block.append(wrapper);

  // Add part number display if second row exists
  if (rows.length >= 2) {
    const metaRow = rows[1];
    const metaDiv = document.createElement('div');
    metaDiv.className = 'pdp-meta';
    metaDiv.innerHTML = metaRow.innerHTML;
    block.append(metaDiv);
  }
}
