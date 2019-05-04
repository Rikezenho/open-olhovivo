const pkg = require('../package.json');

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: { version: pkg.version }
  });
};
