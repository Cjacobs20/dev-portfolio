const content = document.querySelector('.content');
const defaultImg = document.querySelector('.default');
const hoverImg = document.querySelector('.hover');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const hoveringImg = document.querySelector('.hovering');

// content.addEventListener('mouseenter', () => {
//     defaultImg.style.display = 'none';
//     hoverImg.style.display = 'flex';
// });
// content.addEventListener('mouseleave', () => {
//     defaultImg.style.display = 'flex';
//     hoverImg.style.display = 'none';
// });

left.addEventListener('mouseenter', () => {
  defaultImg.style.display = 'none';
  hoveringImg.style.display = 'flex';
});
left.addEventListener('mouseleave', () => {
  defaultImg.style.display = 'flex';
  hoveringImg.style.display = 'none';
});

right.addEventListener('mouseenter', () => {
  defaultImg.style.display = 'none';
  hoveringImg.style.display = 'flex';
});
right.addEventListener('mouseleave', () => {
  defaultImg.style.display = 'flex';
  hoveringImg.style.display = 'none';
});

function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
  }

  document.addEventListener("click", function(e) {
    if (!e.target.closest(".navbar") && !e.target.closest(".menu-btn")) {
      var navbar = document.querySelector('.navbar');
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
      }
    }
  });

const likeBtn = document.querySelector(".like-btn");
const likeCount = document.querySelector(".like-count");

likeBtn.addEventListener("click", function() {
  let count = parseInt(likeCount.textContent);
  likeCount.textContent = count + 1;
});