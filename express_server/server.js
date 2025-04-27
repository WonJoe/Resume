const express = require("express"); // Express 모듈 가져오기
const app = express(); // Express 애플리케이션 생성
const port = 4000; // 서버가 실행될 포트
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "your_database",
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log("MySQL 연결 성공!");
  });

app.use(cors()); // 모든 도메인 허용
// 기본 라우트 설정
app.get("/", (req, res) => {
  res.send("Hello, Express!"); // 클라이언트에게 응답
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 실행 중입니다. http://localhost:${port}`);
});
