/* Featured preview state cycling */
document.addEventListener('DOMContentLoaded', function () {
  const featuredRow = document.querySelector('.project-row.featured');
  if (!featuredRow) return;

  const statusDots = featuredRow.querySelectorAll('.status-dot');
  const states = ['idle', 'running', 'success'];
  let currentStateIndex = 0;

  function cyclePreviewState() {
    statusDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentStateIndex);
    });
    currentStateIndex = (currentStateIndex + 1) % states.length;
  }

  let cycleInterval;
  featuredRow.addEventListener('mouseenter', function () {
    clearInterval(cycleInterval);
    cycleInterval = setInterval(cyclePreviewState, 1200);
  });

  featuredRow.addEventListener('mouseleave', function () {
    clearInterval(cycleInterval);
    currentStateIndex = 0;
    statusDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === 0);
    });
  });
});
