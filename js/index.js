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

// Function to stop animation
function stopRunning() {
    setTimeout(() => {
        isRunning = false;
        xenomorph.style.animation = "none"; // Stops running cycle
        xenomorph.style.backgroundPosition = "0 0"; // Reset to first frame
    }, 300); // Stops after 300ms of inactivity
}

// Mouse movement controls
document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const windowWidth = window.innerWidth;

    // Prevent Xenomorph from moving off-screen
    const newX = Math.max(20, Math.min(mouseX - 75, windowWidth - 170));

    // Move Xenomorph toward the mouse
    xenomorph.style.left = `${newX}px`;

    // Flip direction based on movement
    if (mouseX > parseInt(xenomorph.style.left)) {
        xenomorph.style.transform = "scaleX(1)";
    } else {
        xenomorph.style.transform = "scaleX(-1)";
    }

    // Start animation if not already running
    startRunning();

    // Stop animation when idle
    clearTimeout(window.stopRunTimeout);
    window.stopRunTimeout = setTimeout(stopRunning, 300);
});