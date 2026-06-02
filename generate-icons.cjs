const zlib = require('zlib');
const fs = require('fs');

// CRC32 table for PNG chunk checksums
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  return table;
})();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBytes = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])));
  return Buffer.concat([len, typeBytes, data, crcBuf]);
}

function makePNG(size) {
  const w = size, h = size;
  const cx = w / 2, cy = h / 2;
  const R = w / 2;
  const TEETH = 12;

  const rows = [];
  for (let y = 0; y < h; y++) {
    const row = Buffer.alloc(1 + w * 4); // RGBA
    row[0] = 0; // filter byte
    for (let x = 0; x < w; x++) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const ta = (Math.PI * 2) / TEETH;
      const na = ((angle % ta) + ta) % ta;
      const isTooth = na < ta / 2;

      let r = 0, g = 0, b = 0, a = 255;

      if (dist > R) {
        // Outside circle — transparent
        a = 0;
      } else if (dist < R * 0.28) {
        // Center hole — transparent  
        a = 0;
      } else if (dist < R * 0.32) {
        // Inner ring white
        r = g = b = 255;
      } else if (dist < R * 0.45) {
        // Inner dark zone — black
        r = g = b = 0;
      } else if (dist <= R * 0.72) {
        // Gear body — white
        r = g = b = 255;
      } else if (dist <= R * 0.88 && isTooth) {
        // Gear teeth — white
        r = g = b = 255;
      } else if (dist <= R) {
        // Between teeth — black background (opaque)
        r = g = b = 0;
      }

      const i = 1 + x * 4;
      row[i]     = r;
      row[i + 1] = g;
      row[i + 2] = b;
      row[i + 3] = a;
    }
    rows.push(row);
  }

  const raw = Buffer.concat(rows);
  const compressed = zlib.deflateSync(raw, { level: 9 });

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', compressed), pngChunk('IEND', Buffer.alloc(0))]);
}

fs.writeFileSync('public/pwa-192x192.png', makePNG(192));
console.log('✅ pwa-192x192.png created');

fs.writeFileSync('public/pwa-512x512.png', makePNG(512));
console.log('✅ pwa-512x512.png created');

console.log('Done! PWA icons are ready.');
