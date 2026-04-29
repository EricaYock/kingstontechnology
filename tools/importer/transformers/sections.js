/**
 * Sections transformer - identifies section boundaries and applies section metadata.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const { document } = payload;

    // Remove header and footer - handled separately
    const header = document.querySelector('header.zone-navigation');
    if (header) header.remove();

    const footer = document.querySelector('section.s-footer');
    if (footer) footer.remove();

    const footNote = document.querySelector('#FootNote');
    if (footNote) footNote.remove();

    // Remove zone-after-main and zone-sandbox
    document.querySelectorAll('.zone-after-main, .zone-sandbox').forEach((el) => el.remove());
  }
}
