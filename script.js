(function () {
  var buttons  = document.querySelectorAll('.cat-btn');
  var rows     = document.querySelectorAll('.cards-row');
  var labels   = document.querySelectorAll('.section-label');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      // Update active button
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      if (filter === 'all') {
        rows.forEach(function (row) { row.style.display = ''; });
        labels.forEach(function (label) { label.style.display = ''; });
      } else {
        rows.forEach(function (row) {
          row.style.display = row.getAttribute('data-group') === filter ? '' : 'none';
        });
        labels.forEach(function (label) {
          label.style.display = label.getAttribute('data-filter-group') === filter ? '' : 'none';
        });
      }

      // Scroll to grid
      var grid = document.querySelector('.pages-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();