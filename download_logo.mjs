import fs from 'fs';
import https from 'https';

const file = fs.createWriteStream('public/logo.png');
https.get('https://i.ibb.co/V0dMdwxZ/3.png', function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log('Download completed');
  });
}).on('error', function(err) {
  fs.unlink('public/logo.png', () => {});
  console.error('Error downloading file:', err.message);
});
