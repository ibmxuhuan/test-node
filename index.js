const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');

const app = express()
app.disable('x-powered-by')

app.use(function (req, res, next) {
  if (req.method === "OPTIONS") {
      let headers = {};
      headers["Access-Control-Allow-Origin"] = '*';
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = "86400"; // 24 hours
      headers["Access-Control-Allow-Headers"] =
          "Authorization, Origin, X-Requested-With, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
  } else {
      res.header("Access-Control-Allow-Origin", '*');
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      )
      res.set('Cache-control', 'no-cache, no-store, must-revalidate')
      res.setHeader("X-Content-Type-Options", 'nosniff')
      next()
  }
});

app.post('/api/management/orderInfo/order/xml', function (req, res) {
  console.log('req=>', req)
  console.log('req.headers', req.headers)
  res.send('success')
});
app.use(cookieParser());
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);
server.listen(4000, '0.0.0.0')
console.log(`server running on http://localhost:3000`);

module.exports = app;


