import React, { useCallback, useState } from 'react';
// import { handleCheckRegistrationNumber } from './handleCheckRegistrationNumber';
import axios from '../axios';
const url = require('url');
const Promise = require(Promise);

export const handleCheckRegistrationNumber = async (
    req: string
    ): Promise<string> => {
    const url: string = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_ApiKey}`;
    const { data } = await axios.post(url, {
        b_no: [req],
    });
    // 📌 01 값이 반환되면 계속사업자 02 값은 휴업자 03 값은 폐업자로 확인이 가능합니다.
    return data.data[0].b_stt_cd; 
    };

const License = () => {
    const [schoolNum, setSchoolNum] = useState();
    const [confirmedSchoolNum, setConfirmedSchoolNum] = useState();

    const handlerCheckSchoolNum = useCallback(async () => {
    try {
        const data = await handleCheckRegistrationNumber(schoolNum);
        if (data === "01") {
        setConfirmedSchoolNum(true); // 영업중으로 확인되는 사업자
        } else {
        setConfirmedSchoolNum(false); // 휴업, 폐업으로 확인되는 사업자
        }
    } catch (error) {
        console.log(error);
    }
    }, [schoolNum, setSchoolNum, confirmedSchoolNum, setConfirmedSchoolNum]);


    return (
        <div><form name="frm1" method="post" action="..">
        <table class="tb_board_1">
            <tr>
                <th scope="row">사업자등록번호</th>
                <td  class="left_5">
                    <div>
                        <input type="text" name="code1" value="" size="3" alt="사업자등록번호1" style="ime-mode:disabled;" maxlength="3"/>
                        -<input type="text" name="code2" value="" size="2" alt="사업자등록번호2" style="ime-mode:disabled;" maxlength="2"/>
                        -<input type="text" name="code3" value="" size="5" alt="사업자등록번호3" style="ime-mode:disabled;" maxlength="5"/>
                    </div>
                    <span style="cursor:hand" id="btn" onclick="onclick()">확인</span>
                    <span>schoolNum</span>
                    <span>confirmedSchoolNum</span>
                </td>
            </tr>
        </table>
        </form>
        <button>데이터 요청</button>
        </div>
    )
}
export default License;