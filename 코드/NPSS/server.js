const express = require("express");
const app = express();
const router = require("./routes/router");
const path = require('path');
const cors = require('cors');

// 라파 통신
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Route for temperature and light data
/*
app.post('/index', (req, res) => {
  const tempData = req.body.temperature; // Corrected key to access temperature data
  const lightData = req.body.light; // Corrected key to access light data

  console.log('Received temperature data from Raspberry Pi:', tempData);
  console.log('Received light data from Raspberry Pi:', lightData);

  res.json({ message: 'Temperature & Light data received successfully' });
});
*/

// CORS 오류를 방지하기 위한 모듈
app.use(cors());

// POST 방식 - 넘어온 데이터 사용
app.use(express.urlencoded({extended : true}));

// 넘어온 데이터 JSON 형태로 변환
app.use(express.json());

// 정적인 파일 사용
app.use(express.static(path.join(__dirname, "react-project", "build")));

// 원래 컴 설정에 맞게 서버를 켜주겠다. 없다면 3000으로
app.set('port', process.env.PORT || 3000);

app.use(router);
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), "waiting...")
});