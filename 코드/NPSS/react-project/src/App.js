import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Join from './components/Join';
import Index from './components/Index';
import Introduce from './components/Introduce';
import Check from './components/Check';
import MyPage from './components/MyPage';
import Nav from './components/Nav';
import Light from './components/Light';
import Solar from './components/Solar';
import Sign from './components/Sign';
import Cooler from './components/Cooler';

import { useState } from 'react';
// import License from './components/License';


function App() {
  const [licenseNum, setLicenseNum] = useState();
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/introduce" element={<Introduce/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/join" element={<Join/>}></Route>
        <Route path="/index" element={<Index/>}></Route>
        <Route path="/check" element={<Check/>}></Route>
        <Route path="/mypage" element={<MyPage licenseNum={licenseNum} setLicenseNum={setLicenseNum}/>}></Route>
        <Route path="/light" element={<Light/>}></Route>
        <Route path="/solar" element={<Solar/>}></Route>
        <Route path="/cooler" element={<Cooler/>}></Route>
        <Route path="/sign" element={<Sign/>}></Route>
        {/* <Route path="/license" element={<License/>}></Route> */}

      </Routes>
    </div>
  );
}

export default App;