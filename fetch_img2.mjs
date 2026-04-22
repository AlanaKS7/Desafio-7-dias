async function run() {
  const urls = ['https://ibb.co/C5Q76VmT', 'https://ibb.co/zVbpJSFv'];
  for (const url of urls) {
    const res = await fetch(url);
    const data = await res.text();
    const match = data.match(/https:\/\/i\.ibb\.co\/[^"']+/);
    if (match) {
      console.log(url + ' -> ' + match[0]);
    } else {
      console.log(url + ' -> Not found');
    }
  }
}
run();
