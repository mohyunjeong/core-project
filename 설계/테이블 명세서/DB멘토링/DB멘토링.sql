[DB멘토] 김광진, pilot6@naver.com 

[오라클 서버구축 정보]

HOST : project-db-cgi.smhrd.com
PORT : 1524
USER : cgi_24IS_IoT3_p2_2
PASS : smhrd2

팀명 : NPSS
팀원 : 최수빈, 김준, 모현정, 이반석
주제 : 무인점포를 위한 서비스 제공




* 데이터베이스 설계순서?

  요구사항 분석 > 개념설계 > 논리설계 > 물리설계 > 데이터베이스 구현 (개.눈.물)


* 위도, 경도 데이터 타입 지정하기 

 위도(latitude,  lat)  : 북위  36.23045 04123 5034 ... NUMBER(17, 14)
 경도(longitude, lng)  : 동경 127.98234 52985 2390 ... NUMBER(17, 14)


* 오늘 발전량 구하기 

  SELECT 
   TO_CHAR(CREATED_AT, 'YYYY-MM-DD'), SUM(SOLAR_WATT)
  GROUP BY TO_CHAR(CREATED_AT, 'YYYY-MM-DD');


* 월간 발전량 구하기 
  SELECT 
   TO_CHAR(CREATED_AT, 'YYYY-MM'), SUM(SOLAR_WATT)
  GROUP BY TO_CHAR(CREATED_AT, 'YYYY-MM');

   2024-05-09 07:00:00
   2024-05-09 07:30:00
   2024-05-09 08:00:00
   ....
   2024-05-09 23:30:00
   ----------------------------------------------------------------------
   DROP TABLE STORE_INFO CASCADE CONSTRAINTS;
DROP TABLE USER_INFO CASCADE CONSTRAINTS;
DROP TABLE STORE_INFO2 CASCADE CONSTRAINTS;

-- 오라클 테이블 전체 삭제 팁 : TABLE, SEQUENCE, TRIGGER, INDEX, VIEW 등에 적용 가능함.

-- 문자열 합치기 (JAVA) : 'A' + 'B'
-- 문자열 합치기 (ORACLE) : 'A'||'B'
-- 문자열 합치기 (MYSQL)  : CONCAT('A','B')

SELECT 'DROP TABLE ' || TABLE_NAME || ' CASCADE CONSTRAINTS;' FROM USER_TABLES;

DROP TABLE USER_INFO CASCADE CONSTRAINTS;
DROP TABLE STORE_INFO CASCADE CONSTRAINTS;


-- 시퀀스 삭제하기

SELECT 'DROP SEQUENCE ' || SEQUENCE_NAME || ' ;' FROM USER_SEQUENCES;

DROP SEQUENCE STORE_INFO_SEQ ;

-- 오라클 시퀀스와 트리거의 이해 

-- 테이블 생성 SQL - solar_info
CREATE TABLE solar_info
(
    solar_idx      NUMBER(18, 0)    NOT NULL, 
    solar_watt     NUMBER(18, 1)    NOT NULL, 
    created_at     DATE             NOT NULL, 
    ess_storage    NUMBER(18, 1)    NOT NULL, 
    user_id        VARCHAR2(30)     NOT NULL, 
     PRIMARY KEY (solar_idx)
);

-- 시퀀스란? 앞뒤 순서를 알 수 있는 데이터
-- x축이 시간 영역(Time Domain)인 게 특징임. 시계열 데이터(Time Series).
-- 전기 생산량, 전력 판매량, 주가의 변화, 아파트 시세, 악보, 글번호 

-- (오라클) 시퀀스는 단순한 번호 발행기

CREATE SEQUENCE solar_info_SEQ
START WITH 1
INCREMENT BY 1;

(현재값) 0 : solar_info_SEQ.CURRVAL
(다음값) 1 : solar_info_SEQ.NEXTVAL

-- Auto Increment를 위한 Trigger 추가 SQL - solar_info.solar_idx
CREATE OR REPLACE TRIGGER solar_info_AI_TRG
BEFORE INSERT ON solar_info  
--오라클 트리거는 DML(INSERT, UPDATE, DELETE)에만 적용 할 수 있음. *주의: SELECT문 적용
REFERENCING NEW AS N3 FOR EACH ROW 
BEGIN 
    SELECT solar_info_SEQ.NEXTVAL
    INTO :N3.solar_idx
    FROM DUAL;
END;

SELECT 3 + 2 FROM DUAL;

(SQL)
INSERT INTO solar_info (solar_watt, created_at, ess_storage, user_id) 
VALUES (257, sysdate, 1, 'user_id 1');

(PL/SQL) : SQL + 조건문/반복문/변수 선언...

NEW.solar_idx = 1 
NEW.solar_watt = 257
NEW.created_at = sysdate
...



-- 시퀀스 값을 0으로 초기화 하기 

-- 현재 시퀀스 값을 확인
SELECT SOLAR_INFO_SEQ.CURRVAL FROM DUAL;
# 17 

-- 시퀀스 구조를 살펴보면, 
CREATE SEQUENCE solar_info_SEQ
START WITH 1
INCREMENT BY 1;

-- 시퀀스 1회당 증가값을 -17로 세팅함.
ALTER SEQUENCE solar_info_SEQ INCREMENT BY -17 MINVALUE 0;

-- 시퀀스 1회 호출하면, 현재 시퀀스 값 17 + (-17) = 0가 됨. 

SELECT solar_info_SEQ.NEXTVAL FROM DUAL;
-- 결과값 : 0 

-- 지금, 자동증가값이 -17이기 때문에, 다시 incrtement를 1로 변경해줘야 함. 
ALTER SEQUENCE solar_info_SEQ INCREMENT BY 1 MINVALUE 0; 

SELECT solar_info_SEQ.NEXTVAL FROM DUAL;

CREATE SEQUENCE T_BOARD_SEQ
START WITH 1
INCREMENT BY 1
CACHE 20;

-- 시퀀스 초기화 하기
SELECT T_BOARD_SEQ.NEXTVAL FROM DUAL;  -- 시퀀스 값 증가시켜서 확인


ALTER SEQUENCE T_BOARD_SEQ INCREMENT BY -17 MINVALUE 0;
SELECT T_BOARD_SEQ.NEXTVAL FROM DUAL; -- 시퀀스 값 증가시켜서 값 확인 그럼 0이 됨.
ALTER SEQUENCE T_BOARD_SEQ INCREMENT BY 1 MINVALUE 0; -- 다시 1씩 증가로 바

INSERT INTO solar_info (solar_watt, created_at, ess_storage, user_id) VALUES (1, sysdate, 1, 'user_id 1');
INSERT INTO solar_info (solar_watt, created_at, ess_storage, user_id) VALUES (2, sysdate, 2, 'user_id 2');
INSERT INTO solar_info (solar_watt, created_at, ess_storage, user_id) VALUES (3, sysdate, 3, 'user_id 3');
INSERT INTO solar_info (solar_watt, created_at, ess_storage, user_id) VALUES (4, sysdate, 4, 'user_id 4');
INSERT INTO solar_info (solar_watt, created_at, ess_storage, user_id) VALUES (5, sysdate, 5, 'user_id 5');


* 태양광 발전량 샘플 데이터 

INSERT INTO SOLAR_INFO (SOLAR_WATT, CREATED_AT, ESS_STORAGE, USER_ID) VALUES (2840.0,to_date('2024-05-09 07:30:00', 'YYYY-MM-DD:HH24:MI:SS'),1,'user_id 00001');
INSERT INTO SOLAR_INFO (SOLAR_WATT, CREATED_AT, ESS_STORAGE, USER_ID) VALUES (1606.3,to_date('2024-05-09 09:30:00', 'YYYY-MM-DD:HH24:MI:SS'),1,'user_id 00001');
INSERT INTO SOLAR_INFO (SOLAR_WATT, CREATED_AT, ESS_STORAGE, USER_ID) VALUES (7615.0,to_date('2024-05-09 11:30:00', 'YYYY-MM-DD:HH24:MI:SS'),1,'user_id 00001');
INSERT INTO SOLAR_INFO (SOLAR_WATT, CREATED_AT, ESS_STORAGE, USER_ID) VALUES (5706.0,to_date('2024-05-09 13:30:00', 'YYYY-MM-DD:HH24:MI:SS'),1,'user_id 00001');
INSERT INTO SOLAR_INFO (SOLAR_WATT, CREATED_AT, ESS_STORAGE, USER_ID) VALUES (880.7,to_date('2024-05-08 07:30:00', 'YYYY-MM-DD:HH24:MI:SS'),1,'user_id 00001');
INSERT INTO SOLAR_INFO (SOLAR_WATT, CREATED_AT, ESS_STORAGE, USER_ID) VALUES (1672.3,to_date('2024-05-08 09:30:00', 'YYYY-MM-DD:HH24:MI:SS'),1,'user_id 00001');
INSERT INTO SOLAR_INFO (SOLAR_WATT, CREATED_AT, ESS_STORAGE, USER_ID) VALUES (6029.0,to_date('2024-05-08 11:30:00', 'YYYY-MM-DD:HH24:MI:SS'),1,'user_id 00001');
INSERT INTO SOLAR_INFO (SOLAR_WATT, CREATED_AT, ESS_STORAGE, USER_ID) VALUES (9928.3,to_date('2024-05-08 13:30:00', 'YYYY-MM-DD:HH24:MI:SS'),1,'user_id 00001');


SELECT * FROM USER_INFO;

[DB에서 발전량 합계 구하기]

SELECT * FROM SOLAR_INFO;

--(1) 오늘 발전량 합계 구하기 

SELECT  TO_CHAR(SYSDATE, 'YYYY-MM-DD') AS 오늘, SUM(SOLAR_WATT)
FROM SOLAR_INFO 
WHERE TO_CHAR(CREATED_AT, 'YYYY-MM-DD') = TO_CHAR(SYSDATE, 'YYYY-MM-DD');


--(2) 일별 발전량 합계 구하기 
SELECT TO_CHAR(CREATED_AT, 'YYYY-MM-DD') AS DT, SUM(SOLAR_WATT) 
FROM SOLAR_INFO
GROUP BY TO_CHAR(CREATED_AT, 'YYYY-MM-DD');

--(3) 월별 발전량 합계 구하기
SELECT TO_CHAR(CREATED_AT, 'YYYY-MM'), SUM(SOLAR_WATT) 
FROM SOLAR_INFO
GROUP BY TO_CHAR(CREATED_AT, 'YYYY-MM');

* 발전량 --> 차트 (http://echarts.apache.org)

----------------------------------------------------------------
(핵심프로젝트 오라클 SQL문)
-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- user_info Table Create SQL
-- 테이블 생성 SQL - user_info
CREATE TABLE user_info
(
    user_id       VARCHAR2(30)    NOT NULL, 
    user_pw       VARCHAR2(30)    NOT NULL, 
    user_email    VARCHAR2(50)    NOT NULL, 
    joined_at     DATE            NOT NULL, 
     PRIMARY KEY (user_id)
);

-- 테이블 Comment 설정 SQL - user_info
COMMENT ON TABLE user_info IS '회원 정보';

-- 컬럼 Comment 설정 SQL - user_info.user_id
COMMENT ON COLUMN user_info.user_id IS '회원 아이디';

-- 컬럼 Comment 설정 SQL - user_info.user_pw
COMMENT ON COLUMN user_info.user_pw IS '회원 비밀번호';

-- 컬럼 Comment 설정 SQL - user_info.user_email
COMMENT ON COLUMN user_info.user_email IS '회원 이메일';

-- 컬럼 Comment 설정 SQL - user_info.joined_at
COMMENT ON COLUMN user_info.joined_at IS '회원 가입일자';


-- store_info Table Create SQL
-- 테이블 생성 SQL - store_info
SELECT 'DROP SEQUENCE ' || SEQUENCE_NAME || ' ;' FROM USER_SEQUENCES;
DROP TABLE USER_INFO CASCADE CONSTRAINTS;
DROP TABLE STORE_INFO CASCADE CONSTRAINTS;
SELECT 'DROP TABLE ' || TABLE_NAME || ' CASCADE CONSTRAINTS;' FROM USER_TABLES;

CREATE TABLE store_info
(
    store_idx     NUMBER(18, 0)     NOT NULL, 
    store_name    VARCHAR2(50)      NOT NULL, 
    store_addr    VARCHAR2(50)      NOT NULL, 
    lat           NUMBER(17, 14)    NULL, 
    lng           NUMBER(17, 14)    NULL, 
    store_tel     VARCHAR2(20)      NOT NULL, 
    user_id       VARCHAR2(30)      NOT NULL, 
     PRIMARY KEY (store_idx)
);

-- Auto Increment를 위한 Sequence 추가 SQL - store_info.store_idx
CREATE SEQUENCE store_info_SEQ
START WITH 1
INCREMENT BY 1;

-- Auto Increment를 위한 Trigger 추가 SQL - store_info.store_idx
CREATE OR REPLACE TRIGGER store_info_AI_TRG
BEFORE INSERT ON store_info 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT store_info_SEQ.NEXTVAL
    INTO :NEW.store_idx
    FROM DUAL;
END;

-- DROP TRIGGER store_info_AI_TRG; 

-- DROP SEQUENCE store_info_SEQ; 

-- 테이블 Comment 설정 SQL - store_info
COMMENT ON TABLE store_info IS '매장 정보';

-- 컬럼 Comment 설정 SQL - store_info.store_idx
COMMENT ON COLUMN store_info.store_idx IS '매장 식별자';

-- 컬럼 Comment 설정 SQL - store_info.store_name
COMMENT ON COLUMN store_info.store_name IS '매장 명';

-- 컬럼 Comment 설정 SQL - store_info.store_addr
COMMENT ON COLUMN store_info.store_addr IS '매장 주소';

-- 컬럼 Comment 설정 SQL - store_info.lat
COMMENT ON COLUMN store_info.lat IS '위도';

-- 컬럼 Comment 설정 SQL - store_info.lng
COMMENT ON COLUMN store_info.lng IS '경도';

-- 컬럼 Comment 설정 SQL - store_info.store_tel
COMMENT ON COLUMN store_info.store_tel IS '매장 전화번호';

-- 컬럼 Comment 설정 SQL - store_info.user_id
COMMENT ON COLUMN store_info.user_id IS '소유자 아이디';

-- Foreign Key 설정 SQL - store_info(user_id) -> user_info(user_id)
ALTER TABLE store_info
    ADD CONSTRAINT FK_store_info_user_id_user_inf FOREIGN KEY (user_id)
        REFERENCES user_info (user_id) ;

-- Foreign Key 삭제 SQL - store_info(user_id)
-- ALTER TABLE store_info
-- DROP CONSTRAINT FK_store_info_user_id_user_inf;


-- light_info Table Create SQL
-- 테이블 생성 SQL - light_info
CREATE TABLE light_info
(
    light_idx           NUMBER(18, 0)    NOT NULL, 
    store_idx           NUMBER(18, 0)    NOT NULL, 
    light_briteness     NUMBER(18, 1)    NOT NULL, 
    ext_briteness       NUMBER(18, 1)    NOT NULL, 
    target_briteness    NUMBER(18, 1)    NOT NULL, 
    created_at          DATE             NOT NULL, 
     PRIMARY KEY (light_idx)
);

-- Auto Increment를 위한 Sequence 추가 SQL - light_info.light_idx
CREATE SEQUENCE light_info_SEQ
START WITH 1
INCREMENT BY 1;

-- Auto Increment를 위한 Trigger 추가 SQL - light_info.light_idx
CREATE OR REPLACE TRIGGER light_info_AI_TRG
BEFORE INSERT ON light_info 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT light_info_SEQ.NEXTVAL
    INTO :NEW.light_idx
    FROM DUAL;
END;

-- DROP TRIGGER light_info_AI_TRG; 

-- DROP SEQUENCE light_info_SEQ; 

-- 테이블 Comment 설정 SQL - light_info
COMMENT ON TABLE light_info IS '조명 정보';

-- 컬럼 Comment 설정 SQL - light_info.light_idx
COMMENT ON COLUMN light_info.light_idx IS '조명 식별자';

-- 컬럼 Comment 설정 SQL - light_info.store_idx
COMMENT ON COLUMN light_info.store_idx IS '매장 식별자';

-- 컬럼 Comment 설정 SQL - light_info.light_briteness
COMMENT ON COLUMN light_info.light_briteness IS '조명 밝기';

-- 컬럼 Comment 설정 SQL - light_info.ext_briteness
COMMENT ON COLUMN light_info.ext_briteness IS '외부 밝기';

-- 컬럼 Comment 설정 SQL - light_info.target_briteness
COMMENT ON COLUMN light_info.target_briteness IS '목표 밝기';

-- 컬럼 Comment 설정 SQL - light_info.created_at
COMMENT ON COLUMN light_info.created_at IS '등록 일자';

-- Foreign Key 설정 SQL - light_info(store_idx) -> store_info(store_idx)
ALTER TABLE light_info
    ADD CONSTRAINT FK_light_info_store_idx_store_ FOREIGN KEY (store_idx)
        REFERENCES store_info (store_idx) ;

-- Foreign Key 삭제 SQL - light_info(store_idx)
-- ALTER TABLE light_info
-- DROP CONSTRAINT FK_light_info_store_idx_store_;


-- sign_info Table Create SQL
-- 테이블 생성 SQL - sign_info
CREATE TABLE sign_info
(
    sign_idx            NUMBER(18, 0)    NOT NULL, 
    store_idx           NUMBER(18, 0)    NOT NULL, 
    sign_briteness      NUMBER(18, 1)    NOT NULL, 
    ext_briteness       NUMBER(18, 1)    NOT NULL, 
    target_briteness    NUMBER(18, 1)    NOT NULL, 
    created_at          DATE             NOT NULL, 
     PRIMARY KEY (sign_idx)
);

-- Auto Increment를 위한 Sequence 추가 SQL - sign_info.sign_idx
CREATE SEQUENCE sign_info_SEQ
START WITH 1
INCREMENT BY 1;

-- Auto Increment를 위한 Trigger 추가 SQL - sign_info.sign_idx
CREATE OR REPLACE TRIGGER sign_info_AI_TRG
BEFORE INSERT ON sign_info 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT sign_info_SEQ.NEXTVAL
    INTO :NEW.sign_idx
    FROM DUAL;
END;

-- DROP TRIGGER sign_info_AI_TRG; 

-- DROP SEQUENCE sign_info_SEQ; 

-- 테이블 Comment 설정 SQL - sign_info
COMMENT ON TABLE sign_info IS '간판 정보';

-- 컬럼 Comment 설정 SQL - sign_info.sign_idx
COMMENT ON COLUMN sign_info.sign_idx IS '간판 식별자';

-- 컬럼 Comment 설정 SQL - sign_info.store_idx
COMMENT ON COLUMN sign_info.store_idx IS '매장 식별자';

-- 컬럼 Comment 설정 SQL - sign_info.sign_briteness
COMMENT ON COLUMN sign_info.sign_briteness IS '간판 밝기';

-- 컬럼 Comment 설정 SQL - sign_info.ext_briteness
COMMENT ON COLUMN sign_info.ext_briteness IS '외부 밝기';

-- 컬럼 Comment 설정 SQL - sign_info.target_briteness
COMMENT ON COLUMN sign_info.target_briteness IS '목표 밝기';

-- 컬럼 Comment 설정 SQL - sign_info.created_at
COMMENT ON COLUMN sign_info.created_at IS '등록 일자';

-- Foreign Key 설정 SQL - sign_info(store_idx) -> store_info(store_idx)
ALTER TABLE sign_info
    ADD CONSTRAINT FK_sign_info_store_idx_store_i FOREIGN KEY (store_idx)
        REFERENCES store_info (store_idx) ;

-- Foreign Key 삭제 SQL - sign_info(store_idx)
-- ALTER TABLE sign_info
-- DROP CONSTRAINT FK_sign_info_store_idx_store_i;


-- aircon_info Table Create SQL
-- 테이블 생성 SQL - aircon_info
CREATE TABLE aircon_info
(
    aircon_idx     NUMBER(18, 0)    NOT NULL, 
    elec_watt      NUMBER(18, 1)    NOT NULL, 
    curr_temp      NUMBER(18, 1)    NOT NULL, 
    target_temp    NUMBER(18, 1)    NOT NULL, 
    created_at     DATE             NOT NULL, 
    store_idx      NUMBER(18, 0)    NOT NULL, 
    ext_temp       NUMBER(18, 1)    NOT NULL, 
     PRIMARY KEY (aircon_idx)
);

-- Auto Increment를 위한 Sequence 추가 SQL - aircon_info.aircon_idx
CREATE SEQUENCE aircon_info_SEQ
START WITH 1
INCREMENT BY 1;

-- Auto Increment를 위한 Trigger 추가 SQL - aircon_info.aircon_idx
CREATE OR REPLACE TRIGGER aircon_info_AI_TRG
BEFORE INSERT ON aircon_info 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT aircon_info_SEQ.NEXTVAL
    INTO :NEW.aircon_idx
    FROM DUAL;
END;

-- DROP TRIGGER aircon_info_AI_TRG; 

-- DROP SEQUENCE aircon_info_SEQ; 

-- 테이블 Comment 설정 SQL - aircon_info
COMMENT ON TABLE aircon_info IS '냉 난방 장치';

-- 컬럼 Comment 설정 SQL - aircon_info.aircon_idx
COMMENT ON COLUMN aircon_info.aircon_idx IS '냉난방 식별자';

-- 컬럼 Comment 설정 SQL - aircon_info.elec_watt
COMMENT ON COLUMN aircon_info.elec_watt IS '전기 사용량';

-- 컬럼 Comment 설정 SQL - aircon_info.curr_temp
COMMENT ON COLUMN aircon_info.curr_temp IS '현재 온도';

-- 컬럼 Comment 설정 SQL - aircon_info.target_temp
COMMENT ON COLUMN aircon_info.target_temp IS '목표 온도';

-- 컬럼 Comment 설정 SQL - aircon_info.created_at
COMMENT ON COLUMN aircon_info.created_at IS '등록 일자';

-- 컬럼 Comment 설정 SQL - aircon_info.store_idx
COMMENT ON COLUMN aircon_info.store_idx IS '매장 식별자';

-- 컬럼 Comment 설정 SQL - aircon_info.ext_temp
COMMENT ON COLUMN aircon_info.ext_temp IS '외부 온도';

-- Foreign Key 설정 SQL - aircon_info(store_idx) -> store_info(store_idx)
ALTER TABLE aircon_info
    ADD CONSTRAINT FK_aircon_info_store_idx_store FOREIGN KEY (store_idx)
        REFERENCES store_info (store_idx) ;

-- Foreign Key 삭제 SQL - aircon_info(store_idx)
-- ALTER TABLE aircon_info
-- DROP CONSTRAINT FK_aircon_info_store_idx_store;


-- elec_consumption Table Create SQL
-- 테이블 생성 SQL - elec_consumption
CREATE TABLE elec_consumption
(
    elec_idx      NUMBER(18, 0)    NOT NULL, 
    user_id       VARCHAR2(30)     NOT NULL, 
    elec_watt     NUMBER(18, 1)    NOT NULL, 
    created_at    DATE             NOT NULL, 
     PRIMARY KEY (elec_idx)
);

-- Auto Increment를 위한 Sequence 추가 SQL - elec_consumption.elec_idx
CREATE SEQUENCE elec_consumption_SEQ
START WITH 1
INCREMENT BY 1;

-- Auto Increment를 위한 Trigger 추가 SQL - elec_consumption.elec_idx
CREATE OR REPLACE TRIGGER elec_consumption_AI_TRG
BEFORE INSERT ON elec_consumption 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT elec_consumption_SEQ.NEXTVAL
    INTO :NEW.elec_idx
    FROM DUAL;
END;

-- DROP TRIGGER elec_consumption_AI_TRG; 

-- DROP SEQUENCE elec_consumption_SEQ; 

-- 테이블 Comment 설정 SQL - elec_consumption
COMMENT ON TABLE elec_consumption IS '전기 소비';

-- 컬럼 Comment 설정 SQL - elec_consumption.elec_idx
COMMENT ON COLUMN elec_consumption.elec_idx IS '소비 식별자';

-- 컬럼 Comment 설정 SQL - elec_consumption.user_id
COMMENT ON COLUMN elec_consumption.user_id IS '사용자 아이디';

-- 컬럼 Comment 설정 SQL - elec_consumption.elec_watt
COMMENT ON COLUMN elec_consumption.elec_watt IS '소비 전력';

-- 컬럼 Comment 설정 SQL - elec_consumption.created_at
COMMENT ON COLUMN elec_consumption.created_at IS '등록 일자';

-- Foreign Key 설정 SQL - elec_consumption(user_id) -> user_info(user_id)
ALTER TABLE elec_consumption
    ADD CONSTRAINT FK_elec_consumption_user_id_us FOREIGN KEY (user_id)
        REFERENCES user_info (user_id) ;

-- Foreign Key 삭제 SQL - elec_consumption(user_id)
-- ALTER TABLE elec_consumption
-- DROP CONSTRAINT FK_elec_consumption_user_id_us;


-- solar_info Table Create SQL
-- 테이블 생성 SQL - solar_info
CREATE TABLE solar_info
(
    solar_idx      NUMBER(18, 0)    NOT NULL, 
    solar_watt     NUMBER(18, 1)    NOT NULL, 
    created_at     DATE             NOT NULL, 
    ess_storage    NUMBER(18, 1)    NOT NULL, 
    user_id        VARCHAR2(30)     NOT NULL, 
     PRIMARY KEY (solar_idx)
);

-- Auto Increment를 위한 Sequence 추가 SQL - solar_info.solar_idx
CREATE SEQUENCE solar_info_SEQ
START WITH 1
INCREMENT BY 1;

-- Auto Increment를 위한 Trigger 추가 SQL - solar_info.solar_idx
CREATE OR REPLACE TRIGGER solar_info_AI_TRG
BEFORE INSERT ON solar_info 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT solar_info_SEQ.NEXTVAL
    INTO :NEW.solar_idx
    FROM DUAL;
END;

-- DROP TRIGGER solar_info_AI_TRG; 

-- DROP SEQUENCE solar_info_SEQ; 

-- 테이블 Comment 설정 SQL - solar_info
COMMENT ON TABLE solar_info IS '태양광 발전량';

-- 컬럼 Comment 설정 SQL - solar_info.solar_idx
COMMENT ON COLUMN solar_info.solar_idx IS '발전 식별자';

-- 컬럼 Comment 설정 SQL - solar_info.solar_watt
COMMENT ON COLUMN solar_info.solar_watt IS '발전 량';

-- 컬럼 Comment 설정 SQL - solar_info.created_at
COMMENT ON COLUMN solar_info.created_at IS '발전 날짜';

-- 컬럼 Comment 설정 SQL - solar_info.ess_storage
COMMENT ON COLUMN solar_info.ess_storage IS '배터리 량';

-- 컬럼 Comment 설정 SQL - solar_info.user_id
COMMENT ON COLUMN solar_info.user_id IS '소유자 아이디';

-- Foreign Key 설정 SQL - solar_info(user_id) -> user_info(user_id)
ALTER TABLE solar_info
    ADD CONSTRAINT FK_solar_info_user_id_user_inf FOREIGN KEY (user_id)
        REFERENCES user_info (user_id) ;

-- Foreign Key 삭제 SQL - solar_info(user_id)
-- ALTER TABLE solar_info
-- DROP CONSTRAINT FK_solar_info_user_id_user_inf;





