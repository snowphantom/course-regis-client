var express = require('express');
const path = require('path');
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(express.static('./dist/course-regis-client'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/course-regis-client/index.html'));
});

app.use(forceSSL());

app.listen(process.env.PORT || 8080);