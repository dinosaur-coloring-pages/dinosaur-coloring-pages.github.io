// Category filter for coloring pages
(function () {
  const buttons = document.querySelectorAll('.cat-btn');
  const cards = document.querySelectorAll('.card[data-category]');
  const labels = document.querySelectorAll('.section-label');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      // Update active state
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      if (filter === 'all') {
        cards.forEach(function (card) { card.classList.remove('hidden'); });
        labels.forEach(function (label) { label.style.display = ''; });
      } else {
        cards.forEach(function (card) {
          if (card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });

        // Show/hide section labels
        labels.forEach(function (label) {
          const group = label.getAttribute('data-filter-group');
          label.style.display = (group === filter) ? '' : 'none';
        });
      }
    });
  });

  // Lazy-load images with IntersectionObserver for performance
  if ('IntersectionObserver' in window) {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    imgs.forEach(function (img) { observer.observe(img); });
  }
})();
