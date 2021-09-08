import React,{useState,useEffect} from 'react'

function Weather() {
    const [saigon,setSaigon] = useState([])

    const apiKey = 'acc4a289ac1bba6d85927937c13007e3'
    useEffect(() => {
        const getWeatherSaiGon = async () => {
          await  fetch(`https://api.openweathermap.org/data/2.5/weather?q=ho chi minh&appid=${apiKey}&units=metric&lang=vi`)
            .then((res) => res.json())
            .then((data) => {
                const saigon = data
                setSaigon(saigon)
                console.log(saigon);
            })
        }
        getWeatherSaiGon()
     
    },[])
    return (
        <div className='weather-box'>
            <p>Thành phố Hồ Chí Minh</p>
        </div>
    )
}

export default Weather
