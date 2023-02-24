// Experimental animation
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const particleCount = 10000;
// const particleGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
// const particleMaterial = new THREE.MeshBasicMaterial( { color: 0xE4C472 } );
// const particles = [];
// for ( let i = 0; i < particleCount; i ++ ) {
//   const particle = new THREE.Mesh( particleGeometry, particleMaterial );
//   particle.position.set( Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10 );
//   particles.push( particle );
//   scene.add( particle );
// }

// let startTime = Date.now();
// function animate() {
//   requestAnimationFrame( animate );
//   const elapsedTime = Date.now() - startTime;
//   for ( let i = 0; i < particleCount; i ++ ) {
//     const particle = particles[ i ];
//     // Update the position of the particle based on the elapsed time
//     particle.position.x = Math.sin( elapsedTime * 0.001 + i ) * 10;
//     particle.position.y = Math.cos( elapsedTime * 0.001 + i ) * 10;
//   }
//   renderer.render( scene, camera );
// }
// animate();

const content = document.querySelector('.content');
const defaultImg = document.querySelector('.default');
const hoverImg = document.querySelector('.hover');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const hoveringImg = document.querySelector('.hovering');

content.addEventListener('mouseenter', () => {
    defaultImg.style.display = 'none';
    hoverImg.style.display = 'flex';
});
content.addEventListener('mouseleave', () => {
    defaultImg.style.display = 'flex';
    hoverImg.style.display = 'none';
});

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