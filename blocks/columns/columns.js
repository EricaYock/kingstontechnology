export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      }

      // Convert "Enter ..." paragraphs before a button into search inputs
      const buttonContainer = col.querySelector('.button-container');
      if (buttonContainer) {
        const prevP = buttonContainer.previousElementSibling;
        if (prevP && prevP.tagName === 'P' && !prevP.querySelector('a') && prevP.textContent.startsWith('Enter')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'columns-search-bar';
          const input = document.createElement('input');
          input.type = 'text';
          input.placeholder = prevP.textContent.trim();
          wrapper.appendChild(input);
          wrapper.appendChild(buttonContainer);
          prevP.replaceWith(wrapper);
        }
      }
    });
  });
}
