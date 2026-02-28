import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const versionsPath = path.join(__dirname, 'src', 'data', 'versions.json');
const versionsData = JSON.parse(fs.readFileSync(versionsPath, 'utf-8'));

const baseUrl = 'https://distanthorizonsguide.com';

const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/shaders', priority: 0.9, changefreq: 'weekly' },
    { url: '/calculator', priority: 0.8, changefreq: 'monthly' },
    { url: '/faq', priority: 0.8, changefreq: 'weekly' },
    { url: '/about', priority: 0.9, changefreq: 'monthly' },
];

const installPages = versionsData.map(v => ({
    url: `/install/${v.mcVersion.replace(/\./g, '-')}`,
    priority: 0.7,
    changefreq: 'monthly'
}));

const allPages = [...staticPages, ...installPages];

const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const page of allPages) {
    sitemapXml += `  <url>\n    <loc>${baseUrl}${page.url === '/' ? '' : page.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
}

sitemapXml += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapXml);
console.log('Sitemap generated successfully at public/sitemap.xml');
