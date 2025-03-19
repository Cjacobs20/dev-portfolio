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


//Heeeere she comes to wreck your daaaaay!


const xenomorph = document.getElementById("xenomorph");
let isRunning = false;

// Function to start animation
function startRunning() {
    if (!isRunning) {
        xenomorph.style.animation = "run 1s steps(10) infinite";
        isRunning = true;
    }
}

// Function to stop animation (idle pose)
function stopRunning() {
    setTimeout(() => {
        isRunning = false;
        xenomorph.style.animation = "none"; // Prevent infinite looping
        xenomorph.style.backgroundPosition = "0 0"; // Reset to first frame
    }, 300); // Stops after 300ms of inactivity
}

// Track mouse movement and trigger animation
document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const xenoX = parseInt(xenomorph.style.left) || 0;

    // Move Xenomorph toward the mouse
    xenomorph.style.left = `${mouseX - 75}px`;

    // Flip direction based on movement
    xenomorph.style.transform = `scaleX(${mouseX > xenoX ? 1 : -1})`;

    // Start animation only if it's not already running
    startRunning();

    // Stop animation after movement ends
    clearTimeout(window.stopRunTimeout);
    window.stopRunTimeout = setTimeout(stopRunning, 300); // Stops after 300ms of no movement
});