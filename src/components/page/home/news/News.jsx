import React, { useState, useEffect } from 'react'

function News() {
    const [newsData, setNewsData] = useState([])
    useEffect(() => {
        const getNews = async () => {
            await fetch('https://gw.vnexpress.net/ar/get_rule_2?category_id=1004765&limit=5&page=1&data_select=title,share_url,thumbnail_url,lead,publish_time')
                .then(res => res.json())
                .then(data => {
                    const keyId = Object.keys(data.data)[0]
                    setNewsData(data.data[keyId].data)
                })
        }
        getNews()
    }, [])

    return (
        <div className="news-sidebar" style={{ marginTop: '65px', }}>
            <ul className='list-news'>
                {newsData.map((item) => (
                    <div className="card mb-3" style={{ border: '0' }} >
                        <div className="row no-gutters">
                            <div className="col-md-3 news-img">
                                <img src={item.thumbnail_url} alt="news" />
                            </div>
                            <div className="col-md-9 news-content it">
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <h6 className="card-text">{item.lead}</h6>
                                </div>
                                <div className="card-fotterr">
                                    <p className='time-news'>2 giờ trước</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
            <p>Load more... buiding...</p>
        </div>
    )
}

export default News
