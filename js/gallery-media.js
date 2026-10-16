(() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'gallery-lightbox';
  dialog.setAttribute('aria-label', 'Image preview');

  const close = document.createElement('button');
  close.className = 'gallery-lightbox__close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Close image preview');
  close.title = 'Close image preview';
  close.textContent = '\u00d7';

  const image = document.createElement('img');
  const caption = document.createElement('p');
  dialog.append(close, image, caption);
  document.body.append(dialog);

  document.addEventListener('click', event => {
    const link = event.target.closest('[data-gallery-image]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    const thumbnail = link.querySelector('img');
    image.src = link.href;
    image.alt = thumbnail.alt;
    caption.textContent = thumbnail.alt;
    dialog.showModal();
    document.documentElement.classList.add('gallery-preview-open');
  });

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('gallery-preview-open');
    image.removeAttribute('src');
  });
})();
