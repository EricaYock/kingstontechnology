/**
 * Cleanup transformer - removes unwanted elements from the DOM before parsing.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    const { document } = payload;

    const selectorsToRemove = [
      '.osano-cm-window',
      '.osano-cm-widget',
      '.osano-cm-info-dialog',
      '.grecaptcha-badge',
      '.grecaptcha-policy',
      '[class*="google-tag"]',
      'noscript',
      '.nav-height-fix',
      '.s-notification',
      '.c-dialog',
      '[id*="recaptcha"]',
      '[class*="recaptcha"]',
      'iframe[src*="recaptcha"]',
      'iframe[src*="googletagmanager"]',
      '[data-osano]',
    ];

    selectorsToRemove.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    });

    document.querySelectorAll('div:empty').forEach((el) => {
      if (!el.id && !el.className) el.remove();
    });

    document.querySelectorAll('img[src^="data:image/svg+xml"]').forEach((img) => {
      const parent = img.closest('button, .s-carousel__indicators, .s-footer__list__section__indicator');
      if (parent) img.remove();
    });
  }
}
