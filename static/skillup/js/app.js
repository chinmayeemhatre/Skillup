document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-progress]').forEach((bar) => {
    const value = Math.max(0, Math.min(100, Number(bar.dataset.progress || 0)));
    requestAnimationFrame(() => bar.style.setProperty('--value', `${value}%`));
  });

  document.querySelectorAll('.message').forEach((message) => {
    setTimeout(() => message.style.opacity = '0', 4500);
    setTimeout(() => message.remove(), 5200);
  });
});
