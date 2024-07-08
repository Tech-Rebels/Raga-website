var canvas = document.querySelector("#scene"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = { x: 0, y: 0 },
  radius = 1;

  if (window.matchMedia("(min-width: 1440px)").matches) {
    // PC: 1440px and lower
    fSize = 7;
    r1 = 5;
    r2 = 2;
  } else if (window.matchMedia("(min-width: 1024px)").matches) {
    // PC: 1024px and lower
    fSize = 5;
    r1 = 3;
    r2 = 1.2;
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    // Tablet: 769px and lower
    fSize = 5;
    r1 = 2.5;
    r2 = 1.1;
  } else if (window.matchMedia("(min-width: 126px)").matches) {
    // Mobile: 426px and lower
    fSize = 3.5;
    r1 = 2;
    r2 = 0.25;
  }



// var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];
// var colors = ["#0081a7","#00afb9", "#fdfcdc","#fed9b7", "#f07167"];
// var colors = ["#e63946","#f1faee", "#a8dadc","#457b9d", "#1d3557"];
// var colors = ["#cb1b16", "#ff002b", "#e63946","#bfc6bd", "#a8dadc","#457b9d", "#1d3557"];
var colors = ["#800016", "#a0001c", "#c00021", "#ff002b", "#ef233c"];

var copy = document.querySelector("#copy");

var ww = (canvas.width = window.innerWidth);
var wh = (canvas.height = window.innerHeight);

function Particle(x, y) {
  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = {
    x: x,
    y: y,
  };
  this.r = Math.random() * r1 + r2;
  this.vx = (Math.random() - 0.5) * 20;
  this.vy = (Math.random() - 0.5) * 20;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.05 + 0.94;

  this.color = colors[Math.floor(Math.random() * 6)];
}

Particle.prototype.render = function () {
  this.accX = (this.dest.x - this.x) / 1000;
  this.accY = (this.dest.y - this.y) / 1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt(a * a + b * b);
  if (distance < radius * 70) {
    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

function initScene() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold " + ww / fSize + "px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(copy.value, ww / 2, wh / 2);

  var data = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  for (var i = 0; i < ww; i += Math.round(ww / 150)) {
    for (var j = 0; j < wh; j += Math.round(ww / 150)) {
      if (data[(i + j * ww) * 4 + 3] > 150) {
        particles.push(new Particle(i, j));
      }
    }
  }
  amount = particles.length;
}

function onMouseClick() {
  radius++;
  if (radius === 5) {
    radius = 0;
  }
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
}

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);

