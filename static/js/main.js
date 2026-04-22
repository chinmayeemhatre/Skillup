
// ── Active nav link ──
document.querySelectorAll('.nav-links a, .sidebar-link').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

// ── Animated XP / Number counters ──
function animateCounter(el, target, duration = 1200) {
  let start = 0, step = target / (duration / 16);
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start).toLocaleString();
    if (start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function animateProgressBar(bar, targetPct, delay = 400) {
  bar.style.width = '0%';
  setTimeout(() => { bar.style.width = targetPct + '%'; }, delay);
}

// ── Initialise counters on page load ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-count]').forEach(el => {
    animateCounter(el, parseInt(el.dataset.count));
  });
  document.querySelectorAll('[data-progress]').forEach(bar => {
    animateProgressBar(bar, parseFloat(bar.dataset.progress));
  });
  // initStars(); // Particles removed per user request
  initMobileNav();
  initCustomCursor();
});

// Custom golden cursor
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  const reticle = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  reticle.className = 'cursor-reticle';
  document.body.classList.add('has-custom-cursor');
  document.body.append(dot, ring, reticle);

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let reticleX = 0, reticleY = 0;
  let lastSpark = 0;
  
  const interactiveSelector = 'a, button, input, textarea, select, .mini-level, .level-chip, .card, [role="button"], .sidebar-link, .btn';

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const isHovering = Boolean(e.target.closest(interactiveSelector));
    ring.classList.toggle('is-hovering', isHovering);
    dot.classList.toggle('is-hovering', isHovering);
    reticle.classList.toggle('is-hovering', isHovering);

    // Occasional sparks on fast move
    const now = performance.now();
    if (now - lastSpark > 80 && Math.abs(e.movementX) + Math.abs(e.movementY) > 20) {
      lastSpark = now;
      const spark = document.createElement('span');
      spark.className = 'cursor-spark';
      spark.style.left = `${mouseX}px`;
      spark.style.top = `${mouseY}px`;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  });

  function animate() {
    // Smooth trailing
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    reticleX += (mouseX - reticleX) * 0.08;
    reticleY += (mouseY - reticleY) * 0.08;

    dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    reticle.style.transform = `translate(${reticleX}px, ${reticleY}px) translate(-50%, -50%)`;
    
    requestAnimationFrame(animate);
  }

  document.addEventListener('mousedown', () => reticle.classList.add('is-clicking'));
  document.addEventListener('mouseup', () => reticle.classList.remove('is-clicking'));

  animate();
}

// ── Star field ──
function initStars() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const stars = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random(),
    speed: Math.random() * 0.008 + 0.003,
    phase: Math.random() * Math.PI * 2
  }));
  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ── Mobile sidebar ──
function initMobileNav() {
  const btn = document.getElementById('menuBtn');
  const sidebar = document.querySelector('.sidebar');
  if (btn && sidebar) {
    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
}

// ── Toast notifications ──
function showToast(msg, type = 'info', icon = '🔔') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span style="font-size:1.2rem">${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(30px)'; toast.style.transition = 'all 0.4s'; setTimeout(() => toast.remove(), 400); }, 3500);
}

// ── Confetti ──
function launchConfetti() {
  const colors = ['#d6a93a','#f4d47b','#b88928','#8f6816','#fff4cf','#17130b'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left:${Math.random()*100}vw;
      top:-20px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      animation-duration:${2+Math.random()*2}s;
      animation-delay:${Math.random()*0.8}s;
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

// ── Level-up modal ──
function showLevelUp(newLevel, title) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(10,14,26,0.85);z-index:10000;display:grid;place-items:center;backdrop-filter:blur(8px);';
  overlay.innerHTML = `
    <div style="text-align:center;animation:fadeUp 0.5s ease;">
      <div style="font-size:5rem;animation:float 2s ease-in-out infinite;">🚀</div>
      <h2 style="font-family:Outfit,sans-serif;font-size:2.5rem;font-weight:900;color:#f4d47b;text-shadow:0 0 22px rgba(214,169,58,0.35);margin:16px 0 8px;">LEVEL UP!</h2>
      <p style="font-size:1.2rem;color:#f1f5f9;margin-bottom:8px;">You reached <strong>Level ${newLevel}</strong></p>
      <p style="font-size:1rem;color:#f4d47b;margin-bottom:32px;">${title}</p>
      <button onclick="this.closest('div[style]').remove()" style="padding:14px 36px;background:#d6a93a;border:none;border-radius:7px;color:#0e0c08;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 0 30px rgba(214,169,58,0.35);">Continue Journey 🎮</button>
    </div>`;
  document.body.appendChild(overlay);
  launchConfetti();
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

// ── Task completion ──
function completeTask(btn, xpReward) {
  if (btn.dataset.done === '1') return;
  btn.dataset.done = '1';
  btn.textContent = '✅ Done';
  btn.style.background = 'rgba(16,185,129,0.2)';
  btn.style.borderColor = '#10b981';
  btn.style.color = '#10b981';

  // Update XP bar
  const bar = document.querySelector('[data-progress]');
  const xpEl = document.getElementById('currentXP');
  const xpMax = document.getElementById('maxXP');
  if (bar && xpEl && xpMax) {
    let cur = parseInt(xpEl.dataset.xp || xpEl.textContent);
    let max = parseInt(xpMax.dataset.xp || xpMax.textContent);
    cur = Math.min(cur + xpReward, max);
    xpEl.dataset.xp = cur;
    animateCounter(xpEl, cur);
    animateProgressBar(bar, (cur / max) * 100);
  }
  showToast(`+${xpReward} XP earned! Keep going 🔥`, 'success', '⭐');
}

// ── Chat ──
function sendMessage() {
  const input = document.getElementById('chatInput');
  const msgs = document.getElementById('chatMessages');
  const text = input?.value?.trim();
  if (!text || !msgs) return;
  const msg = document.createElement('div');
  msg.style.cssText = 'display:flex;justify-content:flex-end;margin-bottom:12px;';
  msg.innerHTML = `<div style="background:#d6a93a;color:#0e0c08;padding:10px 16px;border-radius:8px 8px 4px 8px;max-width:70%;font-size:0.9rem;line-height:1.5;">${text}</div>`;
  msgs.appendChild(msg);
  msgs.scrollTop = msgs.scrollHeight;
  input.value = '';

  // Simulated reply
  setTimeout(() => {
    const replies = ['Great question! Let me explain...','Sure, I can help with that 👍','Check out this resource: leetcode.com','Try breaking the problem into smaller parts!'];
    const reply = document.createElement('div');
    reply.style.cssText = 'display:flex;gap:10px;margin-bottom:12px;';
    reply.innerHTML = `<div style="width:36px;height:36px;border-radius:8px;background:#d6a93a;color:#0e0c08;display:grid;place-items:center;font-weight:700;flex-shrink:0;">M</div><div style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.08);color:#f1f5f9;padding:10px 16px;border-radius:8px 8px 8px 4px;max-width:70%;font-size:0.9rem;line-height:1.5;">${replies[Math.floor(Math.random()*replies.length)]}</div>`;
    msgs.appendChild(reply);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200);
}

// ── Chat enter key ──
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement?.id === 'chatInput') {
    e.preventDefault();
    sendMessage();
  }
});

// ── Leaderboard search ──
function filterLeaderboard(query) {
  document.querySelectorAll('.lb-row').forEach(row => {
    row.style.display = row.dataset.name?.toLowerCase().includes(query.toLowerCase()) ? '' : 'none';
  });
}

// ── Tab switching ──
function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId)?.classList.add('active');
  btnEl?.classList.add('active');
}

// ── Demo: trigger level up ──
window.demoLevelUp = () => showLevelUp(3, 'Project Builder 🛠️');
window.showToast = showToast;
window.completeTask = completeTask;
window.sendMessage = sendMessage;
window.filterLeaderboard = filterLeaderboard;
window.switchTab = switchTab;
window.launchConfetti = launchConfetti;
