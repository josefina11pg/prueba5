function nextSlide(slideId) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.style.display = 'none');
    document.getElementById(slideId).style.display = 'block';
}

function restart() {
    nextSlide('slide1');
}

const trickyButton = document.getElementById('trickyButton');
let moved = false;

trickyButton.addEventListener('mouseover', () => {
    if (!moved) {
        trickyButton.style.position = 'relative';
        trickyButton.style.left = `${Math.random() * 200 - 100}px`;
        trickyButton.style.top = `${Math.random() * 100 - 0}px`;
        moved = true;
    }
});

const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function createStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    stars.forEach(star => {
        ctx.moveTo(star.x, star.y);
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    });
    ctx.fill();
    updateStars();
}

function updateStars() {
    stars.forEach(star => {
        star.x += star.dx;
        star.y += star.dy;

        // Reposicionar las estrellas que salen de la pantalla
        if (star.x < 0 || star.x > canvas.width) star.dx = -star.dx;
        if (star.y < 0 || star.y > canvas.height) star.dy = -star.dy;
    });
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
});

createStars();
animate();
