import '../../style.scss'
import moment from "moment";
function Coin({ trades }) {

  const handleCompare = (price, prevPrice) => {
    if (!price || !prevPrice) return;
    if (price > prevPrice) {
      return 'up';
    } else if (price === prevPrice) {
      return 'equal';
    } else if (price < prevPrice) {
      return 'down';
    }
  };

  return (
    <>
      {trades.map((item, index) => (
        <div key={index} className='coin'>
          <h6 className={`pri-coin ${handleCompare(item.p,
            trades[index + 1] && trades[index + 1].p
          )}`} >
            {parseFloat(item.p).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h6>

          <h6 className={`qtt-coin ${handleCompare(item.q,
            trades[index + 1] && trades[index + 1].q
          )}`}>{parseFloat(item.q).toFixed(5)}
          </h6>

          <h6 class='tt-coin'> {moment(item.T).locale('sv').format('HH:mm:ss')}</h6>
          <div className="overlay">
            <div className="overlay-item">
              <div className="over-lay-item-title">
                Giá trung bình:
              </div>
              <div className="over-lay-item-text">
               ≈ { parseFloat(item.p).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
            <div className="overlay-item">
              <div className="over-lay-item-title">
                Tổng coin:
              </div>
              <div className="over-lay-item-text">
                 {parseFloat(item.q).toFixed(5)}
              </div>
            </div>
            <div className="overlay-item">
              <div className="over-lay-item-title">
                Thời gian giao dịch:
              </div>
              <div className="over-lay-item-text">
              {moment(item.T).locale('sv').format('HH:mm:ss')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Coin
