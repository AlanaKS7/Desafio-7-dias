const https = require('https');

https.get('https://ibb.co/0pkYksKS', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/https:\/\/i\.ibb\.co\/[^"']+/);
    if (match) {
      console.log('LOGO: ' + match[0]);
    } else {
      console.log('Not found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
