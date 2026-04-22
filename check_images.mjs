import fs from 'fs';
const files = fs.readdirSync('public');
for (const file of files) {
  const stats = fs.statSync('public/' + file);
  console.log(file, stats.size);
}
