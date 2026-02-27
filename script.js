/* ===== GENERIC SLIDER LOGIC ===== */
function initSlider() {
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const before = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-handle');
    let dragging = false;

    const update = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;

      before.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = `${percent}%`;
    };

    // Inicializar al 50%
    update(slider.getBoundingClientRect().left + slider.offsetWidth / 2);

    slider.addEventListener('mousedown', () => dragging = true);
    slider.addEventListener('mouseup', () => dragging = false);
    slider.addEventListener('mouseleave', () => dragging = false);
    slider.addEventListener('mousemove', e => dragging && update(e.clientX));

    slider.addEventListener('touchstart', () => dragging = true);
    slider.addEventListener('touchend', () => dragging = false);
    slider.addEventListener('touchmove', e => update(e.touches[0].clientX));
  });
}

/* ===== PREVENIR DRAG/FANTASMA DE IMAGEN ===== */
document.addEventListener('dragstart', e => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
