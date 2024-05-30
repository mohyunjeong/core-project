import React from 'react'
import { Form, Button } from 'react-bootstrap'
// import axios from '../axios'
import { Link } from 'react-router-dom';
import AccordionMenu from './AccordionMenu';

const Introduce = () => {
  return (
    <div>
        <div>
        <Link to="/"><img className="logo2" src='img/NPSS_logo2.png' alt='이미지 준비중...'/></Link>
        </div>
        {/* <AccordionMenu/> */}
        <div>
            <h3>저희 기업을 소개합니다! </h3>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
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

export default Introduce