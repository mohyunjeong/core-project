import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import AccordionMenu from './AccordionMenu';
import ReactDOM from 'react-dom'

const Sign = () => {
    const getstringDate = (date)=>{
        return date.toISOString().slice(0,10);
    }
    const [date, setDate] = useState(getstringDate(new Date()));

  return (
    <div>
        <div className="header">
            <Link to="/"><img className="logo2" src='img/NPSS_logo2.png' alt='이미지 준비중...'/></Link>
        </div>

        <div className='contentPage'>
            <AccordionMenu/>
            <div className='indexInfo'>
                <h5 className='indexTitle'>아이스크림 남구점</h5>
                <input className="inputDate" type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}></input>
                <br/>
                <h5 className='indexTitle'>태양열 번호 : sakdjfhgakfdgh</h5>
            </div>
            <div className="indexDiv">
                <br/>
                <div className='indexContent'>
                    <h5>간판 밝기</h5>
                    <h3>25 Lux</h3>
                    <p>2% 🔺</p>
                    <img src="https://cdn-icons-png.flaticon.com/128/4721/4721635.png"/>
                </div>
                <div className='indexContent'>
                    <h5>외부 밝기</h5>
                    <h3>25 Lux</h3>
                    <p>2% 🔺</p>
                    <img src="https://cdn-icons-png.flaticon.com/128/4721/4721635.png"/>
                </div>
                <div className='indexContent'>
                    <h5>목표 밝기</h5>
                    <h3>25 Lux</h3>
                    <p>2% 🔺</p>
                    <img src="https://cdn-icons-png.flaticon.com/128/4721/4721635.png"/>
                </div>
                <br/>
                <div className='indexGraph'>
                    <img src='https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimg3.tmon.kr%2Fcdn4%2Fdeals%2F2023%2F09%2F09%2F22982326658%2F22982326658_front_df4952f9de.jpg&type=sc960_832'></img>
                </div>

        </div>
        <br/><br/>

        <div className="button-container-2">
            <button onClick={()=>{window.location.href="/"}}>메인으로</button>  
        </div>
        <div className="button-container-2">
            <button onClick={()=>{window.location.href="/login"}}>로그인</button>  
        </div>
        <div className="button-container-2">
            <button onClick={()=>{window.location.href="/mypage"}}>정보수정</button>  
        </div>
        </div>



    </div>
  )
}

export default Sign