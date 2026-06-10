(function () {
  const cursor = document.getElementById('cursor');
  let mx = -100, my = -100;
  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    requestAnimationFrame(animCursor);
  })();
})();
