/* ===============================
   HEART TEXT ANIMATION
================================ */
const ui = document.getElementById("ui");

const isMobile = window.matchMedia("(max-width: 768px)").matches;
const COUNT = isMobile ? 56 : 80;
const SPEED = 0.001;

// heart math ❤️
function heart(t) {
  return {
    x: 16 * Math.sin(t) ** 3,
    y:
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
  };
}

// create texts
const texts = [];
for (let i = 0; i < COUNT; i++) {
  const el = document.createElement("div");
  el.className = "love";
  el.textContent = "I love you អូន";
  ui.appendChild(el);

  texts.push({ el, offset: (i / COUNT) * Math.PI * 2 });
}

let time = 0;

function animateHeart() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const scale = size / 42;

  time += SPEED;

  texts.forEach(item => {
    const p = heart(time + item.offset);
    item.el.style.left = `${centerX + p.x * scale}px`;
    item.el.style.top  = `${centerY - p.y * scale}px`;
  });

  requestAnimationFrame(animateHeart);
}

animateHeart();

/* ===============================
   SNOW EFFECT ❄️
================================ */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resizeSnow() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeSnow();
window.addEventListener("resize", resizeSnow);

const flakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  d: Math.random() * 0.6 + 0.3
}));

function snowLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();

  flakes.forEach(f => {
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    f.y += f.d;
    if (f.y > canvas.height) {
      f.y = -5;
      f.x = Math.random() * canvas.width;
    }
  });

  ctx.fill();
  requestAnimationFrame(snowLoop);
}

snowLoop();
