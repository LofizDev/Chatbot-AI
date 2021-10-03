import React from 'react'
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons'
function Coin({ coinmarketcap, loading }) {

    if(loading) {
        return <>Loading...</>
    }
    return (
        <>
        {coinmarketcap.map(coin => (
            <tr>
            {/* STT */}
            <td style={{ padding: "11px 10px" }}>{coin?.market_cap_rank}</td>
            {/* IMG,Name Coin */}
            <td style={{ textAlign: 'start', paddingRight: '0px', textTransform: 'capitalize' }}>
              <img style={{ marginRight: '10px' }} width="24px" height="24px" src={coin?.image} alt="coin img" />
              {coin?.id}
            </td>
            {/* Price */}
            <td style={{ paddingLeft: '0' }}>
              ${coin.current_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </td>
            {/* Price change Percent 24h */}
            <td style={{ color: coin.price_change_percentage_24h > 0 ? '#18dd92' : '#ea3943' }}>
              {coin.price_change_percentage_24h > 0
                ? <CaretUpFill size={8} />
                : <CaretDownFill size={8} />}
              {Math.abs(coin.price_change_percentage_24h.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))}%
            </td>
            {/* Total Volum */}
            <td>${coin.high_24h.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
            <td>${coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
          </tr>
        ))}
    </>
    )
}

export default Coin
