/* =====================================================================
   CONFIG: everything you may want to change lives here.
   ===================================================================== */
const CONFIG = {
  // Birthday (local time of whoever opens the site). Month is 0-based: 9 = October.
  birthday: { year: 2026, month: 9, day: 31 },

  // PHOTOS: put the EXACT filenames from assets/photos here, e.g. ['trip 1.jpg', 'us.png'].
  // Leave it empty [] and the site tries to read the folder automatically (works with VS Code Live Server).
  // Tip: run `node tools/make-photo-list.js` to print the exact names. Spaces are fine.
  photoDir: 'assets/photos/',
  photos: [],

  // MUSIC: exact filename inside assets/music/, e.g. 'my song.mp3'. Leave '' to auto-detect the first audio file.
  musicDir: 'assets/music/',
  musicFile: '',

  // Small handwritten captions under the photos (cycled in order). Edit freely.
  captions: ['a happy moment ♡', 'good times', 'my favourite person', 'pure smiles', 'memories to keep', 'so you', 'sweet day', 'forever grateful']
};

// ---- Letter text (edit here). Each string is one paragraph. ----
const LETTER = [
  "Happy 22nd Birthday, Vaishu! 💜",
  "Some people make the world brighter simply by being in it, and you're one of those rare people. Your kind heart, your caring nature, and the warmth you bring to the people around you make you truly special.",
  "I hope this new chapter of your life brings you endless happiness, beautiful memories, genuine smiles, peaceful days, and dreams that come true. Never forget how precious you are and how much your kindness means.",
  "May you always find reasons to smile, people who appreciate your heart, and moments that remind you how beautiful life can be.",
  "Keep being the wonderful person you are. You deserve all the love and happiness this world has to offer.",
  "Happy Birthday, Vaishu! May your 22nd year be as beautiful as your heart. 💙✨"
];

// ---- 22 reasons (edit freely) ----
const REASONS = [
  "Your kindness reaches people before you even say a word.",
  "You care deeply, and it shows in the little things.",
  "Your smile can make a heavy day feel lighter.",
  "You are a friend people feel safe with.",
  "You make everyone around you feel seen.",
  "Your heart is gentle and genuine.",
  "You bring warmth wherever you go.",
  "Your positivity is quietly contagious.",
  "You listen with real care.",
  "You see the good in people.",
  "Your sweetness is never pretending.",
  "You make ordinary days feel softer.",
  "You are thoughtful in ways others may not notice.",
  "Your laughter is a gift to anyone who hears it.",
  "You are patient and understanding.",
  "You bring comfort just by being there.",
  "Your loyalty makes friendships feel like home.",
  "You deserve the same kindness you give.",
  "Your presence feels like sunshine on a calm day.",
  "You are braver and stronger than you realise.",
  "You make people want to be better, gently.",
  "You are simply, wonderfully, you."
];

const WISHES = [
  "May your days be filled with gentle joy and good surprises. 🌸",
  "May everyone you love always love you back just as much. 💜",
  "Wishing you peace in your heart and laughter in your days. ✨",
  "May this year hand you the dreams you've been quietly carrying. 🌙",
  "May you always find people who appreciate your beautiful heart. 💙",
  "Wishing you soft mornings, sweet moments and endless smiles. ☁️",
  "May good things keep finding you, again and again. 🌷",
  "May you feel as loved today as you make others feel every day. 🤍",
  "Wishing you courage for new things and calm for the hard ones. 🦋",
  "May your 22nd year be your most beautiful chapter yet. 🎀"
];

const $ = id => document.getElementById(id);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Floating hearts / stars (light: 14 elements) ---------- */
(function floaters() {
  const box = $('floaters'), icons = ['💜', '💙', '✦', '♡', '⭐', '✧'];
  const n = reduceMotion ? 0 : (innerWidth < 600 ? 9 : 14);
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.className = 'fl'; s.textContent = icons[i % icons.length];
    s.style.cssText = `left:${Math.random() * 100}%;font-size:${12 + Math.random() * 16}px;animation-duration:${14 + Math.random() * 16}s;animation-delay:${-Math.random() * 25}s;color:${i % 2 ? '#8FB4E8' : '#B9A3F2'}`;
    box.appendChild(s);
  }
})();

/* ---------- Cakes ---------- */
function buildCake(el, candles) {
  el.innerHTML = '<div class="candles">' + '<div class="candle"><i class="flame"></i></div>'.repeat(candles) +
    '</div><div class="tier t1"></div><div class="tier t2"></div><div class="plate"></div>';
}
buildCake($('heroCake'), 3);
buildCake($('wishCake'), 22);

/* ---------- Confetti (tiny canvas, no libraries) ---------- */
const cv = $('confetti'), cx = cv.getContext('2d');
let bits = [], raf = 0;
function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
sizeCanvas(); addEventListener('resize', sizeCanvas);
function confetti(count = 130) {
  if (reduceMotion) return;
  const colors = ['#B9A3F2', '#8FB4E8', '#E8DFFF', '#FFD6EC', '#BFE8DA', '#fff'];
  for (let i = 0; i < count; i++) bits.push({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .4, vx: (Math.random() - .5) * 12, vy: -Math.random() * 12 - 3, r: 4 + Math.random() * 5, a: Math.random() * 6, c: colors[i % colors.length], life: 1 });
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  bits = bits.filter(b => b.life > 0 && b.y < cv.height + 20);
  bits.forEach(b => { b.vy += .22; b.x += b.vx; b.y += b.vy; b.vx *= .99; b.a += .15; b.life -= .004;
    cx.save(); cx.globalAlpha = Math.max(b.life, 0); cx.translate(b.x, b.y); cx.rotate(b.a); cx.fillStyle = b.c; cx.fillRect(-b.r, -b.r / 2, b.r * 2, b.r); cx.restore(); });
  raf = bits.length ? requestAnimationFrame(tick) : 0;
  if (!bits.length) cx.clearRect(0, 0, cv.width, cv.height);
}

/* ---------- Hero button: unlock the site ---------- */
$('openBtn').addEventListener('click', () => {
  $('site').classList.remove('locked');
  confetti(160);
  watchReveals();
  $('letter').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* ---------- Envelope + typewriter letter ---------- */
let typed = false, skipType = false;
$('envelope').addEventListener('click', async e => {
  const env = e.currentTarget; if (typed) return; typed = true;
  env.classList.add('opened'); env.setAttribute('aria-expanded', 'true'); $('envHint').textContent = 'Tap the letter to show it all at once';
  const card = $('letterCard'), body = $('letterBody'); card.classList.add('show');
  card.addEventListener('click', () => skipType = true);
  for (const text of LETTER) {
    const p = document.createElement('p'); body.appendChild(p); p.classList.add('caret');
    if (reduceMotion) { p.textContent = text; p.classList.remove('caret'); continue; }
    for (const ch of [...text]) { p.textContent += ch; if (!skipType) await new Promise(r => setTimeout(r, 22)); }
    p.classList.remove('caret');
  }
  confetti(60);
});

/* ---------- Countdown (visitor's local time zone) ---------- */
const B = CONFIG.birthday, target = new Date(B.year, B.month, B.day, 0, 0, 0);
const endOfDay = new Date(B.year, B.month, B.day + 1, 0, 0, 0);
let cdDone = false;
function updateCountdown() {
  const now = new Date(), diff = target - now;
  if (diff <= 0) {
    $('cdBox').hidden = true; const m = $('cdMsg'); m.hidden = false;
    m.textContent = now < endOfDay ? "It's your birthday, Vaishu! 🎂💜 Today is all about you." : "Happy Birthday, Vaishu! 🎉💙 Hope your special day was beautiful.";
    if (!cdDone) { cdDone = true; confetti(70); } return;
  }
  const s = Math.floor(diff / 1000);
  $('cdD').textContent = Math.floor(s / 86400); $('cdH').textContent = Math.floor(s % 86400 / 3600);
  $('cdM').textContent = Math.floor(s % 3600 / 60); $('cdS').textContent = s % 60;
}
updateCountdown(); setInterval(updateCountdown, 1000);

/* ---------- Reasons, wishes, blow candles ---------- */
$('reasonGrid').innerHTML = REASONS.map((r, i) => `<div class="card glass"><em>${i + 1}</em>${r}</div>`).join('');
let lastWish = -1;
$('wishBtn').addEventListener('click', () => {
  let i; do { i = Math.floor(Math.random() * WISHES.length); } while (i === lastWish); lastWish = i;
  $('wishText').textContent = WISHES[i];
});
$('blowBtn').addEventListener('click', () => {
  const cake = $('wishCake'); if (cake.classList.contains('out')) { // relight
    cake.classList.remove('out'); $('blowMsg').hidden = true; $('blowBtn').textContent = 'Blow out the candles 🕯️'; return; }
  [...cake.querySelectorAll('.flame')].forEach((f, i) => f.style.transitionDelay = i * 40 + 'ms');
  cake.classList.add('out'); $('blowMsg').hidden = false; $('blowBtn').textContent = 'Light them again ✨';
  setTimeout(() => confetti(110), 700);
});
$('topBtn').addEventListener('click', () => $('top').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }));

/* ---------- Fade-in on scroll ---------- */
function watchReveals() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.sec').forEach(s => { s.classList.add('rev'); io.observe(s); });
}

/* ---------- Find real files (explicit list first, then folder listing) ---------- */
const enc = (dir, name) => dir + encodeURIComponent(name);   // handles spaces & special characters
async function discover(dir, re) {
  try {
    const res = await fetch(dir); if (!res.ok) return [];
    const html = await res.text(), out = [];
    for (const m of html.matchAll(/href="([^"]+)"/g)) {
      const name = decodeURIComponent(m[1].split('?')[0].split('/').filter(Boolean).pop() || '');
      if (re.test(name) && !out.includes(name)) out.push(name);
    }
    return out;
  } catch { return []; }
}

/* ---------- Gallery + lightbox ---------- */
let shots = [], cur = 0, opener = null;
async function initGallery() {
  const names = CONFIG.photos.length ? CONFIG.photos : await discover(CONFIG.photoDir, /\.(jpe?g|png|webp|gif|avif)$/i);
  const g = $('gallery');
  if (!names.length) {
    g.outerHTML = '<p class="empty glass">No photos found yet. Add your exact filenames to <b>CONFIG.photos</b> in script.js (or open the site with VS Code Live Server so the folder can be read).</p>';
    $('galleryHint').hidden = true; return;
  }
  names.forEach((n, i) => {
    const src = enc(CONFIG.photoDir, n), cap = CONFIG.captions[i % CONFIG.captions.length];
    const b = document.createElement('button'); b.className = 'polaroid'; b.style.setProperty('--r', ((i % 5) - 2) * 1.2 + 'deg');
    b.setAttribute('aria-label', 'Open photo ' + (i + 1));
    b.innerHTML = `<img loading="lazy" alt="Memory ${i + 1}" src="${src}"><span>${cap}</span>`;
    b.querySelector('img').onerror = () => { b.remove(); shots = shots.filter(s => s.src !== src); }; // skip broken files
    b.onclick = () => openLb(shots.findIndex(s => s.src === src), b);
    shots.push({ src, cap }); g.appendChild(b);
  });
}
const lb = $('lightbox');
function showLb(i) { cur = (i + shots.length) % shots.length; $('lbImg').src = shots[cur].src; $('lbImg').alt = 'Memory ' + (cur + 1); $('lbCap').textContent = shots[cur].cap; }
function openLb(i, from) { opener = from; showLb(i); lb.hidden = false; $('lbClose').focus(); document.body.style.overflow = 'hidden'; }
function closeLb() { lb.hidden = true; document.body.style.overflow = ''; opener && opener.focus(); }
$('lbClose').onclick = closeLb; $('lbPrev').onclick = () => showLb(cur - 1); $('lbNext').onclick = () => showLb(cur + 1);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') showLb(cur - 1); if (e.key === 'ArrowRight') showLb(cur + 1); });
let tx = 0; lb.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) showLb(cur + (d < 0 ? 1 : -1)); });

/* ---------- Music player (no autoplay; visitor presses play) ---------- */
const audio = $('audio'), msg = $('musicMsg');
async function initMusic() {
  const file = CONFIG.musicFile || (await discover(CONFIG.musicDir, /\.(mp3|m4a|wav|ogg|aac|flac)$/i))[0];
  if (!file) { msg.textContent = 'Add your song to assets/music/'; return; }
  audio.src = enc(CONFIG.musicDir, file);
}
audio.addEventListener('error', () => { if (audio.src) { msg.textContent = 'Music could not load. Check the filename in CONFIG.'; $('player').classList.remove('playing'); $('playBtn').textContent = '▶'; } });
$('playBtn').addEventListener('click', async () => {
  if (!audio.src) { msg.textContent = 'No song found in assets/music/'; return; }
  try { if (audio.paused) { await audio.play(); } else audio.pause(); msg.textContent = ''; } catch { msg.textContent = 'Music could not play.'; }
});
audio.addEventListener('play', () => { $('player').classList.add('playing'); $('playBtn').textContent = '❚❚'; $('playBtn').setAttribute('aria-label', 'Pause music'); });
audio.addEventListener('pause', () => { $('player').classList.remove('playing'); $('playBtn').textContent = '▶'; $('playBtn').setAttribute('aria-label', 'Play music'); });
audio.loop = true;
audio.addEventListener('timeupdate', () => { if (audio.duration) $('seek').value = audio.currentTime / audio.duration * 100; });
$('seek').addEventListener('input', e => { if (audio.duration) audio.currentTime = e.target.value / 100 * audio.duration; });
$('muteBtn').addEventListener('click', () => { audio.muted = !audio.muted; $('muteBtn').textContent = audio.muted ? '🔇' : '🔊'; $('muteBtn').setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute'); });

initGallery(); initMusic();
