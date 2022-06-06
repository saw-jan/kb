const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '..', 'dist', 'sw.js');

try {
  let sw = fs.readFileSync(path.join(swPath)).toString();

  const regex = /^const OFFLINE_ASSETS = \[.*\];$/m;
  let assets = sw.match(regex)[0];
  assets = assets.replace(/\//g, '/kb/');
  sw = sw.replace(regex, assets);

  fs.writeFileSync(path.join(swPath), sw);

  console.log('[INFO] Pre-deploy setup finished!');
} catch (e) {
  console.log('[ERROR] Pre-deploy script failed!');
  console.log(e);

  // set command exitcode to 1
  process.exitCode = 1;
}
