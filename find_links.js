const fs = require('fs');
const path = require('path');

function findLinks(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findLinks(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const regex = /<a\s+[^>]*href=["'`](https?:\/\/[^"'`]+)["'`][^>]*>/gi;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const tag = match[0];
                if (!tag.includes('target="_blank"')) {
                    console.log(`Missing target="_blank" in ${fullPath}`);
                    console.log(`Tag: ${tag}`);
                }
            }
        }
    }
}

findLinks(path.join(__dirname, 'src'));
console.log('Search complete.');
