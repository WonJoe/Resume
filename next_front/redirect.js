const { createServer } = require("http");

createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  whost = req.headers.host
  wurl = req.url
  console.log(whost, wurl)
  res.end();
}).listen(80, () => {
  console.log("Redirecting HTTP to HTTPS");
});