import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from '../axios'
import { Link } from 'react-router-dom';

const Join = () => {

  const [id, setId] = useState(""); 
  const [pw, setPw] = useState(""); 
  const [checkPw, setCheckPw] = useState("");
  const [email, setEmail] = useState("");

  const handleJoin = (e)=>{
    e.preventDefault(); 
    console.log('handle join function');
    // console.log('✅ ID:', id);    
    // console.log('✅ Password:', pw);    
    // console.log('✅ checkPw:', checkPw);    
    // console.log('✅ email:', email);    
    // 비밀번호 확인    
    if (pw !== checkPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
      axios.post('/handleJoin', {
        id : id,
        pw : pw,
        email : email })
        .then((res) => {
          console.log(res.data)
          if (res.data.result === "success") {
            alert('가입을 축하합니다.');
            window.location.href = "/check";
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('가입 중 오류가 발생했습니다.'); });
  }

  return (
    <div>
        <div className='header'>
          <Link to="/"><img className="logo2" src='img/NPSS_logo2.png' alt='이미지 준비중...'/></Link>
        </div>

        <div className='formBox'>
          <h1>회원가입</h1>
          {/* <h5>아이디, 비밀번호를 입력해주세요. </h5> */}
            <form className="formTag" onSubmit={handleJoin}>
                <span>ID</span> <br/>
                <input type="text" className="formInput" name="ID" placeholder='아이디를 입력하세요.' onChange={(e)=>{setId(e.target.value)}}/>
                <br/>
                <span>Password</span><br/>
                <input type="password" className="formInput" name="PW" placeholder='비밀번호를 입력하세요.' onChange={(e)=>{setPw(e.target.value)}}/>
                <span>Password  확인</span><br/>
                <input type="password" className="formInput" name="CheckPW" placeholder='비밀번호를 다시 한 번 입력하세요.' onChange={(e)=>{setCheckPw(e.target.value)}}/>
                <span>email</span> <br/>
                <input type="email" className="formInput" name="email" placeholder='이메일을 입력하세요.' onChange={(e)=>{setEmail(e.target.value)}}/>


                <div className="button-container">
                    <button type="submit" className="btn">회원가입</button>
                </div>
            </form>
            <div className="button-container-onclick">
                    <button onClick={()=>{window.location.href="/"}}>메인화면</button>  
            </div>
        </div>
      </div>

    
  )
}

export default Join