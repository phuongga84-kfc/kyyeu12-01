/* --- GOLD DUST PARTICLES (Canvas) --- */
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1; // Size of gold dust
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 + 0.5; // Falling down
    this.color = `rgba(197, 160, 89, ${Math.random() * 0.5 + 0.2})`; // Gold color
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.01; // Fade out slowly (optional)

    // Reset if out of screen
    if (this.y > canvas.height || this.size <= 0.2) {
      this.y = 0 - this.size;
      this.x = Math.random() * canvas.width;
      this.size = Math.random() * 3 + 1;
      this.speedY = Math.random() * 1 + 0.5;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 70; i++) {
    // Number of particles
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

/* --- SCROLL ANIMATION --- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* --- COUNTDOWN --- */
const eventDate = new Date("March 14, 2026 17:00:00").getTime();

const timer = setInterval(function () {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    clearInterval(timer);
    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = d < 10 ? "0" + d : d;
  document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
  document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
  document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
}, 1000);

/* --- MUSIC PLAYER OPTIMIZED --- */
const music = document.getElementById("bg-music");
const btn = document.getElementById("musicBtn");
music.volume = 0.5;

// Hàm cập nhật giao diện nút dựa trên trạng thái thực tế của nhạc
function updateButtonUI() {
    if (!music.paused) {
        btn.innerHTML = "❚❚"; 
        btn.classList.add("music-anim");
    } else {
        btn.innerHTML = "♫";
        btn.classList.remove("music-anim");
    }
}

// Lắng nghe sự kiện từ chính thẻ audio để cập nhật icon
music.onplay = updateButtonUI;
music.onpause = updateButtonUI;

// Hàm cố gắng phát nhạc
function attemptPlay() {
    music.play().catch(() => {
        console.log("Trình duyệt chặn tự động phát, chờ tương tác...");
    });
}

// 1. Thử phát ngay khi trang load
window.addEventListener('load', attemptPlay);

// 2. Kích hoạt khi có bất kỳ tương tác nào của người dùng vào trang
const interactions = ['click', 'touchstart', 'scroll', 'keydown'];
interactions.forEach(event => {
    document.addEventListener(event, function() {
        if (music.paused) {
            attemptPlay();
        }
    }, { once: true }); // Chỉ chạy 1 lần duy nhất để kích hoạt nhạc
});

// 3. Hàm cho nút bấm thủ công
function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
