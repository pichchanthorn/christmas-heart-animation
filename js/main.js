/* ===============================
   HEART TEXT ANIMATION
================================ */
const ui = document.getElementById("ui");

// detect mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// tuned values
const COUNT = isMobile ? 56 : 80;
const SPEED = 0.001;

// heart path ❤️
function heart(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  return { x, y };
}

// create text nodes
const texts = [];

for (let i = 0; i < COUNT; i++) {
  const el = document.createElement("div");
  el.className = "love";
  el.textContent = "I love you អូន";
  ui.appendChild(el);

  texts.push({
    el,
    offset: (i / COUNT) * Math.PI * 2
  });
}

let time = 0;

function animateHeart() {
  const rect = ui.getBoundingClientRect();
  const size = Math.min(rect.width, rect.height);

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
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

let w, h;
function resizeSnow() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeSnow();
window.addEventListener("resize", resizeSnow);

const flakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 1,
  d: Math.random() * 0.6 + 0.3
}));

function snowLoop() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();

  flakes.forEach(f => {
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    f.y += f.d;
    if (f.y > h) {
      f.y = -5;
      f.x = Math.random() * w;
    }
  });

  ctx.fill();
  requestAnimationFrame(snowLoop);
}

snowLoop();
