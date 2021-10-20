import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COVID_VACCINE_VIETNAM } from '../../../../../utils/Api';
import moment from 'moment';

function ChartVaccince() {
    const [time, setTime] = useState([])
    const [vaccine, setVaccine] = useState([])
    const [second, setSecond] = useState([])
    const [reportType, setReportType] = useState('7');

    const [one, setOne] = useState(7)
    let date = vaccine.slice(Math.max(vaccine.length - one, 0)).map((keyName) => moment(keyName.date).format('DD/MM'))
    let firstInjection = time.slice(Math.max(vaccine.length - one, 0)).map((keyName) => keyName.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    let secondInjectiton = second.slice(Math.max(vaccine.length - one, 0)).map((second) => second.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))

    // Data firInjection,secondInjection
    const data = date.map((d, index) => ({
        date: d,
        'Mũi tiêm thứ 1:': firstInjection[index],
        'Mũi tiêm thứ 2:': secondInjectiton[index]
    }))

    // Call api data Vaccine VietNam
    useEffect(() => {
        const getDataVaccine = async () => {
            try {
                await fetch(COVID_VACCINE_VIETNAM)
                    .then(res => res.json())
                    .then(req => {
                        setVaccine(req.data.data)
                        setTime(req.data.first.datas)
                        setSecond(req.data.second.datas)
                    })
            }
            catch (error) {
                console.log(error);
            }
        }
        getDataVaccine()
    }, [])


    // Handler Change type of data 7 days,30 days, all
    function handle7Days() {
        setOne(7)
        setReportType('7')
    }
    function handle30Days() {
        setOne(30)
        setReportType('30')
    }
    function handleAll() {
        setOne(second.length)
        setReportType('all')
    }



    return (
        <div style={{ width: '100%', height: 380, backgroundColor: "#fff", padding: '3px 0px 30px 0', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
            <h6 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '17px' }}>
                Số người đã tiêm vaccine theo ngày
            </h6>
            <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="Mũi tiêm thứ 1:" fill="#9B8ADF" background={{ fill: '#9B8ADF' }} />
          <Bar dataKey="Mũi tiêm thứ 2:" fill="#7FD0D6" background={{ fill: '#7FD0D6' }} />
        </BarChart>
      </ResponsiveContainer>
            <div className="btn-group mt-3">
                <label
                    onClick={handle7Days}
                    className={reportType === '7' ? 'ml-2 atv' : 'ml-2'}
                >7 Ngày
                </label>
                <label
                    onClick={handle30Days}
                    className={reportType === '30' ? 'ml-2 atv' : 'ml-2'}
                >30 Ngày
                </label>
                <label
                    onClick={handleAll}
                    className={reportType === 'all' ? 'ml-2 atv' : 'ml-2'}
                >Toàn thời gian
                </label>
            </div>
        </div>
    )
}

export default ChartVaccince
