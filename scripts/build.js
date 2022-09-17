// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require('../package.json');

(function () {
  const { version } = pkg;
  console.log(`wooyoo.homelab-${version}`);
}());
