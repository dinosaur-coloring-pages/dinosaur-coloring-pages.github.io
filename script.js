(function () {

  // ── FILTER ─────────────────────────────────────────────────────────────
  var buttons = document.querySelectorAll('.cat-btn');
  var rows    = document.querySelectorAll('.cards-row');
  var labels  = document.querySelectorAll('.section-label');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
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

      var grid = document.querySelector('.pages-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── SKELETON LOADING ───────────────────────────────────────────────────
  // Rotating dino emoji hints shown while image loads
  var hints = ['🦕','🦖','🦴','🪶','🛡️','🥚','🌿','⚡'];
  var labels_text = [
    'Loading…',
    'Coloring page',
    'Almost ready…',
    'Loading page…',
  ];

  var frames = document.querySelectorAll('.card-frame');

  frames.forEach(function (frame, i) {
    var img = frame.querySelector('img');
    if (!img) return;

    // Add skeleton state
    frame.classList.add('is-loading');

    // Inject hint element
    var hint = document.createElement('div');
    hint.className = 'skeleton-hint';
    hint.innerHTML =
      '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
        // Simple generic dino silhouette path
        '<path d="M52 14c-2-1-4 0-5 2l-3-1c-1-4-4-7-8-7-3 0-6 2-7 5l-2 1' +
        'c-3 1-5 4-5 7v3l-6 4c-2 1-3 3-3 5v2h4v-1l5-3v4H9v3h6v5h4v-5h2v5h4' +
        'v-7l4-2c1 3 4 5 7 5 4 0 7-2 8-6l3-1c2-1 4-3 4-6v-3c1-2 1-4 0-6z"/>' +
      '</svg>' +
      '<span>' + (labels_text[i % labels_text.length]) + '</span>';
    frame.appendChild(hint);

    // When image loads — fade it in and remove skeleton
    function onLoad() {
      frame.classList.remove('is-loading');
      frame.classList.add('is-loaded');
    }

    if (img.complete && img.naturalWidth > 0) {
      // Already cached
      onLoad();
    } else {
      img.addEventListener('load', onLoad);
      img.addEventListener('error', function () {
        // On error show a friendly fallback emoji
        frame.classList.remove('is-loading');
        frame.classList.add('is-loaded');
        hint.innerHTML = '<svg viewBox="0 0 64 64"></svg><span>Not found</span>';
        hint.style.opacity = '0.4';
        hint.style.display = 'flex';
      });
    }
  });

})();