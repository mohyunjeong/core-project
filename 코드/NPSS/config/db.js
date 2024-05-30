// npm install --save oracledb 실행 후
// https://devbybyun.tistory.com/7
// 위 사이트 참고해서 Basic, sdk를 다운받고 폴더 생성 후 경로 변경

const oracledb = require('oracledb');
oracledb.autoCommit = true;
// Oracle Instant Client가 설치된 디렉토리의 실제 경로를 지정
oracledb.initOracleClient({ libDir: 'C:\\Users\\SMHRD\\Desktop\\instantclient\\instantclient_11_2' }); 

async function connectToOracle() {
    try {
        const connection = await oracledb.getConnection({
            user: 'cgi_24IS_IoT3_p2_2',  // username
            password: 'smhrd2', // password
            connectString: 'project-db-cgi.smhrd.com:1524/xe',   // host:port/service_name
            externalAuth: false,
        });

        console.log('Successfully connected to Oracle database');

        // 필요한 데이터 작업을 수행한 후 연결을 종료
        // await connection.close();
        return connection;
    } catch (err) {
        console.error('Connection failed: ', err);
        throw err; // 에러를 다시 던져서 호출자에게 전달
    }
}

module.exports = connectToOracle ;
