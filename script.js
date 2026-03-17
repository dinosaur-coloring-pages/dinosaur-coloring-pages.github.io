(function () {
  var buttons = document.querySelectorAll('.cat-btn');
  var cards   = document.querySelectorAll('.card[data-category]');
  var labels  = document.querySelectorAll('.section-label');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      if (filter === 'all') {
        cards.forEach(function (card) { card.classList.remove('hidden'); });
        labels.forEach(function (label) { label.style.display = ''; });
      } else {
        cards.forEach(function (card) {
          card.classList.toggle('hidden', card.getAttribute('data-category') !== filter);
        });
        labels.forEach(function (label) {
          label.style.display = label.getAttribute('data-filter-group') === filter ? '' : 'none';
        });
      }

      // Smooth scroll to first visible card
      var firstVisible = document.querySelector('.card:not(.hidden)');
      if (firstVisible) {
        firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();