import React, { useEffect, useState, Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import AccordionMenu from './AccordionMenu';
import ReactDOM from 'react-dom'
import axios from '../axios'
import '../Nav.css';
import { MdOutlineStorefront } from "react-icons/md";
import { HiHome } from "react-icons/hi2";
import ApexCharts from 'apexcharts';
// import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
const Solar = () => {
    const getstringDate = (date)=>{
        return date.toISOString().slice(0,10);
    }
    const [date, setDate] = useState(getstringDate(new Date()));

    const [solarData, setSolarData] = useState('');
    const [solarWatt,setSolarWatt]=useState([]);
    useEffect(()=>{
        console.log('handle Light function', solarData);
  
       
        axios.post('/handleSolar', {
            storeIdx : 1
        })
        .then(res => {
            console.log('solar data received:', res.data);
            setSolarData(res.data.solarData[0]);
  
        })
        .catch((error)=>{
            console.error('Error:', error);
            alert('접속 실패하였습니다.');
        })
    },[])


  return (
    <div>
        <div className="indexHeader">
            <Link to="/"><img className="indexLogo2" src='img/NPSS_logo3.png' alt='이미지 준비중...'/></Link>
            <img className="indeximg" src="img/sign_out.png" alt="이미지 준비중..."onClick={()=>{
                sessionStorage.removeItem('user');
                window.location.href="/login";}}/>
            <img className="indeximg" src="img/user.png" alt="이미지 준비중..." onClick={()=>{window.location.href="/mypage"}}/>
            <img className="indeximg" src="img/chart_line_up.png" alt="이미지 준비중..." onClick={()=>{window.location.href="/light"}}/>
        </div>

        <div className="contentPage">
        <AccordionMenu />

        <div className="indexDiv">
            <div className="indexInfo">
                <h5 className="indexTitle">스마트인재개발원</h5>
                <input className="inputDate" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>


            <div className='contentBox2'>
                <div className="indexContent3">
                    <h5> 전력량</h5>
                    <div className="indexSmallDiv">
                    <div>
                        <h5>발전량</h5>
                        <div className='contentWrapper'>
                            <div className='circle'></div>
                            <h3>78 mw</h3>
                        </div>
                    </div>
                    <div>
                        <h5>누적 발전량</h5>
                        <div className='contentWrapper'>
                            <div className='circle2'></div>
                            <h3>672 mW</h3>
                        </div>
                    </div>
                    </div>
                </div>
          </div>

                <div className='indexGraph'>
                    <h5>누적 현황</h5>
                    <Chart
              type="line"
              series={[
                {
                  name:"",
                  data: [10.7, 10.2, 10.8, 26.3, 64.8, 79.1, 86.7, 89.4,86.2,64.3,35.5,15.2],
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
                                
                        }}
                    }/>
                            
                </div>
        </div>
        <br/><br/>

    </div>
    </div>
  )
}

export default Solar