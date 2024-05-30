import React, { useEffect, useState, Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccordionMenu from './AccordionMenu';
import ReactDOM from 'react-dom';
import axios from '../axios';
import '../Nav.css';
import { MdOutlineStorefront } from 'react-icons/md';
import { HiHome } from 'react-icons/hi2';
import ApexCharts from 'apexcharts';
// import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';

const Cooler = () => {
  const getstringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };
  const [date, setDate] = useState(getstringDate(new Date()));

  const [tempData, setTempData] = useState('');
const [tempExt, setTempExt] = useState([]);

  useEffect(() => {
    console.log('Fetching temperature data...');
    axios
      .post('/handleTemp', { storeIdx: 1 })
      .then((res) => {
        console.log('Temperature data received:', res.data);
        setTempData(res.data.tempData[0]);
        setTempExt(res.data.tempExt);
      })
      .catch((error) => {
        console.error('Error fetching temperature data:', error);
        alert('Failed to fetch temperature data.');
      });
  }, []);
  

  const inputGoal = document.getElementsByClassName('inputGoal');
  const inputGoal2 = document.getElementsByClassName('inputGoal2');
  const [tempGoal, setTempGoal] = useState();
  const [humGoal, setHumGoal] = useState();

  const handleGoalLight = () => {
    console.log('목표 밝기 입력');
    inputGoal[0].style.display = 'inline';
  };
  const handleGoalHumid = () => {
    console.log('목표 습도 입력');
    inputGoal2[0].style.display = 'inline';
  };

  return (
    <div>
      <div className="indexHeader">
        <Link to="/">
          <img
            className="indexLogo2"
            src="img/NPSS_logo3.png"
            alt="이미지 준비중..."
          />
        </Link>
        <img
          className="indeximg"
          src="img/sign_out.png"
          alt="이미지 준비중..."
          onClick={() => {
            sessionStorage.removeItem('user');
            window.location.href = '/login';
          }}
        />
        <img
          className="indeximg"
          src="img/user.png"
          alt="이미지 준비중..."
          onClick={() => {
            window.location.href = '/mypage';
          }}
        />
        <img
          className="indeximg"
          src="img/chart_line_up.png"
          alt="이미지 준비중..."
          onClick={() => {
            window.location.href = '/light';
          }}
        />
      </div>

      <div className="contentPage">
        <AccordionMenu />

        <div className="indexDiv">
          <div className="indexInfo">
            <h5 className="indexTitle">스마트인재개발원</h5>
            <input
              className="inputDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="contentBox">
            <div className="indexContent1">
              <h5>주간 현황</h5>
              <div className="indexSmallDiv">
                <div>
                  <h5>평균 사용량</h5>
                  <div className="contentWrapper">
                    <div className="circle"></div>
                    <h3>25 ℃</h3>
                  </div>
                </div>
                <div>
                  <h5>작동 현황</h5>
                  <div className="contentWrapper">
                    <div className="circle2"></div>
                    <h3>OFF</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="indexDiv2">
              <div>
                <div className="indexContent2">
                  <h5>현재 온도</h5>
                  <h3>{tempData} ℃</h3>
                  <p>2% 🔺</p>
                </div>
                <div className="indexContent2">
                  <h5>현재 습도</h5>
                  <h3>25%</h3>
                  <p>2% 🔺</p>
                </div>
              </div>
              <div>
                <div className="indexContent2">
                  <h5>목표 온도</h5>
                  <div className='Goal'>
                  <div className="formContent">
                    <div className="inputWithButton">
                      <input
                        type="text"
                        onChange={(e) => setTempGoal(e.target.value)}
                      />
                      <button onClick={handleGoalLight}>입력</button>
                    </div>
                  </div>
                  <h3 className="inputGoal">{tempGoal} ℃</h3>
                  </div>
                </div>
                <div className="indexContent2">
                  <h5>목표 습도</h5>
                  <div className='Goal'>
                  <div className="formContent">
                    <div className="inputWithButton">
                      <input
                        type="text"
                        onChange={(e) => setHumGoal(e.target.value)}
                      />
                      <button onClick={handleGoalHumid}>입력</button>
                    </div>
                  </div>
                  <h3 className="inputGoal2">{humGoal} ℃</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="indexGraph">
            <h5>누적 현황</h5>
            <Chart
              type="line"
              series={[
                {
                  name:"",
                  data: [19, 18, 17, 16, 17, 20, 24, 26,28,28,26,22],
                }
                
              ]}
              options={{
                chart: {
                  height: 350,
                  type: 'line',
                  zoom: {
                    enabled: false,
                  },
                },

                
                xaxis: {
                  categories: [
                    '0시',
                    '2시',
                    '4시',
                    '6시',
                    '8시',
                    '10시',
                    '12시',
                    '14시',
                    '16시',
                    '18시',
                    '20시',
                    '22시',
                  ],
                },
                theme: {
                  mode: 'light',
                  palette: 'palette10',
                  monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65,
                  },
                },
              }}
            />
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Cooler;


