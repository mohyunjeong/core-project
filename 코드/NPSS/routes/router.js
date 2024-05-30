const express = require('express');
const router = express.Router();
const connectToOracle  = require('../config/db'); // 데이터베이스 연결 객체를 가져옴
const path = require('path');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// 메인 경로
router.post('/', (req, res) => {
    console.log("누군가 메인페이지에 접근!")
    res.sendFile(path.join(__dirname, "..", "react-project", "build", "index.html"))
})

// 회원 가입을 담당하는 경로
router.post('/handleJoin', async (req, res) => { // 비동기 함수로 변경
    console.log('누군가 회원 가입을 희망합니다.', req.body);

    let { id, pw, email } = req.body;

    try {
        const connection = await connectToOracle(); // 데이터베이스 연결 객체를 가져옴

        // 1. 회원가입을 할 수 있는 쿼리문 작성 - sql
        let sql = `INSERT INTO USER_INFO VALUES(:1, :2, :3, SYSDATE)`;

        // 2. DB에 연결해서 쿼리문을 실행
        result = await connection.execute(sql,[id,pw,email]);
        console.log(result);
        
        // 쿼리 실행 결과에 따라 응답을 보냄
        if (result.rowsAffected && result.rowsAffected > 0) {
            res.send({ result: "success" });
        } else {
            res.send({ result: "fail" });
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send({ result: 'fail' });
    }
})

// 로그인을 담당하는 경로(기능)
router.post('/handleLogin', async (req, res)=>{
    console.log('handle login router', req.body)

    let {id, pw}= req.body;
    
    try {
        const connection = await connectToOracle(); // 데이터베이스 연결 객체를 가져옴
        let sql = `SELECT USER_ID FROM USER_INFO WHERE USER_ID =:1 AND USER_PW =:2`;
        result = await connection.execute(sql, [id, pw]); 
        console.log("로그인정보",result.rows);
        if (result.rows.length > 0) {
            res.send(result.rows);
        } else {
            res.send({ result: "fail" });
        }
    } catch (err){
        console.error('Error executing query:', err);
        res.status(500).send({ result: 'fail' });
    }
})

// 사업자등록번호
router.post("/mypage", (req, res)=>{
    console.log("license router", req.body);
})

//Route for temperature and light data
router.post('/handleLight', async (req, res) => {
  let { storeIdx } = req.body;
  try {
      const connection = await connectToOracle();
      let sql = `SELECT LIGHT_BRITENESS FROM LIGHT_INFO WHERE LIGHT_IDX = 8851`;
      let sql_bri = `
      SELECT TO_CHAR(TRUNC(CREATED_AT, 'HH24') + INTERVAL '1' HOUR, 'YYYY-MM-DD HH24') AS HOUR,
      ROUND(AVG(LIGHT_BRITENESS)) AS AVERAGE_BRIGHTNESS
      FROM LIGHT_INFO
      WHERE LIGHT_BRITENESS IS NOT NULL 
      GROUP BY TO_CHAR(TRUNC(CREATED_AT, 'HH24') + INTERVAL '1' HOUR, 'YYYY-MM-DD HH24')
      ORDER BY HOUR`;
      const result = await connection.execute(sql);
      const result_bri = await connection.execute(sql_bri);
      res.json({ lightData: result.rows, lightBri: result_bri.rows, storeIdx: storeIdx });
  } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send({ result: 'fail' });
  }
});

router.post('/handleSolar', async (req, res) => {

    let {storeIdx} = req.body;
    try{
        const connection = await connectToOracle();
        let sql = `SELECT SOLAR_WATT FROM SOLAR_INFO WHERE SOLAR_IDX=1318`;
        let sql_solar=`SELECT TO_CHAR(TRUNC(CREATED_AT, 'HH24') + INTERVAL '1' HOUR, 'YYYY-MM-DD HH24') AS HOUR,
      ROUND(AVG(SOLAR_WATT)) AS AVERAGE_WATT
      FROM SOLAR_INFO
      WHERE SOLAR_WATT IS NOT NULL 
      GROUP BY TO_CHAR(TRUNC(CREATED_AT, 'HH24') + INTERVAL '1' HOUR, 'YYYY-MM-DD HH24')
      ORDER BY HOUR`
        const result = await connection.execute(sql);
        const result_watt=await connection.execute(sql_solar);
        res.json({ solarData : result.rows, storeIdx : storeIdx,solarWatt:result_watt.rows});

    } catch (err){
        console.error('Error executing query:', err);
        res.status(500).send({ result: 'fail' });
    }

  }); 
  
router.post('/handleTemp', async (req, res) => {

    let {storeIdx} = req.body;
    try{
        const connection = await connectToOracle();
        let sql = `SELECT EXT_TEMP FROM AIRCON_INFO WHERE AIRCON_IDX=10153`;
        let sql_temp=`SELECT TO_CHAR(TRUNC(CREATED_AT, 'HH24') + INTERVAL '1' HOUR, 'YYYY-MM-DD HH24') AS HOUR,
        ROUND(AVG(EXT_TEMP),1) AS AVERAGE_TEMP
        FROM AIRCON_INFO
        WHERE EXT_TEMP IS NOT NULL 
        GROUP BY TO_CHAR(TRUNC(CREATED_AT, 'HH24') + INTERVAL '1' HOUR, 'YYYY-MM-DD HH24')
        ORDER BY HOUR`
        result = await connection.execute(sql);
        result_ext=await connection.execute(sql_temp);
        console.log(result_ext.rows)
        res.json({tempData : result.rows, storeIdx : storeIdx,tempExt:result_ext.rows});

    } catch (err){
        console.error('Error executing query:', err);
        res.status(500).send({ result: 'fail' });
    }

  }); 




  router.post('/data', async (req, res) => {
    const tempData = req.body.temperature;
    const lightData = req.body.light;
    const solarData= req.body.solar;
    
    if (tempData !== undefined) {
      console.log('Received temperature data from Raspberry Pi:', tempData);
      await insertDataIntoOracle('AIRCON_INFO','EXT_TEMP', tempData);
    }
    
    if (lightData !== undefined) {
      console.log('Received light data from Raspberry Pi:', lightData);
      await insertDataIntoOracle('LIGHT_INFO','LIGHT_BRITENESS', lightData);
    }
  
    if (solarData!==undefined){
      console.log('Received solar data from Raspberry Pi:', solarData);
      await insertDataIntoOracle('SOLAR_INFO','SOLAR_WATT',solarData);
    }
    
    res.json({ message: 'Data received and inserted into Oracle database successfully' });
  
  
  // Function to insert data into Oracle database
  async function insertDataIntoOracle(tableName,dataColumn, data) {
    try {
      // Connect to the Oracle database
      const connection = await connectToOracle();
  
      // Construct the SQL query
      const sql = `INSERT INTO ${tableName} (${dataColumn},  CREATED_AT) VALUES (:val, SYSDATE)`;
  
      // Execute the query
      const result = await connection.execute(sql, [data], { autoCommit: true });
  
      // Close the connection
      await connection.close();
  
      console.log(`Data inserted into ${tableName} table:`, data);
    } catch (error) {
      console.error('Error inserting data into Oracle database:', error);
    }
  }
});

module.exports = router;