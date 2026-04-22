import fs from 'fs';
const files = ['/src/assets/logo.png', '/src/assets/familia.jpg', '/src/assets/desafio_logo.png'];
for (const file of files) {
  try {
    const stats = fs.statSync(file);
    const content = fs.readFileSync(file);
    console.log(file, 'size:', stats.size, 'looks like image?', content.length > 10 && content.toString('hex', 0, 4) === '89504e47' ? 'PNG' : content.length > 10 && content.toString('hex', 0, 2) === 'ffd8' ? 'JPEG' : 'UNKNOWN', 'Header:', content.toString('hex', 0, 8));
  } catch (e) {
    console.log(file, e.message);
  }
}
