
function Weather() {

    return (
        <div className='windy-box'>
         <iframe width="100%" height="100%" style={{borderRadius:'13px'}} src="https://embed.windy.com/embed2.html?lat=16.257&lon=107.622&detailLat=15.579&detailLon=128.142&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" frameborder="0"></iframe>
        </div>
    )
}

export default Weather
