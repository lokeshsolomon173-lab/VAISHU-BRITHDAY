// OPTIONAL helper. Run from the project folder:  node tools/make-photo-list.js
// Prints the exact filenames in assets/photos and assets/music so you can paste them into script.js (CONFIG).
const fs = require('fs');
const list = (d, re) => fs.readdirSync(d).filter(f => re.test(f));
console.log('photos:', JSON.stringify(list('assets/photos', /\.(jpe?g|png|webp|gif|avif)$/i), null, 2));
console.log('musicFile:', JSON.stringify(list('assets/music', /\.(mp3|m4a|wav|ogg|aac)$/i)[0] || ''));
