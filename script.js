/* =====================================================================
   CONFIG: everything you may want to change lives here.
   ===================================================================== */

const CONFIG = {
  // Birthday (month is 0-based: 9 = October).
  birthday: { year: 2026, month: 9, day: 31 },

  // Photos: leave [] to discover images automatically on GitHub Pages.
  photoDir: 'assets/photos/',
  photos: [],

  // Music: leave '' to discover the first supported audio file automatically.
  musicDir: 'assets/music/',
  musicFile: '',

  // Captions displayed under photos.
  captions: [
    'a happy moment ♡',
    'good times',
    'my favourite person',
    'pure smiles',
    'memories to keep',
    'so you',
    'sweet day',
    'forever grateful'
  ]
};


// ---- Birthday letter ----

const LETTER = [
  "Happy 22nd Birthday, Vaishu! 💜",

  "Some people make the world brighter simply by being in it, and you're one of those rare people. Your kind heart, your caring nature, and the warmth you bring to the people around you make you truly special.",

  "I hope this new chapter of your life brings you endless happiness, beautiful memories, genuine smiles, peaceful days, and dreams that come true. Never forget how precious you are and how much your kindness means.",

  "May you always find reasons to smile, people who appreciate your heart, and moments that remind you how beautiful life can be.",

  "Keep being the wonderful person you are. You deserve all the love and happiness this world has to offer.",

  "Happy Birthday, Vaishu! May your 22nd year be as beautiful as your heart. 💙✨"
];


// ---- 22 reasons ----

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


// ---- Birthday wishes ----

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

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;


// =====================================================================
// FLOATING HEARTS AND STARS
// =====================================================================

(function floaters() {
  const box = $('floaters');

  if (!box) return;

  const icons = ['💜', '💙', '✦', '♡', '⭐', '✧'];
  const count = reduceMotion ? 0 : (window.innerWidth < 600 ? 9 : 14);

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');

    span.className = 'fl';
    span.textContent = icons[i % icons.length];

    span.style.cssText =
      `left:${Math.random() * 100}%;` +
      `font-size:${12 + Math.random() * 16}px;` +
      `animation-duration:${14 + Math.random() * 16}s;` +
      `animation-delay:${-Math.random() * 25}s;` +
      `color:${i % 2 ? '#8FB4E8' : '#B9A3F2'}`;

    box.appendChild(span);
  }
})();


// =====================================================================
// BIRTHDAY CAKES
// =====================================================================

function buildCake(element, candles) {
  if (!element) return;

  element.innerHTML =
    '<div class="candles">' +
    '<div class="candle"><i class="flame"></i></div>'.repeat(candles) +
    '</div>' +
    '<div class="tier t1"></div>' +
    '<div class="tier t2"></div>' +
    '<div class="plate"></div>';
}

buildCake($('heroCake'), 3);
buildCake($('wishCake'), 22);


// =====================================================================
// CONFETTI
// =====================================================================

const canvas = $('confetti');
const ctx = canvas ? canvas.getContext('2d') : null;

let confettiBits = [];
let animationFrame = 0;

function sizeCanvas() {
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

sizeCanvas();
window.addEventListener('resize', sizeCanvas);

function confetti(count = 130) {
  if (reduceMotion || !canvas || !ctx) return;

  const colors = [
    '#B9A3F2',
    '#8FB4E8',
    '#E8DFFF',
    '#FFD6EC',
    '#BFE8DA',
    '#FFFFFF'
  ];

  for (let i = 0; i < count; i++) {
    confettiBits.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 12 - 3,
      r: 4 + Math.random() * 5,
      a: Math.random() * 6,
      c: colors[i % colors.length],
      life: 1
    });
  }

  if (!animationFrame) {
    animationFrame = requestAnimationFrame(tick);
  }
}

function tick() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiBits = confettiBits.filter(
    bit => bit.life > 0 && bit.y < canvas.height + 20
  );

  confettiBits.forEach(bit => {
    bit.vy += 0.22;
    bit.x += bit.vx;
    bit.y += bit.vy;
    bit.vx *= 0.99;
    bit.a += 0.15;
    bit.life -= 0.004;

    ctx.save();
    ctx.globalAlpha = Math.max(bit.life, 0);
    ctx.translate(bit.x, bit.y);
    ctx.rotate(bit.a);
    ctx.fillStyle = bit.c;
    ctx.fillRect(-bit.r, -bit.r / 2, bit.r * 2, bit.r);
    ctx.restore();
  });

  animationFrame = confettiBits.length
    ? requestAnimationFrame(tick)
    : 0;

  if (!confettiBits.length) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}


// =====================================================================
// OPEN THE BIRTHDAY WEBSITE
// =====================================================================

if ($('openBtn')) {
  $('openBtn').addEventListener('click', () => {
    if ($('site')) {
      $('site').classList.remove('locked');
    }

    confetti(160);
    watchReveals();

    if ($('letter')) {
      $('letter').scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    }
  });
}


// =====================================================================
// ENVELOPE AND TYPEWRITER LETTER
// =====================================================================

let typed = false;
let skipType = false;

if ($('envelope')) {
  $('envelope').addEventListener('click', async event => {
    const envelope = event.currentTarget;

    if (typed) return;
    typed = true;

    envelope.classList.add('opened');
    envelope.setAttribute('aria-expanded', 'true');

    if ($('envHint')) {
      $('envHint').textContent = 'Tap the letter to show it all at once';
    }

    const card = $('letterCard');
    const body = $('letterBody');

    if (!card || !body) return;

    card.classList.add('show');

    card.addEventListener('click', () => {
      skipType = true;
    });

    for (const paragraphText of LETTER) {
      const paragraph = document.createElement('p');

      body.appendChild(paragraph);
      paragraph.classList.add('caret');

      if (reduceMotion) {
        paragraph.textContent = paragraphText;
        paragraph.classList.remove('caret');
        continue;
      }

      for (const character of [...paragraphText]) {
        paragraph.textContent += character;

        if (!skipType) {
          await new Promise(resolve => setTimeout(resolve, 22));
        }
      }

      paragraph.classList.remove('caret');
    }

    confetti(60);
  });
}


// =====================================================================
// BIRTHDAY COUNTDOWN
// =====================================================================

const birthday = CONFIG.birthday;

const targetDate = new Date(
  birthday.year,
  birthday.month,
  birthday.day,
  0, 0, 0
);

const endOfBirthday = new Date(
  birthday.year,
  birthday.month,
  birthday.day + 1,
  0, 0, 0
);

let countdownFinished = false;

function updateCountdown() {
  if (!$('cdBox') || !$('cdMsg')) return;

  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    $('cdBox').hidden = true;
    $('cdMsg').hidden = false;

    $('cdMsg').textContent = now < endOfBirthday
      ? "It's your birthday, Vaishu! 🎂💜 Today is all about you."
      : "Happy Birthday, Vaishu! 🎉💙 Hope your special day was beautiful.";

    if (!countdownFinished) {
      countdownFinished = true;
      confetti(70);
    }

    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  if ($('cdD')) {
    $('cdD').textContent = Math.floor(totalSeconds / 86400);
  }

  if ($('cdH')) {
    $('cdH').textContent = Math.floor(totalSeconds % 86400 / 3600);
  }

  if ($('cdM')) {
    $('cdM').textContent = Math.floor(totalSeconds % 3600 / 60);
  }

  if ($('cdS')) {
    $('cdS').textContent = totalSeconds % 60;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);


// =====================================================================
// REASONS, WISHES, AND BLOWING OUT CANDLES
// =====================================================================

if ($('reasonGrid')) {
  $('reasonGrid').innerHTML = REASONS.map(
    (reason, index) =>
      `<div class="card glass"><em>${index + 1}</em>${reason}</div>`
  ).join('');
}

let lastWish = -1;

if ($('wishBtn')) {
  $('wishBtn').addEventListener('click', () => {
    let index;

    do {
      index = Math.floor(Math.random() * WISHES.length);
    } while (index === lastWish);

    lastWish = index;

    if ($('wishText')) {
      $('wishText').textContent = WISHES[index];
    }
  });
}

if ($('blowBtn')) {
  $('blowBtn').addEventListener('click', () => {
    const cake = $('wishCake');

    if (!cake || !$('blowBtn')) return;

    if (cake.classList.contains('out')) {
      cake.classList.remove('out');

      if ($('blowMsg')) {
        $('blowMsg').hidden = true;
      }

      $('blowBtn').textContent = 'Blow out the candles 🕯️';
      return;
    }

    [...cake.querySelectorAll('.flame')].forEach((flame, index) => {
      flame.style.transitionDelay = `${index * 40}ms`;
    });

    cake.classList.add('out');

    if ($('blowMsg')) {
      $('blowMsg').hidden = false;
    }

    $('blowBtn').textContent = 'Light them again ✨';

    setTimeout(() => confetti(110), 700);
  });
}

if ($('topBtn')) {
  $('topBtn').addEventListener('click', () => {
    if ($('top')) {
      $('top').scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    }
  });
}


// =====================================================================
// FADE-IN ON SCROLL
// =====================================================================

function watchReveals() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.sec').forEach(section => {
      section.classList.add('in');
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.sec').forEach(section => {
    section.classList.add('rev');
    observer.observe(section);
  });
}


// =====================================================================
// GITHUB PAGES FILE DISCOVERY
// =====================================================================

// Your public GitHub repository.
// Folder listing is not available on GitHub Pages, so use the GitHub API.
const GITHUB_REPOSITORY = 'lokeshsolomon173-lab/VAISHU-BRITHDAY';
const GITHUB_BRANCH = 'main';

const enc = (directory, filename) =>
  directory + filename.split('/').map(encodeURIComponent).join('/');

async function discover(directory, pattern) {
  try {
    const folder = directory.replace(/^\/+|\/+$/g, '');

    const apiURL =
      `https://api.github.com/repos/${GITHUB_REPOSITORY}` +
      `/contents/${folder}?ref=${GITHUB_BRANCH}`;

    const response = await fetch(apiURL, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned HTTP ${response.status}`);
    }

    const items = await response.json();

    if (!Array.isArray(items)) return [];

    return items
      .filter(item => item.type === 'file' && pattern.test(item.name))
      .map(item => item.name)
      .sort((a, b) =>
        a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: 'base'
        })
      );

  } catch (error) {
    console.warn(`Could not discover files in ${directory}:`, error);
    return [];
  }
}


// =====================================================================
// PHOTO GALLERY AND LIGHTBOX
// =====================================================================

let shots = [];
let currentPhoto = 0;
let lightboxOpener = null;

async function initGallery() {
  const gallery = $('gallery');

  if (!gallery) return;

  const filenames = CONFIG.photos.length
    ? CONFIG.photos
    : await discover(
        CONFIG.photoDir,
        /\.(jpe?g|png|webp|gif|avif)$/i
      );

  if (!filenames.length) {
    gallery.innerHTML =
      '<p class="empty glass">' +
      'No photos found. Check that image files are uploaded to ' +
      'assets/photos/ in the GitHub repository.' +
      '</p>';

    if ($('galleryHint')) {
      $('galleryHint').hidden = true;
    }

    return;
  }

  filenames.forEach((filename, index) => {
    const source = enc(CONFIG.photoDir, filename);
    const caption =
      CONFIG.captions[index % CONFIG.captions.length];

    const button = document.createElement('button');

    button.className = 'polaroid';

    button.style.setProperty(
      '--r',
      `${((index % 5) - 2) * 1.2}deg`
    );

    button.setAttribute('aria-label', `Open photo ${index + 1}`);

    const image = document.createElement('img');

    image.loading = 'lazy';
    image.alt = `Memory ${index + 1}`;
    image.src = source;

    const captionElement = document.createElement('span');
    captionElement.textContent = caption;

    button.appendChild(image);
    button.appendChild(captionElement);

    image.addEventListener('error', () => {
      console.error('Could not load photo:', source);
      button.remove();
      shots = shots.filter(photo => photo.src !== source);
    });

    button.addEventListener('click', () => {
      const photoIndex = shots.findIndex(
        photo => photo.src === source
      );

      if (photoIndex !== -1) {
        openLightbox(photoIndex, button);
      }
    });

    shots.push({
      src: source,
      caption
    });

    gallery.appendChild(button);
  });
}

const lightbox = $('lightbox');

function showLightbox(index) {
  if (!shots.length || !$('lbImg') || !$('lbCap')) return;

  currentPhoto = (index + shots.length) % shots.length;

  $('lbImg').src = shots[currentPhoto].src;
  $('lbImg').alt = `Memory ${currentPhoto + 1}`;
  $('lbCap').textContent = shots[currentPhoto].caption;
}

function openLightbox(index, opener) {
  if (!lightbox || !shots.length) return;

  lightboxOpener = opener;
  showLightbox(index);

  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';

  if ($('lbClose')) {
    $('lbClose').focus();
  }
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;
  document.body.style.overflow = '';

  if (lightboxOpener) {
    lightboxOpener.focus();
  }
}

if (lightbox) {
  if ($('lbClose')) {
    $('lbClose').addEventListener('click', closeLightbox);
  }

  if ($('lbPrev')) {
    $('lbPrev').addEventListener('click', () => {
      showLightbox(currentPhoto - 1);
    });
  }

  if ($('lbNext')) {
    $('lbNext').addEventListener('click', () => {
      showLightbox(currentPhoto + 1);
    });
  }

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', event => {
    if (lightbox.hidden) return;

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      showLightbox(currentPhoto - 1);
    }

    if (event.key === 'ArrowRight') {
      showLightbox(currentPhoto + 1);
    }
  });

  let touchStartX = 0;

  lightbox.addEventListener('touchstart', event => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', event => {
    const difference =
      event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(difference) > 50) {
      showLightbox(currentPhoto + (difference < 0 ? 1 : -1));
    }
  });
}


// =====================================================================
// MUSIC PLAYER
// =====================================================================

const audio = $('audio');
const musicMessage = $('musicMsg');

async function initMusic() {
  if (!audio) return;

  try {
    const filename = CONFIG.musicFile ||
      (await discover(
        CONFIG.musicDir,
        /\.(mp3|m4a|wav|ogg|aac|flac)$/i
      ))[0];

    if (!filename) {
      if (musicMessage) {
        musicMessage.textContent =
          'No music file found. Add an MP3 to assets/music/.';
      }

      return;
    }

    audio.src = enc(CONFIG.musicDir, filename);
    audio.load();

    if (musicMessage) {
      musicMessage.textContent = '';
    }

  } catch (error) {
    console.error('Music initialization failed:', error);

    if (musicMessage) {
      musicMessage.textContent =
        'Could not find the music file. Check assets/music/.';
    }
  }
}

if (audio) {
  audio.addEventListener('error', () => {
    if (musicMessage) {
      musicMessage.textContent =
        'Music could not load. Check the filename and file format.';
    }

    if ($('player')) {
      $('player').classList.remove('playing');
    }

    if ($('playBtn')) {
      $('playBtn').textContent = '▶';
    }
  });

  audio.addEventListener('play', () => {
    if ($('player')) {
      $('player').classList.add('playing');
    }

    if ($('playBtn')) {
      $('playBtn').textContent = '❚❚';
      $('playBtn').setAttribute('aria-label', 'Pause music');
    }
  });

  audio.addEventListener('pause', () => {
    if ($('player')) {
      $('player').classList.remove('playing');
    }

    if ($('playBtn')) {
      $('playBtn').textContent = '▶';
      $('playBtn').setAttribute('aria-label', 'Play music');
    }
  });

  audio.loop = true;

  audio.addEventListener('timeupdate', () => {
    if (audio.duration && $('seek')) {
      $('seek').value =
        audio.currentTime / audio.duration * 100;
    }
  });
}

if ($('playBtn')) {
  $('playBtn').addEventListener('click', async () => {
    if (!audio || !audio.src) {
      if (musicMessage) {
        musicMessage.textContent =
          'No song found. Check the assets/music/ folder.';
      }

      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }

      if (musicMessage) {
        musicMessage.textContent = '';
      }

    } catch (error) {
      console.error('Music playback failed:', error);

      if (musicMessage) {
        musicMessage.textContent =
          'Music could not play. Please check the audio file.';
      }
    }
  });
}

if ($('seek') && audio) {
  $('seek').addEventListener('input', event => {
    if (audio.duration) {
      audio.currentTime =
        Number(event.target.value) / 100 * audio.duration;
    }
  });
}

if ($('muteBtn') && audio) {
  $('muteBtn').addEventListener('click', () => {
    audio.muted = !audio.muted;

    $('muteBtn').textContent = audio.muted ? '🔇' : '🔊';

    $('muteBtn').setAttribute(
      'aria-label',
      audio.muted ? 'Unmute' : 'Mute'
    );
  });
}


// =====================================================================
// INITIALIZE GALLERY AND MUSIC
// =====================================================================

initGallery();
initMusic();
