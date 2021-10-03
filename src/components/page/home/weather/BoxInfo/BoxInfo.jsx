import React ,{useState,useEffect} from 'react'
import { API_BASE_WEATHER, API_KEY_WEATHER } from '../../../../../utils/Api'
import  {getCurrentDate}  from '../../../../../utils/DataFormatter'
import './BoxInfoStyle.scss'
function BoxInfo() {

    const [query,setQuery] = useState('')
    const [weather,setWeather] = useState({})

    // key and url of api weather
    const api = {
        key: API_KEY_WEATHER,
        base: API_BASE_WEATHER
    }

    // Search and fetch Api
    const search = e => {
        if(e.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=vi`)
            .then(res => res.json())
            .then(data => {
                setWeather(data)
                setQuery('')
            })
        }
    } 
    //First time when app load call api Sai gon
    useEffect(() => {
        fetch(`${api.base}weather?q=ho chi minh&units=metric&APPID=${api.key}&lang=vi`)
        .then(res => res.json())
        .then(data => {
            setQuery('')
            setWeather(data)
        })
    }, [])
    
    return (
        <div className='sibar-weather'>
            <div className="box-detail"
            id={(typeof weather.main !='undefined' 
                  ? ((weather.main.temp < 25) ? 'vl' : 'xx')
                  : 'xx')}
            >
                <div className="search-box">
                    <input type="text" 
                      className='search-bar'
                      onChange={e => setQuery(e.target.value)}
                      value={query}
                      onKeyPress={search}
                      placeholder='Search...' />
                </div>
                {/* Location box */}
                <div className="location-box">
                    <div className="location">
                        {weather.name}
                    </div>
                    <div className="date">
                        <p style={{letterSpacing:'.8px'}} >{getCurrentDate()}</p>
                    </div>
                </div>
                {/* weather box */}
                <div className="weather-box">
                    <div className="temp">
                    {weather.main && Math.round(weather?.main?.temp)}°c
                    </div>
                    <div className="weather">
                        {weather.weather && weather.weather[0]?.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoxInfo
