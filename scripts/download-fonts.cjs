/**
 * Downloads Inter and Poppins woff2 files for self-hosting.
 * Run before build: node scripts/download-fonts.cjs
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, '../client/public/fonts');

const FONTS = [
  { name: 'inter-400.woff2', url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2' },
  { name: 'inter-500.woff2', url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2' },
  { name: 'inter-600.woff2', url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2' },
  { name: 'inter-700.woff2', url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2' },
  { name: 'poppins-400.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecg.woff2' },
  { name: 'poppins-500.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2' },
  { name: 'poppins-600.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2' },
  { name: 'poppins-700.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2' },
  { name: 'poppins-800.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2' },
  { name: 'poppins-900.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed ${url}: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const font of FONTS) {
    const dest = path.join(OUT_DIR, font.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Skip (exists): ${font.name}`);
      continue;
    }
    process.stdout.write(`Downloading ${font.name}... `);
    await download(font.url, dest);
    console.log('ok');
  }
  console.log('Fonts ready in client/public/fonts/');
}

main().catch(err => { console.error(err); process.exit(1); });
