import fs from 'fs';
import https from 'https';

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
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
  await download('https://i.ibb.co/rGH635F1/familia.jpg', 'public/familia.jpg');
  await download('https://i.ibb.co/gZwNVDdK/Logo-do-Desafio-7-Dias.png', 'public/desafio_logo.png');
  console.log('Downloads completed');
}
run();
