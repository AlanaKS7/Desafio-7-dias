async function run() {
  const res = await fetch('https://ibb.co/0pkYksKS');
  const data = await res.text();
  const match = data.match(/https:\/\/i\.ibb\.co\/[^"']+/);
  if (match) {
    console.log('LOGO: ' + match[0]);
  } else {
    console.log('Not found');
  }
}
run();
