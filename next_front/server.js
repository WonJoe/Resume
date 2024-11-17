const { createServer } = require("https");
const { readFileSync } = require("fs");
const next = require("next");

// Next.js 앱 준비
const app = next({ dev: true }); // 프로덕션 모드
const handle = app.getRequestHandler();

// SSL 인증서 경로
const httpsOptions = {
  key: readFileSync("C:/WonJae/Resume/next_front/certs/wondevsite/privkey.pem"),
  cert: readFileSync("C:/WonJae/Resume/next_front/certs/wondevsite/fullchain.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    handle(req, res);
  }).listen(443, () => {
    console.log("Server running on https://wondev.site");
  });
});