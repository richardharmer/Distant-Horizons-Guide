const fs = require('fs');
const path = require('path');
const https = require('https');

// Read versions data
const versionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/versions.json'), 'utf8'));

// Generate all URLs
const baseUrl = 'https://distanthorizonsguide.com';
const urls = [
    baseUrl + '/',
    baseUrl + '/about',
    baseUrl + '/faq',
    baseUrl + '/shaders',
    baseUrl + '/calculator',
    baseUrl + '/contact',
    baseUrl + '/privacy',
    baseUrl + '/terms',
];

versionsData.forEach(v => {
    urls.push(`${baseUrl}/install/${v.mcVersion.replace(/\./g, '-')}`);
});

// Generate a random 32-character hex key for IndexNow
const key = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // You can change this
const keyFile = path.join(__dirname, 'public', `${key}.txt`);

// Write the verification file to public directory so it gets deployed
if (!fs.existsSync(keyFile)) {
    fs.writeFileSync(keyFile, key);
    console.log(`Created Bing verification file at public/${key}.txt`);
}

// Prepare the payload
const payload = JSON.stringify({
    host: 'distanthorizonsguide.com',
    key: key,
    keyLocation: `https://distanthorizonsguide.com/${key}.txt`,
    urlList: urls
});

const options = {
    hostname: 'www.bing.com',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': payload.length
    }
};

console.log('Submitting the following URLs to Bing IndexNow:');
urls.forEach(u => console.log(' - ' + u));

const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log(`\nResponse Status: ${res.statusCode}`);
        if (res.statusCode === 200 || res.statusCode === 202) {
            console.log('✅ URLs submitted successfully!');
            console.log('Note: Ensure you deploy the website first so Bing can verify the key file at:');
            console.log(`https://distanthorizonsguide.com/${key}.txt`);
        } else {
            console.log('❌ Failed to submit URLs.');
            console.log('Response body:', responseData);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(payload);
req.end();
