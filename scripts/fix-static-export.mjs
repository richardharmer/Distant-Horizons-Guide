import { copyFileSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const outDir = new URL('../out', import.meta.url);

function copyHtmlIntoPayloadDirs(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || extname(entry.name) !== '.html' || entry.name === 'index.html') {
      continue;
    }

    const slugDir = join(dir, basename(entry.name, '.html'));
    try {
      if (!statSync(slugDir).isDirectory()) continue;
    } catch {
      continue;
    }

    copyFileSync(join(dir, entry.name), join(slugDir, 'index.html'));
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === '_next') continue;
    copyHtmlIntoPayloadDirs(join(dir, entry.name));
  }
}

copyHtmlIntoPayloadDirs(outDir.pathname);
console.log('Copied page HTML into static export directories for trailing-slash hosts.');
