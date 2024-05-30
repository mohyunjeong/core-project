import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../axios';
import { Link } from 'react-router-dom';
import AccordionMenu from './AccordionMenu';

const MyPage = ({ licenseNum, setLicenseNum }) => {
  // 정보수정 페이지
  // 1. 비번 확인 해서 정보 수정할 수 있도록.

  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [pay, setPay] = useState('');
  const [license, setLicense] = useState();
  const [schoolNum, setSchoolNum] = useState();
  const [confirmedSchoolNum, setConfirmedSchoolNum] = useState();

  const handleMyPage = (e) => {
    e.preventDefault();
    console.log('handle MyPage function');
  };


  const handleCheckRegistrationNumber = async (
    req: string,
  ): Promise<string> => {
    console.log('req 14 ', req);
    const url: string = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_API_KEY}`;
        const { data } = await axios.post(url, {
          b_no: [req],
        });
        // 01 값이 반환되면 계속사업자 02 값은 휴업자 03 값은 폐업자로 확인이 가능
        console.log("출력데이터",data.data[0].b_stt_cd)
        return data.data[0].b_stt_cd;
        };

  const license_check = document.getElementsByClassName('checkLicense');

  const handlerCheckSchoolNum = useCallback(async () => {
    console.log('handler check school number function', schoolNum);
    try {
      const data = await handleCheckRegistrationNumber(schoolNum);
      console.log('data in 49', data);
      if (data === "01") {
        setConfirmedSchoolNum(true); 
        console.log('영업중으로 확인됩니다.');
        alert('확인되었습니다.');
        license_check[0].style.display = "block";
        license_check[0].style.color = "rgb(102, 148, 195)";
      } else {
        setConfirmedSchoolNum(false); 
        console.log('휴업, 폐업으로 확인됨');
        alert('다시 입력해주세요.');

      }
    } catch (error) {
      console.log(error);
    }
  }, [schoolNum, setSchoolNum, confirmedSchoolNum, setConfirmedSchoolNum]);

  return (
    <div>
      <div className="header">
        <Link to="/">
          <img className="logo2" src="img/NPSS_logo2.png" alt="이미지 준비중..."/>
        </Link>
      </div>
      <div className="mypage_formBox">
        <h1>정보 수정</h1>
        <div className='selectDiv'>
          <h5>점포 관리</h5>
        <div className="button-container">
          <span>점포 선택</span>
            {'   '}
            <select name="store">
              <option value="1">1번 가게</option>
              <option value="2">2번 가게</option>
              <option value="3">3번 가게</option>
            </select>
          </div>
        </div>
        <br/>
        <hr/>
        <div className="formTag">
          <h5>사업자 등록번호 변경</h5> <br />
          <input type="text" className="formInput2" placeholder='사업자 등록번호를 입력해주세요.' onChange={(e) => {setSchoolNum(e.target.value);}}
            name="code1"
            defaultValue=""
            size="3"
            alt="사업자등록번호"
            style={{ imeMode: 'disabled' }}
            maxLength="10"
          />
          <button type="submit" onClick={handlerCheckSchoolNum}>
            인증하기
          </button>
          <span className='checkLicense'>확인되었습니다. </span>
          <br />
          <br />
          <h5>결제정보 수정</h5>
          <br />
          <input
            type="password"
            className="formInput"
            name="PW"
            placeholder="변경하실 카드번호를 입력해주세요."
            onChange={(e) => {
              setPay(e.target.value);
            }}
          />
          <br />
          <br />
          <div className="button-container">
            <button type="submit" className="btn" onClick={handleMyPage}>
              정보수정 완료
            </button>
          </div>
        </div>
        <hr/>
            <span className='loginSpan'><Link to={'/'}>메인 화면 | </Link></span>
            <span className='loginSpan'><Link to={'/light'}>서비스 화면</Link></span>
      </div>
    </div>
  );
};

export default MyPage;
