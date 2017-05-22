const router = require('express')();
const path = require('path');

require('require-all')({
  dirname: path.join(__dirname, 'api'),
  map: (name, pathName) => {
    if (pathName.endsWith('.js')) {
      return router.use(require(pathName)); // eslint-disable-line
    }
    return null;
  },
});

module.exports = router;
