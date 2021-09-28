const Dropdown = ({ handleChangeCoin }) => {

  return (
    <select onChange={(coinCode) => handleChangeCoin(coinCode.target.value)}>
      <option value="btcusdt">Bitcoin</option>
      <option value="ethusdt">Ethereum</option>
      <option value="adausdt">Cardano</option>
      <option value="bnbusdt">Binance Coin</option>
      <option value="dogeusdt">Dogecoin</option>
      <option value="ltcusdt">Litecoin</option>
      <option value="trxusdt">TRON</option>
    </select>
  );
};
export default Dropdown;