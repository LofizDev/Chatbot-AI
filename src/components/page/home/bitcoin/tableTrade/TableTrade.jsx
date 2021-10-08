import React, { useEffect, useRef, useState } from 'react';
import Coin from './coin/Coin';
import '../style.scss'
import Dropdown from '../Dropdown/Dropdown';
const URL_WEB_SOCKET = 'wss://stream.binance.com:9443/ws';

const TableTrade = () => {
  const [ws, setWs] = useState(null);
  const [trades, setTrades] = useState([]);
  const [currentCoin, setCurrentCoin] = useState('btcusdt');
  const prevCoin = useRef(currentCoin);


  // Connect, disconnect Socket
  useEffect(() => {
    const webSocketClient = {
      wsClient: new WebSocket(URL_WEB_SOCKET),
      connect: function () {
        this.wsClient.onopen = () => {
          setWs(webSocketClient.wsClient);
        };
        this.wsClient.onclose = () => {
          console.log('disconnect');
          setTimeout(function () {
            console.log('reconnecting...');
            webSocketClient.connect();
          }, 5000);
        };
      },
      disconnect: function () {
        this.wsClient.close();
      },
    };
    webSocketClient.connect();
    // Disconnect when component unmount
    return () => {
      webSocketClient.disconnect();
    };
  }, []);


  useEffect(() => {
    const requestSubcribe = {
      method: 'SUBSCRIBE',
      params: [`${currentCoin}@trade`],
      id: 98,
    };
    const requestUnSubcribe = {
      method: 'UNSUBSCRIBE',
      params: [`${prevCoin.current}@trade`],
      id: 68,
    };

    if (ws) {
      setTrades([]);
      // setSortedTrades([]);
      ws.send(JSON.stringify(requestUnSubcribe));
      ws.send(JSON.stringify(requestSubcribe));
    }
  }, [currentCoin, prevCoin, ws]);

  useEffect(() => {
    prevCoin.current = currentCoin;
  }, [currentCoin]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (e) => {
        const trade = JSON.parse(e.data);
        const newTrades = [...trades];
        addTradeToList(trade, newTrades);
      };
    }
  }, [ws, trades]);
  


  const addTradeToList = (trade, newTrades) => {
    if (trade.e) {
      if (newTrades.length >= 20) {
        newTrades.shift();
        newTrades.push(trade);
        setTrades(newTrades);
      } else {
        newTrades.push(trade);
        setTrades(newTrades);
      }
    }
  };

  const handleChangeCoin = (coinCode) => {
    setCurrentCoin(coinCode)
  }


  return (
    <div className='table-trade'>
      <div className="select-coin" style={{display:'flex', justifyContent:'space-between',alignItems:"end"}}>
      <h6 className="coin-title" >Số lệnh</h6>
      <Dropdown handleChangeCoin={handleChangeCoin}/>
      </div>
      <div className="coin-name">
        <p id='price-coin'>Giá (USDT)</p>
        <p id='quantity-coin'>Số lượng (Coin)</p>
        <p id='total-coin'>Thời gian</p>
      </div>
      <div className="coin-detail">
        <Coin trades={trades} />
      </div>
    </div>
  );
};
export default TableTrade;