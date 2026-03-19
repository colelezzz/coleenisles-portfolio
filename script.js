// ── BACKGROUND MESH ANIMATION ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], mouseX = 0, mouseY = 0;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = (Math.random() - 0.5) * 0.25;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.col = Math.random() > 0.6 ? '167,139,250' : Math.random() > 0.5 ? '244,114,182' : '124,58,237';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.col},${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

const orbs = [
  { x: 0.15, y: 0.2, r: 320, col: '124,58,237', a: 0.09 },
  { x: 0.85, y: 0.7, r: 260, col: '244,114,182', a: 0.07 },
  { x: 0.5,  y: 0.5, r: 200, col: '167,139,250', a: 0.05 },
];

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  orbs.forEach(o => {
    const grd = ctx.createRadialGradient(o.x*W, o.y*H, 0, o.x*W, o.y*H, o.r);
    grd.addColorStop(0, `rgba(${o.col},${o.a})`);
    grd.addColorStop(1, `rgba(${o.col},0)`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  });
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

// ── COMET TRAIL CURSOR + CLICK EXPLOSION ──
(function() {
  const isMobile = window.matchMedia('(hover: none)').matches;
  if (isMobile) return;

  const cc = document.getElementById('cursor-canvas');
  const cx = cc.getContext('2d');
  cc.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10000;';

  let cw, ch;
  function resizeCC() { cw = cc.width = window.innerWidth; ch = cc.height = window.innerHeight; }
  resizeCC();
  window.addEventListener('resize', resizeCC);

  let mx = -200, my = -200;
  const TRAIL = 28;
  const trail = Array.from({length: TRAIL}, () => ({ x: -200, y: -200, age: 0 }));
  let tIdx = 0;
  let colorT = 0;

  // ── MINIMAL CLICK BURST ──
  const bursts = [];

  class BurstDot {
    constructor(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.5 + 0.8;
      this.x = x; this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1.0;
      this.decay = Math.random() * 0.06 + 0.04;
      this.r = Math.random() * 1.8 + 0.6;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vx *= 0.94; this.vy *= 0.94;
      this.life -= this.decay;
    }
    draw(cx) {
      if (this.life <= 0) return;
      cx.save();
      cx.globalAlpha = Math.max(0, this.life) * 0.75;
      cx.beginPath();
      cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      cx.fillStyle = 'rgba(167,139,250,1)';
      cx.shadowBlur = 6;
      cx.shadowColor = 'rgba(167,139,250,0.6)';
      cx.fill();
      cx.restore();
    }
    get dead() { return this.life <= 0; }
  }

  document.addEventListener('click', e => {
    for (let i = 0; i < 10; i++) bursts.push(new BurstDot(e.clientX, e.clientY));
  });

  function lerpColor(t) {
    const r = Math.round(167 + (244-167)*t);
    const g = Math.round(139 + (114-139)*t);
    const b = Math.round(250 + (182-250)*t);
    return `${r},${g},${b}`;
  }

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  let isHover = false;
  document.querySelectorAll('a,button,.nav-btn,.nav-hire,.port-card,.bottom-nav-btn,input,textarea,select').forEach(el => {
    el.addEventListener('mouseenter', () => { isHover = true; });
    el.addEventListener('mouseleave', () => { isHover = false; });
  });

  function renderCursor() {
    cx.clearRect(0, 0, cw, ch);
    colorT = (Math.sin(Date.now() * 0.001) + 1) / 2;
    const col = lerpColor(colorT);

    // update + draw minimal burst dots
    for (let i = bursts.length - 1; i >= 0; i--) {
      bursts[i].update();
      bursts[i].draw(cx);
      if (bursts[i].dead) bursts.splice(i, 1);
    }

    trail[tIdx] = { x: mx, y: my, age: 0 };
    tIdx = (tIdx + 1) % TRAIL;
    trail.forEach(p => p.age++);

    for (let i = 0; i < TRAIL - 1; i++) {
      const a = trail[(tIdx + i) % TRAIL];
      const b = trail[(tIdx + i + 1) % TRAIL];
      const prog = i / TRAIL;
      const alpha = prog * 0.55;
      const width = prog * 3.5;
      if (width < 0.1) continue;
      cx.beginPath();
      cx.moveTo(a.x, a.y);
      cx.lineTo(b.x, b.y);
      cx.strokeStyle = `rgba(${col},${alpha})`;
      cx.lineWidth = width;
      cx.lineCap = 'round';
      cx.stroke();
    }

    cx.save();
    cx.translate(mx, my);
    const rot = isHover ? Date.now() * 0.003 : 0;
    cx.rotate(rot);
    const headSize = isHover ? 9 : 7;

    cx.shadowBlur = 16;
    cx.shadowColor = `rgba(${col},0.7)`;
    cx.beginPath();
    cx.moveTo(0, -headSize);
    cx.lineTo(headSize * 0.6, 0);
    cx.lineTo(0, headSize);
    cx.lineTo(-headSize * 0.6, 0);
    cx.closePath();
    cx.fillStyle = `rgba(${col},0.9)`;
    cx.fill();

    cx.shadowBlur = 0;
    cx.beginPath();
    cx.moveTo(0, -headSize * 0.45);
    cx.lineTo(headSize * 0.28, 0);
    cx.lineTo(0, headSize * 0.45);
    cx.lineTo(-headSize * 0.28, 0);
    cx.closePath();
    cx.fillStyle = `rgba(255,255,255,0.85)`;
    cx.fill();
    cx.restore();

    requestAnimationFrame(renderCursor);
  }
  renderCursor();
}());

// ── NAV / SECTION SWITCHING ──
const sections = document.querySelectorAll('.section');

function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-btn, .bottom-nav-btn').forEach(b => {
    b.classList.toggle('active-btn', b.dataset.id === id);
  });

  if (id === 'about') animateSkills();
  if (id === 'services') { animateAchievements(); animateSkills(); }
  updateScrollBtn(id);
  window.scrollTo(0, 0);
}

document.querySelectorAll('[data-id]').forEach(el => {
  el.addEventListener('click', function(e) {
    const id = this.dataset.id;
    if (id) { e.preventDefault(); showSection(id); }
  });
});

// ── SKILL BARS ──
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 100);
  });
}

// ── ACHIEVEMENT COUNTER ANIMATION ──
function animateAchievements() {
  document.querySelectorAll('.achieve-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (el.dataset.suffix || '');
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

// ── PORTFOLIO FILTER ──
document.querySelectorAll('.port-filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.port-filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.port-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.animation = 'fadeSlide 0.4s ease both';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── EMAILJS SETUP ──
// STEP 1: Go to https://www.emailjs.com and create a free account
// STEP 2: Add a service (connect your Gmail: islesleen@gmail.com) → copy the Service ID
// STEP 3: Create an email template with these variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}} → copy the Template ID
// STEP 4: Go to Account → API Keys → copy your Public Key
// STEP 5: Replace the three placeholder values below with your actual IDs

const EMAILJS_PUBLIC_KEY  = 'VIkQ22U3mSZvyunaz';
const EMAILJS_SERVICE_ID  = 'service_09xvphh';
const EMAILJS_TEMPLATE_ID = 'template_osryicp';

emailjs.init(EMAILJS_PUBLIC_KEY);

// ── CONTACT FORM ──
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  const name    = document.getElementById('from_name').value.trim();
  const email   = document.getElementById('from_email').value.trim();
  const subject = document.getElementById('subject').value || 'No subject selected';
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) return;

  // Guard: keys not yet configured
  if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
    alert('Email form is not configured yet. Please follow the EmailJS setup steps in script.js.');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name,
    from_email: email,
    subject:    subject,
    message:    message,
    to_email:   'islesleen@gmail.com'
  }).then(() => {
    this.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }).catch((err) => {
    console.error('EmailJS error:', err);
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    alert('Oops! Something went wrong. Please try again or email me directly at islesleen@gmail.com');
  });
});

// ── SCROLL TO TOP ──
const scrollTopBtn = document.getElementById('scrollTop');

function updateScrollBtn(id) {
  // hide on home section regardless
  if (id === 'home') {
    scrollTopBtn.classList.remove('show');
    return;
  }
}

window.addEventListener('scroll', () => {
  const activeSection = document.querySelector('.section.active');
  const isHome = activeSection && activeSection.id === 'home';
  if (!isHome && window.scrollY > 200) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── SKILLS TAB TOGGLE (in services) ──
document.querySelectorAll('.skill-tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const group = this.dataset.group;
    document.querySelectorAll('.skill-tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.skill-tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.group === group);
    });
    // re-animate bars in active panel
    setTimeout(() => {
      document.querySelectorAll('.skill-tab-panel.active .skill-fill').forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 50);
      });
    }, 10);
  });
});