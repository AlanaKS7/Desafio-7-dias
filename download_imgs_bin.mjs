import fs from 'fs';
import https from 'https';

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest, { encoding: 'binary' });
    https.get(url, function(response) {
      if (response.statusCode !== 200) {
        return reject(new Error('Failed to get ' + url + ': ' + response.statusCode));
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close();
        resolve();
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  await download('https://i.ibb.co/V0dMdwxZ/3.png', 'src/assets/logo.png');
  await download('https://i.ibb.co/rGH635F1/familia.jpg', 'src/assets/familia.jpg');
  await download('https://i.ibb.co/gZwNVDdK/Logo-do-Desafio-7-Dias.png', 'src/assets/desafio_logo.png');
  console.log('Downloads completed (binary)');
}
run();
