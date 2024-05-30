import React, { useState } from 'react'
import axios from '../axios'
import { Link } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";

const Login = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = (e) =>{
        e.preventDefault();
        console.log('handle Login function', id, pw);

        axios.post('/handleLogin', {
            id : id,
            pw : pw
        })
        .then(res => {
            console.log(res.data);
            if(res.data.length > 0){
                alert(`${res.data[0]}님 환영합니다.`);
                sessionStorage.setItem('user', JSON.stringify(res.data));
                window.location.href="/light";
            } else {
                alert('아이디 혹은 비밀번호가 틀립니다!');
            }
        })
        .catch((error)=>{
            console.error('Error:', error);
            alert('로그인에 실패하였습니다.');
        })
    }

  return (
    <div>
        <div>
        <Link to="/"><img className="logo2" src='img/NPSS_logo2.png' alt='이미지 준비중...'/></Link>
        </div>

        <div className='formBox'>
            <h1>로그인</h1>
            <h5>아이디, 비밀번호를 입력해주세요. </h5>
            <form className="formTag" onSubmit={handleLogin}>
                <div className="inputWithIcon">
                    <IoPerson/>
                    <input type="text" className="formInput" name="ID" placeholder='아이디' value={id} onChange={(e)=>{setId(e.target.value)}}/>
                </div>
                <br/>
                <div className="inputWithIcon">
                    <IoIosLock />
                    <input type="password" className="formInput" name="PW" placeholder='비밀번호' value={pw} onChange={(e)=>{setPw(e.target.value)}}/>
                </div>

                <div className="button-container">
                    <button type="submit" className="btn">로그인</button>
                </div>
            </form>
            <hr/>
            <span className='loginSpan'><Link to={'/join'}>회원가입 | </Link></span>
            <span className='loginSpan'><Link to={'/join'}>아이디 찾기 | </Link></span>
            <span className='loginSpan'><Link to={'/join'}>비밀번호 찾기</Link></span>
        </div>

    </div>

  )
}

export default Login;