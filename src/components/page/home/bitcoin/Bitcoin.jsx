import React, { useState ,useEffect} from 'react'

function Bitcoin() {
    const [coin, setCoin] = useState([])
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@aggTrade')
    const [lastPrice,setLastPrice] = useState(0)
    
    useEffect(() => {
        ws.onmessage = (e) => {
            let data = JSON.parse(e.data)
            let price = parseFloat(data.p)     
            data = price
            setCoin(data)
            setLastPrice(coin)
        }
     
    }, [coin])
    return (
        <>
         <p className={ coin > lastPrice ? 'up'  : 'down' }> 
            {coin} BTC / USDT
         </p> 
      </>
    )
}

export default Bitcoin
