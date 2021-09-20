import React, { useEffect, useRef, useState } from 'react';
import { Newspaper } from 'react-bootstrap-icons';
import Coin from './coin/Coin';
import '../style.scss'
// import Chart from './components/Chart/Chart';
// import Table from './components/Table/Table';
// import Dropdown from './components/Dropdown/Dropdown';
const URL_WEB_SOCKET = 'wss://stream.binance.com:9443/ws';

const Bitcoin = () => {
  const [ws, setWs] = useState(null);
  const [trades, setTrades] = useState([]);
  const [sortedTrades, setSortedTrades] = useState([]);
  const [currentCoin, setCurrentCoin] = useState('ethusdt');
  const prevCoin = useRef(currentCoin);

  // Connect, disconnect Socket
  useEffect(() => {
    const webSocketClient = {
      wsClient: new WebSocket(URL_WEB_SOCKET),
      connect: function () {
        // if connect succesfully then open websocket can request, response data
        this.wsClient.onopen = () => {
          setWs(webSocketClient.wsClient);
        };
        // when socket closed, server will be notification disconnect,and affter 5s auto connect
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

  // useEffect(() => {
  //   const mapedTrades = trades.map((trade, index) => {
  //     return {
  //       ...trade,
  //       index: index,
  //     };
  //   });
  //   const sortTrades = mapedTrades.sort((a, b) => {
  //     return b.index - a.index;
  //   });
  //   setSortedTrades(sortTrades);
  // }, [trades]);

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
      if (newTrades.length >= 15) {
        newTrades.shift();
        newTrades.push(trade);
        setTrades(newTrades);
      } else {
        newTrades.push(trade);
        setTrades(newTrades);
      }
    }
  };


  return (
    <div className='table-trade'>
      <h6 className="coin-title">Số lệnh</h6>
      <div className="coin-name">
        <p id='price-coin'>Giá (USDT)</p>
        <p id='quantity-coin'>Số lượng (Coin)</p>
        <p id='total-coin'>Thời gian</p>
      </div>
      <div className="coin-detail">
          <Coin trades={trades}  />
      </div>
    </div>
  );
};
export default Bitcoin;