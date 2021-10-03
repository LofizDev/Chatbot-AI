import React,{useState,useEffect} from 'react'
import './style.scss'
import { jumbotron } from 'bootstrap-css'
import Chart from '../chartVN/Chart'
import { COVID_CASES_VIETNAM } from '../../../../../utils/Api'
import ChartVaccince from '../chartVN/ChartVaccince'


function NewBox() {

    // Call api and show data total cases in VietNam
    const [vietNamCases,setVietNamCases] = useState([])

    useEffect(() => {
        fetch(COVID_CASES_VIETNAM)
        .then(res => res.json())
        .then(data => {
            const vietNamCases = data.data.vnSeason4CommunityDaily.data 
            setVietNamCases(vietNamCases)
        })
    }, [])

    return (
        <div className="show__cases-covid">
            <div className="box-cases">
                <div className="box-title">Covid-19 tại Việt Nam</div>
                <div className="box-container">
                <div className="total-cases time-cases">
                        <span>&nbsp;</span>
                        <span>Hôm qua</span>
                        <span>Tổng</span>
                    </div>
                    <div className="total-cases">
                        <span className='title-th'>Nhiễm * </span>
                        <span className='red'>
                            <strong>{vietNamCases?.slice(-1)[0]?.daily.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strong>
                        </span>
                        <span className='red'>{vietNamCases?.slice(-1)[0]?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                    </div>
                    <div className="recovered-cases">
                        <span className='title-th'>Khỏi</span>
                        <span className='green'><strong>{vietNamCases?.slice(-1)[0]?.recover.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strong></span>
                        <span className='green'>{vietNamCases?.slice(-1)[0]?.['total-recover'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                    </div>
                    <div className="death-cases">
                        <span className='title-th'>Tử vong</span>
                        <span><strong>{vietNamCases?.slice(-1)[0]?.dead}</strong></span>
                        <span>{vietNamCases?.slice(-1)[0]?.['total-dead'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                    </div>
                </div>
            </div>
            <div className="chart-cases">
                <Chart/>
                <ChartVaccince/>
            </div>
        </div>
    ) 
}

export default NewBox
