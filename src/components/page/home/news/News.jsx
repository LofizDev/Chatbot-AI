import React from 'react'

function News() {
    return (
        <div className="news-sidebar" style={{marginTop:'65px', }}>
        <div className="card mb-3" style={{ border: '0' }} >
            <div className="row no-gutters">
                <div className="col-md-5 news-img">
                    <img width='100%' src="https://i1-kinhdoanh.vnecdn.net/2021/09/08/a5-1631079596-1631079611-6005-1631079830.jpg?w=380&h=228&q=100&dpr=1&fit=crop&s=iwt9fqYFwqq4quCuz7T7Ag" alt="news" />
                </div>
                <div className="col-md-7 news-content">
                    <div className="card-body">
                        <h5  className="card-title">Nhiều người Việt căng thẳng về tình trạng tài chính</h5>
                        <h6 className="card-text">
                        Có 67% người Việt được hỏi nói cảm thấy căng thẳng về tình trạng tài chính, theo khảo sát mới công bố của Backbase. 
                        </h6>
                    </div>
                </div>
            </div>
        </div>
        <div className="card mb-3" style={{ border: '0' }} >
            <div className="row no-gutters">
                <div className="col-md-5 news-img">
                    <img width='100%' src="https://i1-thethao.vnecdn.net/2021/09/10/top2-1631288360-7005-1631288413.jpg?w=380&h=228&q=100&dpr=1&fit=crop&s=mKaABH3zz7O-d8NAqpTRrw" alt="news" />
                </div>
                <div className="col-md-7 news-content">
                    <div className="card-body">
                        <h5 className="card-title">Solskjaer: 'Ronaldo chắc chắn đá trận Man Utd - Newcastle'</h5>
                        <h6 className="card-text">
                        ANHHLV Ole Gunnar Solskjaer xác nhận tân binh Cristiano Ronaldo sẽ ra mắt Man Utd ở trận đấu Newcastle tại ...
                        </h6>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default News
