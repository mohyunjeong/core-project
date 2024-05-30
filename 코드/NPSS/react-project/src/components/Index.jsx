import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// import axios from '../axios'
import { Link } from 'react-router-dom';
import AccordionMenu from './AccordionMenu';

// 로그인 완료 후 보일 페이지
const Index = () => {

    const [store, setStore] = useState([{
        storeName : "스마트인재개발원 1호점",
        idx : 1
    }]);

  return (
    <div className='indexDiv'>
        <div className="header">
            <Link to="/"><img className="logo2" src='img/NPSS_logo2.png' alt='이미지 준비중...'/></Link>
        </div>
        <AccordionMenu/>

        <div className='indexGraph'>냉난방 장치 제어</div>
        <br/>
        <div className='indexGraph'>간판 밝기 제어</div>
        <div className='indexGraph'>실내 조명 제어</div>
        <br/>
        <div className='indexGraph'>태양열 생산량 그래프</div>
        <div className='indexGraph'>태양열 생산 전력 공급 제어</div>
        <br/><br/>

    
    
        <div className="button-container-2">
            <button onClick={()=>{window.location.href="/"}}>메인으로</button>  
        </div>
        <div className="button-container-2">
            <button onClick={()=>{window.location.href="/join"}}>회원가입</button>  
        </div>
        <div className="button-container-2">
            <button onClick={()=>{window.location.href="/login"}}>로그인</button>  
        </div>
    </div>
  )
}

export default Index